<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-table v-loading="listLoading" :data="rankData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="排名" type="index" width="100" :index="index"></el-table-column>
      <el-table-column align="center" label="游戏ID" prop="rid" width="120"></el-table-column>
      <el-table-column align="center" label="游戏昵称" prop="nick" width="120"></el-table-column>
      <el-table-column align="center" label="登录方式" prop="platformType" width="100">
        <template slot-scope="scope">{{scope.row.platformType|platformTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="设备种类" prop="devicetype" width="120">
        <template slot-scope="scope">{{scope.row.deviceType|deviceTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="下载渠道" prop="channelId" width="100">
        <template slot-scope="scope">{{scope.row.channelId|chanelFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="150">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="注册IP" prop="regIp" width="120"></el-table-column>
      <el-table-column align="center" label="注册地域" prop="regAddress" width="100"></el-table-column>
      <el-table-column align="center" label="登录IP" prop="loginIp" width="120"></el-table-column>
      <el-table-column align="center" label="登录地域" prop="loginAddress" width="100"></el-table-column>
      <el-table-column align="center" label="最后一次登录时间" width="150">
        <template slot-scope="scope">{{scope.row.lastLoginTime|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="账号状态" prop="state" width="90">
        <template slot-scope="scope">{{scope.row.state|accountStateFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="是否在线" width="90">
        <template slot-scope="scope">{{scope.row.onlineState|onlineStateFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="等级" prop="level" width="80"></el-table-column>
      <el-table-column align="center" label="VIP" prop="vip" width="80"></el-table-column>
      <el-table-column align="center" label="钻石" prop="diamond" width="120"></el-table-column>
      <el-table-column align="center" label="金币" prop="gold" width="120"></el-table-column>
      <el-table-column align="center" label="总金额" prop="payMoney" width="120"></el-table-column>
      <el-table-column align="center" label="登录方式" width="120">
        <template slot-scope="scope">{{scope.row.platformType|platformTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button @click="queryChargeLog(scope.row)" size="mini" type="primary">充值记录</el-button>
          <el-button @click="queryPlayGameLog(scope.row)" size="mini" type="primary">游戏记录</el-button>
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
  </div>
</template>

<script>
import { findChargeRank } from "@/api/operationalData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "充值排行",
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
      rankData: [], //整体数据
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
    //findChargeRank(pageIndex, pageSize, rid, nick, beginTime, endTime)
    fetchData(data) {

    
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;

      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.playerNicknameHide = true;

       this.$refs.childHide.startTimeHide = false
      this.$refs.childHide.endTimeHide = false

      this.$refs.childHide.startTimeDefault = true
      this.$refs.childHide.endTimeDefault = true

      this.listLoading = true;
      console.log(data);
      findChargeRank(
        this.pageIndex,
        this.pageSize,
        data.rid,
        data.nick,
        data.startTimeNone,
        data.endTimeNone
      ).then(response => {
        this.rankData = response.data.records;
      
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


     queryPlayGameLog(row) {
        let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
        this.$router.push({
          path: '/views/gameData/playerManagementCardMonitoring',
          query: {rid: row.rid, startDate: form.startTimeNone, endDate: form.endTimeNone}
        });
      },
      queryChargeLog(row){
         let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
        this.$router.push({
          path: '/views/operationalData/chargeRecord',
          query: {rid: row.rid, startDate: form.startTimeNone, endDate: form.endTimeNone}
        });
      },
  }
};
</script>
