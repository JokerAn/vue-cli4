<template>
  <div id="login">
    <!-- <p>登录页面</!-->
    <el-calendar v-model="value">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="less" scoped>
#login{
  /deep/ div{
    color:#000;
  }
}
/deep/ .el-calendar-table .el-calendar-day{
  height:110px;
}
/deep/ .el-calendar__body{
  padding:0
}
/deep/ .el-calendar-table thead th{
  font-size: 30px;
  font-weight: 700;
  color:#000;
  padding:0 0 2px 0;
}
/deep/ .el-calendar__title {
    font-size: 36px;
    font-weight: 700;
    padding-left: 500px;
    color: #000;
    -ms-flex-item-align: center;
    align-self: center;
}
</style>