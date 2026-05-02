const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

// صحة السيرفر
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// MP3 / MP4 info مباشر
app.get("/download", async (req, res) => {
    const { url } = req.query;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    try {
        const info = await ytdl.getInfo(url);

        const format = ytdl.chooseFormat(info.formats, {
            quality: "highestaudio"
        });

        res.json({
            title: info.videoDetails.title,
            url: format.url
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
