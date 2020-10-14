<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">收入数据</div>
          <Tabs type="card">
            <Tab-pane label="收入金额">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <income-money :chart-data="incomeMoneyData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table v-loading="listLoading" :data="incomeMoneyTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
              
                  <el-table-column align="center" label="收入金额">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
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
              </div>
            </Tab-pane>
            <Tab-pane label="充值次数">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <recharge-times :chart-data="rechargeTimesData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="rechargeTimesTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="充值次数">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>
                
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
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
              </div>
            </Tab-pane>
            <Tab-pane label="充值人次">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <recharge-people :chart-data="rechargePeopleData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table v-loading="listLoading" :data="rechargePeopleTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
              
                  <el-table-column align="center" label="充值人次">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
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
              </div>
            </Tab-pane>
          </Tabs>
          <div class="after">
            <a
              role="chartBtn"
              class="pic_but l"
              :class="{'hover':tabCt1==1}"
              @click="chartBtn(1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,1,1,tabCt10,tabCt11,tabCt12)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt1==2}"
              @click="chartBtn(2,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,2,2,tabCt10,tabCt11,tabCt12)"
            >
              <font class="table_icon">表格</font>
            </a>
          </div>
        </Card>
      </div>
    </el-row>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">付费等级</div>
          <Tabs type="card">
            <Tab-pane label="收入金额">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <pay-level :chart-data="payLevelData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt10 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="incomeMoneyLevelTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="等级">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="收入金额">
                    <template slot-scope="scope">{{scope.row.val}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
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
              </div>
            </Tab-pane>
            <Tab-pane label="充值人次">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <pay-peoples :chart-data="payPeoplesData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 2">
                <el-table v-loading="listLoading" :data="payPeoplesTab" border style="width: 100%;">
                  <el-table-column align="center" label="等级">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="充值人数">
                    <template slot-scope="scope">{{scope.row.val}}</template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div style="text-align: center ; margin-top:10px;">
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
              </div>
            </Tab-pane>
          </Tabs>
          <div class="after">
            <a
              role="chartBtn"
              class="pic_but l"
              :class="{'hover':tabCt10==1}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,1,1,1)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt10==2}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,2,2,2)"
            >
              <font class="table_icon">表格</font>
            </a>
          </div>
        </Card>
      </div>
    </el-row>
  </div>
</template>

<script>
import { findIncomeData, findIncomeLevel } from "@/api/incomeAnalysis";
import FindSearch from "@/common/FindSearch";
import PayLevel from "./components/PayLevel";

import PayFirstpay from "./components/PayFirstpay";
import PayPeoples from "./components/PayPeoples";

import IncomeMoney from "./components/IncomeMoney";

import RechargeTimes from "./components/RechargeTimes";
import RechargePeople from "./components/RechargePeople";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "收入数据",
  components: {
    FindSearch,
    PayLevel,
    PayFirstpay,
    PayPeoples,
    IncomeMoney,
    RechargeTimes,
    RechargePeople
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
      tabCt1: 1, //表格切换
      tabCt2: 1,
      tabCt3: 1,
      tabCt4: 1,
      tabCt5: 1,
      tabCt6: 1,
      tabCt7: 1,
      tabCt8: 1,
      tabCt9: 1,
      tabCt10: 1,
      tabCt11: 1,
      tabCt12: 1,

      playClick: false,
      dayClick: false,
      //自定义下拉菜单
      selectedDay: "Day1留存用户",
      selectedPlayer: "新增日等级",
      //selecteAnalysis: "流失前等级",
      addList: ["Day1留存用户", "Day7留存用户", "Day30留存用户"],
      // addPlay: ["全部玩家", "付费玩家"],
      addPlay: [
        "新增日等级",
        "新增日游戏次数",
        "新增日游戏时长",
        "新增日是否付费",
        "玩家性别",
        "玩家年龄"
      ],
      //收入金额
      incomeMoneyData: {
        dayFirstChargeMoney: [],
        cDate: []
      },

      incomeMoneyTab: [],

      //充值次数
      rechargeTimesData: {
        chargeNum: [],
        cDate: []
      },
      rechargeTimesTab: [],

      //充值人次
      rechargePeopleData: {
        chargeUserNum: [],
        cDate: []
      },
      rechargePeopleTab: [],

      //付费等级收入金额
      payLevelData: {
        payMoney: [],
        total: [],
        cDate: []
      },
      dayAddPayTab: [],
      firstDayRateTab: [],

      //付费人数
      payPeoplesData: {
        total: [],
        cDate: []
      },
      payPeoplesTab: [],

      //首月付费率
      firstMonthRateData: {
        firstMonthChargeNumRate: [],
        firstMonthChargeNum: [],
        cDate: []
      },
      firstMonthRateTab: [],

      loyaltyList: {
        newPlayer: [],
        cDate: []
      },
      loyaltyListTab: [],

      dataList: [], //整体数据
      bindCount: [], //绑定账户数据
      tabBindCount: [],
      regisCount: [], //注册账户类型
      tabRegisCount: [],
      countryCount: [], //地区数据
      tabCountryCount: [],
      channelCount: [], //渠道数据
      tabChannelCount: [],

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
    //表格切换
    chartBtn(a, b, c, d, e, f, g, h, i, k, l, m) {
      this.tabCt1 = a;
      this.tabCt2 = b;
      this.tabCt3 = c;
      this.tabCt4 = d;
      this.tabCt5 = e;
      this.tabCt6 = f;
      this.tabCt7 = g;
      this.tabCt8 = h;
      this.tabCt9 = i;
      this.tabCt10 = k;
      this.tabCt11 = l;
      this.tabCt12 = m;
    },

    info() {
      this.$Message.info("这是一条普通的提醒");
    },
    findFormData() {
      (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.listLoading = true);
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值

      this.fetchData(form);
    },

    fetchData(data) {
      (this.pageIndex = 1),
        (this.pageSize = 15),
        (this.incomeMoneyData.dayFirstChargeMoney = []);
      this.incomeMoneyData.cDate = [];
      this.incomeMoneyTab = [];
      this.rechargeTimesData.chargeNum = [];
      this.rechargeTimesData.cDate = [];
     
      this.rechargePeopleData.chargeNum = [];
      this.rechargePeopleData.cDate = [];
      this.rechargePeopleTab = [];

      //查询付费转化折线图数据
      //findIncomeData(gameType, channelId, deviceType, beginTime, endTime)
      findIncomeData(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //收入金额
        this.dataList = response.data.incomeMoney;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.incomeMoneyData.dayFirstChargeMoney.push(
            item.dayFirstChargeMoney
          );
          this.incomeMoneyData.cDate.push(newDate);

          this.incomeMoneyTab.push({
            key: newDate,
            value: item.dayFirstChargeMoney
          });

          //充值次数

          this.rechargeTimesData.chargeNum.push(item.chargeNum);
          this.rechargeTimesData.cDate.push(newDate);
          this.rechargeTimesTab.push({
            key: newDate,
            value: item.chargeNum
          });

          //充值人次
          this.rechargePeopleData.chargeUserNum.push(item.chargeUserNum);
          this.rechargePeopleData.cDate.push(newDate);

          this.rechargePeopleTab.push({
            key: newDate,
            value: item.chargeUserNum
          });
        }
        this.listLoading = false;
      });

      this.payLevelData.total = [];
      this.payLevelData.payMoney = [];
      this.incomeMoneyLevelTab = [];

      this.payPeoplesData.total = [];
      this.payPeoplesTab = [];
      //收入数据--收入金额等级
      //  findIncomeLevel(gameType, channelId, deviceType, beginTime, endTime)
      findIncomeLevel(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //收入金额
        this.dataList = response.data;
        let allLevelCH = [
          "1级",
          "2-20级",
          "21-40级",
          "41-60级",
          "61-80级",
          "81-100级",
          "101-120级",
          "121-140级",
          "141-160级",
          "161-180级",
          "181-200级",
          "200级+"
        ];
        let allLevelEn = [
          "one",
          "two",
          "twentyOne",
          "fortyOne",
          "sixtyOne",
          "eightyOne",
          "oneHundredOne",
          "oneHundredTwentyOne",
          "oneHundredFortyOne",
          "oneHundredSixtyOne",
          "oneHundredEightyOne",
          "twoHundred"
        ];
        for (let item in allLevelEn) {
          this.payLevelData.payMoney.push(
            response.data[allLevelEn[item]].payMoney
          );
          this.payLevelData.total.push(response.data[allLevelEn[item]].total);

          this.incomeMoneyLevelTab.push({
            key: allLevelCH[item],
            val: response.data[allLevelEn[item]].payMoney
          });

          //充值人数
          this.payPeoplesData.total.push(response.data[allLevelEn[item]].total);

          this.payPeoplesTab.push({
            key: allLevelCH[item],
            val: response.data[allLevelEn[item]].total
          });
        }
        this.listLoading = false;
      });
    },
    // 整体数据分页组件
    currentChange(size) {
      this.pageIndex = size;
      // 每页下拉显示数据
    },
    sizeChange(currentPage) {
      this.pageSize = currentPage;
      //点击第几页
    }
  }
};
</script>

<style lang="scss" >
@import "./../../assets/css/base.css";
</style>
