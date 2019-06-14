/**
 * 作用: 生成version打印日志
 * 例如:versioner('leyaoyao.com HTML5 AD-SDK | Version: ', PackageJSON['version'])
 * @param title
 * @param content
 */
function versioner(title, content) {
  title = title || 'leyaoyao.com HTML5 AD-SDK | Version: '
  content = content || ''
  console.log(
    '%c %c %c ' + title + content + ' %c %c %c',
    'background: #9854d8',
    'background: #6c2ca7',
    'color: #fff; background: #450f78;',
    'background: #6c2ca7',
    'background: #9854d8',
    'background: #ffffff'
  )
}
export default versioner
