<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table v-loading="listLoading" :data="dataList" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="平台">
        <template slot-scope="scope">{{scope.row.platform}}</template>
      </el-table-column>
      <el-table-column align="center" label="network_id">
        <template slot-scope="scope">{{scope.row.netWorkId}}</template>
      </el-table-column>
      <el-table-column align="center" label="预估ecpm">
        <template slot-scope="scope">{{scope.row.ecpm|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="校正ecpm">
        <template slot-scope="scope">{{scope.row.reviseEcpm|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="预估收益revenue">
        <template slot-scope="scope">{{scope.row.revence|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="impression">
        <template slot-scope="scope">{{scope.row.impression}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="reviseButton(scope.row)" size="mini" type="primary">校正ECPM</el-button>
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

    <el-dialog title="校正ECPM" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="formValue">
        <el-form-item label="netWorkld">
          <el-input v-model="formValue.netWorkId" :disabled="isDisabled" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前值">
          <el-input v-model="formValue.nowValue" :disabled="isDisabled" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="校正值">
          <el-input v-model="formValue.changeValue" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAdForecast, addECPM } from "@/api/advertisingAnalysis";
import FindSearch from "@/common/FindSearch";
export default {
  name: "预估收益",
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
      dataList: [],
      forbid: true,
      isDisabled: true,
      infoVisible: false,
      adTotalData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      form: {
        sendType: "",
        rids: "",
        invalidTime: "",
        title: "",
        msgType: "",
        doc: "",
        attachToken: ""
      },
      formValue: {
        netWorkId: "",
        nowValue: "",
        changeValue: ""
      },
      dialogFormVisible: false
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    reviseButton(row) {
      this.dialogFormVisible = true;
      this.formValue.netWorkId = row.netWorkId;
      this.formValue.nowValue = row.ecpm;
      this.formValue.changeValue = row.reviseEcpm;
    },
    confirm() {
      
      addECPM(this.formValue.nowValue,this.formValue.changeValue).then(res => {
         this.$message({
            type: "success",
            message: "校正成功"
          });
          this.findFormData();
      });
    },

    cancel() {
      this.dialogFormVisible = false;
    },

    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值

      console.log(form.startTimeDefault);
      this.fetchData(form);
    },
    //获取数据
    //findAdForecast(appId, dateTime)
    fetchData(data) {
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;

      this.$refs.childHide.playerIdHide = false;
      this.$refs.childHide.playerNicknameHide = false;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.appIdHide = true;
      //  this.$refs.childHide.applicationHide = true;
      this.$refs.childHide.choiceTimeHide = true;

      this.listLoading = true;
      findAdForecast(data.appId, data.endTimeDay).then(response => {
        //  this.adTotalData = response.data;
        this.total = response.data.total;
        this.dataList = response.data;
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

<style lang="scss" scoped>
.small {
  width: 50%;
}
</style>
