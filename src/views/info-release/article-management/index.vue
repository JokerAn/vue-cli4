<template>
  <div>
    <h2>文章管理</h2>
    <div id="ossUpload" style="border:1px solid;padding:30px;background: #eee;">
      <p class="text-center">oss上传图片</p>
      <input type="file" accept="" @change="uploadFile($event)">
    </div>
    <img :src="oss.url" alt="">
    <div>路径：{{ oss.url }}</div>
    <div>文件名称(唯一标识)：{{ oss.type }}</div>
    <hr>
    <upload-img v-model="myImgList" :label="'上传图片'" :limit-num="6"></upload-img>
  </div>
</template>

<script>
import uploadImg from '@/components/UploadImg'
import {OssUploadMixins} from'../../../ossUpload/ossUpload'
export default {
  name: 'ArticleManagement',
  components: {
    uploadImg
  },
  mixins: [OssUploadMixins],
  data(){
    return {
      fileData: null,
      oss: '',
      popShow: true,
      myImgList: [{
        uid: '1',
        url: 'https://ambow-ebopo.oss-cn-beijing.aliyuncs.com/words/images/pic/m/2020723/1595500686427.png'
      }]
    }
  },
  methods: {
    uploadFile(e){
      console.log(e)
      console.log(e.target.files[0])
      this.ossUploadMixins(e.target.files[0]).then(result => {
        console.log(result)
        this.oss = result
      })
    }
  }
}
</script>

<style>

</style>