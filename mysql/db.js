let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node_test'
})
let isSuccess = false
module.exports = function query(sql,params) {
  return new Promise((resolve, reject) => {
    if (!isSuccess) {
      connection.connect(err => {
        if(err){
          console.log('数据库链接失败');
          throw err;
        } else {
          isSuccess = true
        }

      })
    }

    connection.query(sql, params, (err,results, fields) => {
      // console.log({fields})
      /*connection.end(function(err){
        if(err){
          console.log('关闭数据库连接失败！');
          throw err;
        }
      });*/
      if (err) {
        console.log('数据操作失败');
        throw err;
      }
      resolve(results)
    })

  })

}
