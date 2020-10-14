<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="incomeData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="日期" width="152">
        <template slot-scope="scope">{{scope.row.cdate | fmtDate2('yyyy-MM-DD ')}}</template>
      </el-table-column>
      <el-table-column align="center" label="收入" prop="income" width="80"></el-table-column>
      <el-table-column align="center" label="充值人数" prop="chargeNum" width="60"></el-table-column>
      <el-table-column align="center" label="充值次数" prop="chargeCount" width="60"></el-table-column>
      <el-table-column align="center" label="首次充值人数" prop="firstChargeNum" width="80"></el-table-column>
      <el-table-column align="center" label="首次充值金额" prop="firstChargeMoney" width="80"></el-table-column>
      <el-table-column align="center" label="新增充值人数" prop="incChargeNum" width="80"></el-table-column>
      <el-table-column align="center" label="新增充值金额" prop="incChargeMoney" width="80"></el-table-column>
      <el-table-column align="center" label="破产充值人数" prop="pcChargeNum" width="80"></el-table-column>
      <el-table-column align="center" label="破产充值金额" prop="pcChargeMoney" width="80"></el-table-column>
      <el-table-column align="center" label="付费率" width="80">
        <template slot-scope="scope">{{scope.row.payRate*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="ARPPU" prop="arppu" width="80"></el-table-column>
      <el-table-column align="center" label="微信充值次数" prop="wxChargeCount" width="80"></el-table-column>
      <el-table-column align="center" label="微信充值金额" prop="wxChargeMoney" width="80"></el-table-column>
      <el-table-column align="center" label="Google充值次数" prop="googleChargeCount" width="90"></el-table-column>
      <el-table-column align="center" label="Google充值金额" prop="googleChargeMoney" width="90"></el-table-column>
      <el-table-column align="center" label="iOS官方充值次数" prop="iosChargeCount" width="90"></el-table-column>
      <el-table-column align="center" label="iOS官方充值金额" prop="iosChargeMoney" width="90"></el-table-column>
      <el-table-column align="center" label="1.99订单" prop="order199" width="60"></el-table-column>
      <el-table-column align="center" label="4.99订单" prop="order499" width="60"></el-table-column>
      <el-table-column align="center" label="9.99订单" prop="order999" width="60"></el-table-column>
      <el-table-column align="center" label="19.99订单" prop="order1999" width="70"></el-table-column>
      <el-table-column align="center" label="49.99订单" prop="order4999" width="70"></el-table-column>
      <el-table-column align="center" label="99.99订单" prop="order9999" width="70"></el-table-column>
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
import { findIncomeSurvey } from "@/api/operationalData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "收入概况",
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
      incomeData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: ""
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.fetchData(form);
    },
    //获取数据
    //findIncomeSurvey(pageIndex, pageSize, deviceType, platformType, gameType, channelId, beginTime, endTime)
    fetchData(data) {

    
      this.$refs.childHide.countryHide = false; //隐藏子组件不要的下拉菜单
      this.listLoading = true;
          this.$refs.childHide.startTimeHide = false
      this.$refs.childHide.endTimeHide = false

      this.$refs.childHide.startTimeDefault = true
      this.$refs.childHide.endTimeDefault = true
    
      findIncomeSurvey(
        this.pageIndex,
        this.pageSize,
        this.deviceType,
        data.company,
        data.loginMethod,
        data.channel,
        data.startTimeNone,
        data.endTimeNone
      ).then(response => {
        this.incomeData = response.data.records;
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
