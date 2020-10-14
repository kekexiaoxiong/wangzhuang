<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="playerLoginLogData"
      border
      style="width: 100%;"
      class="mtop"
    >
       <el-table-column align='center' label="时间">
          <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD')}}</template>
        </el-table-column>
        <el-table-column align='center' label="玩家ID">
          <template slot-scope="scope">{{scope.row.rid}}</template>
        </el-table-column>
        <el-table-column align='center' label="昵称">
          <template slot-scope="scope">{{scope.row.nick}}</template>
        </el-table-column>
        <el-table-column align='center' label="登录次数" width="160px">
          <template slot-scope="scope">{{scope.row.loginCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="登录类型">
          <template slot-scope="scope">{{scope.row.loginType|platformTypeFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="queryInfo(scope.row)" size="mini" type="primary">登录详情</el-button>
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

      <el-table :data="infoDataList" style="width: 100%">
        <el-table-column align='center' label="玩家ID">
          <template slot-scope="scope">{{scope.row.rid}}</template>
        </el-table-column>
        <el-table-column align='center' label="登录时间" width="180">
          <template slot-scope="scope">{{scope.row.cdate|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align='center' label="日志类型">
          <template slot-scope="scope">{{scope.row.logType|logTypeFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="登录设备">
          <template slot-scope="scope">{{scope.row.deviceType|deviceTypeFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="登录类型">
          <template slot-scope="scope">{{scope.row.loginType|platformTypeFormat}}</template>
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
    </el-dialog>
  </div>
</template>

<script>
import { findPlayerLoginLog,findPlayerLoginInfo } from "@/api/gameData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "玩家登录日志",
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
      infoVisible:false,
      playerLoginLogData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      pageIndexDetail:1,
      pageSizeDetail:15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      dateTime:"",
      infoDataList:[],
      totalDetail:''
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
    //findPlayerLoginLog(pageIndex, pageSize, rid, platformType, beginTime, endTime)
    fetchData(data) {
      
      this.$refs.childHide.loginHide = true; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.playerNicknameHide = false;
      this.listLoading = true;
      findPlayerLoginLog(
        this.pageIndex,
        this.pageSize,
        data.rid,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
       
        this.playerLoginLogData = response.data.records;
        console.log(this.playerLoginLogData);
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

     //点击详情按钮
      queryInfo(row) {
        this.infoVisible = true;
        console.log(row.cdate)
        this.dateTime = this.$options.filters['fmtDate'](row.cdate, "yyyy-MM-DD");
        console.log(this.dateTime)
        this.dateTime = this.$options.filters['fmtDate2'](row.cdate, "yyyy-MM-DD");
        console.log(this.dateTime)
        findPlayerLoginInfo(this.pageIndexDetail, this.pageSizeDetail, row.rid, this.dateTime).then(res => {
         this.infoDataList = res.data.records
         this.totalDetail = res.data.total
          
        })
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
