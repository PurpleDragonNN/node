// 处理接口请求

let http = require('http')
let querystring = require('querystring')
let path = require('path')
let url = require('url')
let postApi = require(`./officialWebsiteAPI/post`)
let getApi = require(`./officialWebsiteAPI/get`)

http.createServer((req,res) => {
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers','Content-Type')
  // 跨域允许的请求方式
  res.setHeader('Content-Type','application/json')
  let reqName = path.parse(req.url).name.split('?')[0]

  const methodEvent = {
    'OPTIONS': () => {
      console.log('OPTIONS')
      res.statusCode = 200
      res.end()
    },
    'GET': async () => {
      let reqParams = url.parse(req.url).query ? querystring.parse(url.parse(req.url).query) : null
      let response = await getApi[reqName](reqParams)
      res.write(JSON.stringify(response))
      res.statusCode = 200
      res.end()
    },
    'POST': async () => {
      console.log('POST')

      console.log(req.url)

      let reqData = ''
      await req.on('data',chunk => {
        reqData += chunk
      })
      let reqDataObj = querystring.parse(reqData)

      let response = await postApi[reqName](reqDataObj)

      console.log(JSON.stringify(response))
      res.write(JSON.stringify(response))
      res.statusCode = 200
      res.end()
    },
  }
  methodEvent[req.method]()

}).listen(8000)
