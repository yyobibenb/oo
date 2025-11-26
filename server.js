const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  
  const TARGET_URL = 'https://armor-agency.ru';
  
  const pingTarget = () => {
    fetch(TARGET_URL)
      .then(res => console.log(`[${new Date().toISOString()}] Ping to ${TARGET_URL} - Status: ${res.status}`))
      .catch(err => console.log(`[${new Date().toISOString()}] Ping failed:`, err.message));
  };
  
  pingTarget();
  
  setInterval(pingTarget, 14 * 60 * 1000);
  console.log(`Keep-alive ping enabled for ${TARGET_URL} every 14 minutes`);
});
