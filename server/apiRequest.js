// 处理接口请求

let http = require('http')
let fs = require('fs')
let path = require('path')
let utils = require('../common/utils')

http.createServer((req,res) => {
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers','Content-Type')
  // 跨域允许的请求方式
  res.setHeader('Content-Type','application/json')
  const methodEvent = {
    'OPTIONS': () => {
      console.log('OPTIONS')
      res.statusCode = 200
      res.end()
    },
    'GET': () => {
      res.statusCode = 200
      console.log('GET')
      res.end()
    },
    'POST': async () => {
      console.log('POST')
      let reqData = ''
      await req.on('data',chunk => {
        reqData += chunk
      })
      let reqDataObj = JSON.parse(reqData)
      console.log(reqDataObj.city_code)
      res.statusCode = 200
      res.write(reqData)
      res.end()
    },
  }
  methodEvent[req.method]()

}).listen(8000)
