import Layout from '@/views/layout'
import PersonCenter from '@views/system-setting/person-center'
export default [
  {
    path: '/system-setting',
    redirect: '/system-setting/person-center',
    component: Layout,
    meta: {
      title: '系统设置',
      icon: 'el-icon-s-tools'
    },
    children: [
      {
        path: 'person-center',
        component: PersonCenter,
        meta: {
          title: '个人中心'
        }
      },
      {
        path: 'safe-setting',
        component: ()=> import(/* webpackChunkName: "safeSetting" */ '@views/system-setting/safe-setting'),
        meta: {
          title: '安全设置'
        }
      },
      {
        path: 'role-setting',
        component: ()=> import(/* webpackChunkName: "roleSetting" */ '@views/system-setting/role-setting'),
        meta: {
          title: '权限设置'
        }
      }
    ]
  }
]