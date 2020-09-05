const fs = require('fs')
let path = './fs'

function isDir(fullPath) {
  return new Promise(((resolve,reject) => {
    fs.stat(fullPath, (err, data) => {
      if (err) {
        console.log('不存在该文件或目录');
        reject()
      }
      resolve(data.isDirectory())
    })
  }))
}


let list =[]
fs.readdir(path,async(err, data) =>{
  if (err) {
    console.log('不存在该目录');
    return
  }
  for(let item of data){
    await isDir(path+'/'+item).then(res => {
      if (res) {
        list.push(item)
      }
    })
  }
  console.log(list);

})
