<template>
  <div class="app-container">
   <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table v-loading="listLoading" :data="twReportData" border style="width: 100%;" class="mtop">
       <el-table-column align='center' label="日期"
                           width="152">
            <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD')}}</template>
          </el-table-column>
          <el-table-column align='center' label="星期"
                           width="152">
            <template slot-scope="scope">{{scope.row.dateStr}}</template>
          </el-table-column>
          <el-table-column align='center' label="公司" width="120">
            <template slot-scope="scope">{{scope.row.gameType|gameTypeFormat}}</template>
          </el-table-column>
          <el-table-column align='center' label="国家" width="120">
            <template slot-scope="scope">{{scope.row.country|countryFormat}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU" width="100">
            <template slot-scope="scope">{{scope.row.dau}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增帳號" width="100">
            <template slot-scope="scope">{{scope.row.accountInc}}</template>
          </el-table-column>
          <el-table-column align='center' label="PCU" width="100">
            <template slot-scope="scope">{{scope.row.pcu}}</template>
          </el-table-column>
          <el-table-column align='center' label="ACU" width="100">
            <template slot-scope="scope">{{scope.row.acu}}</template>
          </el-table-column>
          <el-table-column align='center' label="營收" width="100">
            <template slot-scope="scope">{{scope.row.payMoney}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU帳號付費數" width="100">
            <template slot-scope="scope">{{scope.row.chargeUser}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU付費率" width="100">
            <template slot-scope="scope">{{scope.row.chargeRate*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU ARPPU" width="100">
            <template slot-scope="scope">{{scope.row.dauArppu}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU ARPU" width="100">
            <template slot-scope="scope">{{scope.row.dauArpu}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增帳號付費數" width="100">
            <template slot-scope="scope">{{scope.row.newAccountChargeUser}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增帳號付費率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountChargeRate*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增ARPPU" width="100">
            <template slot-scope="scope">{{scope.row.newAccountArppu}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增ARPU" width="100">
            <template slot-scope="scope">{{scope.row.newAccountArpu}}</template>
          </el-table-column>
          <el-table-column align='center' label="行銷費用" width="100">
            <template slot-scope="scope">{{scope.row.consumeMoney}}</template>
          </el-table-column>
          <el-table-column align='center' label="總下載量" width="100">
            <template slot-scope="scope">{{scope.row.downloadNum}}</template>
          </el-table-column>
          <el-table-column align='center' label="綜合CPI" width="100">
            <template slot-scope="scope">{{scope.row.cpi}}</template>
          </el-table-column>
          <el-table-column align='center' label="綜合CPA" width="100">
            <template slot-scope="scope">{{scope.row.cpa}}</template>
          </el-table-column>
          <el-table-column align='center' label="媒體費用" width="100">
            <template slot-scope="scope">{{scope.row.mediaMoney}}</template>
          </el-table-column>
          <el-table-column align='center' label="媒體下載量" width="100">
            <template slot-scope="scope">{{scope.row.mediaDownloadNum}}</template>
          </el-table-column>
          <el-table-column align='center' label="媒體CPI" width="100">
            <template slot-scope="scope">{{scope.row.mediaCpi}}</template>
          </el-table-column>
          <el-table-column align='center' label="自然下載量" width="100">
            <template slot-scope="scope">{{scope.row.nativeInc}}</template>
          </el-table-column>
          <el-table-column align='center' label="自然流量比" width="100">
            <template slot-scope="scope">{{scope.row.nativeRate}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU次日留存帳號數" width="100">
            <template slot-scope="scope">{{scope.row.dauRemain2dayNum}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU次日留存率" width="100">
            <template slot-scope="scope">{{scope.row.dauRemain2day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU付費帳號次日留存帳號數" width="100">
            <template slot-scope="scope">{{scope.row.dauChargeRemain2dayNum}}</template>
          </el-table-column>
          <el-table-column align='center' label="DAU付費帳號次日留存率" width="100">
            <template slot-scope="scope">{{scope.row.dauChargeRemain2day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增付費次日留存帳號數" width="100">
            <template slot-scope="scope">{{scope.row.newAccountChargeRemain2dayNum}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增付費帳號次日留存率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountChargeRemain2day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增付費帳號３日留存率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountChargeRemain3day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增付費帳號７日留存率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountChargeRemain7day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增付費帳號３０日留存率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountChargeRemain30day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增帳號次日留存帳號數" width="100">
            <template slot-scope="scope">{{scope.row.newAccountRemain2dayNum}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增帳號次日留存率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountRemain2day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增帳號３日留存率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountRemain3day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增帳號７日留存率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountRemain7day*100|rateSplit(2)+"%"}}</template>
          </el-table-column>
          <el-table-column align='center' label="新增帳號30日留存率" width="100">
            <template slot-scope="scope">{{scope.row.newAccountRemain30day*100|rateSplit(2)+"%"}}</template>
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
import { findTwReport } from "@/api/taiwanData";
 import FindSearch from '@/common/FindSearch'
export default {
  name: "数据报表",
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
      twReportData: [], //整体数据
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
    //findTwReport(gameType, country, channelId, beginTime, endTime, pageIndex, pageSize)
    fetchData(data) {
     this.twReportData = [];
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.listLoading = true;
      this.$refs.childHide.startTimeHide = false
      this.$refs.childHide.endTimeHide = false
      this.$refs.childHide.startTimeDefault = true
      this.$refs.childHide.endTimeDefault = true

      findTwReport(
       
        data.company,
        data.country,
        data.channel,
        data.startTimeNone ,
        data.endTimeNone,
         this.pageIndex,
        this.pageSize,
      ).then(response => {
        this.twReportData = response.data.records;
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
