const fs = require('fs')
const readStream = fs.createReadStream('../../stream.txt')
const writeStream = fs.createWriteStream('./copyStream.txt')
readStream.pipe(writeStream)
