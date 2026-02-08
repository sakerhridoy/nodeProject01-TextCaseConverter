const http = require('http');
const fs = require('fs');
const path = require('path');
const handleUpload = require('./streams/uploadStream');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url.startsWith('/upload')) {
    // Handle file upload
    const filename = req.url.split('?file=')[1] || `file-${Date.now()}.txt`;
    handleUpload(req, filename);
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h1>POST request received</h1>');
  } else {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h1>Not Found</h1>');
  }
})

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
})