<template>
  <div>
    <h2>js常用</h2>
    <p>红色相对body水平垂直居中</p>
    <p>蓝色相对父元素水平垂直居中</p>
    <div id="a1">a1</div>
    <div id="a4">a4</div>
    <div id="a2">
      <div>a2</div>
    </div>
    <div id="a3">
      <div>a31</div>
      <div style="background:red;width:100px;">a32</div>
    </div>
    <div id="a5">
      <div>a5</div>
      <!-- <div>a5</div> -->
    </div>
    <div id="a6" style="display:flex;">
      <div class="a61" style="width:200px;height:200px;background:red"></div>
      <div class="a62" style="background:blue;flex:1"></div>
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  #a1{
    width:300px;
    height:300px;
    background:red;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #a2{
    //只需给父元素 a2 设置三条属性就行 子元素（啥都不用设置！宽高都不用知道）就会水平居中
    border:5px solid;
    height:500px;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
      z-index: 10;
      background:blue;
      width:30%;
      height:200px;
    }
  }
  #a3{
    //只需给父元素 设置为table-cell元素 子元素 必须是inline-block
    border:5px solid yellow;
    width: 800px;
    height:500px;
    display: table-cell;
    vertical-align: middle;//垂直居中
    text-align: center;//水平居中
    div{
      display: inline-block;
      width:300px;
      height:200px;
      background: yellow;
    }
  }
  #a4{
    width: 40px;
    height:40px;
    background: #ddd;
    position: fixed;
    left:0;
    top:0;
    right:0 ;
    bottom:0;
    margin:auto;
  }
  #a5{
  height:300px;
  background:#666;
  text-align: center;
  &::before{
    content:"";
    // content:"23asdfasdf";//这俩是为了解释为啥会垂直居中做的解释
    // color:blue;//这俩是为了解释为啥会垂直居中做的解释
    // border:1px solid;//这俩是为了解释为啥会垂直居中做的解释
    height:100%;
    vertical-align: middle;
    display: inline-block;
  }
  div{
    height:100px;
    width:100px;
    background:yellow;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>