<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="checkPointData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="日期" width="152">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD')}}</template>
      </el-table-column>

     <el-table-column align='center' label="关卡ID" prop="checkPoint" width="128"></el-table-column>
        <el-table-column align='center' label="总返还率" width="120">
          <template slot-scope="scope">{{scope.row.totalRtp*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="免费回合中奖率" width="150">
          <template slot-scope="scope">{{scope.row.freeWinRate*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <!--                <el-table-column  label="免费回合返还率" width="150" align='center'>-->
        <!--                  <template slot-scope="scope">{{scope.row.freeRtp*100+"%"}}</template>-->
        <!--                </el-table-column>-->
        <el-table-column align='center' label="特殊奖中奖率" width="150">
          <template slot-scope="scope">{{scope.row.specialWinRate*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <!--                <el-table-column  label="特殊返还率" width="120" align='center'>-->
        <!--                  <template slot-scope="scope">{{scope.row.specialRtp*100+"%"}}</template>-->
        <!--                </el-table-column>-->
        <el-table-column align='center' label="奖池中奖率" width="130">
          <template slot-scope="scope">{{scope.row.jackpotWinRate*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <!--                <el-table-column  label="奖池返还率" width="130" align='center'>-->
        <!--                  <template slot-scope="scope">{{scope.row.jackpotRtp*100+"%"}}</template>-->
        <!--                </el-table-column>-->
        <el-table-column align='center' label="总中奖率" width="120">
          <template slot-scope="scope">{{scope.row.allWinRate*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="库存1" width="120">
          <template slot-scope="scope">{{scope.row.inventory1}}</template>
        </el-table-column>
        <el-table-column align='center' label="库存2" width="120">
          <template slot-scope="scope">{{scope.row.inventory2}}</template>
        </el-table-column>
        <el-table-column align='center' label="库存3" width="120">
          <template slot-scope="scope">{{scope.row.inventory3}}</template>
        </el-table-column>
        <el-table-column align='center' label="库存4" width="120">
          <template slot-scope="scope">{{scope.row.inventory4}}</template>
        </el-table-column>
        <el-table-column align='center' label="库存5" width="120">
          <template slot-scope="scope">{{scope.row.inventory5}}</template>
        </el-table-column>
        <el-table-column align='center' label="slot游戏回收" width="120">
          <template slot-scope="scope">{{scope.row.inventory6}}</template>
        </el-table-column>
        <!--        <el-table-column label="奖池备用池" width="120" align='center'>-->
        <!--          <template slot-scope="scope">{{scope.row.total_spend}}</template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="花费金币" width="120" align='center'>-->
        <!--          <template slot-scope="scope">{{scope.row.total_spend}}</template>-->
        <!--        </el-table-column>-->
        <el-table-column align='center' label="关卡人数" width="120">
          <template slot-scope="scope">{{scope.row.num}}</template>
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
import { findCheckPoint } from "@/api/gameData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "关卡监控",
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
      checkPointData: [], //整体数据
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
    //findCheckPoint(pageIndex, pageSize, checkPoint, beginTime, endTime)
    fetchData(data) {
     console.log(data.checkpoint)
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.quickSelectionHide = true;
      this.$refs.childHide.checkpointHide = true;
      this.listLoading = true;
      findCheckPoint(
        this.pageIndex,
        this.pageSize,
        data.checkpoint,
        data.startTime,
        data.endTime
      ).then(response => {
        this.checkPointData = response.data.records;
        console.log(this.checkPointData);
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
