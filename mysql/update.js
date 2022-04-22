const query = require('./db.js')
query('update user set name=?,age=? where id=11',[
  '龙',20
]).then(res => {
  console.log(res)
})
