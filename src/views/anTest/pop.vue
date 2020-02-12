<template>
  <div id="a1">
    <h2>弹框 确定按钮在左边 必须使用cancelButtonClass: "pop-success-btn-left"</h2>
    <el-button type="primary" @click="addSubmit">点我js弹出框警告框</el-button>
    <el-button type="primary" @click="editShow=true">点我html编辑弹出框</el-button>
    <el-dialog title="收货地址" :visible.sync="editShow" width="500px">
      <el-form :model="pageData">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="pageData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" label-width="120px">
          <el-select v-model="pageData.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editShow = false">确 定</el-button>
        <el-button @click="editShow = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editShow: false,
      pageData: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    addSubmit(){
      this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
        cancelButtonClass: 'pop-success-btn-left'//给取消按钮加class=' xxx pop-success-btn-left'让他去最右边
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '确定'
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
    }

  }
}
</script>

<style lang="less" scoped>
</style>