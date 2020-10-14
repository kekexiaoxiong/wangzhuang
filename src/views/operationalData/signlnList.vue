<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table v-loading="listLoading" :data="newOldData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">{{scope.row.cdate | fmtDate('yyyy-MM-DD')}}</template>
      </el-table-column>
      <el-table-column align="center" label="freegift签到人数">
        <template slot-scope="scope">{{scope.row.freegiftTotal}}</template>
      </el-table-column>
      <el-table-column align="center" label="paying gift签到人数" width="160px">
        <template slot-scope="scope">{{scope.row.payingGiftTotal}}</template>
      </el-table-column>
      <el-table-column align="center" label="玩家消耗钻石">
        <template slot-scope="scope">{{scope.row.diamondTotal}}</template>
      </el-table-column>
      <el-table-column align="center" label="充值金额">
        <template slot-scope="scope">{{scope.row.rechargeMoneyTotal}}</template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="queryInfo(scope.row)" size="mini" type="primary">查看详情</el-button>
        </template>
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

    <el-dialog :close-on-click-modal="false" :visible.sync="infoVisible" width="60%">
      <h2 style="margin-top:-20px">{{title}}</h2>
      <!-- 搜索框 -->
      <el-form  label-width="100px" style="overflow: auto;">
        <el-form-item label="玩家ID:"  style="float:left;">
          <el-input  placeholder="请输入玩家ID" style="width: 200px" v-model="rId"></el-input>
        </el-form-item>

        <el-form-item label style="float:left;" >
           <el-button @click.stop='getInfoDataList' style="margin-top:5px" size="mini" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
              
      <el-table :data="infoDataList"  style="width: 100%">
        <el-table-column align="center" label="玩家ID">
          <template slot-scope="scope">{{scope.row.rid}}</template>
        </el-table-column>
        <el-table-column align="center" label="玩家昵称">
          <template slot-scope="scope">{{scope.row.nick}}</template>
        </el-table-column>
        <el-table-column align="center" label="freegift签到">
          <template slot-scope="scope">{{scope.row.freegiftCount}}</template>
        </el-table-column>
        <el-table-column align="center" label="paying gift签到" width="180">
          <template slot-scope="scope">{{scope.row.payingGiftCount}}</template>
        </el-table-column>
        <el-table-column align="center" label="消耗钻石">
          <template slot-scope="scope">{{scope.row.diamond}}</template>
        </el-table-column>
        <el-table-column align="center" label="充值金额">
          <template slot-scope="scope">{{scope.row.rechargeMoney}}</template>
        </el-table-column>
      </el-table>
       <div style="text-align: center ; margin-top:30px;">
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          :current-page="pageIndexDetail"
          :page-size="pageSizeDetail"
          :page-sizes="[15, 20, 30, 40]"
          :total="totalDetail"
          @current-change="currentChangeDetail"
          @size-change="sizeChangeDetail"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
      <!-- 分页 -->
    </el-dialog>
  </div>
</template>

<script>
import { findSignlnList,findSignlnlnfoList } from "@/api/operationalData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "签到系统",
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
      infoVisible: false,
      newOldData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      pageIndexDetail: 1,
      pageSizeDetail: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      totalDetail:"",
      country: "",
      
      rId:'',
   
      infoDataList:'',
      date:''
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
    //findSignlnList(pageIndex, pageSize, beginTime, endTime)
    fetchData(data) {

     
      (this.$refs.childHide.companyHide = false), //隐藏公司下拉框
        (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.$refs.childHide.loginHide = false), //隐藏登录方式下拉框
        (this.$refs.childHide.channelHide = false), //隐藏渠道下拉框
        (this.$refs.childHide.startTimeHide = false);
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;

      this.listLoading = true;
      findSignlnList(
        this.pageIndex,
        this.pageSize,
        data.startTimeNone,
        data.endTimeNone
      ).then(response => {
        this.newOldData = response.data.records;
      
        this.total = response.data.total;
        this.listLoading = false;

       
      });
    },
    

    //查询签到详情
    getInfoDataList(){
       findSignlnlnfoList(
        this.pageIndex,
        this.pageSize,
        this.date,
        this.rId
      ).then(res => {
        this.infoDataList =  res.data.records
        console.log(this.infoDataList);
      });
    },


    queryInfo(data) {
      this.date = this.$options.filters['fmtDate'](data.cdate, "yyyy-MM-DD");
      this.infoVisible = true;
      findSignlnlnfoList(
        this.pageIndex,
        this.pageSize,
        this.date,
        this.rId
      ).then(res => {
        this.totalDetail = res.data.total
        this.infoDataList =  res.data.records
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

    // 详细数据
    currentChangeDetail(size) {
      this.pageIndexDetail = size;
      this.queryInfo();
      //每页下拉显示数据
    },
    sizeChangeDetail(currentPage) {
      this.pageSizeDetail = currentPage;
      this.queryInfo();
      //点击第几页
    }
  }
};
</script>
