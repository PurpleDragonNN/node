const query = require('./db.js')
query('delete from user where id = 10').then(res => {
  console.log(res)
})
