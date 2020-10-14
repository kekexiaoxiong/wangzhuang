<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="playerWinCtrData"
      border
      style="width: 100%;"
      class="mtop"
    >
     <el-table-column align='center' label="添加时间"
                         width="152">
          <template slot-scope="scope">{{scope.row.addTime|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align='center' label="玩家ID">
          <template slot-scope="scope">{{scope.row.rid}}</template>
        </el-table-column>
        <el-table-column align='center' label="昵称" width="160">
          <template slot-scope="scope">{{scope.row.nick}}</template>
        </el-table-column>
        <el-table-column align='center' label="平台">
          <template slot-scope="scope">{{scope.row.channelId|channelFilter}}</template>
        </el-table-column>
        <el-table-column align='center' label="登录方式">
          <template slot-scope="scope">{{scope.row.loginType|loginTypeFilter}}</template>
        </el-table-column>
        <el-table-column align='center' label="玩家等级">
          <template slot-scope="scope">{{scope.row.level}}</template>
        </el-table-column>
        <el-table-column align='center' label="普通游戏控制区域" width="160">
          <template slot-scope="scope">{{scope.row.normalCheck}}</template>
        </el-table-column>
        <el-table-column align='center' label="是否开启普通游戏控制" width="200">
          <template slot-scope="scope">{{scope.row.normalFlag | openFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="普通游戏控制倍数" width="160">
          <template slot-scope="scope">{{scope.row.normalMultiple}}</template>
        </el-table-column>
        <el-table-column align='center' label="普通游戏控制率" width="160">
          <template slot-scope="scope">{{scope.row.normalWeightNum}}</template>
        </el-table-column>

        <el-table-column align='center' label="FreeSpin控制区域" width="160">
          <template slot-scope="scope">{{scope.row.freeCheck}}</template>
        </el-table-column>
        <el-table-column align='center' label="是否开启FreeSpin控制" width="200">
          <template slot-scope="scope">{{scope.row.freeFlag|openFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="FreeSpin控制率" width="160">
          <template slot-scope="scope">{{scope.row.freeWeightNum}}</template>
        </el-table-column>

        <el-table-column align='center' label="公共奖池控制区域" width="160">
          <template slot-scope="scope">{{scope.row.jackpotCheck}}</template>
        </el-table-column>
        <el-table-column align='center' label="是否开启公共奖池控制" width="200">
          <template slot-scope="scope">{{scope.row.jackpotFlag|openFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="公共奖池控制率" width="160">
          <template slot-scope="scope">{{scope.row.jackpotWeightNum}}</template>
        </el-table-column>
        <el-table-column align='center' label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="updateDialog(scope.row)" size="mini" type="primary">编辑</el-button>
            <el-button @click="deleteDialog(scope.row)" size="mini" type="danger">删除</el-button>
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
import { findPlayerWinCtr } from "@/api/gmCenter";
import FindSearch from "@/common/FindSearch";
export default {
  name: "单点控制",
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
      playerWinCtrData: [], //整体数据
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
      console.log(form.startTime + "___" + form.endTime);
      this.fetchData(form);
    },
    //获取数据
    //findPlayerWinCtr(rid, nick, pageIndex, pageSize)
    fetchData(data) {
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.loginHide = false;
       this.$refs.childHide.channelHide = false;
     
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.playerNicknameHide = true;
   
      this.listLoading = true;
      findPlayerWinCtr( 
        data.rid,
        data.nick,
        this.pageIndex,
        this.pageSize,

      ).then(response => {
        this.playerWinCtrData = response.data.records;
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
