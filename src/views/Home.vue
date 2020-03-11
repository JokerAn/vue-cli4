<template>
  <div class="home">
    <HelloWorld :msg="msg"></HelloWorld>
    <el-input v-model="login.loginName" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  'name': 'home',
  metaInfo: {
    title: '大王小丑培训home页面', // set a title
    meta: [{ // set meta
      name: 'keyWords',
      content: '大王小丑,培训,home页面'
    },
    {
      name: 'description',
      content: '大王小丑,培训,home页面'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  'components': {
    HelloWorld
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
