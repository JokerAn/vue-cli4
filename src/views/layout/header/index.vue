<template>
  <div class='header'>
    <a class="changeAsideWidth"  @click='changeAsideWidth()'>
      <icon v-show='!leftOpen' name="close-left" :w="30" :h="30"></icon>
      <icon v-show='leftOpen' name="open-left" :w="30" :h="30"></icon>
    </a>
      我是header
  </div>
</template>

<script>
export default {
  name:'MyHeader',
  data(){
    return{
      leftOpen:false
    }
  },
  created(){},
  methods:{
    changeAsideWidth(){
      this.leftOpen=!this.leftOpen
      this.$emit('changeAsideWidth',this.leftOpen)
    }
  }

}
</script>

<style lang="less" scoped>
 .changeAsideWidth{
   display: inline-block;
   width:50px;
   text-align: center;
   height:60px;
   line-height: 60px;
   cursor: pointer;
 }
</style>