const fs = require('fs')
const readStream = fs.createReadStream('./stream.txt')
readStream.setEncoding('utf-8')
readStream.on('data', (data) => {
  console.log(data);
})
