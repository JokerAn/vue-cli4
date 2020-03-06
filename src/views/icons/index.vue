<template>
  <div>
    <input ref="icon-input" v-model="iconValue" type="text">
    <div v-for="item in icons" :key="item" class="item icon-one" @click="copyValue(item)"> 
      <el-tooltip effect="dark"
                  :content="`点击复制 <icon name='${item}' :w='100' :h='100'></icon>`"
                  placement="top">
        <div>
          <icon :name="item" :w="50" :h="50"></icon>
          <p>{{ item }}</p>
        </div></el-tooltip>
    </div>
    
  </div>
</template>

<script>
import icons from './icons-svg'
export default {
  name: 'Icons',
  data(){
    return {
      icons,
      iconValue: '这是你从icons.vue复制的文字'
    }
  },
  methods: {
    copyValue(res){
      this.iconValue = `<icon name="${res}" :w="100" :h="100"></icon>`

      setTimeout(()=>{
        this.$refs['icon-input'].select()
        document.execCommand('copy')
        this.$message('复制成功，' + this.iconValue)
      },50)
      
    }
  }
}
</script>

<style lang="less" scoped>
input{
  position: absolute;
  left:-9999px;
}
  .icon-one{
    cursor: pointer;
    text-align: center;
    display: inline-block;
    margin: 40px;
  }
</style>