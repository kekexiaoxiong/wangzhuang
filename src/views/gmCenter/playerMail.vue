<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="playerMailData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="提交时间" width="150">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="反馈类型">
        <template slot-scope="scope">{{scope.row.state|CollectFeedBackTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="反馈机器码" width="180">
        <template slot-scope="scope">{{scope.row.machineCode}}</template>
      </el-table-column>
      <el-table-column align="center" label="游戏ID" prop="rid"></el-table-column>
      <el-table-column align="center" label="游戏昵称" prop="nick"></el-table-column>
      <el-table-column align="center" label="登录方式" prop="platformType">
        <template slot-scope="scope">{{scope.row.platformType|platformTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="设备种类" prop="devicetype">
        <template slot-scope="scope">{{scope.row.deviceType|deviceTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="下载渠道" prop="channelId">
        <template slot-scope="scope">{{scope.row.channelId|chanelFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="150">
        <template slot-scope="scope">{{scope.row.regTime|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="注册地域" prop="regAddress"></el-table-column>
      <el-table-column align="center" label="登录地域" prop="loginAddress"></el-table-column>
      <el-table-column align="center" label="账号状态" prop="state">
        <template slot-scope="scope">{{scope.row.roleState|accountStateFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="处理状态">
        <template slot-scope="scope">{{scope.row.state|CollectFeedBackStateFormart}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="infoBtn(scope.row)" size="mini" type="primary">操作</el-button>
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

    <el-dialog width="45%" :close-on-click-modal="false" :visible.sync="infoVisible">
      <h2 style="margin-top:-20px"></h2>

      <el-form :model="form" label-width="100px" style="overflow: auto;">
        <el-form-item label="玩家ID:" prop="sortNo" style="float:left;">
          <el-input size="mini" style="width:200px;" :disabled="isDisabled" v-model="form.rid"></el-input>
        </el-form-item>

        <el-form-item label="玩家邮箱:" prop="sortNo" style="float:left;">
          <el-input size="mini" style="width:200px;" :disabled="isDisabled" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="机器码:" prop="sortNo" style="float:left;">
          <el-input
            size="mini"
            style="width:200px;"
            :disabled="isDisabled"
            v-model="form.machineCode"
          ></el-input>
        </el-form-item>

        <el-form-item label="内容:" prop="sortNo" style="float:left;">
          <el-input  type="textarea" size="mini" style="width:200px;"  :rows="5"   :disabled="disabled" v-model="form.content" ></el-input>
        </el-form-item>

        <el-form-item label="回复内容:" prop="sortNo"  style="float:left;">
          <el-input
           :disabled="disabled"
            type="textarea"
            style="width:300px;"
            size="small"
            :rows="8"
            v-model="form.feedbackContent"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" v-if="showOrclose">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findPlayerMail, addPlayerMail } from "@/api/gmCenter";
import FindSearch from "@/common/FindSearch";
export default {
  name: "玩家邮件",
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
      showOrclose: true,
      infoVisible: false,
      isDisabled: true,
      disabled:true,
      playerMailData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      form: {
        feedbackContent: "",
        rid: "",
        email: "",
        machineCode: "",
        content: ""
      }
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
    //findPlayerMail(rid, machineCode, beginTime, endTime, pageIndex, pageSize)
    fetchData(data) {
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.loginHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.machineCodeHide = true;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;
      this.listLoading = true;
      findPlayerMail(
        data.rid,
        data.machineCode,
        data.startTimeNone,
        data.endTimeNone,
        this.pageIndex,
        this.pageSize
      ).then(response => {
        this.playerMailData = response.data.records;
        this.total = response.data.total;
      
        this.listLoading = false;
      });
    },

    //提交玩家反馈邮件
    infoBtn(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.infoVisible = true;

      if (row.state == 1) {
        this.showOrclose = true;
        this.disabled = false;
       
      } else {
        this.showOrclose = false;
         this.disabled = true;
     
      }
    },

    cancel() {
      this.infoVisible = false;
    },
    //确定邮件提交
    confirm() {
      if (this.form.state != 1) {
        this.$message({
          message: "当前反馈已处理",
          type: "warning",
          duration: 3000
        });
        return;
      }
      if (
        this.form.feedbackContent == null ||
        this.form.feedbackContent == undefined
      ) {
        this.$message({
          message: "回复内容不能为空",
          type: "warning",
          duration: 3000
        });
        return;
      }
      addPlayerMail({
        feedbackContent: this.form.feedbackContent,
        id: this.form.rid
      }).then(res => {
       
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
