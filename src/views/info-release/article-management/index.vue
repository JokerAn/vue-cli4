<template>
  <div>
    <div>文章管理</div>
    <el-row>
      <el-form>
        <el-form-item v-for="(item01,index01) in ajaxData" :key="index01" :label="item01.name +':' ">
          <template v-if="item01.children&&item01.children.length>0">
            <el-checkbox-group v-model="item01.anSelectedId" style="display:inline-block;margin-left:20px;" @change="checkBoxChange($event,item01)">
              <el-checkbox v-for="(item02,index02) in item01.children" :key="index02" :label="item02.id+''">{{ item02.name }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      {{ tableList }}
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
    <el-button @click="huixianshujuF()">回显数据</el-button>
    <el-button @click="seeTableList()">查看组装好的table格式</el-button>
  </div>
</template>
<script>
import { specifications } from '@/utils/specifications.js'

export default {
  data(){
    return {
      //测试回显数据 模拟后台返回格式
      huixianshuju: [
        {
          'ids': '1,2,2',
          'names': '颜色-红色,尺寸-39码,快递-顺丰',
          'price': '1',
          'kucun': '2'
        },
        {
          'ids': '1,5,2',
          'names': '颜色-红色,尺寸-42码,快递-顺丰',
          'price': '3',
          'kucun': '4'
        },
        {
          'ids': '3,2,2',
          'names': '颜色-黑色,尺寸-39码,快递-顺丰',
          'price': '5',
          'kucun': '6'
        },
        {
          'ids': '3,5,2',
          'names': '颜色-黑色,尺寸-42码,快递-顺丰',
          'price': '7',
          'kucun': '8'
        }
      ],
      aaaf: [],
      ajaxData: [],
      tableData: [],
      tableList: []
    }
  },
  created(){
    this.ajaxData = [
      {
        name: '颜色',id: 1,children: [
          {id: 1,name: '红色'},{id: 2,name: '黄色'},{id: 3,name: '黑色'}
        ]
      },
      {
        name: '尺寸',id: 1,children: [
          {id: 1,name: '38码'},{id: 2,name: '39码'},{id: 3,name: '40码'},
          {id: 4,name: '41码'},{id: 5,name: '42码'},{id: 6,name: '43码'}
        ]
      },
      {
        name: '快递',id: 1,children: [
          {id: 1,name: '京东物流'},{id: 2,name: '顺丰'},{id: 3,name: '韵达'},
          {id: 4,name: '圆通'},{id: 5,name: '百世快递'}
        ]
      }
    ].map(item=>{
      item.id = String(item.id)
      item.anSelectedId = item.anSelectedId || []
      item.anSelected = item.anSelected || []
      item.children = item.children.map(item2=>{
        item2.id = String(item2.id)
        return item2
      })
      return item
    })
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
      this.tableList = specifications(selectedData)
      console.log(this.tableList)
    },
    seeTableList(){
      console.log(this.tableList)
    },
    // 回显数据
    huixianshujuF(){
      //已经被选中的行的name
      let selectedNames = this.huixianshuju[0].names.split(',')
      
      //组合数据准备盛放每一行被选中的id
      let xyzSelected = {}

      selectedNames = selectedNames.map((item, index) => {
        xyzSelected[item.split('-')[0]] = []
        let name = item.split('-')[0]

        item = name
        return item
      })
      console.log({'已经被选中的行的name': selectedNames})
      console.log(JSON.parse(JSON.stringify({'组合数据准备盛放每一行被选中的id': xyzSelected})))

      //得到每一行的 被选中的id
      selectedNames.forEach((item,index)=>{
        this.huixianshuju.forEach(item2=>{
          let idsArray = item2.ids.split(',')

          if(!xyzSelected[item].includes(idsArray[index])){
            xyzSelected[item].push(idsArray[index])
          }
        })
      })
      console.log(JSON.parse(JSON.stringify({'组合数据准备盛放每一行被选中的id': xyzSelected})))

      //将选中id放回的最初数据中 直接模拟选中
      for(var key in xyzSelected){
        this.ajaxData.forEach(item=>{
          if(item.name === key){
            item.anSelectedId = xyzSelected[key]
            item.anSelected = item.children.filter(item2=>{
              item2.topTitleName = item.name
              return xyzSelected[key].includes(String(item2.id))
            })
          }
        })
      }
      console.log(JSON.parse(JSON.stringify(this.ajaxData)))
      this.ajaxData = [...this.ajaxData]
      let selectedData = []

      this.ajaxData.forEach(item=>{
        if(item.anSelected && item.anSelected.length > 0){
          selectedData.push(item.anSelected)
        }
      })
      console.log(JSON.parse(JSON.stringify(selectedData)))
      this.tableList = specifications(selectedData)
      //回显 数据
      this.tableList.forEach(item=>{
        this.huixianshuju.forEach(item2=>{
          if(item.ids === item2.ids){
            item.price = item2.price
            item.kucun = item2.kucun
          }
        })
      })
    }
  }
}
</script>
<style>
#content-left{
  display: none;
}
</style>