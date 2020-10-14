<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">付费转化</div>
          <Tabs type="card">
            <Tab-pane label="日新增付费玩家">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <pay-newaddplayer :chart-data="dayAddPayData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table v-loading="listLoading" :data="dayAddPayTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="日新增付费玩家">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="历史平均">
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
            <Tab-pane label="日付费用户">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <pay-payplayer :chart-data="dayPayplayer" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="dayPayplayerTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="付费用户数">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="历史平均">
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
            <Tab-pane label="日付费率">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <pay-rate :chart-data="dayRateData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table v-loading="listLoading" :data="dayRateTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="日付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="历史平均">
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
          <div slot="title">新付费玩家</div>
          <Tabs type="card">
            <Tab-pane label="首日付费率">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <pay-firstdayrate :chart-data="firstDayRateData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt10 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstDayRateTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="首日付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="付费数">
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
            <Tab-pane label="首周付费率">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <pay-firstweekrate :chart-data="firstWeekRateData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstWeekRateTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="首周付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="付费数">
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
            <Tab-pane label="首月付费率">
              <div class="picbox_chart_table_div picbox" v-if="tabCt12 == 1">
                <pay-firstmonthrate :chart-data="firstMonthRateData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt12 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstMonthRateTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="首月付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="付费数">
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
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :lg="12" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">游戏天数</div>
            <Tabs type="card">
              <Tab-pane label="游戏天数">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <pay-gamedays :chart-data="daysPlayed" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="daysPlayedTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="游戏天数">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人数">
                      <template slot-scope="scope">{{scope.row.value}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
            </Tabs>
            <div class="after">
              <a
                role="chartBtn"
                class="pic_but l"
                :class="{'hover':tabCt2==1}"
                @click="chartBtn(tabCt1,1,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt2==2}"
                @click="chartBtn(tabCt1,2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="table_icon">表格</font>
              </a>
            </div>
          </Card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">首付等级</div>
            <Tabs type="card">
              <Tab-pane label="首付等级">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <pay-paymentlevel :chart-data="firstPayLevel" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="firstPayLevelTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="首付等级">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人数">
                      <template slot-scope="scope">{{scope.row.value}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
            </Tabs>
            <div class="after">
              <a
                role="chartBtn"
                class="pic_but l"
                :class="{'hover':tabCt3==1}"
                @click="chartBtn(tabCt1,tabCt2,1,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt3==2}"
                @click="chartBtn(tabCt1,tabCt2,2,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="table_icon">表格</font>
              </a>
            </div>
          </Card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :lg="12" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">首付金额</div>
            <Tabs type="card">
              <Tab-pane label="首付金额">
                <div class="picbox_chart_table_div picbox" v-if="tabCt4 == 1">
                  <pay-firstmoney :chart-data="firstPayMoney" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt4 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="firstPayMoneyTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="首付金额">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人数">
                      <template slot-scope="scope">{{scope.row.value}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
            </Tabs>
            <div class="after">
              <a
                role="chartBtn"
                class="pic_but l"
                :class="{'hover':tabCt4==1}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,1,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt4==2}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,2,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="table_icon">表格</font>
              </a>
            </div>
          </Card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">首付充值包类型</div>
            <Tabs type="card">
              <Tab-pane label="充值包类型">
                <div class="picbox_chart_table_div picbox" v-if="tabCt5 == 1">
                  <pay-firstpackagetype :chart-data="firstRechargeType" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt5 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="firstRechargeTypeTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="充值包类型">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人数">
                      <template slot-scope="scope">{{scope.row.value}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
            </Tabs>
            <div class="after">
              <a
                role="chartBtn"
                class="pic_but l"
                :class="{'hover':tabCt5==1}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,1,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt5==2}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,2,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="table_icon">表格</font>
              </a>
            </div>
          </Card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  findChargeConversion,
  findChargeConversionTotal,
  findFirstChargePlayDay,
  findFirstChargePlayerLevel,
  findFirstChargeMoney,
  findFirstChargeByChargeType
} from "@/api/playerGames";
import FindSearch from "@/common/FindSearch";
import PayFirstdayrate from "./components/PayFirstdayrate";
import PayFirstmoney from "./components/PayFirstmoney";
import PayFirstmonthrate from "./components/PayFirstmonthrate";
import PayFirstpackagetype from "./components/PayFirstpackagetype";
import PayFirstpay from "./components/PayFirstpay";
import PayFirstweekrate from "./components/PayFirstweekrate";
import PayGamedays from "./components/PayGamedays";
import PayNewaddplayer from "./components/PayNewaddplayer";

import PayPayplayer from "./components/PayPayplayer";
import PayRate from "./components/PayRate";
import PayPaymentlevel from "./components/PayPaymentlevel";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "付费玩家",
  components: {
    FindSearch,
    PayFirstdayrate,
    PayFirstmoney,
    PayFirstmonthrate,
    PayFirstpackagetype,
    PayFirstpay,
    PayFirstweekrate,
    PayGamedays,
    PayNewaddplayer,
    PayPayplayer,
    PayRate,
    PayPaymentlevel
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
      //日新增付费玩家
      dayAddPayData: {
        dayFirstChargeNum: [],
        dayFirstChargeNumAver: [],
        cDate: []
      },

      dayAddPayTab: [],

      //付费玩家
      dayPayplayer: {
        chargeUserNum: [],
        chargeUserAver: [],
        cDate: []
      },
      dayPayplayerTab: [],

      //日付费率
      dayRateData: {
        dayRate: [],
        dayRateAver: [],
        cDate: []
      },
      dayRateTab: [],

      //首日付费率
      firstDayRateData: {
        firstDayChargeNumRate: [],
        firstDayChargeNum: [],
        cDate: []
      },

      firstDayRateTab: [],

      //首周付费率
      firstWeekRateData: {
        firstWeekChargeNumRate: [],
        firstWeekChargeNum: [],
        cDate: []
      },
      firstWeekRateTab: [],

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

      //游戏天数
      daysPlayed: {
        count: [],
        rate: []
      },
      daysPlayedTab: [],

      //首付等级
      firstPayLevel: {
        count: [],
        rate: []
      },
      firstPayLevelTab: [],

      //首付金额
      firstPayMoney: {
        count: [],
        rate: []
      },
      firstPayMoneyTab: [],

      //首付充值包类型
      firstRechargeType: {
        count: [],
        rate: []
      },
      firstRechargeTypeTab: [],

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

      this.pageIndex = 1,
      this.pageSize = 15,
      //日新增
      this.dayAddPayData.dayFirstChargeNum = [];
      this.dayAddPayData.dayFirstChargeNumAver = [];
      this.dayAddPayData.cDate = [];
      this.dayAddPayTab = [];


      //日付费
      this.dayPayplayer.chargeUserNum = [];
      this.dayPayplayer.chargeUserAver = [];
      this.dayPayplayer.cDate = [];
      this.dayPayplayerTab = [];

      //日付费率
      this.dayRateData.dayRate = [];
      this.dayRateData.dayRateAver = [];
      this.dayRateData.cDate = [];
      this.dayRateTab = [];

      //首日付费率
      this.firstDayRateData.firstDayChargeNumRate = [];
      this.firstDayRateData.firstDayChargeNum = [];
      this.firstDayRateData.cDate = [];
      this.dayRateTab = [];

      //首周付费率
      this.firstWeekRateData.firstWeekChargeNumRate = [];
      this.firstWeekRateData.firstWeekChargeNum = [];
      this.firstWeekRateData.cDate = [];
      this.firstWeekRateTab = []

      //首月付费率
      this.firstMonthRateData.firstMonthChargeNumRate = [];
      this.firstMonthRateData.firstMonthChargeNum = [];
      this.firstMonthRateData.cDate = [];
      this.firstMonthRateTab = []

      //查询付费转化折线图数据
      //findChargeConversion(gameType, channelId, deviceType, beginTime, endTime)
      findChargeConversion(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //日新增付费用户数
        this.dataList = response.data.dayFirstChargeNum;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.dayAddPayData.dayFirstChargeNum.push(item.dayFirstChargeNum);
          this.dayAddPayData.dayFirstChargeNumAver.push(
            item.dayFirstChargeNumAver.toFixed(2)
          );
          this.dayAddPayData.cDate.push(newDate);

          this.dayAddPayTab.push({
            key: newDate,
            count: item.dayFirstChargeNum,
            value: item.dayFirstChargeNumAver.toFixed(2)
          });
        }

        //日付费用户
        this.dataList = response.data.chargeUserNum;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.dayPayplayer.chargeUserNum.push(item.chargeUserNum);
          this.dayPayplayer.chargeUserAver.push(item.chargeUserAver.toFixed(2));
          this.dayPayplayer.cDate.push(newDate);

          //表格数据
          this.dayPayplayerTab.push({
            key: newDate,
            count: item.chargeUserNum,
            value: item.chargeUserAver.toFixed(2)
          });
        }
        
        //日付费率
        this.dataList = response.data.dayRate;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.dayRateData.dayRate.push((item.dayRate * 100).toFixed(2));
          this.dayRateData.dayRateAver.push(item.dayRateAver.toFixed(2));
          this.dayRateData.cDate.push(newDate);

          //表格数据
          this.dayRateTab.push({
            key: newDate,
            count: (item.dayRate * 100).toFixed(2),
            value: item.dayRateAver.toFixed(2)
          });
        }

        //首日付费率
        this.dataList = response.data.dayFirstChargeNum;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.firstDayRateData.firstDayChargeNumRate.push(
            (item.firstDayChargeNumRate * 100).toFixed(2)
          );
          this.firstDayRateData.firstDayChargeNum.push(
            item.firstDayChargeNum.toFixed(2)
          );
          this.firstDayRateData.cDate.push(newDate);

          //表格数据
          this.firstDayRateTab.push({
            key: newDate,
            count: (item.firstDayChargeNumRate * 100).toFixed(2) + "%",
            value: item.firstDayChargeNum.toFixed(2)
          });
        }

        //首周付费率
        this.dataList = response.data.weekFirstCharge;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.firstWeekRateData.firstWeekChargeNumRate.push(
            (item.firstWeekChargeNumRate * 100).toFixed(2)
          );
          this.firstWeekRateData.firstWeekChargeNum.push(
            item.firstWeekChargeNum.toFixed(2)
          );
          this.firstWeekRateData.cDate.push(newDate);

          //表格数据
          this.firstWeekRateTab.push({
            key: newDate,
            count: (item.firstWeekChargeNumRate * 100).toFixed(2) + "%",
            value: item.firstWeekChargeNum.toFixed(2)
          });
        }

        //首月付费率
        this.dataList = response.data.monthFirstCharge;

        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.firstMonthRateData.firstMonthChargeNumRate.push(
            (item.firstMonthChargeNumRate * 100).toFixed(2)
          );
          this.firstMonthRateData.firstMonthChargeNum.push(
            item.firstMonthChargeNum.toFixed(2)
          );
          this.firstMonthRateData.cDate.push(newDate);

          //表格数据
          this.firstMonthRateTab.push({
            key: newDate,
            count: (item.firstMonthChargeNumRate * 100).toFixed(2) + "%",
            value: item.firstMonthChargeNum.toFixed(2)
          });
        }

        this.total = response.data.total;
        this.listLoading = false;
      });

      this.daysPlayedTab = []
      //获取付费转化游戏天数
      // findFirstChargePlayDay(gameType, channelId, deviceType, beginTime, endTime)
      findFirstChargePlayDay(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;

        let payDayCount = response.data.count;
        let payDayRate = response.data.rate;
        let allDay = [
          "one",
          "two",
          "four",
          "twoWeek",
          "threeWeek",
          "fourWeek",
          "fiveWeek",
          "sixWeek",
          "sevenWeek",
          "eightWeek",
          "nineWeek",
          "twelveWeek"
        ];
        let allDaysChina = [
          "首日",
          "2-3天",
          "4-7天",
          "2周",
          "3周",
          "4周",
          "5周",
          "6周",
          "7周",
          "8周",
          "9-12周",
          ">12周"
        ];
        for (let item in allDay) {
          this.daysPlayed.count.push(payDayCount[allDay[item]]);
          this.daysPlayed.rate.push(payDayRate[allDay[item]]);

          //表格
          this.daysPlayedTab.push({
            key: allDaysChina[item],
            value: payDayCount[allDay[item]]
          });
        }

        this.total = response.data.total;
        this.listLoading = false;
      });

      this.firstPayLevelTab = []
      //获取首付玩家等级
      // findFirstChargePlayerLevel(gameType, channelId, deviceType, beginTime, endTime)
      findFirstChargePlayerLevel(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;
        console.log(this.dataList);

        let firstPayLevelCount = response.data.count;
        let firstPayLevelRate = response.data.rate;
        let allLevel = [
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
        let allLevelChina = [
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
          "200级以上"
        ];
        for (let item in allLevel) {
          this.firstPayLevel.count.push(firstPayLevelCount[allLevel[item]]);
          this.firstPayLevel.rate.push(firstPayLevelRate[allLevel[item]]);

          //表格
          this.firstPayLevelTab.push({
            key: allLevelChina[item],
            value: firstPayLevelCount[allLevel[item]]
          });
        }

        this.total = response.data.total;
        this.listLoading = false;
      });


      this.firstPayMoneyTab = []
      //获取付费转化金额
      // findFirstChargeMoney(gameType, channelId, deviceType, beginTime, endTime)
      findFirstChargeMoney(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;

        let firstPayMoneyCount = response.data.count;
        let firstPayMoneyRate = response.data.rate;
        let allPayMoney = [
          "order_1",
          "order_2",
          "order_3",
          "order_4",
          "order_5",
          "order_6"
        ];
        let allPayMoneyChina = [
          "1.99",
          "4.99",
          "9.99",
          "19.99",
          "49.99",
          "99.99"
        ];
        for (let item in allPayMoney) {
          this.firstPayMoney.count.push(firstPayMoneyCount[allPayMoney[item]]);
          this.firstPayMoney.rate.push(firstPayMoneyRate[allPayMoney[item]]);

          //表格
          this.firstPayMoneyTab.push({
            key: allPayMoneyChina[item],
            value: firstPayMoneyCount[allPayMoney[item]]
          });
        }

        this.total = response.data.total;
        this.listLoading = false;
      });


      this.firstRechargeType = []
      this.firstRechargeType.rate = []
      this.firstRechargeTypeTab = []
      //获取付费转化充值包类型
      // findFirstChargeByChargeType(gameType, channelId, deviceType, beginTime, endTime)
      findFirstChargeByChargeType(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;

        let firstChargeTypeCount = response.data.count;
        let firstChargeTypeRate = response.data.rate;
        let allChargeType = [
          "chargeType_1",
          "chargeType_2",
          "chargeType_3",
          "chargeType_4",
          "chargeType_5",
          "chargeType_6",
          "chargeType_7",
          "chargeType_8"
        ];

        let allChargeTypeChina = [
          "普通充值,商城购买",
          "限时活动",
          "googleplay 商店购买",
          "苹果内购",
          "购买金猪",
          "好友礼物",
          "每日登录",
          "购买buff"
        ];
        for (let item in allChargeType) {
          this.firstRechargeType.count.push(
            firstChargeTypeCount[allChargeType[item]]
          );
          this.firstRechargeType.rate.push(
            firstChargeTypeRate[allChargeType[item]]
          );

          //表格
          this.firstRechargeTypeTab.push({
            key: allChargeTypeChina[item],
            value: firstChargeTypeCount[allChargeType[item]]
          });
        }
        this.total = response.data.total;
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
