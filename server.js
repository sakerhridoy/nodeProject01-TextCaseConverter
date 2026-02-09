const http = require('http');
const fs = require('fs');
const path = require('path');
const handleUpload = require('./streams/uploadStream');
const UpEmitter = require('./events/upEmitter');

const PORT = 3000;

UpEmitter.on('upProgress', (bytes, filename) => {
  console.log(`Uploading ${filename}: ${bytes} bytes received`);
});
UpEmitter.on('upFinish', ( filename) => {
  console.log(`${filename} Upload finished`);
});
UpEmitter.on('procFinish', filename => {
  console.log(`${filename} Processing finished`);
});
UpEmitter.on('upError',(err, filename) => {
  console.log(`${filename} Upload error occurred: ${err}`);
});

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