import { routes } from '@/router'

export default {
  name: 'MyRender',
  data() {
    return {
      routes: routes,
      defaultOpeneds: [],
      locationPath: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log('传递过来的路由参数是', this.$route)
        this.routes = routes
        this.locationPath = this.$route.path
        this.defaultOpeneds = ['/' + this.$route.fullPath.split('/')[1]]
        console.log(this.defaultOpeneds, this.locationPath)
      },
      immediate: true
    }
  },
  methods: {
    handleOpen(res) {
      console.log({'handleOpen': res})
    },
    handleClose(res) {
      console.log({'handleClose': res})
    }
  },
  render(h){
    console.log(this.routes)
    return <el-menu default-openeds={this.defaultOpeneds} onOpen={this.handleOpen} onClose={this.handleClose}>
      {
        this.routes.map(item =>{
          if(item.children){
            return <el-submenu index={item.path}>
              <template slot="title">
                <i class="item.meta.icon"></i>
                <span>{ item.meta.title }</span>
              </template>
              {
                item.children.map(i=>{
                  return <el-menu-item index={i.path} class={[
                    item.path + '/' + i.path === this.locationPath ? 'is-active' : ''
                  ]}>
                    <router-link to={item.path + '/' + i.path} tag="div">{
                      i.meta.title
                    }</router-link>
                  </el-menu-item>
                })
              }
            </el-submenu>
            
          }
          return <el-submenu index={item.path}>
            <i class="item.meta.icon"></i>
            <span>{ item.meta.title }</span>
          </el-submenu>
        })
      }
    </el-menu>
  }

}