const fs = require('fs')
module.exports = {
  mime: (type) => {
    return new Promise((resolve, reject) => {
      fs.readFile('./common/mime.json',(err,data) => {
        if (err) {
          console.log('err:',err);
          reject()
        }
        resolve(JSON.parse(data)[type])
      })
    })

  }
}
