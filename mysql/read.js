const query = require('./db.js')
query('select * from user').then(res => {
  console.log(res)
})
