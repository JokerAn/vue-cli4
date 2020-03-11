<template>
  <div class="bmp ">
    我是子组件 
    <!-- <h3>{{name}},{{hobby}}</h3> -->
    <!-- <h3>parentData:{{parentData}},theme:{{theme}},city:{{city}}</h3> -->
    <ul>
      <li>bus:{{ bus }}</li>
      <li>message:{{ message }}</li>
      <li>myArray:{{ myArray }}</li>
    </ul>
    <div class="children">
      <div class="grandson1">
        <my-grandson1></my-grandson1>
      </div>
      <div class="grandson2">
        <my-grandson2></my-grandson2>
      </div>
    </div>
    
  </div>
</template>

<script>
import myGrandson1 from './grandson1'
import myGrandson2 from './grandson2'
export default {
  components: {
    myGrandson1,
    myGrandson2
  },
  data(){
    return{}
  },
  // //接收第一种
  // inject: ["name","hobby"],

  // //第二种
  // inject:{
  //     //函数式组件取值不一样
  //   parentData:{default: () => ({})},
  //   city:{default: () => ({})},
  //   theme: {
  //     default: () => ({})
  //   }
  // },

  //第三种
  inject: {
    bus: {default: () => ({})},
    message: {default: () => ({})},
    myArray: {default: () => ({})}
  },
  created(){},
  methods: {}
}
</script>

<style lang="less" scoped>
.children{
  overflow: hidden;
}
  .grandson1,.grandson2{
    float:left;
    width: 49%;
  }
</style>