const express = require("express");
const { exec } = require("child_process");

const app = express();

app.get("/", (req, res) => {
    res.send("yt-dlp API running 🚀");
});

// MP3 / Audio link
app.get("/mp3", (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: "No URL" });
    }

    const cmd = `yt-dlp -f bestaudio -g "${url}"`;

    exec(cmd, (err, stdout) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            url: stdout.trim()
        });
    });
});

// MP4 / Video link
app.get("/mp4", (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: "No URL" });
    }

    const cmd = `yt-dlp -f best -g "${url}"`;

    exec(cmd, (err, stdout) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            url: stdout.trim()
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
