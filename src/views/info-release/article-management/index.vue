<template>
  <div>
    <h2>文章管理</h2>
    <div id="ossUpload" style="border:1px solid;padding:30px;background: #eee;">
      <p class="text-center">oss上传图片</p>
      <input type="file" accept=".jpg,.png" @change="uploadFile($event)">
    </div>
    <img :src="oss.url" alt="">
  </div>
</template>

<script>
import {OssUploadMixins} from'../../../ossUpload/ossUpload'
export default {
  name: 'ArticleManagement',
  mixins: [OssUploadMixins],
  data(){
    return {
      fileData: null,
      oss: ''
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