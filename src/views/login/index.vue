<template>
  <div id="login">
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
    <h1 class="font7">{{LoginData.data.data.name}}</h1>
    <h2 class="font7">{{LoginData.data.data.msg}}</h2>
    <div class="name-pwd">
      <h3>CMS管理系统</h3>
      <p>
        <span>账号</span>
        <el-input v-model="username"></el-input>
      </p>
      <p>
        <span>密码</span>
        <el-input v-model="password" type="password"></el-input>
      </p>
      <ol>
        <el-button :loading="loading" style="width:370px;" size="large"
                   @click="loginF">确定</el-button>
      </ol>
    </div>
  </div>
</template>

<script>
import {loginApi,localFileApi } from '@/apis/login'
import {noValue } from '@/utils/public'
export default {
  
  metaInfo: {
    title: '大王小丑培训登录页面', // set a title
    meta: [{             // set meta
      name: 'keyWords',
      content: '大王小丑,培训,登录页面'
    },
    {
      name: 'description',
      content: '大王小丑,培训'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  data() {
    return {
      username: 'haoyue.ge@ambow.com',
      password: '111111',
      loading: false,
      LoginData:{
        data:{
          data:{}
        }
      }
    }
  },
  created(){
    // if(sessionStorage.getItem('token')){
    //   this.$router.push({ path: '/system-setting/person-center' })

    // }
    // setTimeout(()=>{
    //   this.test()
    // },1000)
    
  },
  methods: {
    loginF(){
      let canshu = {
        username: this.username,
        password: this.password
      }

      if(noValue(this.username)){
        this.$message({
          type: 'warning',
          message: '请填写账号名称'
        })
        return 
      }
      if(noValue(this.password)){
        this.$message({
          type: 'warning',
          message: '请填写密码'
        })
        return 
      }
      this.loading = true
      loginApi(canshu).then((result)=>{
        this.loading = false
        console.log(result)
        sessionStorage.setItem('token',result.data.token)
        sessionStorage.setItem('userName',result.data.realname)
        sessionStorage.setItem('appId',result.data.appList[0].id)
        // this.$router.push({ path: '/system-setting/person-center' })
        

      }).catch(err=>{
        this.loading = false
      })
    },
    test(){
      this.$axioss.get('/test-json/index.json').then((res)=>{
        console.log(res)
        this.LoginData=res
      })
    }
  }
}
</script>
<style >
.font7{
  font-size:16px;
}
.box{
  border:1px solid;
  box-sizing: border-box;
  width:100px;
  height:50px;
  display: inline-block;
}
.box3{
  width:175px;
}
</style>
<style lang="less" scoped>

#login{
  width:100%;
  height:100vh;
  background-size: 100% 100%;
  .name-pwd{
    background:#fff;
    border-radius:3px;
    text-align: center;
    padding:30px 10px;
    width:400px;
    position: fixed;
    top:50%;
    left:50%;
    margin-top:-120px;
    margin-left: -200px;
    h3{
      margin-bottom:30px;
    }
  }
  /deep/ .el-input{
    display: inline-block;
    width:300px;
  }
  p{
    margin-bottom:20px;
    span{
      margin-right:10px;
    }
  }
}
</style>