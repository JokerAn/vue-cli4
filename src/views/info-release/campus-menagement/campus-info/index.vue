<template>
  <div id="campus-info" class="campus-info">
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
      <el-form-item label="地图" prop="style">
        <div id="container"></div>
      </el-form-item>
      <el-form-item label="内容" prop="style">
        <MyEdiotr v-model="orgInfo.content" style="width:800px;"></MyEdiotr>
      </el-form-item>

    </el-form>
    <div class="btns">
      <el-button size="large" type="success" @click="save()">保存</el-button>
      <el-button size="large" type="primary" style="margin-left:50px;">返回</el-button>
    </div>
    <el-button size="large" type="primary" class="goBack">返回</el-button>

  </div>
</template>

<script>
import AMap from 'AMap'

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
      },
      map: null,
      marker: null

    }
  },
  created(){
    this.orgId = this.$route.query.id
    this.edit = Boolean(this.$route.query.edit)
    this.getOrgInfoF()
  },
  mounted(){
    this.createMapF()    
  },
  destroyed (){
    this.mapOffClick()
  },
  methods: {
    getOrgInfoF(){
      getOrgInfoApi(this.orgId).then(result=>{
        result.data.styles = result.data.styles || 1
        this.orgInfo = result.data
        this.chinaAdressbecomeLngLat(this.orgInfo.address).then(mapResult=>{
          this.map.destroy()
          this.createMapF()
          setTimeout(()=>{
            this.setMark([mapResult.geocodes[0].location.lng,mapResult.geocodes[0].location.lat])
          },1000)
          
        })
      })
    },
    save(){
      console.log(this.orgInfo.content)
    },
    // 创建地图
    createMapF(center){
      let canshu = {
        resizeEnable: true,
        zoom: 11
      }

      if(center){
        canshu.center = center
      }
      this.map = new AMap.Map('container',canshu)
      this.mapBindClick()
      // 获取当前定位
      this.map.plugin(['AMap.Geolocation'], ()=> {
        let geolocation = new AMap.Geolocation({
          timeout: 10000 //超过10秒后停止定位，默认：无穷大
        })

        this.map.addControl(geolocation)
        geolocation.getCurrentPosition(function(status,result){
          if(status === 'complete'){
            console.log('当前定位的信息是：' + result.formattedAddress)
          }else{
            console.error(result)
          }
        })
      })
    },
    // 只允许设置一个标记点
    setMark(position = [116.405467, 39.907761]){
      // 如果有标记点了 就删除标记点重新添加
      this.marker && this.map.remove(this.marker)
      // 生成一个标记点
      this.marker = new AMap.Marker({
        icon: require('@/assets/images/mark-gd.png'),
        position
      })
      // 挂载标记点
      this.map.add(this.marker)
      // 将标记点转换为中文街道文字
      this.LngLatBecomeChinaAdress(position).then(chinaAdress=>{
        this.orgInfo.address = chinaAdress.regeocode.formattedAddress
        this.map.setFitView()
      })

    },
    // 将经纬度转为中国街道
    LngLatBecomeChinaAdress(LngLat){
      return new Promise((resolve,reject)=>{
        this.map.plugin('AMap.Geocoder', () =>{
          new AMap.Geocoder().getAddress(LngLat,(status,result)=>{
            if (status === 'complete' && result.info === 'OK') {
              console.log(result.regeocode.formattedAddress)
              resolve(result)
            }else{
              reject(result)
            }
          })
        })
      })
      
    },
    // 将中国街道转为经纬度
    chinaAdressbecomeLngLat(chinaAdress){
      return new Promise((resolve,reject)=>{
        AMap.plugin('AMap.Geocoder', () => {
          new AMap.Geocoder().getLocation(chinaAdress, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              console.log(result)
              resolve(result) 
            }else{
              reject(result)
            }
          })
        })
      })
      
    },
    // 点击地图
    clickMap(e){
      this.setMark([e.lnglat.lng,e.lnglat.lat])
    },
    // 绑定事件
    mapBindClick(){
      this.map.on('click', this.clickMap)
    },
    // 解绑事件
    mapOffClick(){
      this.map.off('click', this.clickMap)
    }

  }
}
</script>
<style lang="less" scoped>
  #campus-info{
    position: relative;
    padding-top:30px;
    .btns{
      padding-left:300px;
      margin-bottom:20px;
    }
    .goBack{
      top: 20px;
      right: 40px;
      position: absolute;
    }
  
  }
  #container{
    height:300px;
    width:800px;
    border:1px solid #aaa;
  }
</style>