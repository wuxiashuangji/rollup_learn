import Base from './base'
import isDebuggerMode from './debugMode'

class Util extends Base {
  constructor(params) {
    super()
  }

  /**
   * 设置百度统计
   * @param options
   * @returns {boolean}
   */
  setBaiduTongJi(options) {
    if (!options || typeof options !== 'object') {
      console.log('传入的参数不对!')
      return true
    }
    const prodKey = options.prodKey ? options.prodKey : null
    const testKey = options.testKey ? options.testKey : null
    const prodHost = options.prodHost ? options.prodHost : null
    const testHost = options.testHost ? options.testHost : null

    const host = window.location.host
    if (isDebuggerMode()) {
      return true
    } else if (prodHost === host) {
      tongjiHandler(prodKey)
    } else if (testHost === host) {
      tongjiHandler(testKey)
    }

    // 百度统计核心代码
    function tongjiHandler(key) {
      ;(function() {
        if (window.bdTongjiIsOpen === true) {
          return true
        }
        const hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?' + key
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
        window.baiduTjIsOpen = true
      })()
    }
  }

  /**
   * 是否开启 zhuguIO
   * @param options { open: 是否打开, testAppKey: 测试环境key, prodAppKey:生产环境的key }
   */
  setZhuGuIO(options) {
    if (!options || typeof options !== 'object') {
      console.log('传入的参数不对!')
      return true
    }
    ;(function() {
      if (window.zhuge || !options.open) {
        return false
      }
      const prodKey = options.prodKey
        ? options.prodKey
        : '7642b7df2f8d48c4889ffa732598298c'
      const testKey = options.testKey
        ? options.testKey
        : '8061be4f07f241c2873993cb66719856'
      const host = window.location.host

      window.zhuge = window.zhuge || []
      window.zhuge.methods = '_init debug identify track trackLink trackForm page'.split(
        ' '
      )
      window.zhuge.factory = function(b) {
        return function() {
          const a = Array.prototype.slice.call(arguments)
          a.unshift(b)
          window.zhuge.push(a)
          return window.zhuge
        }
      }
      for (let i = 0; i < window.zhuge.methods.length; i++) {
        const key = window.zhuge.methods[i]
        window.zhuge[key] = window.zhuge.factory(key)
      }
      window.zhuge.load = function(b, x) {
        if (!document.getElementById('zhuge-js')) {
          const a = document.createElement('script')
          const verDate = new Date()
          const verStr =
            verDate.getFullYear().toString() +
            verDate.getMonth().toString() +
            verDate.getDate().toString()
          a.type = 'text/javascript'
          a.id = 'zhuge-js'
          a.async = !0
          a.src =
            (location.protocol === 'http:'
              ? 'http://sdk.zhugeio.com/zhuge.min.js?v='
              : 'https://zgsdk.zhugeio.com/zhuge.min.js?v=') + verStr
          a.onerror = function() {
            window.zhuge.identify = window.zhuge.track = function(
              ename,
              props,
              callback
            ) {
              if (
                callback &&
                Object.prototype.toString.call(callback) === '[object Function]'
              ) {
                callback()
              }
            }
          }
          const c = document.getElementsByTagName('script')[0]
          c.parentNode.insertBefore(a, c)
          window.zhuge._init(b, x)
        }
      }
      if (window.sysConfig && host === window.sysConfig.prodHost) {
        window.zhuge.load(prodKey, {})
      } else {
        window.zhuge.load(testKey, {
          debug: !!isDebuggerMode()
        })
      }
    })()
  }

  /**
   * 如果url里有debug=1则开启调试模式,引入vconsole便于调试,定位问题
   * @param options {debugTime: 调试时间  }
   * @debugIsOpen 全局调试器状态
   */
  openDebugger(options) {
    if (options.open === false) {
      return false
    }
    window.debugTime = options.debugTime ? options.debugTime : 1000
    if (window.VCONSOLE) {
      return false
    }
    const bp = document.createElement('script')
    if (isDebuggerMode()) {
      bp.src = '//cdnjs.cloudflare.com/ajax/libs/vConsole/3.2.0/vconsole.min.js'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(bp, s)
      bp.onload = function(params) {
        /* global VConsole */
        window.VCONSOLE = new VConsole()
        return true
      }
    }
  }
}

const utils = new Util()
export default utils
