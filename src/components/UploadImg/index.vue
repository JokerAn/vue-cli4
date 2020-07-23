<template>
  <div>
    <template v-if="multiple">
      <el-upload
        ref="upload"
        multiple
        action="https://2.typicode.com/posts/"
        :accept="accept"
        :file-list="value"
        :list-type="listType"
        :limit="limitNum"
        :auto-upload="true"
        :before-upload="handleBeforeUpload"
        :on-change="handleLimit"
        :on-success="handlePicSuccess"
        :on-remove="handleRemove"
        :class="{ disabled: uploadDisabled }"
      >
        <i class="el-icon-plus"></i>
        <h4 class="textTilte" style="">{{ textTitle }}</h4>
      </el-upload>
    </template>
    <template v-else>
      <el-upload
        ref="upload"
        action="https://2.typicode.com/posts/"
        :accept="accept"
        :file-list="value"
        :list-type="listType"
        :limit="limitNum"
        :auto-upload="true"
        :before-upload="handleBeforeUpload"
        :on-change="handleLimit"
        :on-success="handlePicSuccess"
        :on-remove="handleRemove"
        :class="{ disabled: uploadDisabled }"
      >
        <i class="el-icon-plus"></i>
        <h4 class="textTilte">{{ textTitle }}</h4>
      </el-upload>
    </template>
  </div>
</template>

<script>
import {OssUploadMixins} from'../../ossUpload/ossUpload.js'

export default {
  mixins: [OssUploadMixins],
  props: {
    textTitle: {
      type: String,
      default: ''
    },
    //默认多选
    multiple: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      required: true,
      default: () => []
    },
    label: {
      type: String,
      default: '上传图片'
    },
    limitNum: {
      type: Number,
      default: 1
    },
    accept: {
      type: String,
      default: 'image/png,image/gif,image/jpg,image/jpeg'
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    size: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      uploadDisabled: false,
      notInOssArray: [],//还未上传的文件数组
      alreadyInOssArray: [],//已经上传的文件数组
      timer: null
    }
  },
  computed: {
    acceptList() {
      return this.accept.split(',')
    }
  },
  watch: {
    value: {
      handler: function(newVal, oldVal) {
        if (newVal.length >= this.limitNum) {
          this.uploadDisabled = true
        } else {
          this.uploadDisabled = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleBeforeUpload(file) {
      const size = file.size / 1024 / 1024
      const warningSize = size > this.size

      if (warningSize) {
        this.$notify.warning({
          title: '警告',
          message: `图片大小必须小于${this.size}M`
        })
      }
      if (!warningSize) {
        this.notInOssArray.push(file)
        if (this.timer) {
          clearTimeout(this.timer)
        }
        console.log('asdf', this.notInOssArray.length)
        this.timer = setTimeout(() => {
          var me = this

          function ajax(item, index) {
            me.ossUploadMixins(item).then((res) => {
              console.log(res)
              const obj = {
                uid: res.type,
                url: res.url
              }

              // 上传完成后 已经上传的文件数组中新增刚刚上传的文件
              me.alreadyInOssArray.push(obj)
              if (index === me.notInOssArray.length - 1) {
                // 如果所有的待上传文件都被上传了 那就清空待上传文件数组
                me.computedFileList()
              } else {
                ajax(me.notInOssArray[index + 1], index + 1)
              }
            }).catch((err) => {
              console.log(err)
            })
          }
          console.log(JSON.parse(JSON.stringify(this.notInOssArray)))
          // 将待上传的文件数组 循环去上传oss
          ajax(this.notInOssArray[0], 0)
        }, 1000)
        return false
      }

      return false
    },
    handlePicSuccess(response, file, fileList) {},
    handleLimit(file, fileList) {
      if (fileList.length >= this.limitNum) {
        this.uploadDisabled = true
      } else {
        this.uploadDisabled = false
      }
    },
    computedFileList() {
      this.$emit('input', this.alreadyInOssArray)
      this.notInOssArray = []
    },
    handleRemove(file, fileList) {
      this.alreadyInOssArray = fileList.filter((item) => file.url !== item.url)
      this.$emit('input', this.alreadyInOssArray)
    }
  }
}
</script>

<style lang="less" scoped>
.disabled {
  /deep/ .el-upload--picture-card {
    display: none !important;
  }
}
.textTilte{
  position:relative;top:-114px;font-weight:500;
}
</style>
