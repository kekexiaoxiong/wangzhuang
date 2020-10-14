<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="achievementData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align='center' label="玩家ID">
          <template slot-scope="scope">{{scope.row.rId}}</template>
        </el-table-column>
        <el-table-column align='center' label="玩家昵称">
          <template slot-scope="scope">{{scope.row.nick}}</template>
        </el-table-column>
        <el-table-column align='center' label="成就类型" width="130px">
          <template slot-scope="scope">{{scope.row.achievementType|achievementTypeFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="成就等级">
          <template slot-scope="scope">{{scope.row.curStage}}</template>
        </el-table-column>
        <el-table-column align='center' label="领取的金币">
          <template slot-scope="scope">{{scope.row.rewardGold}}</template>
        </el-table-column>
        <el-table-column align='center' label="领取积分">
          <template slot-scope="scope">{{scope.row.rewardIntegral}}</template>
        </el-table-column>
        <el-table-column align='center' label="成就积分">
          <template slot-scope="scope">{{scope.row.integral}}</template>
        </el-table-column>
        <el-table-column align='center' label="历史领取积分">
          <template slot-scope="scope">{{scope.row.historyIntegral}}</template>
        </el-table-column>
        <el-table-column align='center' label="历史领取金币">
          <template slot-scope="scope">{{scope.row.historyGold}}</template>
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
import { findAchievement } from "@/api/operationalData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "成就系统",
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
      achievementData: [], //整体数据
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

      this.$refs.childHide.buttomHide1 = true;
      this.$refs.childHide.buttomHide = false;
    },
    //获取数据
    //findAchievement(pageIndex, pageSize, rid, achievementType)
    fetchData(data) {
      (this.$refs.childHide.companyHide = false), //隐藏公司下拉框
        (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.$refs.childHide.loginHide = false), //隐藏登录方式下拉框
        (this.$refs.childHide.channelHide = false), //隐藏渠道下拉框
        (this.$refs.childHide.receiveIdHide = true), //隐藏接受人ID
        (this.$refs.childHide.achievementTypeHide = true), //隐藏成就类型下拉框
        (this.listLoading = true);
        this.$refs.childHide.startTimeHide = false;
          this.$refs.childHide.endTimeHide = false;

      console.log(data);
      findAchievement(
        this.pageIndex,
        this.pageSize,
        data.receiveId,
        data.achievementType,
      ).then(response => {
        this.achievementData = response.data.records;
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
