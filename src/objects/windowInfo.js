import Base from './base'
var base = new Base()
export default {
  hash: /#/.test(window.location.hash) ? window.location.hash.substring(1) : '',
  href: window.location.href,
  params: base.getParamsFromUtlToObj(),
  pathname: window.location.pathname,
  hostname: window.location.hostname,
  port: window.location.port || '',
  protocol: window.location.protocol.split(':')[0],
  screenWidth: window.screen.width,
  screenHeight: window.screen.height
}
