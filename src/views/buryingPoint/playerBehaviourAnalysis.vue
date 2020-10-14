<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="goBrokeData"
      border
      style="width: 100%;"
      class="mtop"
    >
     <el-table-column align='center' label="时间"  >
          <template slot-scope="scope">{{scope.row.cdate|fmtDate2('yyyy-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align='center' label="玩家编号">
          <template slot-scope="scope">{{scope.row.rid}}</template>
        </el-table-column>
        <el-table-column align='center' label="玩家昵称" >
          <template slot-scope="scope">{{scope.row.nick}}</template>
        </el-table-column>
        <el-table-column align='center' label="当前金币" >
          <template slot-scope="scope">{{scope.row.gold}}</template>
        </el-table-column>
        <el-table-column align='center' label="当前钻石" >
          <template slot-scope="scope">{{scope.row.diamond}}</template>
        </el-table-column>
        <el-table-column align='center' label="当前代币" >
          <template slot-scope="scope">{{scope.row.token}}</template>
        </el-table-column>
        <el-table-column
          :formatter="stateFormat"
          align="center"
          prop="buryingType"
          label="行为"
         
        ></el-table-column>
        <el-table-column align='center' label="行为数据" >
          <template slot-scope="scope">{{scope.row.data}}</template>
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
import { findMaBehaviour } from "@/api/buryingPoint";
import FindSearch from "@/common/FindSearch";
export default {
  name: "玩家行为记录",
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
      isDisabled: true,
      infoVisible: false,
      goBrokeData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      form: {
        rids: "",
        email: ""
      }
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    cancel() {
      this.infoVisible = false;
    },
    addUserRole() {},

    operationDialog(row) {
      this.infoVisible = true;
      this.form.rids = row.rid;
    },

    accountBind() {
      addAccountBind({ email: this.form.email, rid: this.form.rids }).then(
        res => {
          if (res.code == 200) {
            this.findUserRole();
            this.$message({
              type: "success",
              message: "账号绑定成功"
            });
          }
          this.findFormData();
        }
      );
    },

    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      console.log(form.startTime + "___" + form.endTime);
      this.fetchData(form);
    },
    //获取数据
    //findMaBehaviour(rid, buriedType, type, beginTime, endTime, pageIndex, pageSize)
    fetchData(data) {
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;

      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false; //隐藏子组件不要的下拉菜单
     this.$refs.childHide.playerNumberHide = true; 
        
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
      findMaBehaviour(
        data.rid,
        data.buriedType,
        1,

        data.startTimeNone,
        data.endTimeNone,
        this.pageIndex,
        this.pageSize
      ).then(response => {
         this.goBrokeData = response.data.records;

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
