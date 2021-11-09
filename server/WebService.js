let http = require('http')
let fs = require('fs')
let path = require('path')
http.createServer((req, res) => {
    let pathName = req.url === '/' ? '/index.html' : req.url
    let extName = path.extname(pathName)
    console.log({pathName});
    let url = new URL(req.url, 'http://localhost:3000')

    if (pathName === '/json.action') {
        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader('Access-Control-Allow-headers','Content-Type')
        res.setHeader('Content-Type','application/json')
        if (req.method === 'GET') {
            let data = fs.readFileSync('../assets/js/电白区440904.json')
            console.log(JSON.parse(data))
            let ext = getExtName(extName)
            res.writeHead(200, {
                'Content-Type': ext + '; charset="utf-8"'
            })
            res.write(JSON.stringify(JSON.parse(data)))
        }
        res.end()
    } else {
        fs.readFile(path.join(__dirname,'..'+pathName), async (err,data) => {
            if (err) {
                fs.readFile(`../view/404.html`,(errFound,notFoundData) => {
                    if (errFound) {
                        console.log(errFound);
                    } else {
                        res.write(notFoundData)
                        res.end()
                    }
                })
            } else {
                let ext = await getExtName(extName)
                res.writeHead(200, {
                    'Content-Type': ext + '; charset="utf-8"'
                })
                res.write(data)
                res.end()
            }
        })
    }


}).listen(3333)

function getExtName (extName) {
    let json =  fs.readFileSync('../common/mime.json')
    let jsonData = JSON.parse(json)
    return jsonData[extName]

}
