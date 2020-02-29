<template>
  <div class="component-box">
    <h1>eventbus</h1>
    <br>
    <p>页面数据是{{ ajaxData }}</p>
    <div>
      <my-parent></my-parent>
    </div>
  </div>
</template>

<script>
import myParent from './parent.vue'
export default {
  metaInfo: {
    title: '大王小丑培训emit-on页面', // set a title
    meta: [{             // set meta
      name: 'keyWords',
      content: '大王小丑,培训,emit-on页面'
    },
    {
      name: 'description',
      content: '大王小丑,培训,emit-on页面'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  name:'EmitOn',
  components:{
    myParent
  },
  //常用场景比如 审核详情页面 里面有一个按钮是 下一条 这样仅仅是 数据变化了 页面没变化 如果不需要更改变路由还好
  // 要是需要改变路由(比如当前第一条 点击下一条就变为第二条 然后刷新页面数据应该 是第二条的数据！)
  // 比如说 本来是 xxx.com/approval?1  变为 xxx.com/approval?2 那样就需要用到这个函数了
  //如果浏览器路由没有变化就执行路由更新方法 可以用this this指向当前页面
  // beforeRouteUpdate(to,from,next){
  //   console.log(to.query)
  //   this.passId=to.query.someId
  //   this.getPageList()
  //   next()//写不写这一行都行
  // },
  data(){
    return{
      passId:null,
      ajaxData:{age:1,name:'张三'}
    }
  },
  watch:{
    $route: {
      handler: function(route) {
        this.passId=this.$route.query.someId
        console.log(`传递过来的路由参数是${this.$route.query.someId}`)
        this.getPageList()
      }
      // immediate: true 不要写这个 这个会一进页面触发一次 会跟created中的方法重复运行
      //第一次就走created中的方法 就行了
    }
  },
  created(){
    this.passId=this.$route.query.someId
    console.log(`传递过来的路由参数是${this.$route.query.someId}`)
    this.getPageList()
  },
  methods:{
    getPageList(){
      this.$message('即将根据传入的id来请求页面信息')
      this.ajaxData={age:this.passId,name:`张三${this.passId}`}
    }
  }
}
</script>

<style lang="less" scoped>
  .component-box{
    border:1px solid blue;
    min-height: 500px;
    margin:20px;
    padding:20px;
  }
</style>