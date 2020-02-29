<template>
  <div>
    <el-button @click="gotoPage('/component-to-component/props-emit')">父组件props给子组件传值 子组件通过$emit("xxx","xxxxx数据")</el-button>
    <el-button @click="gotoPage('/component-to-component/emit-on')">emitBus传递参数</el-button>
    <el-button @click="gotoPage('/component-to-component/attrs-listeners')">$attrs-$listeners传递参数</el-button>
    <el-button @click="gotoPage('/component-to-component/parent-children-ref')">$parent-$children-ref传递参数</el-button>
    <el-button @click="gotoPage('/component-to-component/provide-inject')">provide-inject传递参数</el-button>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '大王小丑培训component-to-component页面', // set a title
    meta: [{             // set meta
      name: 'keyWords',
      content: '大王小丑,培训,component-to-component页面'
    },
    {
      name: 'description',
      content: '大王小丑,培训,component-to-component页面'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  methods:{
    gotoPage(res) {
      console.log(res)
      this.$router.push({
        path: res,// path必须以斜杠开头 
        query: {// query是问号传参
          someId: Math.random()
        }
      })
    }
  }
}
</script>

<style>

</style>