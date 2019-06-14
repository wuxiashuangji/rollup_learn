import './styles/index.scss' // global css
import {
  Base,
  os,
  Logger,
  Cookie,
  SessionStorage,
  LocalStorage,
  EventBus,
  Storer,
  versioner,
  windowInfo
} from './objects/index'

import PackageJSON from './../package.json'
import * as filters from './filters' // global filters
import Api from './api/index'
import Zepto from './dom/Zepto'

/** ******************** 测试 功能开始 ****************************** */
var fn = async () => {
  await setTimeout(() => {
    console.log('setTimeout')
    return 'success'
  }, 2000)
}
window.fn = fn // 测试await async功能

/** ********************* 测试 功能结束 ***************************** */
class AD extends Base {
  constructor() {
    super()
    versioner('leyaoyao.com HTML5 AD-SDK | Version: ', PackageJSON['version'])
    this.Filters = filters
    this.Logger = Logger
    this.os = os
    this.windowInfo = windowInfo
    this.Cookie = Cookie
    this.Session = SessionStorage
    this.Storage = LocalStorage
    this.EventBus = EventBus
    this.Storer = Storer
    this.$ = Zepto
    this.Api = Api
    // this.Monitor = Monitor
  }
  static init() {
    const ad = new this()
    return ad
  }
}

window.onload = function() {
  window.Base = new Base()
  if (typeof $ === 'undefined') {
    init()
    // window.Base.loadScript(
    //   '//upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.3.min.js',
    //   function(e) {
    //     console.log('==jq加载完成=')
    //     init()
    //   }
    // )
  } else {
    init()
  }
  // 初始化
  function init() {
    if (window.ad instanceof AD) {
      return false
    } else {
      window.ad = AD.init()
      window.ad.Logger.info('AD对象', window.ad)
    }
  }
}
