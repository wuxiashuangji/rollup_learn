/**
 * localStorage 操作集合
 * @type {{setlocalStorage: setlocalStorage, getlocalStorage: (function(*=): any)}}
 */
let LocalStorage = {
  // 写入本地存储localStorage
  set: function(name, value) {
    if (typeof name !== 'undefined' && typeof value !== 'undefined') {
      try {
        let _value = JSON.stringify(value)
        window.localStorage.setItem(name, _value)
        return _value
      } catch (error) {
        console.log('浏览器不支持localStorage!', error)
      }
    } else {
      console.log('param:error,need: 2 param')
      return false
    }
  },
  // 读取本地存储localStorage
  get: function(name) {
    if (typeof name !== 'undefined') {
      try {
        let _value = JSON.parse(window.localStorage.getItem(name))
        return _value
      } catch (error) {
        console.log('浏览器不支持localStorage!', error)
      }
    } else {
      return false
    }
  },
  remove: function(name) {
    if (typeof name != 'undefined') {
      try {
        let _value = JSON.parse(window.localStorage.removeItem(name))
        return _value
      } catch (error) {
        console.log('浏览器不支持localStorage!', error)
      }
    } else {
      return false
    }
  },
  clear: function() {
    try {
      window.localStorage.clear()
    } catch (error) {
      console.log('浏览器不支持localStorage!', error)
    }
  }
}
export default LocalStorage
