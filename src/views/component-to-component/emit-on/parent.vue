<template>
  <div class="parent">
    <h2>父组件中全部数据全部是100以上的 子组件中全是100以内的23</h2>
    <el-button @click="passDataToChildren()">给子组件发送数据为666</el-button>
    <p>{{ parentMessage }}</p>
    <div class="children">
      <my-children></my-children>
    </div>
  </div>
  
</template>

<script>
import myChildren from './children.vue'

export default {
  components:{
    myChildren
  },
  data(){
    return{
      parentMessage:'我是父组件中的message=110'
    }
  },
  created(){
    this.$nextTick(() => {
      this.$eventBus.$on('emit-one-chidlren-to-parent',(res)=>{
        this.$message({
          type:'success',
          message:`我接收到了子组件传来的数据，数据是：${res}`
        })
        this.parentMessage=res
      })
    })
    
  },
  destroyed(){
    this.$eventBus.$off('emit-one-chidlren-to-parent')
  },
  methods:{
    getChildrenValue(res){
      this.parentMessage=res
    },
    passDataToChildren(){
      this.$eventBus.$emit('emit-one-parent-to-chidlren',666)
    }
  }
}
</script>

<style lang="less" scoped>
  .children{
    border:1px solid blue;
    min-height: 300px;
    margin:20px;
    padding:20px;
  }
</style>