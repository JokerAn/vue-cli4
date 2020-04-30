<template>
  <div>
    <div style="width:300px;border:1px solid">
      <p>我是菜单render-map循环写的</p>
      <my-component></my-component>

    </div>
    <div style="width:300px;border:1px solid">
      <p>我是菜单render-原生写的</p>
      <my-component2></my-component2>

    </div>
    <div style="width:300px;border:1px solid">
      <p>我是菜单render-map+原生结合的</p>
      <my-component3></my-component3>

    </div>
  </div>
</template>

<script>
import myComponent from './components/render-map'
import myComponent2 from './components/render-array'
import myComponent3 from './components/render-array'
export default {
  name: 'Test',
  components: {
    myComponent,
    myComponent3,
    myComponent2
  },
  data(){
    return{}
  }

}
</script>

<style>

</style>