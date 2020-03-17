# vue-cli4

## 下载项目依赖 （得进入目录）
yarn install

### 启动项目
yarn serve

### 打包编译
yarn build

### 账号密码
测试账号密码：haoyue.ge@ambow.com 111111
---------------------- vue优化编译速度和打包速度 ---------------
原理：
  项目中引入的vue vuex vue-router element-ui axios 还有一些其他插件 这些文件我们是不会进行修改的
  但是每次打包或者编译的时候 webpack都会去检测一遍是否更改了 就会耗时间 
  我们用dell插件 将这些文件打包成一个静态文件 （比如在public文件夹下生成最终打包好的allPublic.js）
  然后去public/index.html 中用script标签去引用 （手动添加 <script src="./allPublic.js"></script>）
  然后去vue.config.js中告诉webpack以后不再检查这些文件的改动了
  编译和打包 就会变的很快 


AddAssetHtmlPlugin 插件（锦上添花 可有可无）
自动在pbulic/index.html生成 <script src="./allPublic.js"></script> 省去人工去pbulic/index.html中写 script标签
在public/index.js中手动添加<script src="./allPublic.js"></script>容易出错（不过一般不会出错！！）
注意：本地开发环境不会显示<script src="./allPublic.js"></script> yarn build:uat 生成的文件dist/index.html中会有 

CleanWebpackPlugin插件 （锦上添花 可有可无）
  清除文件夹中的某些文件 打包前删除原来的dist就是这个 
  这里是为了 在第二次用dell生成静态文件时删除上一次生成的文件 （自己手动删除也行 就是容易忘记）

yarn add webpack-cli add-asset-html-webpack-plugin clean-webpack-plugin --dev

第一步：在项目根目录下新建 webpack.dll.config.js，(名称随便起，最好用这个)
  webpack.dell.config.js内容为：
const path = require('path')
const webpack = require('webpack')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

// dll文件存放的目录 设置将各种静态文件打包后生成的路径
const dllPath = 'public/vendor'

module.exports = {
  entry: {
    // 需要提取的库文件（需要忽略的文件）
    vendor: ['vue', 'vue-router', 'vuex']
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}


第二步：   配置package.json文件
  
  "scripts": {
    //"serve": "vue-cli-service serve",
    //"build:prod": "vue-cli-service build",
    //"build:dev": "vue-cli-service build --mode development",
    //"build:uat": "vue-cli-service build --mode uat",
    //"lint": "vue-cli-service lint",
    "dll": "webpack -p --progress --config ./webpack.dll.config.js"
  },
  运行 yarn run dll 将会在public中生成一个vendor文件夹里面有生成好的静态文件
第三步：为了节约编译的时间，需要告诉 webpack 公共库文件已经编译好了，减少 webpack 对公共库的编译时间 配置vue.config.js内容
  const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  ....一些基础配置
  ....
  ....
  'configureWebpack': {
    // 覆盖webpack默认配置的都在这里
    'resolve': {
      // 配置解析别名
      'alias': {
        '@': path.resolve(__dirname, './src'),
        '@views': path.resolve(__dirname, './src/views')
      }
    },
    plugins: [
      //这里就是这么写！
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      }),
      // 自动在public/index.html中生成script标签
      new AddAssetHtmlPlugin({
      // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor'
      })
    ]
  }
}

