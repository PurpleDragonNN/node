const http = require('http')

const util = require('../common/util')
http.createServer((req,res) => {
  util.routerFn('./static',req,res)
}).listen(8889)
