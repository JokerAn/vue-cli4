<template>
  <div id="campus-info">
    <el-form
      ref="ruleForm"
      :model="orgInfo"
      :rules="rules"
      label-width="120px"
      size="mini"
    >
      <el-form-item label="校区" prop="campusName">
        <span>{{ orgInfo.campusName }}</span>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <span>{{ orgInfo.address }}</span>
      </el-form-item>
      <el-form-item label="类型" prop="style">
        <el-radio v-for="item in styleTypes" :key="item.key" v-model="orgInfo.style" :label="item.key">{{ item.value }}</el-radio>
      </el-form-item>
      <!-- <el-form-item label="封面" prop="cityCode">
        <el-select v-model=" orgInfo.provinceName" placeholder="请选择省份" style="width: 400px;" @change="getCityByProvinceF()">
          <el-option
            v-for="item in prvinceOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="内容" prop="style">
        <MyEdiotr v-model="orgInfo.content" style="width:800px;"></MyEdiotr>
      </el-form-item>

    </el-form>
    <div>
      <el-button @click="save()">保存</el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>

<script>
import {getOrgInfoApi} from '@/apis/info-release/campus-menagement/campus-info.js'

export default {
  data(){
    return {
      orgId: '',
      orgInfo: {},
      rules: {
        bankSubbranchName: [
          { required: true, message: '请填写开户行支行', trigger: 'blur' }
        ],
        bankName1: [
          { required: true, message: '请填写开户银行', trigger: 'blur' }
        ],
        linkNumber: [
          { required: true, message: '请填写联行号', trigger: 'blur' }
        ]
      },
      styleTypes: [
        {key: 1,value: '图文'},
        {key: 2,value: '图集'},
        {key: 3,value: '视频'},
        {key: 4,value: '语音'},
        {key: 5,value: '其它'}
      ],
      statusParam: {
        0: '稍后发布',
        1: '立即发布'
      }

    }
  },
  created(){
    this.orgId = this.$route.query.id
    this.edit = Boolean(this.$route.query.edit)
    this.getOrgInfoF()
  },
  methods: {
    getOrgInfoF(){
      getOrgInfoApi(this.orgId).then(result=>{
        result.data.styles = result.data.styles || 1
        this.orgInfo = result.data
        console.log('-----------------')
      })
    },
    save(){
      console.log(this.orgInfo.content)
    }
  }
}
</script>
<style lang="less" scoped>
#campus-info{
    padding-top:30px;
  }
</style>