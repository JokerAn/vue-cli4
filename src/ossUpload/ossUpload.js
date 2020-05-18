const ossConfig = {
  url: 'https://dev-open-api.ambow.com/storage/api/v1/auth/ALIYUN/zncgfjwfjqwfjwqlfebopo/zncgfjwfjqwfjwqlfebopo',
  timeout: 80000,
  pictureResources: 'words/images/pic/m/',
  videoResources: 'words/voice/m/'
}

import axios from 'axios'
import base64 from './base64'
import Crypto from './crypto'

export const OssUploadMixins = {
  data() {
    return {
      ossUploadActionMixins: ossConfig.pictureResources,
      ossUploadTypeMixins: 'file',
      ossUploadUrlMixins: '',
      ossUploadFormDataMixins: {},
      ossUploadAliyunFileKeyMixins: ''
    }
  },
  methods: {
    getOssUploadParams(dir, ossInfo, file) {
      console.log({ossInfo})
      function generationDate(){
        let date = new Date()

        return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}/`
      }
      function packagePathName(path){
        console.log(path)
        let extName = path.split('.').pop().toLowerCase()

        return`${dir}${generationDate()}${new Date().getTime() + Math.floor(Math.random() * 150)}.${extName}`
      }
      const aliyunFileKey = packagePathName(file.name)

      this.ossUploadAliyunFileKeyMixins = aliyunFileKey
      const accessid = ossInfo.accessKeyId

      const policyBase64 = this.getPolicyBase64()

      const signature = this.getSignature(policyBase64, ossInfo.accessKeySecret)

      this.ossUploadUrlMixins = ossInfo.urlPrefix
      this.ossUploadFormDataMixins = {
        key: aliyunFileKey,
        OSSAccessKeyId: accessid,
        policy: policyBase64,
        'success_action_status': '200',
        'x-oss-security-token': ossInfo.securityToken,
        signature
      }
    },
    ossUploadMixins(file,type = 'file') {
      console.log(file)
      return new Promise(async(resolve, reject) => {
        this.ossUploadTypeMixins = type
        axios({ url: ossConfig.url, methods: 'get'}).then(async (res) => {
          this.getOssUploadParams(this.ossUploadActionMixins, res.data.data, file)
          const result = await this.ossUpload(file)

          resolve(result)
        }).catch((e) => {
          console.log(e)
          reject(e)
        })
      })
    },
    ossUpload(file) {
      return new Promise((resolve, reject) => {
        const { key, policy, OSSAccessKeyId, signature } = this.ossUploadFormDataMixins

        const formData = new FormData()

        formData.append('key', key)
        formData.append('OSSAccessKeyId', OSSAccessKeyId)
        formData.append('policy', policy)
        formData.append('signature', signature)
        formData.append('success_action_status', '200')
        formData.append('x-oss-security-token', this.ossUploadFormDataMixins['x-oss-security-token'])
        formData.append('file', file)
        axios({
          method: 'post',
          url: this.ossUploadUrlMixins,
          data: formData
        }).then((res) => {
          resolve({
            url: `${this.ossUploadUrlMixins}/${this.ossUploadAliyunFileKeyMixins}`,
            type: file.name ? file.name : ''
          })
        }).catch((err) => {
          reject(err)
          console.error('oss上传错误', err)
        })
      })
    },
    getPolicyBase64() {
      const date = new Date()

      date.setHours(date.getHours() + ossConfig.timeout)
      const srcT = date.toISOString()

      const policyBase64 = base64.encode(JSON.stringify({
        expiration: srcT,
        conditions: [
          ['content-length-range', 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
        ]}
      ))

      return policyBase64
    },
    getSignature(policyBase64, accessKeySecret) {
      const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accessKeySecret, {
        asBytes: true
      })
      const signature = Crypto.util.bytesToBase64(bytes)

      return signature
    }
  }
}

