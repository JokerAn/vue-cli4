import Vue from 'vue'
import VueRouter from 'vue-router'
import AnTest from '@/router/modules/anTest'
import Layout from '@/views/layout'
import Home from '../views/Home.vue'
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    'path': '/',
    'name': 'home',
    'component': Layout,
    'redirect':'/home',
    'children':[{
      'path': '/home',
      'name': 'home',
      'component': Home
    },
    {
      'path': 'about',
      'name': 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      'component': () =>
        import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      'path': 'js-public',
      'name': 'JsPublic',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      'component': () =>
        import(/* webpackChunkName: "about" */ '../views/js-public.vue')
    },
    ...AnTest

    ]

  },{
    'path': '/login',
    'name': 'login',
    'component': Login
  },{
    //跳转路由失败
    'path': '*',
    'redirect': '/home'
  }


]

const router = new VueRouter({
  'mode': 'history',
  'base': process.env.BASE_URL,
  routes
})
// 不拦截登录白名单
const whileList = ['/login', '/login-crm', '/auth', '/404', '/login/log']

router.beforeEach((to, from, next) => {
  // next({
  //   'path': `/login?redirect=${to.path}`
  // })
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
  // finish progress bar
})
export default router
