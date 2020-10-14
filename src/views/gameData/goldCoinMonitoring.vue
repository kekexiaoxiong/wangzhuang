<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="goldCoinData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="日期" width="152">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD')}}</template>
      </el-table-column>

     <el-table-column align='center' label="前三次总奖励金币" prop="before4award" width="160"></el-table-column>
        <el-table-column align='center' label="翻牌游戏奖励金币" prop="flopAward" width="180"></el-table-column>
        <el-table-column align='center' label="翻牌花费钻石总数" prop="flopUseDiamond" width="180"></el-table-column>
        <el-table-column align='center' label="重置牌局花费钻石总数" prop="restUseDiamond" width="200"></el-table-column>
        <el-table-column align='center' label="前三次奖励领取次数" prop="before4count" width="180"></el-table-column>
        <el-table-column align='center' label="翻牌游戏游玩次数" prop="flopCount" width="160"></el-table-column>
        <el-table-column align='center' label="花费钻石翻牌次数" prop="flopUseDCount" width="160"></el-table-column>
        <el-table-column align='center' label="花费钻石重置牌局次数" prop="restUseDCount" width="200"></el-table-column>
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
import { findFixedTimeMonitoring } from "@/api/gameData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "定时金币任务",
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
      goldCoinData: [], //整体数据
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
    //findFixedTimeMonitoring(pageIndex, pageSize, beginTime, endTime)
    fetchData(data) {
     
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.quickSelectionHide = true;
      this.$refs.childHide.playerIdHide = false;
      this.$refs.childHide.playerNicknameHide = false;

      
      this.listLoading = true;
      findFixedTimeMonitoring(
        this.pageIndex,
        this.pageSize,
        data.startTime,
        data.endTime
      ).then(response => {
        this.goldCoinData = response.data.records;
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
