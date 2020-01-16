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
    <hr>
    <div style="padding:30px 100px;">
      <ol id="b1">ol#b1</ol>
      <div style="width:100px;height:50px;padding:20px">-----------------------</div>
      <ol id="b2">ol#b2</ol>
      <div style="width:100px;height:50px;padding:20px">---------------------</div>
      <ol id="b3"></ol>
      <div style="width:100px;height:50px;padding:20px">---------------------</div>
      <ol id="b4"></ol>
      <h3 class="text">noa卡asdfa asd 撒旦法阿道夫阿斯顿发啊阿斯顿发阿凡达发送到发送到飞阿斯顿环境大</h3>
      <h1>一个div无数个同心圆</h1>
      <ol id="b5">一个div无数个同心圆</ol>
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
    ol{
    border:1px solid;
    width:200px;
    height:200px;
  }
  #b1{
    box-shadow: 20px 0 10px red,//x轴为正数 向右移动 y=0竖直方向不动 阴影程度模糊距离 可选。模糊距离为10px（可以设置为0试试） 颜色红色
                0 20px 10px blue,//x=0 y=20竖直方向下 阴影为10px 颜色蓝色
                -20px 0 10px yellow,//x轴为负数 向左移动 y=0竖直方向不动 阴影程度模糊距离 可选。模糊距离为10px（可以设置为0试试） 颜色黄色
                0 -20px 10px #000;//x=0 y=20竖直方向上 阴影为10px 颜色黑色
  }
  #b2{
    //inset 阴影在容器内部
    box-shadow: 20px 0 10px red inset,//x轴为正数 向右移动 y=0竖直方向不动 阴影程度模糊距离 可选。模糊距离为10px（可以设置为0试试） 颜色红色
                0 20px 10px blue inset,//x=0 y=20竖直方向下 阴影为10px 颜色蓝色
                -20px 0 10px yellow inset,//x轴为负数 向左移动 y=0竖直方向不动 阴影程度模糊距离 可选。模糊距离为10px（可以设置为0试试） 颜色黄色
                0 -20px 10px #000 inset;//x=0 y=20竖直方向上 阴影为10px 颜色黑色
  }
  #b3{
    margin: 0;
    padding: 0;
    animation: run 10s;
    // border-radius: 50%;
    // box-shadow: 20px 0 10px red,//x轴为正数 向右移动 y=0竖直方向不动 阴影程度为模糊距离 可选。模糊距离10px（可以设置为0试试） 颜色红色
    //             0 20px 10px blue,//x=0 y=20竖直方向下 阴影为10px 颜色蓝色
    //             -20px 0 10px yellow,//x轴为负数 向左移动 y=0竖直方向不动 阴影程度模糊距离 可选。模糊距离为10px（可以设置为0试试） 颜色黄色
    //             0 -20px 10px #000;//x=0 y=20竖直方向上 阴影为10px 颜色黑色
    box-shadow: 67px 0px 0px -24px blue,-67px 0px 0px -24px red,//x轴为正数 向右移动 y=0竖直方向不动 阴影程度0 阴影大小-67px 默认=0原始大小 颜色红色
                0 -67px 0px -24px red,0px 67px 0px -24px red;//x=0 y=20竖直方向上 阴影为10px 颜色黑色
  }
  @keyframes run {
   0%{transform:rotate(0deg);}
   100%{transform:rotate(720deg);}
  }
  #b4{
    width: 300px;
    height: 300px;
    /*background-color: #ff3c29;*/
    /*线性渐变linear-gradient(方向(top bottom left right组合使用或者使用角度:45deg), 开始的颜色-颜色占有的空间大小或比例(数字或百分比), ...,结束的颜色-颜色占有的空间大小或比例(数字或百分比))*/
    background: linear-gradient(45deg,red 10%,blue 60%,white 80%);
    /*径向渐变radial-gradient(渐变的中心的位置, 形状(椭圆、圆) 大小, 开始的颜色-颜色占有的空间大小或比例(数字或百分比), ...,结束的颜色-颜色占有的空间大小或比例(数字或百分比))*/
    // background: radial-gradient(circle 30px ,red ,blue  );
  }
  #b5{
    width: 300px;
    height: 300px;
    /*径向渐变radial-gradient(渐变的中心的位置, 形状(椭圆、圆) 大小,红色半径20px 蓝色半径40px 白色半径60px */
    background: radial-gradient(circle,red 20px,blue 40px,yellow 60px,#fff 80px,#000 100px  );
  }
.text{
    width: 200px;
    height: 200px;
    /*设置文本溢出的样式text-overflow(clip:直接裁剪-必须配合overflow：hidden使用、ellipsis：用...代替溢出的文本-必须配合overflow: hidden;white-space:nowrap;使用、string：自定义字符串代替溢出的文本)*/
    text-overflow: clip;
    overflow: hidden;
    /*white-space:nowrap;*/
    /*文字阴影：text-shadow(水平阴影位置,垂直阴影位置,模糊距离,阴影颜色)*/
    text-shadow: 10px 10px 2px red;
    /*word-break(换行): normal(浏览器默认换行规则)|break-all(允许在单词内换行)|keep-all(只能在半角空格或连字符处换行);*/
    /*word-break: keep-all;*/
    /*word-wrap(允许长的内容可以自动换行): normal(只在允许的断字点换行（浏览器保持默认处理）)|break-word(在长单词或 URL 地址内部进行换行);*/
    word-wrap: break-word;
}
</style>