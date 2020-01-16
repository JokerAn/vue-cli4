<template>
  <div>
    <h3>我是孙子组件</h3>
    <p>$parent.$parent.num:{{$parent.$parent.num}}</p>
    <el-button @click="changeNum()">更改顶层的num</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      message:'我是孙子组件中定义的message'
    }
  },
  beforeCreate(){
    //以获取到 ✔
    console.log(this.$parent, '父组件') 
    console.log(this.$parent.$parent, '爷爷组件',this.$parent.$parent.message) 
  },
  beforeMount(){
    //以获取到 ✔
    // console.log(this.$parent, '父组件')
  },
  mounted(){
    //可以获取到 ✔
    // console.log(this.$parent, '父组件')
  },
  methods:{
    sayHello(){
      alert('我是孙子组件中定义的方法：sayHello')
    },
    changeNum(){
      this.$parent.$parent.num++
    }
  }
}
</script>

<style>

</style>