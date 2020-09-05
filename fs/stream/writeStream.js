const fs = require('fs')
const writeStream = fs.createWriteStream('./stream.txt')
let str = ''
for (let i = 0; i < 1000; i++) {
  str +=`第${i}行，\n`
}
writeStream.write(str)
writeStream.end()
writeStream.on('finish',() => {
  console.log('完成');
})
