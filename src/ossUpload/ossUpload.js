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
    /**
     * 封装阿里云oss最终上传的参数 
     * @param {String} dir  阿里云文件路径
     * @param {Object} ossInfo  阿里云用户配置对象
     * @param {file} file  用户上传的文件
    */
    getOssUploadParams(dir, ossInfo, file) {
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

      // 生成 base64 编码 将日期（现在的日期往后推ossConfig.timeout分钟）和文件大小限制5M用base64编码变为字符串
      const policyBase64 = this.getPolicyBase64()

      // 获取签名 {base64（过期时间和文件大小限制5m）和 ossInfo.accessKeySecret 打包签名（加密）}
      // oss阿里云服务器会用参数 进行一模一样的加密 如果得到的值一样 那就说明是合法的
      const signature = this.getSignature(policyBase64, ossInfo.accessKeySecret)

      // 设置 上传 aliOss 的服务器地址
      this.ossUploadUrlMixins = ossInfo.urlPrefix

      //最终上传图片要发送的参数
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

        // 设置 上传的类型控制
        this.ossUploadTypeMixins = type

        //从后台获取阿里云的一些信息（储存到前端不安全）
        axios({ url: ossConfig.url, methods: 'get'}).then(async (res) => {
          console.log(res)//阿里云配置的id等
          
          // 配置上传文件需要的参数
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

        //将参数最终转换为formData类型提交
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
          // oss 上传完毕后 回调没有任何参数 (原因是 axios 将真的数据包裹了一层) (注:小程序会返回 200 的参数)
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
    // 获取加密值 将Policy失效时间和上传文件的大小限制,5mb 转为base64
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

      const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accessKeySecret, {
        asBytes: true
      })
      const signature = Crypto.util.bytesToBase64(bytes)

      return signature
    }
  }
}

