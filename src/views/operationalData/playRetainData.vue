<template>
  <div class="app-container">
   <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table v-loading="listLoading" :data="playRetainData" border style="width: 100%;" class="mtop">
      <el-table-column align='center' label="日期"
                         width="152">
          <template slot-scope="scope">{{scope.row.cdate | fmtDate2('yyyy-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align='center' label="总安装" width="120">
          <template slot-scope="scope">{{scope.row.accountInc}}</template>
        </el-table-column>
        <el-table-column align='center' label="设备新增" width="120">
          <template slot-scope="scope">{{scope.row.deviceInc}}</template>
        </el-table-column>
        <el-table-column align='center' label="新增用户" width="120">
          <template slot-scope="scope">{{scope.row.accountInc}}</template>
        </el-table-column>
        <el-table-column align='center' label="DAU" width="120">
          <template slot-scope="scope">{{scope.row.dau}}</template>
        </el-table-column>
        <el-table-column align='center' label="花费" width="120">
          <template slot-scope="scope">{{scope.row.consumeMoney}}</template>
        </el-table-column>
        <el-table-column align='center' label="收入" width="120">
          <template slot-scope="scope">{{scope.row.totalMoney}}</template>
        </el-table-column>
        <el-table-column align='center' label="实时留存" width="120">
          <template slot-scope="scope">{{scope.row.retain*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="DAU留存" width="100">
          <template slot-scope="scope">{{scope.row.dauRemain*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D1" width="120">
        <template slot-scope="scope">{{scope.row.retain1*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
        <el-table-column align='center' label="留存D2" width="120">
          <template slot-scope="scope">{{scope.row.retain2*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D3" width="150">
          <template slot-scope="scope">{{scope.row.retain3*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D4" width="120">
          <template slot-scope="scope">{{scope.row.retain4*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D5" width="120">
          <template slot-scope="scope">{{scope.row.retain5*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D6" width="120">
          <template slot-scope="scope">{{scope.row.retain6*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D7" width="120">
          <template slot-scope="scope">{{scope.row.retain7*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D14" width="150">
          <template slot-scope="scope">{{scope.row.retain14*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D21" width="120">
          <template slot-scope="scope">{{scope.row.retain21*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D30" width="120">
          <template slot-scope="scope">{{scope.row.retain30*100|rateSplit(2)+"%"}}</template>
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
import { findPlayerRatain } from "@/api/operationalData";
 import FindSearch from '@/common/FindSearch'
export default {
  name: "玩家留存",
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
      playRetainData: [], //整体数据
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
    //findPlayerRatain(pageIndex, pageSize, gameType, country, channelId, beginTime, endTime)
    fetchData(data) {
     
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.listLoading = true;
      this.$refs.childHide.startTimeHide = false
      this.$refs.childHide.endTimeHide = false

      this.$refs.childHide.startTimeDefault = true
      this.$refs.childHide.endTimeDefault = true

      findPlayerRatain(
        this.pageIndex,
        this.pageSize,
        data.company,
        data.country,
        data.channel,
        data.startTimeNone ,
        data.endTimeNone
      ).then(response => {
        this.playRetainData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;

        
      });
    },
  
    // 整体数据分页组件
    currentChange( currentPage) {
      this.pageIndex = currentPage;
       this.findFormData();
      //每页下拉显示数据
    },
    sizeChange(size) {
      this.pageSize = size;
       this.findFormData();
      //点击第几页
    },
  }
};
</script>
