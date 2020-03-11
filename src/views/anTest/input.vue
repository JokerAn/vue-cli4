<template>
  <div>
    <p>element-input的用法+css动画</p>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  created(){

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.box{
  width:100px;
  height:100px;
  border:1px solid;
  animation: test01 10s;
  // animation: 
  // name：动画函数名称 
  // duration 完成动画所需时间 （秒）
  // timing-function 动画的速度曲线 。默认是 "ease"。
  // delay 动画开始前的延迟 默认是0
  // iteration-count 规定动画被播放的次数。默认是 1。	
  // direction 规定动画是否在下一周期逆向地播放。默认是 "normal"。
  // fill-mode;规定对象动画时间之外的状态。
}
@keyframes test01{
  0%{background:red;margin:0 0 0 0}
  30%{background:blue;margin:0 0 0 200px}
  60%{background:yellow;margin:200px 0 0 200px }
  90%{background:yellow;margin:200px 0 0 0 }
  100%{background:yellow;margin:0 0 0 0 }
}
</style>