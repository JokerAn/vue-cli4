<template>
  <div>
    <div>我是子组件的内容</div>
    <p>{{ childrenMessage }}</p>
    <div>
      <p>我接受到父组件传来的数据 数据是：{{ passData }}</p>
      <el-button @click="changeParentValue()">子组件按钮，点击我改变父组件的值为“ 我是父组件，我的值现在变成子组件传递过来的值了=50！”</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    passData: {
      type: [String,Object,Array],//支持多种类型
      default: ()=>{// default 只能是字符串 或者 function两种 别用箭头函数 会有坑
        return '我还没拿到父组件的数据，现在仅仅是站位假数据'
      }
    }
  },
  data(){
    return{
      childrenMessage: '我是子组件中的message=6'
    }
  },
  created(){},
  methods: {
    changeParentValue () {
      this.$emit('change-parent-value','我是父组件，我的值现在变成子组件传递过来的值了=50！')
    }
  }
}
</script>

<style>

</style>