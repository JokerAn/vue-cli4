import Vue from 'vue'
import VueRouter from 'vue-router'
import AnTest from '@/router/modules/anTest'
import Layout from '@/views/layout'
import Home from '../views/Home.vue'
import Login from '../views/login'
import ComponentToComponent from '../views/component-to-component'
const originalPush = VueRouter.prototype.push
// 解决this.$router.push()跳转当前页面

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    'path': '/',
    'name': 'index',
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
      'path': 'component-to-component',
      'name': 'ComponentToComponent',
      'redirect':'/component-to-component/props-emit',
      //如果有子路由副路由就不能懒加载
      // component:import(/* webpackChunkName: "ComponentToComponent" */ '@views/component-to-component'),
      component:ComponentToComponent,
      children:[
        {
          path: 'props-emit',
          name: 'PropsEmit',
          component:()=> import(/* webpackChunkName: "PropsEmit" */ '@views/component-to-component/props-emit')
        },
        {
          path: 'emit-on',
          name: 'EmitOn',
          component:()=> import(/* webpackChunkName: "EmitOn" */ '@views/component-to-component/emit-on')
        },
        {
          path: 'attrs-listeners',
          name: 'AttrsListeners',
          component:()=> import(/* webpackChunkName: "EmitOn" */ '@views/component-to-component/attrs-listeners')
        },
        {
          path: 'parent-children-ref',
          name: 'ParentChildrenRef',
          component:()=> import(/* webpackChunkName: "EmitOn" */ '@views/component-to-component/parent-children-ref')
        },
        {
          path: 'provide-inject',
          name: 'ProvideInject',
          component:()=> import(/* webpackChunkName: "EmitOn" */ '@views/component-to-component/provide-inject')
        }
        
      ]
    },
    {
      'path': 'js-public',
      'name': 'JsPublic',
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
  next()
  // next({
  //   'path': `/login?redirect=${to.path}`
  // })
 
})

router.afterEach(() => {
  window.scrollTo(0, 0)
  // finish progress bar
})
export default router
