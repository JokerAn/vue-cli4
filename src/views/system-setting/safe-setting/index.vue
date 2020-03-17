<template>
  <div>
    <p>安全设置</p>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'PersonCenter',
  metaInfo: {
    title: '安全设置', // set a title
    meta: [{ // set meta
      name: 'keyWords',
      content: '安全设置'
    },
    {
      name: 'description',
      content: '安全设置'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://安全设置.com/'
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