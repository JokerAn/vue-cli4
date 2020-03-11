<template>
  <div class="grandson">
    <h3>我是 孙子组件 我拿不到name 已经被 孩子组件 接收了就不会传递到孙子组件中了</h3>
    <h3>想要name就让 孩子组件 传递给 孙子组件</h3>
    <p>city:{{ city }}</p>
    <p>age:{{ age }}</p>
    <p>name:{{ name }}</p>
    <button @click="test01">我要发射火箭1</button>
    <button @click="test02">我要发射火箭2</button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    city: {
      type: [String],
      default: '我还没拿到父组件的数据，现在仅仅是站位假数据'
    },
    age: {
      type: [String],
      default: '我还没拿到父组件的数据，现在仅仅是站位假数据'
    },
    name: {
      type: [String],
      default: '我并没有拿到父组件的数据，现在仅仅是站位假数据'
    }
  },
  data(){
    return{}
  },
  methods: {
    test01(){
      console.log('我是孙子组件的按钮1 我被点击了')
      this.$emit('grandsonF1')
    },
    test02(){
      console.log('我是孙子组件的按钮2 我被点击了')
      this.$emit('grandsonF2')
    }
  }
}
</script>

<style lang="less" scoped>
  .grandson{
    border:1px solid;
    padding:20px;
    margin:20px;
  }
</style>