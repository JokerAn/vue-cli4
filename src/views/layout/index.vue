<template>
  <div>
    <header id="header">
      我是header
    </header>
    <aside id="aside">
      <el-menu
      :default-openeds="defaultOpeneds"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
        <el-submenu :index="item.path" v-for="item in routes" :key='item.path'>
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item :index="i.path" v-for="i in item.children" :key='i.path' :route="{patj:i.path}"
            :class="[item.path+'/'+i.path===locationPath?'is-active':'']" >
            <router-link :to='item.path+"/"+i.path'  tag="div">{{i.meta.title}}</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </aside>
    <div id="mainView">
      <router-view id="view"></router-view>
    </div>
    
  </div>
</template>

<script>
import router,{routes} from '@/router'
export default {
  created(){
    
  },
  data(){
    return {
      routes:[],
      defaultOpeneds:[],
      locationPath:''
    }
  },
  watch:{
    $route: {
      handler: function(route) {
        console.log('传递过来的路由参数是',this.$route)
        this.routes=routes
        this.locationPath=this.$route.path
        this.defaultOpeneds=['/'+this.$route.fullPath.split('/')[1]]
        console.log(this.defaultOpeneds,this.locationPath)
      },
      immediate: true //不要写这个 这个会一进页面触发一次 会跟created中的方法重复运行
      //第一次就走created中的方法 就行了
    }
  },
  methods:{
    handleOpen(res){
      console.log('handleOpen',res)
    },
    handleClose(){
      console.log('handleClose')
    }
  }
}
</script>

<style lang="less" scoped>
#header{
  position: fixed;
  top:0;
  left:201px;
  right:0;
  height:60px;
  background:#fff;
  border-bottom:1px solid;
}
#aside{
  width:200px;
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  background:#fff;
  border-right: 1px solid;
}
#mainView{
  padding:61px 0 0 201px;
  background:#ddd;
}
</style>