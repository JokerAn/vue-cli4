<template>
  <div>
    <h2>我是 孩子组件 的内容我只接收了父组件传给我的 name 其他的我没接收</h2>
    <h2>inheritAttrs:false 如果不写或者为true 可能会出现 子组件的某些属性被覆盖的情况！最好一直写上个</h2>
    <h2>v-on="$listeners" 可以将孙子组件中的所有自定义事件 全部接受并继续向上 弹</h2>
    <p>name:{{ name }}</p>
    <p>$attrs里面含有父组件传递给下边组件的所有参数（不包括子组件接收的参数）:{{ $attrs }}</p>
    <button @click="childrenF()">我是孩子组件中的按钮</button>
    <my-grandson v-bind="$attrs" v-on="$listeners"></my-grandson>
  </div>
</template>

<script>
import myGrandson from './grandson.vue'
export default {
  components:{
    myGrandson
  },
  inheritAttrs:false,
  props: {
    name:{
      type:[String,Object,Array],//支持多种类型
      default:'我还没拿到父组件的数据，现在仅仅是站位假数据'
    }
  },
  data(){
    return{
    }
  },
  created(){
    
  },
  methods:{
    childrenF(){
      console.log('我是孩子组件中的按钮')
    this.$emit('childrenF');
    }
  }
}
</script>