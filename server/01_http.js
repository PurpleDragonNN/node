const http = require('http')
const url = require('url')
http.createServer((req,res) => {
    if (req.url !== '/favicon.ico') {
        // let result1 = new URL('http://localhost:3000/?userName=jsliang&userAge=23')
        let result1 = new URL(req.url, 'http://localhost:3000')
        let params = result1.searchParams
        console.log({params});
        console.log(params.get('userName'));
        console.log(params.get('userAge'));
    }
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
    })
    res.write('<h1 style="text-align:center">Hello NodeJS3</h1>')

    res.end()
}).listen(4000)
