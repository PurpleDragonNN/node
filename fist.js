const http = require('http')
const url = require('url')
http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('content-type', 'text-plain')
  const reqUrl = req.url
  const userInfo = url.parse(reqUrl,true).query
  res.end(userInfo.age)
}).listen(8888)
