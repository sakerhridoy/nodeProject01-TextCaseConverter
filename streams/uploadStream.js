const fs = require('fs');
const path = require('path');
const UpEmitter = require('../events/upEmitter');
const ProcessStream = require('./processStream');

function handleUpload(req, filename) {
  const upDir = path.join(__dirname, '..', 'uploads');
  const procDir = path.join(__dirname, '..', 'processed');

  const upPath = path.join(upDir,filename)
  const procPath = path.join(procDir, filename)
  
  let upBytes = 0;

  const writeStream = fs.createWriteStream(upPath);

  //track up progress
   
  req.on('data', (chunk) => {
    upBytes += chunk.length;
    UpEmitter.emit('upProgress', upBytes ,filename);
  })

  req.pipe(writeStream);

  writeStream.on('finish', () => {
    UpEmitter.emit('upFinish', filename);
  })

  //process the file after upload

  const processStream = new ProcessStream()
  const processWrite = fs.createWriteStream(procPath)
  fs.createReadStream(upPath)
  .pipe(processStream)
    .pipe(processWrite)   
    .on('finish', () => {
    UpEmitter.emit('procFinish', filename);
    })
  req.on('error', (err) => {
    UpEmitter.emit('upError', err, filename);
  })
}

module.exports = handleUpload;