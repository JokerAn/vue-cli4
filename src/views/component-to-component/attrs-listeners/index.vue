<template>
  <div class="component-box">
    <h1>attrs-listeners</h1>
    <br>
    <div>
      <my-parent></my-parent>
    </div>
  </div>
</template>

<script>
import myParent from './parent.vue'
export default {
  name: 'AttrsListeners',
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