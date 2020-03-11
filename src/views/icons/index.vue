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
    title: '大王小丑培训 图片页面', // set a title
    meta: [{ // set meta
      name: 'keyWords',
      content: '大王小丑,培训, 图片页面'
    },
    {
      name: 'description',
      content: '大王小丑,培训'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
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