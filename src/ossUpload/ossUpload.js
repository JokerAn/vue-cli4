const ossConfig = {
  url: 'https://dev-open-api.ambow.com/storage/api/v1/auth/ALIYUN/zncgfjwfjqwfjwqlfebopo/zncgfjwfjqwfjwqlfebopo',
  timeout: 80000,
  pictureResources: 'words/images/pic/m/',
  videoResources: 'words/voice/m/'
}
// 导入请求层 

import axios from 'axios'
// 导入 相关的内容配置
import base64 from './base64'
import Crypto from './crypto'

// 定义 Oss 上传 mixins js 组件
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
    uploadImg(dir, ossInfo, file) {
      console.log({ossInfo})
      // 生成年月日
      function generationDate(){
        let date = new Date()

        return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}/`
      }
      /**
       * 生成的图片路径规则为 dir /2020423/1587633080778.jpg
       * dir 规定的资源路径位置
       * 2020423 年月日
       * 1587633080778 时间戳 + (150 以内的随机数)
       * jpg  获取图片的后缀名
       */
      function packagePathName(path){
        console.log(path)
        let extName = path.split('.').pop().toLowerCase()
        //这里是采用当前的时间戳 + 150内的随机数来给图片命名的

        return`${dir} ${generationDate()}${new Date().getTime() + Math.floor(Math.random() * 150)}.${extName}`
      }
      // 生成图片上传的位置路径
      const aliyunFileKey = packagePathName(file.name)
      // 设置 aliOss 上传的文件路径

      this.ossUploadAliyunFileKeyMixins = aliyunFileKey
      // 设置 上传 aliOss 的 唯一 key
      const accessid = ossInfo.accessKeyId
      // 生成 base64 编码
      const policyBase64 = this.getPolicyBase64()

      console.log(ossInfo.accessKeySecret)
      // return 
      // 生成 accessKeySecret 下的唯一签名
      const signature = this.getSignature(policyBase64, ossInfo.accessKeySecret)// 获取签名
      // 设置 上传 aliOss 的服务器地址

      this.ossUploadUrlMixins = ossInfo.urlPrefix
      this.ossUploadFormDataMixins = {
        key: aliyunFileKey,
        policy: policyBase64,
        OSSAccessKeyId: accessid,
        'success_action_status': '200',
        'x-oss-security-token': ossInfo.securityToken,
        signature
      }
    },
    ossUploadMixins(file,type = 'file') {
      console.log(file)
      return new Promise(async(resolve, reject) => {
        // 设置 上传的类型控制
        this.ossUploadTypeMixins = type
        axios({ url: ossConfig.url, methods: 'get'}).then(async (res) => {
          console.log(res)
          this.uploadImg(this.ossUploadActionMixins, res.data.data, file)
          // 上传图片
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
        console.log(this.ossUploadUrlMixins)
        console.log(formData)

        axios({
          method: 'post',
          url: this.ossUploadUrlMixins,
          data: formData
        }).then((res) => {
          // oss 上传完毕后 回调没有任何参数 (原因是 axios 将真的数据包裹了一层) (注:小程序会返回 200 的参数)
          resolve({
            url: `${this.ossUploadUrlMixins}/${this.ossUploadAliyunFileKeyMixins}`,
            type: file.name ? file.name : ''
          })
        }).catch((err) => {
          reject(err)
          console.log({ '错误': err })
        })
      })
    },
    // 获取加密值
    getPolicyBase64() {
      const date = new Date()

      date.setHours(date.getHours() + ossConfig.timeout)
      // 设置为 "2020-04-23T09:28:53.163Z" 这种形式的 字符串
      const srcT = date.toISOString()

      const policyBase64 = base64.encode(JSON.stringify({
        expiration: srcT, // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        conditions: [
          ['content-length-range', 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
        ]}
      ))

      return policyBase64
    },
    // 获取 签名
    getSignature(policyBase64, accessKeySecret) {
      const accesskey = accessKeySecret

      console.log({'accessKeySecret': accessKeySecret})
      const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
        asBytes: true
      })
      const signature = Crypto.util.bytesToBase64(bytes)

      return signature
    }
  }
}

