<template>
  <div class="parent">
    <h2>我是 父组件 我传递了三个参数给子组件了</h2>
    <h3>参数是{
      name:'张三',
      age:'18',
      city:'石家庄'
      }</h3>
    <div class="children">
      <my-children :name="name" :age="age" :city="city" 
                   @grandsonF1="getGrandsonF1" @grandsonF2="getGrandsonF2" @childrenF="getChildrenF">
      </my-children>
    </div>
  </div>
  
</template>

<script>
import myChildren from './children.vue'

export default {
  components: {
    myChildren
  },
  data(){
    return{
      name: '张三',
      age: '18',
      city: '石家庄'
    }
  },
  created(){},
  methods: {
    getGrandsonF1(){
      console.log('我是父组件，我接受到了孙子组件中上弹的方法 grandsonF1')
    },
    getGrandsonF2(){
      console.log('我是父组件，我接受到了孙子组件中上弹的方法 grandsonF2')
    },
    getChildrenF(){
      console.log('我是父组件，我接受到了孩子组件中上弹的方法 childrenF')
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