<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="systemButtonData"
      border
      style="width: 100%;"
      class="mtop"
    >
 <el-table-column align='center' label="类别"  >
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column align='center' label="小金猪">
          <template slot-scope="scope">{{scope.row.goldPigCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="inbox">
          <template slot-scope="scope">{{scope.row.inboxCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="DAILY" >
          <template slot-scope="scope">{{scope.row.dailyCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="VIP" >
          <template slot-scope="scope">{{scope.row.vipCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="QUEST" >
          <template slot-scope="scope">{{scope.row.questCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="设置">
          <template slot-scope="scope">{{scope.row.settingCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="MAP" >
          <template slot-scope="scope">{{scope.row.mapCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="排行榜" >
          <template slot-scope="scope">{{scope.row.rankCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="商城" >
          <template slot-scope="scope">{{scope.row.mallCount}}</template>
        </el-table-column>
        <el-table-column align='center' label="Free Coin" >
          <template slot-scope="scope">{{scope.row.freeCoinCount}}</template>
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
import { findButtonData } from "@/api/buryingPoint";
import FindSearch from "@/common/FindSearch";
export default {
  name: "系统点击使用率",
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
      systemButtonData: [], //整体数据
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
    //findButtonData(country, channelId, type, beginTime, endTime)
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
      findButtonData(
        data.country,
        data.channel,
        data.testPlayer,
        data.startTime,
        data.endTime
      ).then(response => {
         this.systemButtonData = response.data;

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
