let http = require('http')
let fs = require('fs')
let path = require('path')
let utils = require('../common/utils')

http.createServer((req,res) => {
  let pathName = req.url.split('?')[0]
  let extName = path.extname(pathName)
  if (pathName === '/') {
    pathName = 'index.html'
  }
  if (pathName !== '/favicon.ico') {
    fs.readFile('../static/'+pathName, async (err,data) => {
      if (err) {
        fs.readFile('../static/404.html',(errNotFound,dataNotFound) => {
          res.writeHead(200, {
            'Content-Type': 'text/html;charset="utf-8"'
          })
          res.write(dataNotFound)
          res.end()
        })
      } else {
        res.writeHead(200,{
          'Content-Type': await utils.mime(extName) + ';charset="utf-8"'
        })
        res.write(data)
        res.end()
      }
    })

  }

}).listen(8000)
