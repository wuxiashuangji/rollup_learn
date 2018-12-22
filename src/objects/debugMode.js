/**
 * 是否是debugger模式
 * @returns {boolean}
 */
/** 系统设置 开始 **/
!window.sysConfig &&
  (window.sysConfig = {
    debuggerHost: ['dm.leyaoyao.com'],
    prodHost: ['m.leyaoyao.com'],
    testHost: ['sm.leyaoyao.com']
  })
let baseHost = ['localhost', '192.168', '127.0.0.1']
function isDebuggerMode(options) {
  const url = window.location.href
  const host = window.location.host

  if (window.sysConfig && window.sysConfig.debuggerHost) {
    // 需要设置debuggerHost 名单

    baseHost = isArray(window.sysConfig.debuggerHost)
      ? baseHost.concat(window.sysConfig.debuggerHost)
      : baseHost
  }

  function isArray(item) {
    return Object.prototype.toString.apply(item) === '[object Array]'
  }

  function isString(item) {
    return typeof item === 'string'
  }

  const openDebuggerHost =
    options && isArray(options.openDebuggerHost)
      ? options.openDebuggerHost.contact(baseHost)
      : baseHost
  const checkIsHost = function(arr, val) {
    let tempFlag = false
    if (arr && isArray(arr) && val && isString(val)) {
      for (let i = 0; i < arr.length; i++) {
        if (val.search(arr[i]) > -1) {
          return (tempFlag = true)
        }
      }
      return tempFlag
    } else {
      return tempFlag
    }
  }
  if (checkIsHost(openDebuggerHost, host) || url.search('debug=1') > -1) {
    window.debugMode = true
    return true
  } else {
    window.debugMode = false
    return false
  }
}
export default isDebuggerMode
