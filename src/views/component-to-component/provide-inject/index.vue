<template>
  <div class="bmp">
    我是父组件 
    父组件data中手写的的属性【color:{{ color }} message:{{ message }}】
    provide中写的属性：【bus:{{ bus }} myArray:{{ myArray }} 】
    <el-button @click="changeColor()">改变颜色</el-button>
    <el-button @click="changeBusMoney()">改变bus-money</el-button>
    <el-button @click="changeMessage()">改变message</el-button>
    <el-button @click="changemyArray()">改变myArray</el-button>
    <div>
      <my-child></my-child>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import myChild from './children'
export default {
  components: {
    myChild
  },
  data(){
    return{
      color: 'red',
      message: '父元素message'
    }
  },
  // // //第一种 不会双向绑定 获取不到this只能传递死值
  // provide: {
  //   name:"张三",
  //   hobby:['游戏',"吃饭"]
  // },

  // // 第二种
  // provide() {
  //   return {
  //     // fathers:this,
  //     parentData:this.$data,
  //     city:["石家庄","北京"],
  //     theme: {
  //       color: this.color //这种方式绑定的数据并不是可响应的
  //     } // 即A组件的color变化后，底下的组件不会跟着变化
  //   };
  // },
  
  // 第三种 可以双向绑定
  provide() {
    this.bus = Vue.observable({//对象可是想双向绑定 当money更改时候 本组件和接收组件都会改变
      money: '120'
    })
    this.myArray = Vue.observable([1])//数组可是想双向绑定 当money更改时候 本组件不会更改 但是 接收组件会改变！
    return {
      bus: this.bus,//相当于 直接在data中写了bus
      myArray: this.myArray,//相当于 直接在data中写了bus
      pppF: this.pppF//相当于 直接在data中写了bus
    }
  },
  created(){},
  methods: {
    pppF(){
      alert('我是最顶层的方法 我被执行了-我要吧bus.money归零！')
      this.bus.money = 0
    },
    changeColor(){
      this.color = this.color === 'red' ? 'blue' : 'red'
    },
    changeBusMoney(){
      this.bus.money++
    },
    changeMessage(){
      this.message += 'a'
    },
    changemyArray(){
      this.myArray.push(5)
      console.log(this.myArray)
    }
  }
}
</script>

<style lang="less" scoped>

</style>