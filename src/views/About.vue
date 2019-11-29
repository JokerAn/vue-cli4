<template>
  <div class="about">
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

    <el-select v-model="values" filterable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label"
                 :value="item.value"
      ></el-option>
    </el-select></div>
</template>
<script>
import { chainDate } from '@/utils/public'
export default {
  data() {
    return {
      'options': [
        {
          'value': '选项1',
          'label': '黄金asdf糕'
        },
        {
          'value': '选项2',
          'label': '双皮奶'
        },
        {
          'value': '选项3',
          'label': '蚵仔煎'
        },
        {
          'value': '选项4',
          'label': '龙须面'
        },
        {
          'value': '选项5',
          'label': '北京烤鸭'
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
/deep/ .el-input {
  width: 500px;
  input {
    color: blue;
  }
}
</style>
<style lang="less">
.el-input {
  input {
    font-size: 30px;
  }
}
</style>
