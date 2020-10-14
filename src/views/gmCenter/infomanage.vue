<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table v-loading="listLoading" :data="infoManageData" border style="width: 100%;" class="mtop">
     <el-table-column align='center' label="UID" prop="uid" width="100"></el-table-column>
        <el-table-column align='center' label="名称" prop="nick" width="100"></el-table-column>
        <el-table-column align='center' label="充值总额" prop="payMoney" width="100"></el-table-column>
        <el-table-column align='center' label="金币数量" prop="gold" width="100"></el-table-column>
        <el-table-column align='center' label="钻石数量" prop="diamond" width="100"></el-table-column>
        <el-table-column align='center' label="账号状态" width="100">
          <template slot-scope="scope">{{scope.row.state|accountStateFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button @click="bindType(scope.row)" size="mini" type="primary">绑定方式</el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' label="游戏时长(分)" width="140">
          <template slot-scope="scope">{{scope.row.onlineTime/60|numFilter}}</template>
        </el-table-column>
        <el-table-column align='center' label="注册时间" width="150">
          <template slot-scope="scope">{{scope.row.regTime|fmtDate2('yyyy-MM-DD ')}}</template>
        </el-table-column>
        <el-table-column align='center' label="注册渠道" width="100">
          <template slot-scope="scope">{{scope.row.channelId|chanelFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="注册IP" prop="regIp" width="170"></el-table-column>
        <el-table-column align='center' label="机器码" prop="machineCode" width="180"></el-table-column>
        <el-table-column align='center' label="最后登录时间" width="150">
          <template slot-scope="scope">{{scope.row.lastLoginTime|fmtDate2('yyyy-MM-DD ')}}</template>
        </el-table-column>
        <el-table-column align='center' label="最后登录IP" prop="lastLoginIp" width="170"></el-table-column>
        <el-table-column align='center' label="最后登录地区" prop="lastLoginAddress" width="128"></el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button @click="offline(scope.row)" size="mini" type="danger">强制下线</el-button>
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
        <el-form-item label="发送类型:" prop="sortNo" style="float:left;">
          <el-select
            style="width:200px;float:left;"
            :disabled="isDisabled"
            v-model="form.sendType"
            placeholder="请选择邮件类型"
          >
            <el-option label="单人邮件" :value="1" />
            <el-option label="全服邮件" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="收件人:" prop="sortNo" style="float:left;">
          <el-input size="mini" style="width:200px;" :disabled="isDisabled" v-model="form.rids"></el-input>
        </el-form-item>

        <el-form-item label="失效时间:" prop="sortNo" style="float:left;">
          <el-input
            size="mini"
            style="width:200px;"
            :disabled="isDisabled"
            v-model="form.invalidTime"
          ></el-input>
        </el-form-item>

        <el-form-item label="标题:" prop="sortNo" style="float:left;">
          <el-input size="mini" style="width:200px;" :disabled="isDisabled" v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="邮件类型:" prop="sortNo" style="float:left;">
          <el-select
            style="width:200px;float:left;"
            :disabled="isDisabled"
            v-model="form.msgType"
            placeholder="请选择邮件类型"
          >
            <el-option label="全部" :value="''" />
            <el-option label="广告" :value="1" />
            <el-option label="赛季排行榜中获奖信息" :value="2" />
            <el-option label="战斗排行榜中获奖信息" :value="3" />
            <el-option label="PVP排行榜中获奖信息" :value="4" />
            <el-option label="PVE排行榜中获奖信息" :value="5" />
            <el-option label="促销信息" :value="6" />
            <el-option label="关卡解锁信息" :value="7" />
            <el-option label="好友礼物" :value="8" />
            <el-option label="gm补偿信息" :value="9" />
            <el-option label="周期任务" :value="10" />
            <el-option label="公告信息" :value="11" />
            <el-option label="停服公告" :value="12" />
          </el-select>
        </el-form-item>
        <el-form-item label="正文:" prop="sortNo" style="float:left;">
          <span>

          </span>
          <el-input
            type="textarea"
            :rows="12"
            style=" width:300px;" 
            size="small"
            :disabled="isDisabled"
            v-model="form.doc"
          ></el-input>
        </el-form-item>
        <el-form-item label="代币:" prop="sortNo" style="float:left;">
          <el-input
            size="mini"
            style="width:200px;"
            :disabled="isDisabled"
            v-model="form.attachToken"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="金币排序:" prop="sortNo" style="float:left;">
          <el-select style="width:150px;float:left;" v-model="form.sortType" placeholder="金币排序">
            <el-option label="正序" :value="1"></el-option>
            <el-option label="倒序" :value="2"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { findAccountManager } from "@/api/gmCenter";
import FindSearch from "@/common/FindSearch";
export default {
  name: "账号信息及管理",
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
      infoManageData: [], //整体数据
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
      }
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值

      console.log(form.startTimeDefault);
      
      this.fetchData(form);
    },
    //获取数据
    //findAccountManager(nick, machineCode, lastIp, rid, pageIndex, pageSize)
    fetchData(data) {
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;
    //  this.$refs.childHide.messageTypeHide = true;
      this.$refs.childHide.playerIdHide = false;
      this.$refs.childHide.playerNicknameHide = false;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      //this.$refs.childHide.startTimeDefault = true;
     // this.$refs.childHide.endTimeDefault = true;

    this.$refs.childHide.playerNicknameHide = true;
    this.$refs.childHide.machineCodeHide = true;
    this.$refs.childHide.lastIpHide = true;
    this.$refs.childHide.playerIdHide = true;
   this.$refs.childHide.buttomHide = false;
      
      this.$refs.childHide.buttomHide1 = true;
      this.listLoading = false;
    
      findAccountManager(
        data.nick,
        data.machineCode,
        data.lastIp,
        data.rid,
        this.pageIndex,
        this.pageSize,
     
      ).then(response => {
        this.infoManageData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
        
      });
    },

    queryMail(row) {
      this.infoVisible = true;
      this.form.sendType = row.sendType;
      this.form.rids = row.rids;
      this.form.invalidTime = this.$options.filters["fmtDate"](
        row.invalidTime,
        "yyyy-MM-DD hh:mm:ss"
      );
      this.form.title = row.title;
      this.form.msgType = row.msgType;
      this.form.doc = row.doc;
      this.form.attachToken = row.attachToken;
    },

    //删除邮件
    deleteMail(row) {
      this.$confirm("此操作将永久删除该邮件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delHighEmail(row.rids).then(res => {
            if (response.code == 200) {
              this.findFormData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
