/** ******************** storer 将localstorage当做cookie使用  开始 *********************************/
// storer.getInfo('userinfo'); //返回info或null
// storer.isLogined('userinfo',function(info){ if (info) { console.log(info) }else { console.log(false) } }); //若在限定时间内登录了，回调用户信息；若没有登录，回调里做其他操作
// storer.getInfo('userinfo'); //返回info或null
// storer.maxAge(1000*60*60*24).set('userinfo',{ name:'hf', age:'18' });
/**
 * storer 将localstorage当做cookie使用
 */
import LocalStorage from './localStorage'
const storer = {
  age: 0,
  maxAge: function(age) {
    this.age = age
    return this
  },
  set: function(name, json) {
    LocalStorage.remove(name)
    json.__time = new Date().getTime()
    json.__age = this.age
    LocalStorage.set(name, json)
    return this
  },
  getInfo: function(name) {
    const info = LocalStorage.set(name)
    return info ? JSON.parse(info) : null
  },
  isExpired: function(name) {
    /* eslint-disable-next-line */
    let logined = LocalStorage.get(name),
      _time = 0,
      timeLength = 0
    const iTime = new Date().getTime()
    if (logined) {
      logined = JSON.parse(logined)
      _time = logined.__time
      timeLength = iTime - _time
      return timeLength >= logined.__age
    } else {
      return true
    }
  },
  isLogined: function(name, fn) {
    let user = ''
    // var age = this.age
    if (!this.isExpired(name)) {
      user = JSON.parse(LocalStorage.get(name))
    } else {
      LocalStorage.remove(name)
    }
    if (user) {
      typeof fn == 'function' && fn(user)
    } else {
      typeof fn == 'function' && fn()
    }
  }
}
export default storer

/** ******************** storer 将localstorage当做cookie使用  结束 *********************************/
