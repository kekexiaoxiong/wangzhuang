<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="vipListData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align='center' label="玩家ID">
          <template slot-scope="scope">{{scope.row.rid}}</template>
        </el-table-column>
        <el-table-column align='center' label="玩家昵称">
          <template slot-scope="scope">{{scope.row.nick}}</template>
        </el-table-column>
        <el-table-column align='center' label="VIP等级" width="130px">
          <template slot-scope="scope">{{scope.row.vipLevel}}</template>
        </el-table-column>
        <el-table-column align='center' label="充值金额">
          <template slot-scope="scope">{{scope.row.dollar|rateSplit(2)}}</template>
        </el-table-column>
        <el-table-column align='center' label="注册时间">
          <template slot-scope="scope">{{scope.row.regTime|fmtDate('yyyy-MM-DD HH:mm:ss')}}</template>
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
import { findVipList } from "@/api/operationalData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "vip系统",
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
      vipListData: [], //整体数据
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
    //findVipList(pageIndex, pageSize, rid, vipLevel)
    fetchData(data) {

        (this.$refs.childHide.buttomHide1 = true), 
        (this.$refs.childHide.buttomHide = false),

      (this.$refs.childHide.startTimeHide = false), //隐藏公司下拉框
        (this.$refs.childHide.endTimeHide = false), //隐藏国家下拉框


      (this.$refs.childHide.companyHide = false), //隐藏公司下拉框
        (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.$refs.childHide.loginHide = false), //隐藏登录方式下拉框
        (this.$refs.childHide.channelHide = false), //隐藏渠道下拉框
        (this.$refs.childHide.playerIdHide = true), //隐藏玩家id input框
        (this.$refs.childHide.gradeHide = true), //隐藏vip等级下拉框
        (this.listLoading = true);
      console.log(data);
      findVipList(
        this.pageIndex,
        this.pageSize,
        data.rid,
        data.vipLevel,
        
      ).then(response => {
        this.vipListData = response.data.records;
      
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
