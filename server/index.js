const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const util = require('../common/util')
http.createServer((req,res) => {
  let pathName = req.url==='/' ? '/index.html' :url.parse(req.url).pathname
  fs.readFile(`./static${pathName}`,async (err, data) => {
    if (err) {
      res.end('不存在该页面')
    }
    let type = await util.mime(path.extname(pathName))
    res.writeHead(200, {'content-type': `${type};charset="utf-8"`})
    res.end(data)
  })
}).listen(8889)
const obj ={
  1: false
}
Object.entries()
