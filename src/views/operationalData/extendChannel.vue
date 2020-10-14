<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="extendChannelData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="游戏ID" prop="rid" width="80"></el-table-column>
      <el-table-column align="center" label="游戏昵称" prop="nick" width="120"></el-table-column>
      <el-table-column align="center" label="登录方式" prop="platformType" width="80">
        <template slot-scope="scope">{{scope.row.platformType|platformTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="设备种类" prop="devicetype" width="80">
        <template slot-scope="scope">{{scope.row.deviceType|deviceTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="下载渠道" prop="channelId" width="80">
        <template slot-scope="scope">{{scope.row.channelId|chanelFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="150">
        <template slot-scope="scope">{{scope.row.cdate | fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="本地注册时间" width="150">
        <template
          slot-scope="scope"
        >{{scope.row.cdate|localDateTime(scope.row.regAddress,'yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="注册IP" prop="regIp" width="130"></el-table-column>
      <el-table-column align="center" label="注册地域" prop="regAddress" width="160"></el-table-column>
      <el-table-column align="center" label="登录IP" prop="loginIp" width="120"></el-table-column>
      <el-table-column align="center" label="登录地域" prop="loginAddress" width="100"></el-table-column>
      <el-table-column align="center" label="最后一次登录时间" width="150">
        <template slot-scope="scope">{{scope.row.lastLoginTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="最后一次登录本地时间" width="150">
        <template
          slot-scope="scope"
        >{{scope.row.lastLoginTime|localDateTime(scope.row.loginAddress,'yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>

      <el-table-column align="center" label="账号状态" prop="state" width="90">
        <template slot-scope="scope">{{scope.row.state|accountStateFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="是否在线" width="90">
        <template slot-scope="scope">{{scope.row.onlineState|onlineStateFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="历史总充值" prop="historyPay" width="110"></el-table-column>
      <el-table-column align="center" label="等级" prop="level" width="80"></el-table-column>
      <el-table-column align="center" label="VIP" prop="vip" width="80"></el-table-column>
      <el-table-column align="center" label="钻石" prop="diamond" width="120"></el-table-column>
      <el-table-column align="center" label="金币" prop="gold" width="120"></el-table-column>
      <el-table-column align="center" label="联系方式" prop="email" width="120"></el-table-column>

      <el-table-column align="center" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
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
import { findExtendChannel } from "@/api/operationalData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "推广渠道",
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
      extendChannelData: [], //整体数据
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
  created() {
    if (this.$route.query.rid != null) {
      this.rid = this.$route.query.rid;
    }
    this.findFormData();
  },

  mounted() {
    this.findFormData();
  },
  methods: {
    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      if (this.$route.query.rid != null) {
        form.rid = this.$route.query.rid;
      }
      this.fetchData(form);
    },
    //获取数据
    //findExtendChannel(pageIndex, pageSize, rid, channelId, onlineState, beginTime, endTime)
    fetchData(data) {
      (this.$refs.childHide.companyHide = false), //隐藏公司下拉框
        (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.$refs.childHide.loginHide = false), //隐藏登录方式下拉框
        (this.$refs.childHide.playerIdHide = true),
        (this.$refs.childHide.onlineStateHide = true),
        (this.listLoading = true);
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;
      console.log(data);
      findExtendChannel(
        this.pageIndex,
        this.pageSize,
        data.rid,
        data.channel,
        data.onlineState,
        data.startTimeNone,
        data.endTimeNone
      )
        .then(response => {
          this.extendChannelData = response.data.records;
          console.log(this.extendChannelData);

          // if (response.data.length === 0) {
          //     this.listLoading = false;
          //  }

          this.listLoading = false;
          this.total = response.data.total;
        })
        .catch(err => {
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
      this.$router.push({
        path: "/views/gameData/playerManagementCardMonitoring",
        query: {
          rid: row.rid,
          startDate: this.startTime,
          endDate: this.endTime
        }
      });
    }
  }
};
</script>
