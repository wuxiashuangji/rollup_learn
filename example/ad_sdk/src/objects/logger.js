function logger() {
  if (typeof window === 'undefined') {
    return false
  }
  const _fontSize = function(size) {
    return 'font-size:' + (size || 12) + 'px;' + 'font-weight:200;'
  }
  // 打印等级,对应的颜色+字体大小
  const Level = {
    normal: 'color: black;' + _fontSize(12),
    warn: 'color: #D19275;' + _fontSize(12),
    error: 'color: red;' + _fontSize(13),
    success: 'color: green;' + _fontSize(12)
  }
  const tips = {
    normal: '正常',
    warn: '警告',
    error: '错误',
    success: '成功'
  }

  function _log(title, body, type) {
    title = typeof title !== 'undefined' ? title : '标题为空!'
    body = typeof body !== 'undefined' ? body : '打印内容为空!'
    type = type ? (Level[type] ? type : 'normal') : 'normal'

    function isArray(item) {
      return Object.prototype.toString.apply(item) === '[object Array]'
    }
    function isString(item) {
      return typeof item === 'string'
    }

    function isFunction(item) {
      return typeof item === 'function'
    }
    if (window && window.console) {
      if (isString(title) && console && console.group) {
        console.group(
          '%c ' + tips[type] + ': ------------- ' + title + ' -------------',
          Level[type]
        )
      } else {
        console &&
          console.log &&
          console.log(
            '%c ' + tips[type] + ': ------------- ' + title + ' -------------',
            Level[type]
          )
      }
      if (isFunction(body) || isArray(body)) {
        if (console.dir) {
          console.dir(body)
        } else if (console.info) {
          console.info(body)
        } else {
          console.log(body)
        }
      } else {
        if (console.info) {
          console.info(body)
        } else {
          console.log(body)
        }
      }
      console.groupEnd && console.groupEnd()
    }
  }

  function log(title, body) {
    _log(title, body, 'normal')
  }

  function info(title, body) {
    _log(title, body, 'normal')
  }

  function warn(title, body) {
    _log(title, body, 'warn')
  }

  function error(title, body) {
    _log(title, body, 'error')
  }

  function success(title, body) {
    _log(title, body, 'success')
  }

  function fail(title, body) {
    _log(title, body, 'error')
  }

  return {
    log: log,
    info: info,
    error: error,
    warn: warn,
    success: success,
    fail: fail
  }
}

const Logger = logger()

export default Logger
