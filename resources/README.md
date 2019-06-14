# 广告sdk持续开发

#### 项目介绍

  ```text
    基于公司广告业务抽取单独的广告js-sdk
  ```

#### 功能清单
  objects类
  - [x] 基础类base
  - [x] 操作cookie类cookie
  - [x] 广告订阅发布中心 eventBus
  - [x] 操作localStorage类localStorage
  - [x] 日志打印对象logger
  - [x] 系统信息获取对象os
  - [x] 请求类request,参考资料请移步 <a href="https://github.com/ded/reqwest">reqwest</a>
  - [x] 页面滚动方法 scrollTo
  - [x] 操作sessionstorage对象sessionStorage
  - [x] 将localStorage当做cookie使用的对象 storer
  - [x] 验证校验集合 validate
  - [x] sdk版本打印对象 versioner
  - [x] window信息对象 windowInfo
  - [ ] 监控对象 monitor
  - [ ] 微信工具类 WxUtils

  dom操作类
  - [x] 内置小型jQuery对象 jq
  - [ ] etc

  过滤器集合
  - [x] filters 注入ad,调用ad.Filters
  - [ ] etc
  样式文件
  - [x] mixin 混合
  - [x] transition 集合
  - [ ] etc

  内嵌css的js模块 cssJs
  - [ ] etc

  广告api对象
  - [x] index


#### 打包运行注意:

- 1 配置打包目录

```javascript

  // 修改打包文件输出地址,配置文件在rollup.config.js中, output属性
  {
      file: './../../customer/pages/ad/adSDK/adSdk.js', // 输出目录|文件
      format: 'umd',
      name: 'Demo',
      sourcemap: true,
      globals: {
        jsonp: 'jsonp',
        'jquery': '$' // 告诉rollup 全局变量$即是jquery
      }
    },

```

- 2 开发时,依次运行

```javascript

//  开始打包dev环境文件
npm run dev

```
- 3 发布时,依次运行

```javascript

// 打包压缩混淆文件
npm run build

```

#### 注意点:

- 1 js将打包成umd格式的js文件,注入全局window下ad对象
- 2 css/sass/less将打包成一个css文件

### 功能开发点(后期)
  - [ ] 开屏广告
  - [ ] 轮播广告
  - [ ] 浮窗广告
  - [ ] 顶部广告
  - [ ] 广告检测,数据上传等
  - [ ] 按需加载js,html,css等处理

### git 分支管理
* 主分支（master）分支: 存放的应该是随时可供在生产环境中部署的代码,当开发活动告一段落，产生了一份新的可供部署的代码时，master分支上的代码会被更新。同时，每一次更新，最好添加对应的版本号标签（TAG）

* 开发分支（dev）分支: 是保存当前最新开发成果的分支

* 功能（feature）分支: 用于开发新功能时所使用的feature分支
	- 可以从develop分支发起feature分支
	- 代码必须合并回develop分支
	-	feature分支的命名可以使用除master，develop，release-*，hotfix-*之外的任何名称

* 预发布（release）分支: 用于辅助版本发布的release分支
	-	可以从develop分支派生
	-	必须合并回develop分支和master分支
	-	分支命名惯例：release-*

* 修补bug（hotfix）分支: 用于修正生产代码中的缺陷的hotfix分支。
	-	可以从master分支派生
  -	必须合并回master分支和develop分支
  -	分支命名惯例：hotfix-*

## <span style="font-weight:bolder;color:gold;">注意:以上规则请遵循!</span>

### 参考资料:

  链咖广告SDK:  <a href="https://www.lianka.cn/JsSdk/">链咖 JS-SDK 演示</a>

  Facebook :<a href="https://developers.facebook.com/docs/javascript/quickstart">Facebook-SDK资料</a>

## License
MIT

