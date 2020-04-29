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
黑点 
key: words/images/pic/m/ 2020429/0000.png
OSSAccessKeyId: STS.NU1orX5c3yrfwwpWXGRQ2r34r
policy: eyJleHBpcmF0aW9uIjoiMjAyOS0wNi0xNFQxMDo0NjoxMy45MjVaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsNTI0Mjg4MF1dfQ==
signature: V3VsDrzCaImeVq942cpGeYpTz6U=
success_action_status: 200
x-oss-security-token: CAISjQJ1q6Ft5B2yfSjIr5aEJMjs2LwSzrCNdVHBs1gSXt4enfafkDz2IHpOfHRvA wZsPswm2hU5voalrl0UIQAXkHfdsp36NFR AasOxYYJzpBq 5qsoasPETOISyZtZagXoeUZdfZfejXHDKgvyRvwLz8WCy/Vli S/OggoJmadJlMWvVaiFdVpUsZWkEksIBMmbLPvuAKwPjhnGqbHBloQ1hk2hym8Pdp8SX8UjZl0aoiL1X9cbTWsH6NJQ0Y8wvC4vkgrMuLvr7vXQOu0QQxsBfl7dZ/DrLhNaZDmRK7g OW iuqYc1dFImPPRlRfEb86CgxaEgoIrUjJ y0RtEMaRKSSXDSZAoEG1mhGkyXBqAAVvjn6DyacjhVcteHgx7zMRAMLJD2P9/e9/8kPbvgqUYRKjqODa9tyKCBdyZG6 pMKjIAcitR6RNCItfV/O3a75J Z89uFs/P4eVyxmnophCRawFMfXqkwJIr8OcXYgBEBB10cVwfvIil//RQsOGWbb9uyNR hhHF8M0W0RGHMdf
-------------
key: words/images/pic/m/ 2020429/0000.png
OSSAccessKeyId: STS.NU1orX5c3yrfwwpWXGRQ2r34r
policy: eyJleHBpcmF0aW9uIjoiMjAyOS0wNi0xNFQxMDo0NzowMS4zNzdaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsNTI0Mjg4MF1dfQ==
signature: ZAnwITHgJ6mVX20NCkJqUGnXxOA=
success_action_status: 200
x-oss-security-token: CAISjQJ1q6Ft5B2yfSjIr5aEJMjs2LwSzrCNdVHBs1gSXt4enfafkDz2IHpOfHRvA wZsPswm2hU5voalrl0UIQAXkHfdsp36NFR AasOxYYJzpBq 5qsoasPETOISyZtZagXoeUZdfZfejXHDKgvyRvwLz8WCy/Vli S/OggoJmadJlMWvVaiFdVpUsZWkEksIBMmbLPvuAKwPjhnGqbHBloQ1hk2hym8Pdp8SX8UjZl0aoiL1X9cbTWsH6NJQ0Y8wvC4vkgrMuLvr7vXQOu0QQxsBfl7dZ/DrLhNaZDmRK7g OW iuqYc1dFImPPRlRfEb86CgxaEgoIrUjJ y0RtEMaRKSSXDSZAoEG1mhGkyXBqAAVvjn6DyacjhVcteHgx7zMRAMLJD2P9/e9/8kPbvgqUYRKjqODa9tyKCBdyZG6 pMKjIAcitR6RNCItfV/O3a75J Z89uFs/P4eVyxmnophCRawFMfXqkwJIr8OcXYgBEBB10cVwfvIil//RQsOGWbb9uyNR hhHF8M0W0RGHMdf


头像
key: words/images/pic/m/ 2020429/0000.png
OSSAccessKeyId: STS.NU1orX5c3yrfwwpWXGRQ2r34r
policy: eyJleHBpcmF0aW9uIjoiMjAyOS0wNi0xNFQxMDo0NjozNS4wMTVaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsNTI0Mjg4MF1dfQ==
signature: VA87rCpB1ZT5APdFUdTs/gENYv0=
success_action_status: 200
x-oss-security-token: CAISjQJ1q6Ft5B2yfSjIr5aEJMjs2LwSzrCNdVHBs1gSXt4enfafkDz2IHpOfHRvA wZsPswm2hU5voalrl0UIQAXkHfdsp36NFR AasOxYYJzpBq 5qsoasPETOISyZtZagXoeUZdfZfejXHDKgvyRvwLz8WCy/Vli S/OggoJmadJlMWvVaiFdVpUsZWkEksIBMmbLPvuAKwPjhnGqbHBloQ1hk2hym8Pdp8SX8UjZl0aoiL1X9cbTWsH6NJQ0Y8wvC4vkgrMuLvr7vXQOu0QQxsBfl7dZ/DrLhNaZDmRK7g OW iuqYc1dFImPPRlRfEb86CgxaEgoIrUjJ y0RtEMaRKSSXDSZAoEG1mhGkyXBqAAVvjn6DyacjhVcteHgx7zMRAMLJD2P9/e9/8kPbvgqUYRKjqODa9tyKCBdyZG6 pMKjIAcitR6RNCItfV/O3a75J Z89uFs/P4eVyxmnophCRawFMfXqkwJIr8OcXYgBEBB10cVwfvIil//RQsOGWbb9uyNR hhHF8M0W0RGHMdf


// key: words/images/pic/m/ 2020429/0000.png
// OSSAccessKeyId: STS.NU1orX5c3yrfwwpWXGRQ2r34r
// policy: eyJleHBpcmF0aW9uIjoiMjAyOS0wNi0xNFQxMDozOTozNy45MThaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsNTI0Mjg4MF1dfQ==
// signature: 9DLV0wAFPyNZ8Cp1HABXOq2fVt4=
// success_action_status: 200
// x-oss-security-token: CAISjQJ1q6Ft5B2yfSjIr5aEJMjs2LwSzrCNdVHBs1gSXt4enfafkDz2IHpOfHRvA wZsPswm2hU5voalrl0UIQAXkHfdsp36NFR AasOxYYJzpBq 5qsoasPETOISyZtZagXoeUZdfZfejXHDKgvyRvwLz8WCy/Vli S/OggoJmadJlMWvVaiFdVpUsZWkEksIBMmbLPvuAKwPjhnGqbHBloQ1hk2hym8Pdp8SX8UjZl0aoiL1X9cbTWsH6NJQ0Y8wvC4vkgrMuLvr7vXQOu0QQxsBfl7dZ/DrLhNaZDmRK7g OW iuqYc1dFImPPRlRfEb86CgxaEgoIrUjJ y0RtEMaRKSSXDSZAoEG1mhGkyXBqAAVvjn6DyacjhVcteHgx7zMRAMLJD2P9/e9/8kPbvgqUYRKjqODa9tyKCBdyZG6 pMKjIAcitR6RNCItfV/O3a75J Z89uFs/P4eVyxmnophCRawFMfXqkwJIr8OcXYgBEBB10cVwfvIil//RQsOGWbb9uyNR hhHF8M0W0RGHMdf