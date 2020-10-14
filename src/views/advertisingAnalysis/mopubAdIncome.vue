<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table v-loading="listLoading" :data="adEarningsData" border style="width: 100%;" class="mtop">
     <el-table-column align='center' label="日期"
                         width="152">
          <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD')}}</template>
        </el-table-column>
        <el-table-column align='center' label="新增" width="120">
          <template slot-scope="scope">{{scope.row.accountIns}}</template>
        </el-table-column>
        <el-table-column align='center' label="DAU" width="120">
          <template slot-scope="scope">{{scope.row.dau}}</template>
        </el-table-column>
        <el-table-column align='center' label="实际收入" width="120">
          <template slot-scope="scope">{{scope.row.income|rateSplit(2)}}</template>
        </el-table-column>
        <el-table-column align='center' label="预估收入" width="120">
          <template slot-scope="scope">{{scope.row.forecast|rateSplit(2)}}</template>
        </el-table-column>
        <el-table-column align='center' label="ARPU" width="120">
          <template slot-scope="scope">{{scope.row.arpuStr}}</template>
        </el-table-column>
        <el-table-column align='center' label="新用户ARPU" width="120">
          <template slot-scope="scope">{{scope.row.newPlayerArpu}}</template>
        </el-table-column>
        <el-table-column align='center' label="老用户ARPU" width="120">
          <template slot-scope="scope">{{scope.row.oldPlayerArpu|rateSplit(2)}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D1" width="120">
        <template slot-scope="scope">{{scope.row.d1*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
        <el-table-column align='center' label="留存D2" width="120">
          <template slot-scope="scope">{{scope.row.d2*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D3" width="150">
          <template slot-scope="scope">{{scope.row.d3*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D4" width="120">
          <template slot-scope="scope">{{scope.row.d4*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D5" width="120">
          <template slot-scope="scope">{{scope.row.d5*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D6" width="120">
          <template slot-scope="scope">{{scope.row.d6*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="留存D7" width="120">
          <template slot-scope="scope">{{scope.row.d7*100|rateSplit(2)+"%"}}</template>
        </el-table-column>
        <el-table-column align='center' label="实时留存" width="120">
          <template slot-scope="scope">{{scope.row.dauRemain*100|rateSplit(2)+"%"}}</template>
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
          <el-input
            type="textarea"
            style="width:300px;height:min-height:200px;"
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
import { findAdEarnings, delHighEmail } from "@/api/advertisingAnalysis";
import FindSearch from "@/common/FindSearch";
export default {
  name: "广告收益",
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
      adEarningsData: [], //整体数据
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
    //findAdEarnings(beginTime, endTime, pageIndex, pageSize)
    fetchData(data) {
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;
      
      this.$refs.childHide.playerIdHide = false;
      this.$refs.childHide.playerNicknameHide = false;
        
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;
      this.listLoading = true;
      findAdEarnings(
          data.startTimeNone,
        data.endTimeNone,
        this.pageIndex,
        this.pageSize,
      ).then(response => {
        this.adEarningsData = response.data.records;
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

<style lang="scss" scoped>
.small {
  width: 50%;
}
</style>
