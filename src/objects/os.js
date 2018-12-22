/* eslint-disable  */
const os = (function() {
  const ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian,
    isWechat = /(MicroMessenger)/i.test(ua),
    isUC = /(UCBrowser)/i.test(ua),
    isIOS = /(iPhone|iPad|iPod|iOS)/i.test(ua),
    isMobile = !isPc,
    isAlipay = /Alipay/i.test(ua),
    isUnionpay = /CloudPay/i.test(ua),
    isHuaWei = /huawei/i.test(ua),
    isOppo = /oppo/i.test(ua),
    isQuark = /quark/i.test(ua),
    isQQ = /qqbrowser/i.test(ua)
  var _systemInfo = 'Unknown',
    ipod = ua.match(/(ipod).*\s([\d_]+)/i),
    ipad = ua.match(/(ipad).*\s([\d_]+)/i),
    iphone = ua.match(/(iphone)\sos\s([\d_]+)/i),
    android = ua.match(/(android)\s([\d\.]+)/i)
  android
    ? (_systemInfo = 'Android:' + android[2])
    : iphone
      ? (_systemInfo = 'iPhone: iOS ' + iphone[2].replace(/_/g, '.'))
      : ipad
        ? (_systemInfo = 'iPad, iOS ' + ipad[2].replace(/_/g, '.'))
        : ipod && (_systemInfo = 'iPod, iOS ' + ipod[2].replace(/_/g, '.'))

  var wechatInfo = '',
    wechat = ua.match(/MicroMessenger\/([\d\.]+)/i)
  wechat && wechat[1] ? (wechatInfo = wechat[1]) : (wechatInfo = null)

  var tempObj = {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc,
    isMobile: isMobile,
    isUC: isUC, // UC浏览器
    isIOS: isIOS,
    isWechat: isWechat, // 微信内置浏览器
    isChrome: isChrome,
    isAlipay: isAlipay, // 支付宝内置浏览器
    isUnionpay: isUnionpay, // 云闪付内置浏览器
    isHuaWei: isHuaWei, // 华为浏览器
    isOppo: isOppo, // OPPO浏览器
    isQuark: isQuark, // 夸克浏览器
    isQQ: isQQ, // qq浏览器
    systemInfo: _systemInfo, // 系统信息
    wechatSystemInfo: wechatInfo //微信系统信息
  }
  return tempObj
})()

export default os
