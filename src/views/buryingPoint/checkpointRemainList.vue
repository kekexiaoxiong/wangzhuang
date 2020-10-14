<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="checkpointData"
      border
      style="width: 100%;"
      class="mtop"
    >
 <el-table-column align='center' label="解锁顺序">
          <template slot-scope="scope">{{scope.row.checkpointOrder}}</template>
        </el-table-column>
        <el-table-column align='center' label="机台ID">
          <template slot-scope="scope">{{scope.row.checkpoint}}</template>
        </el-table-column>

        <el-table-column align='center' label="机台留存" >
          <template slot-scope="scope">{{scope.row.checkpointRemain*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="机台等级解锁使用率" >
          <template slot-scope="scope">{{scope.row.levelUnlockRate*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="人均使用次数" >
          <template slot-scope="scope">{{scope.row.checkpointAvg}}</template>
        </el-table-column>
        <el-table-column align='center' label="使用人数" >
          <template slot-scope="scope">{{scope.row.totalUser}}</template>
        </el-table-column>
        <el-table-column align='center' label="平均时长" >
          <template slot-scope="scope">{{scope.row.gameTimeAvg}}</template>
        </el-table-column>
        <el-table-column align='center' label="点击下载人数" >
          <template slot-scope="scope">{{scope.row.clickDownloadUser}}</template>
        </el-table-column>
        <el-table-column align='center' label="下载完成人数">
          <template slot-scope="scope">{{scope.row.downloadUser}}</template>
        </el-table-column>
        <el-table-column align='center' label="进入人数">
          <template slot-scope="scope">{{scope.row.innerUser}}</template>
        </el-table-column>
        <el-table-column align='center' label="钻石解锁">
          <template slot-scope="scope">{{scope.row.diamondUnlock}}</template>
        </el-table-column>
        <el-table-column align='center' label="等级解锁" >
          <template slot-scope="scope">{{scope.row.levelUnlock}}</template>
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

    <el-dialog width="30%" :close-on-click-modal="false" :visible.sync="infoVisible">
      <h2 style="margin-top:-20px"></h2>
      <el-form :model="form" label-width="100px" style="overflow: auto;">
        <el-form-item label="玩家ID:" prop="sortNo" style="float:left;">
          <el-input size="mini" style="width:200px;" :disabled="isDisabled" v-model="form.rids"></el-input>
        </el-form-item>

        <el-form-item label="*电子邮箱:" prop="sortNo" style="float:left;">
          <el-input size="mini" style="width:200px;" placeholder="请输入邮箱地址" v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <h2 style="color:red;">
        注：
        1.请仔细核实该用户的账号所有权
        2.账号绑定邮箱成功后初始化密码为：000000
      </h2>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button size="mini" type="primary" @click="addUserRole()">确 定</el-button>
      </div>
    </el-dialog>
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
      isDisabled: true,
      infoVisible: false,
      checkpointData: [], //整体数据
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
    //findMachineDetail(country, channelId, type, beginTime, endTime)
    fetchData(data) {
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
      findMachineDetail(
        data.country,
        data.channel,
        data.testPlayer,
        data.startTime,
        data.endTime
      ).then(response => {
         this.checkpointData = response.data;

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
