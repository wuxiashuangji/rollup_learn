/**
 * sessionStorage 操作集合
 * @type {{setSessionStorage: setSessionStorage, getSessionStorage: (function(*=): any)}}
 */
let SESSION = {
  // 写入本地存储sessionStorage
  set: function(name, value) {
    if (typeof name !== 'undefined' && typeof value !== 'undefined') {
      try {
        let _value = JSON.stringify(value)
        window.sessionStorage.setItem(name, _value)
        return _value
      } catch (error) {
        console.log('浏览器不支持sessionStorage!', error)
      }
    } else {
      console.log('param:error,need: 2 param')
      return false
    }
  },
  // 读取本地存储sessionStorage
  get: function(name) {
    if (typeof name !== 'undefined') {
      try {
        let _value = JSON.parse(window.sessionStorage.getItem(name))
        return _value
      } catch (error) {
        console.log('浏览器不支持sessionStorage!', error)
      }
    } else {
      return false
    }
  },
  remove: function(name) {
    if (typeof name != 'undefined') {
      try {
        let _value = JSON.parse(window.sessionStorage.removeItem(name))
        return _value
      } catch (error) {
        console.log('浏览器不支持sessionStorage!', error)
      }
    } else {
      return false
    }
  },
  clear: function() {
    try {
      window.sessionStorage.clear()
    } catch (error) {
      console.log('浏览器不支持sessionStorage!', error)
    }
  }
}
export default SESSION
