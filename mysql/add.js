const query = require('./db.js')
query(
  'insert into user(name,age) values(?,?)',
  ['娜',19]
).then(res => {
  console.log(res)
})
