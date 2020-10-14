<template>
  <div class="app-container">
    <el-form :model="form" label-width="100px" style="overflow: auto;" class="mtop">
      <el-form-item label="公司:" style="float:left;">
        <el-col :span="5">
          <el-select style="width:150px;" v-model="form.company" placeholder="请选择公司">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="(item,index) in companySelect"
              :label="item.value"
              :key="index"
              :value="item.key"
            />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="渠道:" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="form.channel" placeholder="请选择渠道">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item,index) in channelSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="月度目标:" prop="sortNo" style="float:left;">
        <el-input-number
          size="medium"
          @change="handleChange"
          :min="0"
          :step="1"
          v-model="form.target"
        ></el-input-number>
      </el-form-item>
      <el-form-item label style="float:left;" label-width="50px">
        <el-button type="primary" size="mini" @click="findFormData()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- <find-search ref="childHide" v-on:searchData="fetchData"></find-search> -->

    <el-table v-loading="listLoading" :data="twDayData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="近七日數據" width="152">
        <template slot-scope="scope">{{scope.row.dateStr}}</template>
      </el-table-column>
      <el-table-column align="center" label="公司" width="120">
        <template slot-scope="scope">{{scope.row.gameType|gameTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="DAU" width="100">
        <template slot-scope="scope">{{scope.row.dau}}</template>
      </el-table-column>
      <el-table-column align="center" label="新增帳號" width="100">
        <template slot-scope="scope">{{scope.row.accountInc}}</template>
      </el-table-column>
      <el-table-column align="center" label="營收" width="100">
        <template slot-scope="scope">{{scope.row.payMoney}}</template>
      </el-table-column>
      <el-table-column align="center" label="付費人數" width="100">
        <template slot-scope="scope">{{scope.row.chargeUser}}</template>
      </el-table-column>
      <el-table-column align="center" label="付費率" width="100">
        <template slot-scope="scope">{{scope.row.chargeRate*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="ARPPU" width="100">
        <template slot-scope="scope">{{scope.row.arppu}}</template>
      </el-table-column>
      <el-table-column align="center" label="ARPU" width="100">
        <template slot-scope="scope">{{scope.row.arpu}}</template>
      </el-table-column>
      <el-table-column align="center" label="DAU留存" width="100">
        <template slot-scope="scope">{{scope.row.dauRemain*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="次日留存" width="100">
        <template slot-scope="scope">{{scope.row.remain2day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="三日留存" width="100">
        <template slot-scope="scope">{{scope.row.remain3day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="七日留存" width="100">
        <template slot-scope="scope">{{scope.row.remain7day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="累計營收" width="100">
        <template slot-scope="scope">{{scope.row.totalMoney|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="月度目標滾動達成率" width="300">
        <template slot-scope="scope">{{scope.row.percentage*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
    </el-table>

    <el-form :model="weekForm" label-width="100px" style="overflow: auto;" class="mtop">
      <el-form-item label="公司:" style="float:left;">
        <el-col :span="5">
          <el-select style="width:150px;" v-model="weekForm.company" placeholder="请选择公司">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="(item,index) in companySelect"
              :label="item.value"
              :key="index"
              :value="item.key"
            />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="渠道:" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="weekForm.channel" placeholder="请选择渠道">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item,index) in channelSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>

      <el-form-item label style="float:left;" label-width="50px">
        <el-button type="primary" size="mini" @click="fetchWeekData()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="twWeekData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="近八週數據" width="200">
        <template slot-scope="scope">{{scope.row.dateStr}}</template>
      </el-table-column>
      <el-table-column align="center" label="公司">
        <template slot-scope="scope">{{scope.row.gameType|gameTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="WAU">
        <template slot-scope="scope">{{scope.row.dau}}</template>
      </el-table-column>
      <el-table-column align="center" label="新增帳號">
        <template slot-scope="scope">{{scope.row.accountInc}}</template>
      </el-table-column>
      <el-table-column align="center" label="營收">
        <template slot-scope="scope">{{scope.row.payMoney}}</template>
      </el-table-column>
      <el-table-column align="center" label="付費人數">
        <template slot-scope="scope">{{scope.row.chargeUser}}</template>
      </el-table-column>
      <el-table-column align="center" label="付費率">
        <template slot-scope="scope">{{scope.row.chargeRate*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="ARPPU">
        <template slot-scope="scope">{{scope.row.arppu}}</template>
      </el-table-column>
      <el-table-column align="center" label="ARPU">
        <template slot-scope="scope">{{scope.row.arpu}}</template>
      </el-table-column>
      <el-table-column align="center" label="ＷAU留存">
        <template slot-scope="scope">{{scope.row.dauRemain*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="次日留存日均值" width="100">
        <template slot-scope="scope">{{scope.row.remain2day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="三日留存日均值" width="100">
        <template slot-scope="scope">{{scope.row.remain3day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="七日留存日均值" width="100">
        <template slot-scope="scope">{{scope.row.remain7day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
    </el-table>

    <el-form :model="monthForm" label-width="100px" style="overflow: auto;" class="mtop">
      <el-form-item label="公司:" style="float:left;">
        <el-col :span="5">
          <el-select style="width:150px;" v-model="monthForm.company" placeholder="请选择公司">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="(item,index) in companySelect"
              :label="item.value"
              :key="index"
              :value="item.key"
            />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="渠道:" style="float:left;">
        <el-select style="width:150px;float:left;" v-model="monthForm.channel" placeholder="请选择渠道">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="(item,index) in channelSelect"
            :label="item.value"
            :key="index"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="月度目标:" prop="sortNo" style="float:left;">
        <el-input-number
          size="medium"
          @change="handleChange"
          :min="0"
          :step="1"
          v-model="monthForm.target"
        ></el-input-number>
      </el-form-item>
      <el-form-item label style="float:left;" label-width="50px">
        <el-button type="primary" size="mini" @click="fetchMonthData()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="twMonthData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="近半年數據" width="200">
        <template slot-scope="scope">{{scope.row.dateStr}}</template>
      </el-table-column>
      <el-table-column align="center" label="公司" width="120">
        <template slot-scope="scope">{{scope.row.gameType|gameTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="ＭAU" width="100">
        <template slot-scope="scope">{{scope.row.dau}}</template>
      </el-table-column>
      <el-table-column align="center" label="新增帳號" width="100">
        <template slot-scope="scope">{{scope.row.accountInc}}</template>
      </el-table-column>
      <el-table-column align="center" label="營收" width="100">
        <template slot-scope="scope">{{scope.row.payMoney}}</template>
      </el-table-column>
      <el-table-column align="center" label="付費人數" width="100">
        <template slot-scope="scope">{{scope.row.chargeUser}}</template>
      </el-table-column>
      <el-table-column align="center" label="付費率" width="100">
        <template slot-scope="scope">{{scope.row.chargeRate*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="ARPPU" width="100">
        <template slot-scope="scope">{{scope.row.arppu}}</template>
      </el-table-column>
      <el-table-column align="center" label="ARPU" width="100">
        <template slot-scope="scope">{{scope.row.arpu}}</template>
      </el-table-column>
      <el-table-column align="center" label="ＭAU留存" width="100">
        <template slot-scope="scope">{{scope.row.dauRemain*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="次日留存日均值" width="100">
        <template slot-scope="scope">{{scope.row.remain2day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="三日留存日均值" width="100">
        <template slot-scope="scope">{{scope.row.remain3day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="七日留存日均值" width="100">
        <template slot-scope="scope">{{scope.row.remain7day*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" label="累計營收" width="100">
        <template slot-scope="scope">{{scope.row.totalMoney|rateSplit(2)}}</template>
      </el-table-column>
      <el-table-column align="center" label="月度目標滾動達成率" width="300">
        <template slot-scope="scope">{{scope.row.percentage*100|rateSplit(2)+"%"}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findTwDay, findTwWeek, findTwMonth } from "@/api/taiwanData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "核心数据",
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
      form: {
        company: "",
        channel: "",
        target: "",
        endTimeDay: this.GetDateStr(0)
      },
      weekForm: {
        company: "",
        channel: "",
        target: "",
        endTimeDay: this.GetDateStr(0)
      },
      monthForm: {
        company: "",
        channel: "",
        target: "",
        endTimeDay: this.GetDateStr(0)
      },
      companySelect: [], //公司下拉框
      channelSelect: [], //渠道下拉框

      twDayData: [], //整体数据
      twWeekData: [], //周数据
      twMonthData: [], //月数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: ""
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    handleChange() {},
    findFormData() {
      //公司下拉数据
      this.$common.findGameTypeEnum().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.companySelect.push(item);
          }
          console.log(this.companySelect);
        }
      });

      //渠道下拉数据
      this.$common.findChannel().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.channelSelect.push(item);
          }
        }
      });
      this.fetchData();
      this.fetchWeekData();
      this.fetchMonthData();
    },
    //获取数据
    //findTwDay(gameType, channelId, target, dateTime)
    fetchData() {
      this.listLoading = true;

      findTwDay(
        this.form.company,
        this.form.channel,
        this.form.target,
        this.form.endTimeDay
      ).then(response => {
        this.twDayData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    fetchWeekData() {
      this.listLoading = true;
      findTwWeek(this.form.company, this.form.channel, this.form.target).then(
        response => {
          this.twWeekData = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;

          let beforeData = response.data.beforeData;
          // 插入合计的数据
          console.log(beforeData);
          if (beforeData != null && beforeData != undefined) {
            var obj = {
              dateStr: "前日變化量",
              dau: beforeData.dau,
              accountInc: beforeData.accountInc,
              payMoney: beforeData.payMoney,
              chargeRate: beforeData.arppu,
              chargeUser: beforeData.chargeUser,
              arppu: beforeData.arppu,
              arpu: beforeData.arpu,
              dauRemain: beforeData.dauRemain,
              remain2day: 0,
              remain3day: 0,
              remain7day: 0,
              percentage: 0
            };
            this.twWeekData.push(obj);
          } else {
            var obj = {
              dateStr: "前日變化量",
              dau: 0,
              dauRemain: 0,
              remain2day: 0,
              remain3day: 0,
              remain7day: 0,
              percentage: 0,
              accountInc: 0,
              payMoney: 0,
              chargeRate: 0,
              chargeUser: 0,
              arppu: 0,
              arpu: 0
            };
            this.twWeekData.push(obj);
          }

          let beforeWeekData =response.data.beforeWeekData;
            if (beforeWeekData != null && beforeWeekData != undefined){
              var obj = {
                dateStr: '上週同期變化量',
                dau: beforeWeekData.dau,
                accountInc: beforeWeekData.accountInc,
                payMoney: beforeWeekData.payMoney,
                chargeRate: beforeWeekData.chargeRate,
                chargeUser: beforeWeekData.chargeUser,
                arppu:beforeWeekData.arppu,
                arpu:beforeWeekData.arpu,
                dauRemain:beforeWeekData.dauRemain,
                remain2day:0,
                remain3day:0,
                remain7day:0,
                percentage:0,
              };
              this.weekDataList.push(obj);
            }else {
              var obj = {
                dateStr: '上週同期變化量',
                dau: 0,
                accountInc: 0,
                payMoney: 0,
                chargeRate: 0,
                chargeUser:0,
                arppu:0,
                arpu:0,
                dauRemain:0,
                remain2day:0,
                remain3day:0,
                remain7day:0,
                percentage:0,
              };
              this.twWeekData.push(obj);
            }
        }
      );
    },

    fetchMonthData() {
      this.listLoading = true;
      console.log(this.monthForm.company);

      findTwMonth(this.monthForm.company, this.monthForm.channel).then(
        response => {
          this.twMonthData = response.data.list;

          this.total = response.data.total;
          this.listLoading = false;

           let beforeData = response.data.beforeData;
            // 插入合计的数据
            console.log(beforeData)
            if (beforeData != null && beforeData != undefined){
              var obj = {
                dateStr: '前日變化量',
                dau: beforeData.dau,
                accountInc: beforeData.accountInc,
                payMoney: beforeData.payMoney,
                chargeRate: beforeData.arppu,
                chargeUser: beforeData.chargeUser,
                arppu:beforeData.arppu,
                arpu:beforeData.arpu,
                dauRemain:beforeData.dauRemain,
                remain2day:0,
                remain3day:0,
                remain7day:0,
                percentage:0,
              };
              this.twMonthData.push(obj);
            }else {
              var obj = {
                dateStr: '前日變化量',
                dau: 0,
                dauRemain:0,
                remain2day:0,
                remain3day:0,
                remain7day:0,
                percentage:0,
                accountInc: 0,
                payMoney: 0,
                chargeRate: 0,
                chargeUser: 0,
                arppu:0,
                arpu:0,
              };
              this.twMonthData.push(obj);
            }

            let beforeWeekData =response.data.beforeWeekData;
            if (beforeWeekData != null && beforeWeekData != undefined){
              var obj = {
                dateStr: '上週同期變化量',
                dau: beforeWeekData.dau,
                accountInc: beforeWeekData.accountInc,
                payMoney: beforeWeekData.payMoney,
                chargeRate: beforeWeekData.chargeRate,
                chargeUser: beforeWeekData.chargeUser,
                arppu:beforeWeekData.arppu,
                arpu:beforeWeekData.arpu,
                dauRemain:beforeWeekData.dauRemain,
                remain2day:0,
                remain3day:0,
                remain7day:0,
                percentage:0,
              };
              this.twMonthData.push(obj);
            }else {
              var obj = {
                dateStr: '上週同期變化量',
                dau: 0,
                accountInc: 0,
                payMoney: 0,
                chargeRate: 0,
                chargeUser:0,
                arppu:0,
                arpu:0,
                dauRemain:0,
                remain2day:0,
                remain3day:0,
                remain7day:0,
                percentage:0,
              };
              this.twMonthData.push(obj);
            }
        }
      );
    },

    // 整体数据分页组件
    currentChange(currentPage) {
      this.pageIndex = currentPage;
      this.findFormData();
      //每页下拉显示数据
    },
    sizeChange(size) {
      this.pageSize = size;
      this.findFormData();
      //点击第几页
    },

    // 获取日期
    GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    }
  }
};
</script>
