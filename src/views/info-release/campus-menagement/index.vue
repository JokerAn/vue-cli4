<template>
  <div>
    <el-input v-model="pageInfo.campusName" clearable class="org-input" placeholder="请输入校区名称"
              @clear="getOrgListF()" @keyup.13.native="getOrgListF()">
      <el-button slot="append" icon="el-icon-search" @click="getOrgListF"></el-button>
    </el-input>
    <el-table :data="orgList">
      <el-table-column prop="campusName" label="校区名" min-width="200"></el-table-column>
      <el-table-column label="封面图片" min-width="200">
        <template slot-scope="scope">
          <img :src="scope.row.coverFileUrl" style="width:60px;height:60px" alt="">
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.style === 1">图文</span>
          <span v-if="scope.row.style === 2">图集</span>
          <span v-if="scope.row.style === 3">视频</span>
          <span v-if="scope.row.style === 4">语音</span>
          <span v-if="scope.row.style === 5">其它</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateUserName" label="最后修改人" min-width="200"></el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="edit(scope.row.id)">编辑</el-button>
          <el-button plain>查看</el-button>
        </template>
        
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr"
      :hide-on-single-page="true"
      :current-page.sync="pageInfo.page"
      :page-size="pageInfo.limit"
      layout="prev, pager, next, jumper"
      :total="count"
      @current-change="getOrgListF">
    </el-pagination>
  </div>
</template>

<script>
import {orgListApi} from '@/apis/info-release/campus-menagement'
export default {
  data(){
    return {
      orgList: [],
      pageInfo: {
        campusName: null,
        type: null,
        appId: sessionStorage.getItem('appId'),
        page: 1,
        limit: 6
      },
      count: 0
    }
  },
  created(){
    this.getOrgListF()
  },
  methods: {
    getOrgListF(){
      orgListApi(this.pageInfo).then(result=>{
        this.orgList = result.data
        this.count = result.count
      })
    },
    edit(res){
      this.$router.push({
        path: '/info-release/campus-menagement-campus-info',
        query: {
          id: res
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .org-input{
    width:300px;
    margin-bottom:20px;
  }
</style>