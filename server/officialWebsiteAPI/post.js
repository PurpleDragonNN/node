const query = require('../../mysql/db.js')
const dayjs = require('dayjs')

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
  register: async function (data) {
    let checkInfo = await this.login(data)
    if (checkInfo.code === 401) {
      return query(
        'INSERT INTO user(user_name,user_password,time) values(?,?,?)',
        [data.username,data.password,dayjs().format("YYYY-MM-DD HH:mm:ss")]
      ).then(res => {
        return successResponse()
      })
    } else {
      return failResponse(401,'该用户名已被注册')
    }
  },
  login: function (data){
    return query(
      'select * from user where user_name=?',
      [data.username]
    ).then(res => {
      if (!res.length) {
        return failResponse(401,'该用户名不存在')
      } else {
        if (res[0].user_password === data.password) {
          userData = res[0]
          return successResponse({
            userName: userData.user_name,
            id: userData.id,
          })
        }
        return failResponse(402,'用户名或密码错误')
      }
    })
  },
  sendMessage: function (data){
    return query(
      'insert into message(user_message,user_name,user_id,time) values(?,?,?,?)',
      [data.message,userData.user_name,userData.id,dayjs().format("YYYY-MM-DD HH:mm:ss")]
    ).then(res => {
      if (res) {
        return successResponse()
      }
    })
  }
}
