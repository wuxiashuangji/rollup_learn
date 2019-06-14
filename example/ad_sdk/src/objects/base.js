class Base {
  /**
   * [公共方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  noop() {
    return null
  }

  hasOwn(obj, type) {
    return Object.prototype.hasOwnProperty.call(obj, type)
  }

  /**
   * [isXXX 基础方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  isUndefined(item) {
    return typeof item === 'undefined'
  }

  isDefined(item) {
    return !this.isUndefined(item)
  }

  isString(item) {
    return typeof item === 'string'
  }

  isNumber(item) {
    return typeof item === 'number'
  }

  isArray(item) {
    return Object.prototype.toString.apply(item) === '[object Array]'
  }

  isObject(item) {
    return typeof item === 'object' && !this.isArray(item)
  }

  isFunction(item) {
    return typeof item === 'function'
  }

  /**
   * [getXXX 增强方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  getString(item, defaultStr) {
    if (this.isString(item)) return item.trim()
    if (this.isNumber(item)) return `${item}`.trim()
    return defaultStr || ''
  }

  getNumber(item, defaultNum) {
    const matches = this.getString(item).match(/\d+/)
    return this.isNumber(matches && +matches[0]) ? +matches[0] : defaultNum
  }

  getArray(item, defaultArr) {
    return this.isArray(item) ? item : defaultArr || []
  }

  getObject(item, defaultObj) {
    return this.isObject(item) ? item : defaultObj || {}
  }

  getFunction(item) {
    return this.isFunction(item) ? item : null
  }

  /**
   * [JSON方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  $json(item) {
    let str = {
      type: Object.prototype.toString.call(item)
    }
    try {
      str = JSON.stringify(item)
    } catch (e) {
      str.error = e && (e.stack || '')
    }
    return this.isString(str) ? str : this.$json(str)
  }

  $parse(item) {
    let obj = {
      type: Object.prototype.toString.call(item)
    }
    try {
      obj = JSON.parse(item)
    } catch (e) {
      obj.error = e && (e.stack || '')
    }
    return this.isObject(obj) ? obj : this.$parse(obj)
  }

  /**
   * [功能方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  isPhone(str) {
    if (!str || typeof str != 'string') {
      return false
    } else {
      return /^1(3|4|5|7|8)\d{9}$/.test(str)
    }
  }

  /**
   * 是否是纯对象
   * @param obj
   * @returns {boolean}
   */
  isPlainObject(obj) {
    // 是否是纯对象
    let proto = {}

    let Ctor = {}
    // (1) null 肯定不是 Plain Object
    // (2) 使用 Object.property.toString 排除部分宿主对象，比如 window、navigator、global
    if (!obj || {}.toString.call(obj) !== '[object Object]') {
      return false
    }
    proto = Object.getPrototypeOf(obj)
    // 只有从用 {} 字面量和 new Object 构造的对象，它的原型链才是 null
    if (!proto) {
      return true
    }
    // (1) 如果 constructor 是对象的一个自有属性，则 Ctor 为 true，函数最后返回 false
    // (2) Function.prototype.toString 无法自定义，以此来判断是同一个内置函数
    Ctor = {}.hasOwnProperty.call(proto, 'constructor') && proto.constructor
    return (
      typeof Ctor === 'function' &&
      Function.prototype.toString.call(Ctor) ===
        Function.prototype.toString.call(Object)
    )
  }

  /**
   * 深度克隆
   * @param obj
   * @returns {*}
   */
  deepClone(obj) {
    if (typeof obj !== 'object' && typeof obj !== 'function') {
      return obj // 原始类型直接返回
    }
    const o = this.isArray(obj) ? [] : {}
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === 'object' ? this.deepClone(obj[i]) : obj[i]
      }
    }
    return o
  }

  /**
   * 合并对象
   * @param obj
   * @returns {Object|{}|extend|any}
   */
  extend(obj) {
    let src
    let copyIsArray
    let copy
    let name
    let options
    let clone
    let target = arguments[0] || {}
    // 常见用法 jQuery.extend( obj1, obj2 )，此时，target为arguments[0]

    let i = 1
    const length = arguments.length
    let deep = false

    if (typeof target === 'boolean') {
      // 如果第一个参数为true，即 jQuery.extend( true, obj1, obj2 ); 的情况
      deep = target // 此时target是true
      target = arguments[1] || {} // target改为 obj1
      i = 2
    }

    if (typeof target !== 'object' && !this.isFunction(target)) {
      // 处理奇怪的情况，比如 jQuery.extend( 'hello' , {nick: 'casper})~~
      target = {}
    }

    if (length === i) {
      // 处理这种情况 jQuery.extend(obj)，或 jQuery.fn.extend( obj )
      target = this // jQuery.extend时，this指的是jQuery；jQuery.fn.extend时，this指的是jQuery.fn
      --i
    }

    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        // 比如 jQuery.extend( obj1, obj2, obj3, ojb4 )，options则为 obj2、obj3...
        for (name in options) {
          src = target[name]
          copy = options[name]

          if (target === copy) {
            // 防止自引用，不赘述
            continue
          }

          // 如果是深拷贝，且被拷贝的属性值本身是个对象
          if (
            deep &&
            copy &&
            (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))
          ) {
            if (copyIsArray) {
              // 被拷贝的属性值是个数组
              copyIsArray = false
              clone = src && this.isArray(src) ? src : []
            } else {
              // 被拷贝的属性值是个plainObject，比如{ nick: 'casper' }
              clone = src && this.isPlainObject(src) ? src : {}
            }

            // Never move original objects, clone them
            target[name] = this.extend(deep, clone, copy) // 递归~
          } else if (copy !== undefined) {
            // 浅拷贝，且属性值不为undefined
            target[name] = copy
          }
        }
      }
    }
    return target
  }

  /**
   * 文本过长用...代替
   * @param str
   * @param wordlength
   * @returns {*}
   */
  wordlimit(str, wordlength) {
    if (!str) {
      return ''
    }
    const nowLength = str.length
    let wordStr = ''
    if (nowLength > wordlength) {
      wordStr = str.substr(0, wordlength) + '...'
    } else {
      wordStr = str
    }
    return wordStr
  }

  /**
   *  rem计算
   * @constructor
   */
  pxToRem() {
    ;(function(doc, win) {
      const docEl = doc.documentElement
      const resizeEvt =
        'orientationchange' in window ? 'orientationchange' : 'resize'
      const recalc = function() {
        let clientWidth = docEl.clientWidth
        if (!clientWidth) return
        if (clientWidth >= 750) {
          clientWidth = 750
          doc.body.style.width = 750 + 'px'
        } else {
          doc.body.style.width = clientWidth + 'px'
        }
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
        docEl.dataset.percent = 100 * (clientWidth / 750)
      }
      recalc()
      doc.documentElement.classList.add('iosx' + win.devicePixelRatio)
      if (!doc.addEventListener) return
      win.addEventListener(resizeEvt, recalc, false)
    })(document, window)
  }

  /**
   *  格式化本地时间
   * @returns {string}
   */
  getNowStr() {
    function fillZero(num) {
      return num > 9 ? String(num) : '0' + String(num)
    }

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hour = now.getHours()
    const min = now.getMinutes()
    const second = now.getSeconds()
    return (
      year +
      '-' +
      fillZero(month) +
      '-' +
      fillZero(day) +
      ' ' +
      fillZero(hour) +
      ':' +
      fillZero(min) +
      ':' +
      fillZero(second)
    )
  }

  // 返回顶部
  backTop(btnId) {
    const btn = document.getElementById(btnId)
    const d = document.documentElement
    const b = document.body
    window.onscroll = set
    btn.style.display = 'none'
    btn.onclick = function() {
      btn.style.display = 'none'
      window.onscroll = null
      this.timer = setInterval(function() {
        d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1)
        b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1)
        if (d.scrollTop + b.scrollTop === 0) {
          clearInterval(btn.timer, (window.onscroll = set))
        }
      }, 10)
    }

    function set() {
      btn.style.display = d.scrollTop + b.scrollTop > 100 ? 'block' : 'none'
    }
  }

  /**
   *  加载style
   * @param url
   */
  loadStyle(url) {
    try {
      document && document.createStyleSheet(url)
    } catch (e) {
      const cssLink = document.createElement('link')
      cssLink.rel = 'stylesheet'
      cssLink.type = 'text/css'
      cssLink.href = url
      const head = document.getElementsByTagName('head')[0]
      head.appendChild(cssLink)
    }
  }

  /**
   * 加载js文件
   * @param url
   * @param callback
   * @constructor
   */
  loadScript(url, callback) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = function() {
      if (!callback) {
        console && console.warn('传入的callback不能为空!')
        return false
      }
      typeof callback === 'function' && callback()
      typeof callback !== 'function' &&
        console &&
        console.warn('传入的callback不是function')
    } // js加载完成执行方法
  }

  /**
   * getTimestamp 生成随机时间戳
   * @returns {string}
   */
  getTimestamp() {
    const a = Math.random
    const b = parseInt
    return (
      Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a())
    )
  }

  /**
   *  获取 url中的参数
   * @param name
   * @returns {*}
   */
  getParamFromUrl(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURI(r[2])
    }
    return null
  }

  /* 将json对象转成地址栏参数 */
  serialize(obj) {
    let ret = []

    function toQueryPair(key, value) {
      if (typeof value === 'undefined') {
        return key
      }
      return key + '=' + encodeURIComponent(value === null ? '' : String(value))
    }

    for (let key in obj) {
      key = encodeURIComponent(key)
      const values = obj[key]
      if (values && values.constructor === Array) {
        // 数组
        const queryValues = []
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i]
          queryValues.push(toQueryPair(key, value))
        }
        ret = ret.concat(queryValues)
      } else {
        // 字符串
        ret.push(toQueryPair(key, values))
      }
    }
    return ret.join('&')
  }

  // 获取原先url
  getDomain() {
    const url = window.location.href
    const index = window.location.href.indexOf('/', 8)
    return url.substring(0, index)
  }

  /* 编辑地址参数 */
  editUrl(url, params) {
    const pRequest = this.getParamsFromUtlToObj(url)
    const tempUrl =
      url.split('?')[0] + '?' + this.serialize(this.extend(pRequest, params))
    return tempUrl || ''
  }

  /* 替换地址栏 */
  editPathUrl(url, params) {
    url = url || window.location.href
    window.history.replaceState(null, document.title, this.editUrl(url, params))
  }

  // 清空浏览器历史记录
  pushHistory() {
    const state = {
      title: 'title',
      url: '#'
    }
    window.history.pushState(state, 'title', '#')
  }

  /**
   * 获取地址了参数
   * @param url 链接
   * @returns {Object}
   */
  getParamsFromUtlToObj(url) {
    url = url || location.href
    const theRequest = {}
    // url中存在问号，也就说有参数。
    if (url.indexOf('?') !== -1) {
      let str = url.split('?')[1]
      let strs = ''
      if (/#/.test(str)) {
        str = str.split('#')[0]
      }
      strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    return theRequest || {}
  }
}

export default Base
