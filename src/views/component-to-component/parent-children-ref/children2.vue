<template>
  <div>
    <h3>我是子组件-2</h3>

  </div>
</template>

<script>
export default {
  name: 'ParentChildrenRefChildren2',
  data(){
    return{
      message: '我是子组件2中定义的message'
    }
  },
  created(){},
  methods: {
    sayHello(){
      alert('我是子组件2中定义的方法：sayHello')
    }
  }
}
</script>

<style>

</style>