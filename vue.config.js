

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack')





const path = require('path')

module.exports = {
  'publicPath': '/', // 公共路径
  'outputDir': process.env.VUE_APP_OUTPUTDIR, // 不同的环境打不同包名
  'lintOnSave': false, // 关闭eslint

  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录默认：''
  'assetsDir': 'assets',

  //指定生成的 index.html 的输出路径 (相对于 outputDir)默认：'index.html'
  'indexPath': 'index.html',

  //生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存,默认true true==>app.e2713bb0.css false==>app.css
  'filenameHashing': true,

  //是否生成.map文件 .map文件作用：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错
  //默认：true 开发环境设置为false加速开发 发布环境设置为true
  'productionSourceMap': false,

  'devServer': {
    // 配置服务器
    'port': 7788,
    'open': true,
    'https': false,
    'overlay': {
      'warnings': true,
      'errors': true
    }
  },
  'devServer': {
    // 配置服务器
    'port': 7788,
    'open': true,
    'https': false,
    'overlay': {
      'warnings': true,
      'errors': true
    },
    proxy: {
      //配置跨域
      '/cms': {
        target: process.env.VUE_APP_BASE_API,
        changOrigin: true,
        pathRewrite: {
          '^/cms': '/cms'
        }
      }
    }
  },
  // 'configureWebpack': {
  //   // 覆盖webpack默认配置的都在这里
  //   'resolve': {
  //     // 配置解析别名
  //     'alias': {
  //       '@': path.resolve(__dirname, './src'),
  //       '@views': path.resolve(__dirname, './src/views')
  //     }
  //   }
  // },
  configureWebpack: config => {
    // 覆盖webpack默认配置的都在这里
    let finallyObject={
      'resolve': {
        // 配置解析别名
        'alias': {
          '@': path.resolve(__dirname, './src'),
          '@views': path.resolve(__dirname, './src/views')
        }
      }
    }
    //正式环境才需要用prerender-spa-plugin这个插件 ！测试环境不用 
    if (process.env.NODE_ENV === 'production'){
      finallyObject.plugins= [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, process.env.VUE_APP_OUTPUTDIR),
        
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: [
            '/','/home', '/login', '/about','/component-to-component','/component-to-component/props-emit',
            '/component-to-component/emit-on','/component-to-component/parent-children-ref',
            '/component-to-component/provide-inject','/js-public',
          ],
        
        
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        })
      ]
      return finallyObject
    }
    
    return finallyObject
  }
}