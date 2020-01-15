<template>
  <div>
    <p>我是主页</p>
    <div id="nav" class=" text_center">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/element-ui-base">elementUI基本用法 |</router-link>
      <router-link to="/component-to-component">组件传参 |</router-link>
      <router-link to="/js-public">js常用</router-link>
    </div>
    <div>
      <router-view class="view"></router-view>
    </div>
    
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>