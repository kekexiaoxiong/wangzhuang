<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="accountBindData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">{{scope.row.rid}}</template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">{{scope.row.nick}}</template>
      </el-table-column>
      <el-table-column align="center" label="玩家等级">
        <template slot-scope="scope">{{scope.row.level}}</template>
      </el-table-column>
      <!--        <el-table-column align='center' label="绑定的账号类型" >-->
      <!--          <template slot-scope="scope">{{scope.row.platformType|platformTypeFormat}}</template>-->
      <!--        </el-table-column>-->
      <el-table-column align="center" label="下载渠道">
        <template slot-scope="scope">{{scope.row.channelId|chanelFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="充值平台">
        <template slot-scope="scope">{{scope.row.payType|payTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="系统订单号">
        <template slot-scope="scope">{{scope.row.orderNum}}</template>
      </el-table-column>
      <el-table-column align="center" label="第三方订单号">
        <template slot-scope="scope">{{scope.row.thirdOrderNum}}</template>
      </el-table-column>
      <el-table-column align="center" label="充值时间" width="160px">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="充值金额">
        <template slot-scope="scope">{{scope.row.payMoney}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="operationDialog(scope.row)" size="mini" type="primary">操作</el-button>
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
import { findBindChargeLog, addAccountBind } from "@/api/gmCenter";
import FindSearch from "@/common/FindSearch";
export default {
  name: "账号绑定",
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
      accountBindData: [], //整体数据
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
    //findBindChargeLog(rid, nick, orderNo, channelId, pageIndex, pageSize)
    fetchData(data) {
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.loginHide = false;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.playerNicknameHide = true;
      this.$refs.childHide.thirtOrderHide = true;

      this.$refs.childHide.buttomHide1 = true;
      this.$refs.childHide.buttomHide = false;
      this.listLoading = true;
      findBindChargeLog(
        data.rid,
        data.nick,
        data.thirtOrder,
        data.channel,
        this.pageIndex,
        this.pageSize
      ).then(response => {
        this.accountBindData = response.data.records;

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
