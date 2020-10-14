<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="receiveAppData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="LTV30">
        <template slot-scope="scope">
          <el-button @click="queryInfo(scope.row)" size="mini" type="primary">查看详情</el-button>
        </template>
      </el-table-column>
         <el-table-column align="center" label="投放平台">
        <template slot-scope="scope">{{scope.row.mediaSource}}</template>
      </el-table-column>
      <el-table-column align="center" label="新增">
        <template slot-scope="scope">{{scope.row.accountInc}}</template>
      </el-table-column>
      <!-- <el-table-column align="center" label="adSet">
        <template slot-scope="scope">{{scope.row.ecpm|rateSplit(2)}}</template>
      </el-table-column>-->
      <el-table-column align="center" label="CPI">
        <template slot-scope="scope">{{scope.row.revence}}</template>
      </el-table-column>
      <el-table-column align="center" label="ROI">
        <template slot-scope="scope">{{scope.row.rate}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV1">
        <template slot-scope="scope">{{scope.row.ltv1}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV2">
        <template slot-scope="scope">{{scope.row.ltv2}}</template>
      </el-table-column>

      <el-table-column align="center" label="LTV3">
        <template slot-scope="scope">{{scope.row.ltv3}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV4">
        <template slot-scope="scope">{{scope.row.ltv4}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV5">
        <template slot-scope="scope">{{scope.row.ltv5}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV6">
        <template slot-scope="scope">{{scope.row.ltv6}}</template>
      </el-table-column>

      <el-table-column align="center" label="LTV7">
        <template slot-scope="scope">{{scope.row.ltv7}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV8">
        <template slot-scope="scope">{{scope.row.ltv8}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV9">
        <template slot-scope="scope">{{scope.row.ltv9}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV10">
        <template slot-scope="scope">{{scope.row.ltv10}}</template>
      </el-table-column>

      <el-table-column align="center" label="LTV11">
        <template slot-scope="scope">{{scope.row.ltv11}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV12">
        <template slot-scope="scope">{{scope.row.ltv12}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV13">
        <template slot-scope="scope">{{scope.row.ltv13}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV14">
        <template slot-scope="scope">{{scope.row.ltv14}}</template>
      </el-table-column>

      <el-table-column align="center" label="LTV15">
        <template slot-scope="scope">{{scope.row.ltv15}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV16">
        <template slot-scope="scope">{{scope.row.ltv16}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV17">
        <template slot-scope="scope">{{scope.row.ltv17}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV18">
        <template slot-scope="scope">{{scope.row.ltv18}}</template>
      </el-table-column>

      <el-table-column align="center" label="LTV19">
        <template slot-scope="scope">{{scope.row.ltv19}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV20">
        <template slot-scope="scope">{{scope.row.ltv20}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV21">
        <template slot-scope="scope">{{scope.row.ltv21}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV22">
        <template slot-scope="scope">{{scope.row.ltv22}}</template>
      </el-table-column>

      <el-table-column align="center" label="LTV23">
        <template slot-scope="scope">{{scope.row.ltv23}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV24">
        <template slot-scope="scope">{{scope.row.ltv24}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV25">
        <template slot-scope="scope">{{scope.row.ltv25}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV26">
        <template slot-scope="scope">{{scope.row.ltv26}}</template>
      </el-table-column>

      <el-table-column align="center" label="LTV27">
        <template slot-scope="scope">{{scope.row.ltv27}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV28">
        <template slot-scope="scope">{{scope.row.ltv28}}</template>
      </el-table-column>
      <el-table-column align="center" label="LTV29">
        <template slot-scope="scope">{{scope.row.ltv29}}</template>
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
import { findAdRecycleByCampaign } from "@/api/advertisingAnalysis";
import FindSearch from "@/common/FindSearch";
export default {
  name: "市场投放回收-campaign级别",
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
      receiveAppData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      form: {
        appId: "",
        mediaSource: "",
        campaign: "",
        country: "",
        dateTime: ""
      },
      appId:'',
      country:'',
      dateTime:'',
      mediaSource:''
    };
  },

   created() {
    if (
      this.$route.query.appId != null &&
      this.$route.query.country != null &&
      this.$route.query.dateTime != null && 
      this.$route.query.mediaSource != null
    ) {
      this.appId = this.$route.query.appId;
      this.country = this.$route.query.country;
      this.dateTime = this.$route.query.dateTime;
      this.mediaSource = this.$route.query.mediaSource;
    }
    this.findFormData();
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
    //findAdRecycleByCampaign(appId, mediaSource, country, dateTime)
    fetchData(data) {
      this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
       this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;

      this.$refs.childHide.playerIdHide = false;
      this.$refs.childHide.playerNicknameHide = false;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.buttomHide = false;
      
      this.listLoading = true;
      findAdRecycleByCampaign(
        this.appId,
        this.mediaSource,
        this.country,
        this.dateTime
      ).then(response => {
        this.receiveAppData = response.data;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    //查看详情
    queryInfo(row) {
      this.$router.push({
        path: "/views/advertisingAnalysis/adRecycleByAdSet",
        query: {
          appId:row.appId,
          mediaSource:row.mediaSource,
          campaign:row.campaign,
          country: row.country,
          dateTime: this.$options.filters["fmtDate"](row.cdate, "yyyy-MM-DD")
        }
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
