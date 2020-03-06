<template>
  <div class="home">
    <HelloWorld :msg="msg"></HelloWorld>
    <el-input v-model="login.loginName" placeholder="请输入内容"></el-input>
    
    <div>
      <h2 class="text-center">about.vue</h2>
      <About></About>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import About from './About.vue'

export default {
  'name': 'home',
  'components': {
    HelloWorld,
    About
  },
  data() {
    return {
      'login': {
        'loginName': '1'
      },
      'msg': process.env.VUE_APP_MSG,
      'test': 'tesafasdft'
    }
  }
}
</script>
