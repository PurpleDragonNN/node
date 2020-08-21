const http = require('http')
http.createServer((req,res) => {
  res.statusCode = 200
  res.setHeader('content-type', 'text/plain')
  res.write('hi,node')
  res.end()
}).listen(8888)
