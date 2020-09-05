const http = require('http')
const url = require('url')
const info = require('./second')
http.createServer((req, res) => {

  res.statusCode = 200
  res.setHeader('content-type', 'text-plain')
  const reqUrl = req.url
  const userInfo = url.parse(reqUrl,true).query
  if (req.url !== '/favicon.ico') {
    console.log(info);
  }
  res.end('ha887h')
}).listen(8888)
