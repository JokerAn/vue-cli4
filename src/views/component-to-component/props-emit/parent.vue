<template>
  <div class="parent">
    <h2>父组件中全部数据全部是100以上的 子组件中全是100以内的</h2>
    <p>{{ parentMessage }}</p>
    <div class="children">
      <my-children :pass-data="parentMessage" @change-parent-value="getChildrenValue"></my-children>
    </div>
  </div>
  
</template>

<script>
import myChildren from '@/views/component-to-component/props-emit/children.vue'

export default {
  components: {
    myChildren
  },
  data(){
    return{
      parentMessage: '我是父组件中的message=110'
    }
  },
  created(){},
  methods: {
    getChildrenValue(res){
      this.parentMessage = res
    }
  }
}
</script>

<style lang="less" scoped>
  .children{
    border:1px solid blue;
    min-height: 300px;
    margin:20px;
    padding:20px;
  }
</style>