<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="roleMonitoringData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="日期" width="152">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD')}}</template>
      </el-table-column>

     <el-table-column align='center' label="玩家ID" prop="rid" width="208"></el-table-column>
        <el-table-column align='center' label="玩家名称" prop="nick" width="220"></el-table-column>
        <el-table-column align='center' label="总返还率" width="200">
          <template slot-scope="scope">{{scope.row.rtp*100|rateSplit(2) +"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="总中奖率" width="200">
          <template slot-scope="scope">{{scope.row.winRate*100|rateSplit(2) +"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="花费金币" width="170">
          <template slot-scope="scope">{{scope.row.curSpendGold}}</template>
        </el-table-column>
        <el-table-column align='center' label="花费钻石" width="170">
          <template slot-scope="scope">{{scope.row.spendDiamond}}</template>
        </el-table-column>
        <el-table-column align='center' label="操作" width="180">
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
import { findRoleMonitoring } from "@/api/gameData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "玩家监控",
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
      roleMonitoringData: [], //整体数据
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
    //findRoleMonitoring(pageIndex, pageSize, rid, nick, beginTime, endTime)
    fetchData(data) {
     
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.quickSelectionHide = true;

      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.playerNicknameHide = true;

      
      this.listLoading = true;
      findRoleMonitoring(
        this.pageIndex,
        this.pageSize,
        data.rid,
        data.nick,
        data.startTime,
        data.endTime
      ).then(response => {
        this.roleMonitoringData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      
      });
    },



     queryPlayGameLog(row) {
        console.log(row)
        this.$router.push({
          path: '/views/gameData/playerManagementCardMonitoring',
          query: {rid: row.rid, startDate: this.$options.filters['fmtDate'](row.cdate, "yyyy-MM-DD"), endDate: this.$options.filters['fmtDate'](row.cdate, "yyyy-MM-DD")}
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
