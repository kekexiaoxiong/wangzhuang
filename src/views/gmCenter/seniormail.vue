<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table v-loading="listLoading" :data="goldCoinData" border style="width: 100%;" class="mtop">
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
        <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="失效时间" width="180px">
        <template slot-scope="scope">{{scope.row.invalidTime|fmtDate('yyyy-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="130px">
        <template slot-scope="scope">{{scope.row.state|gmMailStateFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200rem">
        <template slot-scope="scope">
          <el-button @click="queryMail(scope.row)" size="mini" type="primary">查看</el-button>
          <el-button
            v-if="scope.row.state==0"
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
import { findSeniorMail, delHighEmail } from "@/api/gmCenter";
import FindSearch from "@/common/FindSearch";
export default {
  name: "高级邮件",
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
      goldCoinData: [], //整体数据
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
    //findSeniorMail(pageIndex, pageSize, msgType, beginTime, endTime)
    fetchData(data) {
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.messageTypeHide = true;
      this.$refs.childHide.playerIdHide = false;
      this.$refs.childHide.playerNicknameHide = false;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;
      this.listLoading = true;
      findSeniorMail(
        this.pageIndex,
        this.pageSize,
        data.msgType,
        data.startTimeNone,
        data.endTimeNone
      ).then(response => {
        this.goldCoinData = response.data.records;
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
