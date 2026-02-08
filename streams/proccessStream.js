const { Transform } = require('stream');
class ProcessStream extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const process = chunk.toString().toUpperCase();
      this.push(Buffer.from(process));  
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = ProcessStream;