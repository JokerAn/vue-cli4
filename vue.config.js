
//引入prerender-spa-plugin插件开始 yarn add prerender-spa-plugin
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const webpack = require('webpack')
//引入prerender-spa-plugin插件结束

const path = require('path')

module.exports = {
  'publicPath': '/', // 公共路径
  'outputDir': process.env.VUE_APP_OUTPUTDIR, // 不同的环境打不同包名
  'lintOnSave': false, // 关闭eslint

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录默认：''
  'assetsDir': 'assets',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)默认：'index.html'
  'indexPath': 'index.html',

  //生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存,默认true true==>app.e2713bb0.css false==>app.css
  'filenameHashing': true,

  // 是否生成.map文件 .map文件作用：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错
  // 默认：true 开发环境设置为false加速开发 发布环境设置为true
  'productionSourceMap': false,

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
  configureWebpack: config => {
    // 覆盖webpack默认配置的都在这里
    let finallyObject = {
      'resolve': {
        // 配置解析别名
        'alias': {
          '@': path.resolve(__dirname, './src'),
          '@views': path.resolve(__dirname, './src/views')
        }
      },
      externals: {
        AMap: 'AMap'
      }
    }
    
    //引入prerender-spa-plugin插件开始
    //正式环境才需要用prerender-spa-plugin这个插件 ！测试环境不用seo

    if (process.env.NODE_ENV === 'production'){
      finallyObject.plugins = [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, process.env.VUE_APP_OUTPUTDIR),
        
          // 对应自己的路由文件相对哪个进行eso优化写那个，比如a有参数，就需要写成 /a/param1。
          routes: [
            '/','/login','/system-setting/person-center',
            '/icons','/system-setting/safe-setting'
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
    //引入prerender-spa-plugin插件结束
    
    return finallyObject
  }
}
// main.js

// new Vue({
//   router,
//   store,
//   'render': h => h(App),
//   //添加到这里,这里的render-event和vue.config.js里面的renderAfterDocumentEvent配置名称一致
//    mounted () {
//       document.dispatchEvent(new Event('render-event'))
//      }
// }).$mount('#app')

// 引入vue-meta-info yarn add vue-meta-info
// 普通文件 xxx.vue 添加metaInfo
//<script>
// export default {
//   name: 'home',
//   metaInfo: {
//   title: '大王小丑培训home页面', // set a title
//   meta: [{       // set meta
//    name: 'keyWords',
//    content: '大王小丑,培训,home页面'
//   },
//   {
//    name: 'description',
//    content: '大王小丑,培训,home页面'
//   }],
//   link: [{ // set link
//    rel: 'asstes',
//    href: 'https://assets-cdn.github.com/'
//   }]
//  },
//   'components': {
//     HelloWorld
//   },
//   data() {
//     return {
//       'msg': process.env.VUE_APP_MSG,
//     }
//   }
// }
// </script>