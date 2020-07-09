<template>
  <div>
    <div>文章管理</div>
    <el-row>
      <el-form>
        <el-form-item v-for="(item01,index01) in ajaxData" :key="index01" :label="item01.name +':' ">
          <template v-if="item01.children&&item01.children.length>0">
            <el-checkbox-group v-model="item01.anSelectedId" style="display:inline-block;margin-left:20px;" @change="checkBoxChange($event,item01)">
              <el-checkbox v-for="(item02,index02) in item01.children" :key="index02" :label="item02.id">{{ item02.name }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table v-if="tableList.length>0" :data="tableList">
      <template v-for="(item2,index2) in tableList[0].original">
        <el-table-column :key="index2" :label="item2.topTitleName">
          <template slot-scope="scope">
            <span>{{ scope.row.original[index2].name }}</span>
          </template>
        </el-table-column>
      </template>
        
      
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
    <el-button @click="seeTableList()">查看组装好的table格式</el-button>
  </div>
</template>
<script>


export default {
  name: 'MyZuhe',
  props: {
    listData: {
      type: [Array],
      default: ()=>{
        return []
      }
    }
  },
  data(){
    return {
      aaaf: [],
      ajaxData: [],
      tableData: [],
      tableList: []
    }
  },
  watch: {
    listData: {
      handler: function(value){
        this.ajaxData = value.map(item=>{
          item.anSelectedId = []
          item.anSelected = []
          return item
        })
      },
      immediate: true
    }
  },
  created(){
  },
  methods: {
    checkBoxChange(res,parentData){
      if(parentData.anSelectedId.length === 0){
        parentData.anSelected = []
        parentData.topTitleName = ''
      }else{
        parentData.topTitleName = parentData.name
        parentData.anSelected = parentData.children.filter(item=>{
          item.topTitleName = parentData.name
          return res.includes(item.id)
        })
      }
      let selectedData = []
      
      this.ajaxData.forEach(item=>{
        if(item.anSelected && item.anSelected.length > 0){
          selectedData.push(item.anSelected)
        }
      })
      console.log(JSON.parse(JSON.stringify(selectedData)))
      this.getArray(selectedData)
    },
    seeTableList(){
      console.log(this.tableList)
    },
    getArray(selectedData = []){
      function originalDataBecomeSimpleTableData(finallyData,addData){
        let linshi = []

        finallyData.forEach(item=>{
          addData.forEach(item2=>{
            linshi.push([].concat(item,item2))
          })
        })
        return linshi
      }
      this.tableList = []
      console.log(JSON.parse(JSON.stringify(selectedData)))
      if(selectedData.length > 0){
        let simpleTableList = selectedData.splice(0,1)[0]

        console.log(JSON.parse(JSON.stringify(simpleTableList)))
        console.log(JSON.parse(JSON.stringify(selectedData)))
        if(selectedData.length > 0){
          selectedData.forEach((item,index,original)=>{
            simpleTableList = originalDataBecomeSimpleTableData(simpleTableList,item)
          })
          console.log(simpleTableList)
          simpleTableList.forEach(item=>{
            console.log(item)
            this.tableList.push({
              ids: item.map(item2=>item2.id).join(','),
              names: item.map(item2=>item2.name).join(','),
              original: [...item]
            })

          })
        }else{
          this.tableList = simpleTableList.map(item=>{
            item.original = [{...item}]
            item.ids = item.id
            item.names = item.name
            return item
          })
        }
        console.log(JSON.parse(JSON.stringify(this.tableList)))
      }
    }
  }
}
</script>
<style>
#content-left{
  display: none;
}
</style>