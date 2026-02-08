const { transform } = require('stream');
const { buffer } = require('stream/consumers');
class ProcessStream extends transform {
  _transform(chunk, encoding, callback) {
    try {
      const process = chunk.toString().toUpperCase();
      this.push(buffer.from(process));  
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = ProcessStream;