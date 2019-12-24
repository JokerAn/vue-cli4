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
console.log(process.env)
import myAxios from '@/apis/httpBase.js'
import apiUrls from '@/apis/apiUrls.js'
Vue.prototype.$axios = myAxios
Vue.prototype.$apiUrls = apiUrls
new Vue({
  router,
  store,
  'render': h => h(App)
}).$mount('#app')
