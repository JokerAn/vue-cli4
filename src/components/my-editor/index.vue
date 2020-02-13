<template>
  <div></div>
</template>

<script>
import WangEditor from 'wangeditor'

export default {
  name: 'MyEdiotr',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'html' // html, text
    },
    cache: {
      type: Boolean,
      default: true // 是否开启本地存储
    }
  },
  data() {
    return {
      editor: null,
      stashValue: this.value
    }
  },
  watch: {
    value() {
      if (this.editor && this.value !== this.stashValue) {
        if (this.value === null) {
          this.editor.txt.clear()
        } else {
          this.editor.txt.html(this.value)
        }
      }
    }
  },
  mounted() {
    this.editor = new WangEditor(this.$el)
    // 开启图片复制
    this.editor.customConfig.uploadImgShowBase64 = true
    this.editor.customConfig.onchange = (html) => {
      let text = this.editor.txt.text()

      if (this.cache) {
        localStorage.editorCache = html
      }
      let value = this.stashValue = this.type === 'html' ? html : text

      this.$emit('input', value)
      this.$emit('change', html, text)
    }
    this.editor.create()
    let html = this.value || localStorage.editorCache

    if (html) {
      this.editor.txt.html(html)
    }
  },
  methods: {
    setHtml(val) {
      this.editor.txt.html(val)
    }
  }
}
</script>

<style lang="less" scoped>
    /deep/ .w-e-text-container ol li {
      list-style: decimal;
    }
    /deep/ .w-e-text-container ul  li {
      list-style: disc;
    }
  
</style>