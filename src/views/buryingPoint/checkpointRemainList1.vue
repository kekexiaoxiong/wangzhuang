<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="receiveMsgData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="邮件类型">
        <template slot-scope="scope">{{scope.row.msgType|mailMsgTypeFormat}}</template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="接收人ID">
        <template slot-scope="scope">{{scope.row.rid}}</template>
      </el-table-column>
      <el-table-column align="center" label="邮件发送时间" width="130px">
        <template slot-scope="scope">{{scope.row.createData|fmtDate('yyyy-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="是否领取">
        <template slot-scope="scope">{{scope.row.type|receiveTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="领取时间">
        <template slot-scope="scope">{{scope.row.receiveTime|fmtDate('yyyy-MM-DD HH:mm:ss')}}</template>
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
import { findMachineDetail } from "@/api/buryingPoint";
import FindSearch from "@/common/FindSearch";
export default {
  name: "机台详情",
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
      receiveMsgData: [], //整体数据
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
    //findMailRecList(rid, msgType, beginTime, endTime, pageIndex, pageSize)
    fetchData(d) {
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;

      this.$refs.childHide.testPlayerHide = true;
      this.$refs.childHide.messageTypeHide = false;
      this.$refs.childHide.playerIdHide = false;
      this.$refs.childHide.receiveIdHide = false;
      this.$refs.childHide.playerNicknameHide = false;
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;


      this.listLoading = true;

      //findMachineDetail(country, channelId, type, beginTime, endTime)
      findMachineDetail(
        d.country,
        d.channel,
        d.testPlayer,
        d.startTimeNone,
        d.endTimeNone
        // this.pageIndex,
        // this.pageSize
      ).then(response => {
        // this.receiveMsgData = response.data.records;
        // this.total = response.data.total;
        // this.listLoading = false;

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
