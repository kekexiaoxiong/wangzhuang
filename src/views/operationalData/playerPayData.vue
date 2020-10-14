<template>
  <div class="app-container">
   <find-search ref="childHide" v-on:searchData="fetchData"></find-search>
    <el-table v-loading="listLoading" :data="newOldData" border style="width: 100%;" class="mtop">
     <el-table-column align='center' label="日期"
                         width="152">
        <template slot-scope="scope">{{scope.row.cdate | fmtDate2('yyyy-MM-DD ')}}</template>
        </el-table-column>
        <el-table-column align='center' label="总安装" width="120">
          <template slot-scope="scope">{{scope.row.accountInc}}</template>
        </el-table-column>
        <el-table-column align='center' label="花费" width="120">
          <template slot-scope="scope">{{scope.row.consumeMoney}}</template>
        </el-table-column>
        <el-table-column align='center' label="收入" width="120">
          <template slot-scope="scope">{{scope.row.totalMoney}}</template>
        </el-table-column>
        <el-table-column align='center' label="DAU" width="120">
          <template slot-scope="scope">{{scope.row.dau}}</template>
        </el-table-column>

        <el-table-column align='center' label="新用户付费率" width="120">
          <template slot-scope="scope">{{scope.row.newAccountChargeRate*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="新用户ARPU" width="120">
          <template slot-scope="scope">{{scope.row.newAccountArpu|rateSplit(2)}}</template>
        </el-table-column>
        <el-table-column align='center' label="新用户ARPPU" width="150">
          <template slot-scope="scope">{{scope.row.newAccountArppu|rateSplit(2)}}</template>
        </el-table-column>
        <el-table-column align='center' label="老用户付费率" width="120">
          <template slot-scope="scope">{{scope.row.oldAccountChargeRate*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="老用户ARPU" width="120">
          <template slot-scope="scope">{{scope.row.oldAccountArpu|rateSplit(2)}}</template>
        </el-table-column>
        <el-table-column align='center' label="老用户ARPPU" width="120">
          <template slot-scope="scope">{{scope.row.oldAccountArppu|rateSplit(2)}}</template>
        </el-table-column>
        <el-table-column align='center' label="新用户实时留存" width="120">
          <template slot-scope="scope">{{scope.row.remain*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="D1" width="120">
          <template slot-scope="scope">{{scope.row.remain1*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="D2" width="120">
          <template slot-scope="scope">{{scope.row.remain2*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="D3" width="120">
          <template slot-scope="scope">{{scope.row.remain3*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="D4" width="120">
          <template slot-scope="scope">{{scope.row.remain4*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="D5" width="120">
          <template slot-scope="scope">{{scope.row.remain5*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="D6" width="120">
          <template slot-scope="scope">{{scope.row.remain6*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="D7" width="120">
          <template slot-scope="scope">{{scope.row.remain7*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
    </el-table>
    <div style="text-align: center ; margin-top:30px;">
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          :current-page="pageIndex"
          :page-size="pageSize"
          :page-sizes="[15, 20, 30, 40]"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { findPlayerPayData } from "@/api/operationalData";
 import FindSearch from '@/common/FindSearch'
export default {
  name: "新老玩家付费情况",
  components: {
    FindSearch,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      newOldData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType:0,
      platformType: "",
      total: "", 
      country:''  
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    findFormData() {
        let form = this.$refs.childHide.form  //取出子组件的下拉框初始值
        this.fetchData(form);
    },
    //获取数据
    //findPlayerPayData(pageIndex, pageSize, gameType, country, channelId, beginTime, endTime)
    fetchData(data) {

      
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.listLoading = true;


      this.$refs.childHide.startTimeHide = false
      this.$refs.childHide.endTimeHide = false

      this.$refs.childHide.startTimeDefault = true
      this.$refs.childHide.endTimeDefault = true
   
      findPlayerPayData(
        this.pageIndex,
        this.pageSize,
        data.company,
        data.country,
        data.channel,
        data.startTimeNone,
        data.endTimeNone
      ).then(response => {
        this.newOldData = response.data.records;
     
        this.total = response.data.total;
        this.listLoading = false;

       
      });
    },
  
    // 整体数据分页组件
    currentChange(size) {
      this.pageIndex = size;
      this.findFormData();
      //每页下拉显示数据
    },
    sizeChange(currentPage) {
      this.pageSize = currentPage;
      this.findFormData();
      //点击第几页
    },
  }
};
</script>
