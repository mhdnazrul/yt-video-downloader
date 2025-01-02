const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url, format } = req.body;

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="video.${format}"`
    );
    const stream = ytdl(url, {
      format: format === 'mp3' ? 'audioonly' : 'video',
    });
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process download' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
