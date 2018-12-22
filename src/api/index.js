import Zepto from './../dom/Zepto'
import Base from ''
const request = Zepto.ajax
class Api extends Base {
  constructor(option) {
    super()
  }
  static loginByUsername(username, password) {
    const data = {
      username,
      password
    }
    return request({
      url: '/login/login',
      method: 'post',
      data
    })
  }

  static logout() {
    return request({
      url: '/login/logout',
      method: 'post'
    })
  }

  static getUserInfo(token) {
    return request({
      url: '/user/info',
      method: 'get',
      params: { token }
    })
  }
}

export default Api
