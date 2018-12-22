/**
 * cookie 操作集合
 * @type {{get: getCookie, set: setCookie, setSecondsCookie: setSecondsCookie,remove:removeCookie; clear: clearCookie}}
 */

const COOKIE = {
  /**
   * 读取cookie
   * @param name
   * @returns {*}
   */
  get: function(name) {
    if (document.cookie.length > 0) {
      let start = document.cookie.indexOf(name + '=')
      if (start !== -1) {
        start = start + name.length + 1
        let end = document.cookie.indexOf(';', start)
        if (end === -1) {
          end = document.cookie.length
        }
        return unescape(document.cookie.substring(start, end))
      }
    }
    return ''
  },

  /**
   * 设置cookie
   * @param name
   * @param value
   * @param expiredays
   */
  set: function(name, value, expiredays) {
    const expDate = new Date()
    expDate.setDate(expDate.getDate() + expiredays)
    document.cookie =
      name +
      '=' +
      escape(value) +
      (expiredays == null ? '' : ';expires=' + expDate.toGMTString()) +
      ';path=/'
  },

  /**
   *  设置cookie
   * @param name
   * @param value
   * @param seconds
   */
  setSecondsCookie: function(name, value, seconds) {
    const expDate = new Date()
    expDate.setTime(expDate.getTime() + seconds * 1000)
    document.cookie =
      name +
      '=' +
      escape(value) +
      (seconds == null ? '' : ';expires=' + expDate.toGMTString()) +
      ';path=/'
  },

  /**
   *  清空cookie
   * @param name
   */
  clear: function(name) {
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    /* eslint-disable-next-line */
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie =
          keys[i] + '=0; expire=' + date.toGMTString() + '; path=/'
      }
    }
  },
  /**
   *  删除cookie
   * @param name
   */
  remove: function(name) {
    if (typeof name != 'undefined') {
      this.set(name, '', -1)
    } else {
      return false
    }
  }
}

export default COOKIE
