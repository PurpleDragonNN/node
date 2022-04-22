const fs = require('fs')
const path = require('path')
const url = require('url')
module.exports = {
  mime(type){
    return new Promise((resolve, reject) => {
      fs.readFile('../common/mime.json',(err,data) => {
        if (err) {
          console.log('err1:',err);
          reject()
        } else {
          resolve(JSON.parse(data)[type])
        }
      })
    })

  },
  routerFn(staticUrl,req,res) {
    let pathName = req.url==='/' ? '/index.html' :url.parse(req.url).pathname
    fs.readFile(staticUrl+pathName,async (err, data) => {
      const router = {
        '/login': () => {
          res.end('登录')
        },
        '/register': () => {
          res.end('注册')
        },
        '/logout': () => {
          res.end('退出登录')
        },
      }
      if (!err) {
        let type = await this.mime(path.extname(pathName))
        res.writeHead(200, {'content-type': `${type};charset="utf-8"`})
        res.end(data)
      } else if (router[pathName]) {
        res.writeHead(200, {'content-type': `text/html;charset="utf-8"`})
        router[pathName]()
      } else {
        res.statusCode = 404
        res.end('不存在该页面')
      }
    })
  },
}
