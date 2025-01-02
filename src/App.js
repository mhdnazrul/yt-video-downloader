import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');

  const handleDownload = async () => {
    try {
      const response = await fetch(`https://your-backend-url/api/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format }),
      });
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `video.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert('Failed to download. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <select value={format} onChange={e => setFormat(e.target.value)}>
        <option value="mp4">MP4</option>
        <option value="mp3">MP3</option>
      </select>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default App;
