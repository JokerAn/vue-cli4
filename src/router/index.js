import Vue from 'vue'
import VueRouter from 'vue-router'
import infoRelease from '@/router/modules/info-release'
import systemSetting from '@/router/modules/system-setting'
import Login from '../views/login'
import Icons from '../views/icons'
import Render from '../views/render'
import Test from '../views/an-test/Home'
const originalPush = VueRouter.prototype.push
// 解决this.$router.push()跳转当前页面

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

export const routes = [
  ...infoRelease,
  ...systemSetting
]
//最终路由
export let fullRoutes = [
  ...routes,
  {
    'path': '/test',
    'name': 'test',
    'component': Test,
    meta: {
      info: '这是基本页面，测试页面'
    }
  },{
    'path': '/login',
    'name': 'login',
    'component': Login
  },{
    'path': '/icons',
    'name': 'icons',
    'component': Icons,
    meta: {
      info: '这是svg文件夹下的图标文件'
    }
  },{
    'path': '/render',
    'name': 'render',
    'component': Render,
    meta: {
      info: '这是svg文件夹下的图标文件'
    }
  },{
    //跳转路由失败 信息发布-文章管理
    'path': '*',
    'redirect': '/info-release'
  }
]
const router = new VueRouter({
  'mode': 'hash',
  'base': process.env.BASE_URL,
  routes: fullRoutes
})
// 不拦截登录白名单
const whileList = ['/login']

router.beforeEach((to, from, next) => {
  next()
  // next({
  //   'path': `/login?redirect=${to.path}`
  // })
 
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})
export default router
