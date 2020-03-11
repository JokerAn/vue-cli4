<template>
  <div class="bmp">
    <!-- 我是孙子组件-1，{{name}},{{hobby}} -->
    我是孙子组件-parentData:{{ parentData }},theme:{{ theme }},city:{{ city }}
    <el-button @click="useFFF()">调用爷爷组件的方法</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  //接收第一种
  // inject: ["name","hobby"],
  //第二种
  inject: {
    //函数式组件取值不一样
    parentData: {default: () => ({})},
    city: {default: () => ({})},
    pppF: {default: () => ({})},
    theme: {
      default: () => ({})
    }
  },
  created(){},
  methods: {
    useFFF(){
      this.pppF()
    }
  }
   
 
}
</script>

<style lang="less" scoped>
.bmp{
    min-height: 100px;
  }
</style>