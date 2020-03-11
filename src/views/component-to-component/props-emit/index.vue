<template>
  <div class="component-box">
    <h1>父组件props给子组件传值 子组件通过$emit("xxx","xxxxx数据")</h1>
    <br>
    <div>
      <my-parent></my-parent>
    </div>
  </div>
</template>

<script>
import myParent from '@/views/component-to-component/props-emit/parent.vue'
export default {
  name: 'PropsEmit',
  components: {
    myParent
  },
  data(){
    return{}
  },
  created(){},
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .component-box{
    border:1px solid blue;
    min-height: 500px;
    margin:20px;
    padding:20px;
  }
</style>