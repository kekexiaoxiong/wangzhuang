<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table v-loading="listLoading" :data="wholeData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="日期" width="160">
        <template slot-scope="scope">{{scope.row.cdate | fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="新增设备" width="160">
        <template slot-scope="scope">{{scope.row.deceiveInc}}</template>
      </el-table-column>
      <el-table-column align="center" label="新增游戏率">
        <template slot-scope="scope">{{scope.row.incRate*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="登录人数">
        <template slot-scope="scope">{{scope.row.loginCount}}</template>
      </el-table-column>
      <el-table-column align="center" label="收入">
        <template slot-scope="scope">{{scope.row.income}}</template>
      </el-table-column>
      <el-table-column align="center" label="充值人数">
        <template slot-scope="scope">{{scope.row.rechargeCount}}</template>
      </el-table-column>
      <el-table-column align="center" label="付费率">
        <template slot-scope="scope">{{scope.row.rechargeRate*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="ARPPU">
        <template slot-scope="scope">{{scope.row.arppu|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="DAU留存">
        <template slot-scope="scope">{{scope.row.dauRemain*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="D1">
        <template slot-scope="scope">{{scope.row.secondRemain*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="D3">
        <template slot-scope="scope">{{scope.row.thirdRemian*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="D7">
        <template slot-scope="scope">{{scope.row.sevenRemain*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="实时LTV">
        <template slot-scope="scope">{{scope.row.ltv|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV1">
        <template slot-scope="scope">{{scope.row.ltv1|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV3">
        <template slot-scope="scope">{{scope.row.ltv3|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV1">
        <template slot-scope="scope">{{scope.row.ltv7|rateSplit(2)}}</template>
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
import { findWholeDataPageList } from "@/api/operationalData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "整体数据",
  components: {
    FindSearch
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
      wholeData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: ""
    };
  },
  mounted() {
    this.findFormData();
   
  },

  methods: {
   

    findFormData() {
      let form = this.$refs.childHide.form //取出子组件的初始值
      this.fetchData(form);
    },
    
    //获取数据
    fetchData(data) {

     
      this.$refs.childHide.countryHide = false; //隐藏子组件不要的按钮
      this.listLoading = true;
    
      findWholeDataPageList(
        this.pageIndex,
        this.pageSize,
        this.deviceType,
        data.loginMethod,
        data.company,
        data.channel,
        data.startTime,
        data.endTime
      ).then(response => {
        this.wholeData = response.data.records;
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
    }
  }
};
</script>
