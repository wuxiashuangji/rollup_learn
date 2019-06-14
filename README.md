### resources文件夹主要放置rollup基本配置

### example放置案例

### 使用

#### 打包运行注意:

- 1 配置打包目录

```bash

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

```bash

//  开始打包dev环境文件
npm run dev

```
- 3 发布时,依次运行

```bash

// 打包压缩混淆文件
npm run build

```
