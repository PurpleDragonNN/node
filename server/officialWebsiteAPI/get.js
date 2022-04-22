const query = require('../../mysql/db.js')

// 当前用户信息
let userData = {
  id: 1,
  username: 'postman',
  password: '123456',
  time: '2022-04-22 11:15:25'
}

const successResponse = (res) => {
  return {
    code: 0,
    msg: 'success',
    data: res
  }
}
const failResponse = (code,msg) => {
  return {
    code,
    msg,
  }
}
module.exports = {
  getMessage: (data) => {
    console.log({data})
    let sql = 'select * from message'+ (data?` where user_id=${data.user_id}` : '')
    console.log(sql)
    return query(
      sql
    ).then(res => {
      return successResponse(res)
    })
  }
}
