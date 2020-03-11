import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/assets/css/reset.less'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  'size': 'mini',
  'zIndex': 3000
})
// svg引入
import Icon from 'vue2-svg-icon/Icon'
Vue.component('icon',Icon)
Vue.config.productionTip = false
// console.log(process.env)
import myAxios from '@/apis/httpBase.js'
Vue.prototype.$axios = myAxios
import './components/index.js'
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import eventBus from '@/utils/event-bus.js'
Vue.prototype.$eventBus = eventBus

import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
new Vue({
  router,
  store,
  'render': h => h(App),
  //添加到这里,这里的render-event和vue.config.js里面的renderAfterDocumentEvent配置名称一致
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
