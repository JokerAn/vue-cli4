<template>
  <div class="about  text_center">
    <img id="a3" src="@/assets/logo.png" alt size="2"
         data-aaa="a" data-aaaa="a" class="a1" title="a"
         data-aa="a"
         style="color:red;cursor:pointer"
    >
    <input type="text">
    <div></div>
    <span id="a55">
      <b>asdf</b>
    </span>
    <h1>{{ newTime }}</h1>
    <el-button>
      <el-button size="small">{{ newTime }}</el-button>
      <el-button type="primary" @click="deleteSomeThing()">删除SomeThing</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-button>

    <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>
    <h2>svg</h2>
    <icon class="svgaaa" name="wx" :w="100"
          :h="100"></icon>
    <icon name="shtg" :w="100" :h="100"></icon>
    <icon name="aaa" :w="100" :h="100"></icon>
    <p>阿斯顿发</p>

    <el-select v-model="values" class="a10" filterable
               placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label"
                 :value="item.value"
      ></el-option>
    </el-select>
    <div style="padding:30px;">
      <p>测试myAjax ： {{ userInfo.userName }}-{{ userInfo.sexJokerAn | sex }} 《-- 我用到了filter</p>
      <div style="display:flex;">
        <el-input v-model="login.loginName" placeholder="请输入内容"></el-input>
        <el-input v-model="login.password" placeholder="请输入密码"></el-input>
        <el-input v-model="login.imgcode" placeholder="请输入验证码"></el-input>
        <div @click="getImgcode">
          <img height="50px" :src="`${baseUrl}/appImageCode/img/validate?${nowTime}`" alt="">
        </div>
      </div>

      <el-button type="success" @click="loginF">登录axios.post</el-button>
      <el-button type="success" @click="loginF2">登录axios({...})</el-button>

    </div>
  </div>
</template>
<script>
import { chainDate } from '@/utils/public'
export default {
  metaInfo: {
    title: '大王小丑培训about页面', // set a title
    meta: [{ // set meta
      name: 'keyWords',
      content: '大王小丑,培训,about页面'
    },
    {
      name: 'description',
      content: '大王小丑,培训,about页面'
    }],
    link: [{ // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  },
  data() {
    return {
      'userInfo': {},
      'login': {
        'anonymouslogin': true,
        'loginName': 'wei.xia@ambow.com',
        'password': 'Ambow99999999'
      },
      'baseUrl': process.env.VUE_APP_BASE_API,
      'nowTime': new Date() - 0,
      'options': [
        {
          'value': '选项1',
          'label': '黄金asdf糕'
        },
        {
          'value': '选项2',
          'label': '双皮奶'
        }
      ],
      'values': '',
      'newTime': chainDate(new Date())
    }
  },
  mounted() {
    setInterval(() => {
      this.newTime = chainDate(new Date())
    }, 1000)
  },
  'methods': {
    getImgcode() {
      this.nowTime = new Date().getTime()
    },
    loginF() {
      this.$axios.post(this.$apiUrls.login.login,this.login).then(result=>{
        console.log(result)
        result.data.userInfo.sexJokerAn = 1
        this.userInfo = result.data.userInfo
      }).catch(err => {
        console.log(err)
        this.getImgcode()
      })
    },
    loginF2() {
      this.$axios({
        'method': 'post',
        'url': this.$apiUrls.login.login,
        'data': this.login
      }).then(result=>{
        console.log(result)
        result.data.userInfo.sexJokerAn = 1
        this.userInfo = result.data.userInfo
      }).catch(err => {
        console.log(err)
        this.getImgcode()
      })
    },
    deleteSomeThing() {
      var a = { 'a': 1, 'b': 'asd' },
        b = [
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' },
          { 'a': 1, 'b': 'asd' }
        ]

      console.log(a === b)
      console.log(b)
      console.log(a)
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      })
        .then(() => {
          this.$message({
            'type': 'success',
            'message': '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            'type': 'info',
            'message': '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .a10 .el-input {
  width: 500px;
  input {
    color: blue;
  }
}
</style>
<style lang="less">
.a10 .el-input {
  input {
    font-size: 30px;
  }
}
</style>
