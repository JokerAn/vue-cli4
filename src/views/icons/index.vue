<template>
  <div>
    <div v-for="item in icons" :key="item" class="icon-one">
      <icon :name="item" :w="50" :h="50"></icon>
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script>
import icons from './icons-svg'
export default {
  name: 'Icons',
  metaInfo: {
    title: '图片页面', // set a title
    meta: [{ // set meta
      name: 'keyWords',
      content: '图片页面'
    },
    {
      name: 'description',
      content: '图片页面'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://图片页面.com/'
    }]
  },
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