<template>
  <div>
    <p>我是主页</p>
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/element-ui-base">elementUI基本用法</router-link>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>