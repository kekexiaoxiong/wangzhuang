<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <div class="mtop">
      <el-button type="success" size="mini" @click="addMail()">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="accountBindData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column :show-overflow-tooltip="true" align="center" label="标题" prop="title"></el-table-column>
      <el-table-column align="center" label="邮件类型">
        <template slot-scope="scope">{{scope.row.msgType|mailMsgTypeFormat}}</template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="接收人ID">
        <template slot-scope="scope">{{scope.row.rids}}</template>
      </el-table-column>
      <!--        <el-table-column align='center' label="发送人数">-->
      <!--          <template slot-scope="scope">{{scope.row.sendCount}}</template>-->
      <!--        </el-table-column>-->
      <el-table-column align="center" label="发送类型">
        <template slot-scope="scope">{{scope.row.sendType|inboxSendTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="附带金币">
        <template slot-scope="scope">{{scope.row.attachGold}}</template>
      </el-table-column>
      <el-table-column align="center" label="附带钻石" width="130px">
        <template slot-scope="scope">{{scope.row.attachDiamond}}</template>
      </el-table-column>
      <el-table-column align="center" label="附带代币" width="130px">
        <template slot-scope="scope">{{scope.row.attachToken}}</template>
      </el-table-column>
      <!--        <el-table-column align='center' label="附带vip点数" width="130px">-->
      <!--          <template slot-scope="scope">{{scope.row.attachVipPoint}}</template>-->
      <!--        </el-table-column>-->
      <el-table-column :show-overflow-tooltip="true" align="center" label="附带道具" width="130px">
        <template slot-scope="scope">{{scope.row.attachItem}}</template>
      </el-table-column>
      <el-table-column align="center" label="添加时间" width="180px">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate2('yyyy-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="失效时间" width="180px">
        <template slot-scope="scope">{{scope.row.invalidTime|fmtDate2('yyyy-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="130px">
        <template slot-scope="scope">{{scope.row.state|gmMailStateFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200rem">
        <template slot-scope="scope">
          <el-button @click="queryMail(scope.row)" size="mini" type="primary">查看</el-button>
          <el-button
            v-if="scope.row.state == 0"
            @click="deleteMail(scope.row)"
            size="mini"
            type="danger"
          >删除</el-button>
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

    <!-- 新增邮件 -->
    <el-dialog :before-close="handleClose" width="35%" :visible.sync="addVisible" title="新增邮件">
      <el-form :model="formAddNew" label-width="100px" style="overflow: auto;">
        <!-- 选择应用 -->
        <el-form-item label="发送类型:" prop="sortNo" style="float:left;">
          <el-select
            style="width:150px;float:left;"
            v-model="formAddNew.sendType"
            placeholder="请选择"
          >
            <el-option label="单人邮件" :value="1"></el-option>
            <el-option label="全服邮件" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="收件人:" prop="sortNo" style="float:left;">
          <el-input-number size="medium" :min="0" placeholder="请输入玩家ID" v-model="formAddNew.rids"></el-input-number>
        </el-form-item>

        <el-form-item label="邮件类型:" prop="sortNo" style="float:left;">
          <el-select style="width:150px;float:left;" v-model="formAddNew.msgType" placeholder="请选择">
            <el-option label="公告信息" :value="12"></el-option>
            <el-option label="停服公告" :value="13"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="失效时间:" prop="sortNo" style="float:left;">
          <el-date-picker v-model="formAddNew.invalidTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题:" prop="sortNo" style="float:left;">
          <el-input class="mailInput" placeholder="请输入内容" v-model="formAddNew.title"></el-input>
        </el-form-item>
        <el-form-item label="正文:" prop="sortNo" style="float:left;">
          <el-input
            :rows="10"
            :cols="25"
            placeholder="请输入邮件内容"
            type="textarea"
            v-model="formAddNew.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button size="mini" @click="addVisible = false">取 消</el-button>
        <el-button size="mini" @click.stop="sendMail" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看邮件 -->
    <el-dialog :before-close="handleClose" width="35%" :visible.sync="findVisible" title="新增邮件">
      <el-form :model="formFindMsg" label-width="100px" style="overflow: auto;">
        <!-- 选择应用 -->
        <el-form-item label="发送类型:" prop="sortNo" style="float:left;">
          <el-select
            style="width:150px;float:left;"
            v-model="formFindMsg.sendType"
            placeholder="请选择"
            :disabled="isDisabled"
          >
            <el-option label="单人邮件" :value="1"></el-option>
            <el-option label="全服邮件" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="收件人:" prop="sortNo" style="float:left;">
          <el-input-number
            :disabled="isDisabled"
            size="medium"
            :min="0"
            placeholder="请输入玩家ID"
            v-model="formFindMsg.rids"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="邮件类型:" prop="sortNo" style="float:left;">
          <el-select
            :disabled="isDisabled"
            style="width:150px;float:left;"
            v-model="formFindMsg.msgType"
            placeholder="请选择"
          >
            <el-option label="公告信息" :value="12"></el-option>
            <el-option label="停服公告" :value="13"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="失效时间:" prop="sortNo" style="float:left;">
          <el-date-picker
            :disabled="isDisabled"
            v-model="formFindMsg.invalidTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="标题:" prop="sortNo" style="float:left;">
          <el-input
            class="mailInput"
            :disabled="isDisabled"
            placeholder="请输入内容"
            v-model="formFindMsg.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="正文:" prop="sortNo" style="float:left;">
          <el-input
            :disabled="isDisabled"
            :rows="10"
            :cols="25"
            placeholder="请输入邮件内容"
            type="textarea"
            v-model="formAddNew.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button size="mini" @click="addVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findTestAccountr,
  sendTestAccountr,
  delTestAccount
} from "@/api/gmCenter";
import FindSearch from "@/common/FindSearch";
export default {
  name: "测试玩家",
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
      },
      formFindMsg: {},
      formAddNew: {},
      addVisible: false,
      findVisible: false
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    deleteMail(row) {
      this.$confirm("此操作将永久删除该邮件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delAccountManager(row.id).then(res => {
               this.findFormData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    queryMail(row) {
      this.findVisible = true;
      this.formFindMsg.sendType = row.sendType;
      this.formFindMsg.rids = row.rids;
      this.formFindMsg.msgType = row.msgType;
      this.formFindMsg.invalidTime = row.invalidTime;
      this.formFindMsg.title = row.title;
      this.formFindMsg.content = row.content;
    },
    sendMail() {
      let data = {
        // attachDiamond: 0,
        // attachGold: 0,
        // attachItem: 0,
        // attachToken:0,
        content: this.formAddNew.content,
        invalidTime: this.formAddNew.invalidTime,
        msgType: this.formAddNew.msgType,
        rids: this.formAddNew.rids,
        sendType: this.formAddNew.sendType,
        title: this.formAddNew.title
      };
      sendAccountManager(data).then(res => {
        this.$message({
          type: "success",
          message: "邮件发送成功"
        });
        this.findFormData();
      });
    },
    addMail() {
      this.addVisible = true;
    },
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
    //findOrdinaryMail(pageIndex, pageSize, msgType, beginTime, endTime)
    fetchData(data) {
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.loginHide = false;
      this.$refs.childHide.messageTypeHide = true;
      this.$refs.childHide.channelHide = false;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;

      //   this.$refs.childHide.buttomHide1 = true;
      //   this.$refs.childHide.buttomHide = false;
      this.listLoading = true;
      findOrdinaryMail(
        this.pageIndex,
        this.pageSize,
        data.msgType,
        data.startTimeNone,
        data.endTimeNone
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
