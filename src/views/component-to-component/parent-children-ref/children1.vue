<template>
  <div>
    <h3>我是子组件1我是 第二层</h3>
    <div style="padding:20px;">
      <my-grandson></my-grandson>
    </div>
    
  </div>
</template>

<script>
import myGrandson from './grandson'
export default {
  components: {myGrandson},
  data(){
    return{
      message: '我是子组件中定义的message'
    }
  },
  created(){
    //以获取到 ✔
    console.log(this.$parent, '父组件') 
  },
  beforeMount(){
    //以获取到 ✔
    console.log(this.$parent, '父组件')
  },
  mounted(){
    //可以获取到 ✔
    console.log(this.$parent, '父组件')
  },
  methods: {
    sayHello(){
      alert('我是子组件中定义的方法：sayHello')
    }
  }
}
</script>

<style>

</style>