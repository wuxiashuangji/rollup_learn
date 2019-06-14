/**
 * @jssdk js对象,包括appId,timestamp,nonceStr,signature,后台请求过来。
 * 以上4个参数，需要后台在公众号相关平台进行配置，然后得出！前端页面必须放在服务号配置的域名下面才可以保证成功！
 * options js对象为你自定义要分享的一些参数。
 * 用法：
 *      1、引入weixinShare.js
 *      2、var weixinShare = new weixinShare(jssdk, options);
 *      3、默认加载页面时,调用weixinShare.beforeShareJs,这里必须的!
 *      4、如果点击分享朋友,则调用weixinShare.shareFriends
 *      5、如果点击分享朋友圈,则调用weixinShare.shareCircleFriends
 *      备注：通过右上角的分享按钮,则不需要进行点击事件触发。
 */
/* globals wx */
class wxBase {
  constructor() {
    this.list = []
  }
}

class wxShare extends wxBase {
  constructor(jssdk, options) {
    super()
    this.jssdk = jssdk
    this.options = options
  }

  static beforeShareJs() {
    const self = this
    wx.config({
      debug: false, // 是否开启调试功能，这里关闭！
      appId: self.jssdk.appId, // appid
      timestamp: parseInt(self.jssdk.timestamp), // 时间戳
      nonceStr: self.jssdk.nonceStr, // 生成签名的随机字符串
      signature: self.jssdk.signature, // 签名
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    })
  }

  static defaultOptions() {
    const defaults = {
      title: '分享的标题',
      desc: '分享的描述',
      link: location.href, // 分享页面地址,不能为空，这里可以传递参数！！！！！！！
      imgUrl: 'https://tup.iheima.com/sport.png', // 分享是封面图片，不能为空
      success: function() {}, // 分享成功触发
      cancel: function() {} // 分享取消触发，需要时可以调用
    }
    // 合并对象，后面的替代前面的！
    return Object.assign({}, defaults, self.options)
  }

  static shareCircleFriends() {
    const selfopts = self.defaultOptions()
    wx.onMenuShareTimeline({
      title: selfopts.title, // 分享标题
      desc: selfopts.desc, // 分享描述
      link: selfopts.link, // 分享链接
      imgUrl: selfopts.imgUrl, // 分享图标
      success: function() {
        // alert("成功");
      },
      cancel: function() {
        // alert("失败");
      }
    })
  }

  static shareFriends() {
    const selfopts = self.defaultOptions()
    wx.onMenuShareAppMessage({
      title: selfopts.title, // 分享标题
      desc: selfopts.desc, // 分享描述
      link: selfopts.link, // 分享链接
      imgUrl: selfopts.imgUrl, // 分享图标
      success: function() {
        // alert("成功");
      },
      cancel: function() {
        // alert("失败")
      }
    })
  }
}

export default wxShare
