const fs=require('fs')
const pug=require('pug');
const obj = {
  a: 'a',
  b: 'b'
}
var str = pug.renderFile('./view/jade.pug',{
  pretty: true,
  name:'jade',
  obj
})
fs.writeFile('./view/jade.html',str, (err,data) => {
  if (err) {
    console.log('无法读取，目标文件不存在！1');
    return
  }
})
console.log(str);
