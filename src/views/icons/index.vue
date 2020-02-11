<template>
  <div>
      <div class="icon-one" v-for="item in icons" :key='item'>
        <icon :name="item" :w="50" :h="50"></icon>
        <p>{{item}}</p>
      </div>
  </div>
</template>

<script>
import icons from './icons-svg'
export default {
  name:'Icons',
  data(){
    return {
      icons
    }
  }
}
</script>

<style lang="less" scoped>
  .icon-one{
    text-align: center;
    display: inline-block;
    margin: 5px;
  }
</style>