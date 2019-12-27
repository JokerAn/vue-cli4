<template>
  <div>
    <h2>element-ui-base用法</h2>
    <ul class="anclear nav text_center ">
      <li class="fl">
        <router-link to="/element-ui-base/button">button</router-link>
      </li>
      <li class="fl">
        <router-link to="/element-ui-base/input">input</router-link>
      </li>
      <li class="fl">
        <router-link to="/element-ui-base/pop">弹出框</router-link>
      </li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style  lang="less" scoped>
  .nav{
    width:600px;
    margin: 0 auto;
    li{
      padding:60px
    }
  }
</style>