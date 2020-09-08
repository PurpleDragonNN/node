const fs=require('fs')
const pug=require('pug');
var str = pug.renderFile('./view/jade.pug',{
  pretty: true,
  name:'jade',
  a:1,
  b:2
})
fs.writeFile('./view/jade.html',str, (err,data) => {
  console.log(err);
})
console.log(str);
