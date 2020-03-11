<template>
  <div>
    <p>个人中心</p>
    <p>{{ description }}</p>

  </div>
</template>

<script>
export default {
  name: 'PersonCenter',
  metaInfo: {
    title: '个人中心', // set a title
    meta: [{ // set meta
      name: 'keyWords',
      content: '个人中心'
    },
    {
      name: 'description',
      content: '个人中心'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  data(){
    return{
      msg: '我是data中定义的msg'
    }
  }
}
</script>

<style>

</style>