<template>
  <div>
    <h3>$children 或者 ref="children 需要子组件加载进来才行 必须在 mounted 中获取 ！</h3>
    <h3>获取$parent 在 beforeCreate 生命周期就可以用！</h3>
    <h2>我的顶层第一层num:{{ num }}</h2>
    <el-button @click="useChildrenF()">调用子组件的方法</el-button>
    <div>
      <my-child1 ref="myChildren1"></my-child1>
      <my-child2 ref="myChildren2"></my-child2>
    </div>
  </div>
</template>

<script>
import myChild1 from './children1'
import myChild2 from './children2'
export default {
  name: 'ParentChildrenRef',
  components: {
    myChild1,
    myChild2
  },
  data(){
    return{
      message: '我是最顶层的message',
      num: 100
    }
  },
  created(){
    //获取不到 ✘
    console.log(this.$refs.myChildren1)
    console.log(this.$refs.myChildren2)
    console.log(this.$children, '子') // 99组件
  },
  beforeMount(){
    //获取不到 ✘
    console.log(this.$refs.myChildren1)
    console.log(this.$refs.myChildren2)
    console.log(this.$children, '子') // 99组件
  },
  mounted(){
    //可以获取到 ✔
    console.log(this.$refs.myChildren1)
    console.log(this.$refs.myChildren2)
    console.log(this.$children, '子')
  },
  methods: {
    useChildrenF(){
      this.$children[1].sayHello()
    }
  }
}
</script>

<style>

</style>