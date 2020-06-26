<template>
  <div>
    <div>文章管理</div>
    <el-table :data="tableList">
      <el-table-column v-for="(item,index) in tableData[0]" :key="index" :label="item.original">
        <template slot-scope="scope">
          <span>{{ scope.row[item.original].name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" type="text">
          </el-input></template>
      </el-table-column>
      <el-table-column label="库存">
        <template slot-scope="scope">
          <el-input v-model="scope.row.kucun" type="text">
          </el-input></template>
      </el-table-column>
    </el-table>
    <el-button @click="aaa()">ads</el-button>
  </div>
</template>

<script>


export default {
  data(){
    return {
      a: [
        [{id: 1,name: '红色','original': '颜色'},{id: 2,name: '黄色','original': '颜色'},{id: 3,name: '黑色','original': '颜色'}],
        [{id: 1,name: '方形','original': '形状'},{id: 2,name: '圆形','original': '形状'}],
        [{id: 1,name: '阿里巴巴','original': '厂家'},{id: 2,name: '京东','original': '厂家'}]
      ],
      tableData: [],
      tableList: []
    }
  },
  created(){
    this.tableData = this.a[0]
    this.a.forEach((item,index)=>{
      if(index > 0){
        this.getFinallData(this.tableData,item)
      }
    })
    
    console.log(this.tableData)
    let tableList = []

    this.tableData.forEach(item => {
      console.log(item)

      let linshi = {}

      item.forEach(item1 =>{
        linshi[item1.original] = item1
      })
      tableList.push({
        original: item,
        ...linshi,
        price: '',
        kucun: ''
      })
      
    })
    console.log(tableList)
    this.tableList = tableList
  },
  methods: {
    getFinallData(finallyData,addArray){
      let linshi = []

      finallyData.forEach(item1=>{
        addArray.forEach(item2=>{
          let data = [].concat(item1,item2)

          linshi.push(data)
        })
      })
      this.tableData = linshi
    },
    aaa(){
      console.log(this.tableList)
    }
  }

}
</script>
<style>

</style>