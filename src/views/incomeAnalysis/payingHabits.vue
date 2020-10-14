<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :lg="12" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">充值方式</div>
            <Tabs type="card">
              <Tab-pane label="收入金额">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <hobit-rechargemoney :chart-data="rechargeMoney" />
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
              <Tab-pane label="充值人次">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <hobit-rechargeplayer :chart-data="rechargeTimes" />
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
            <div slot="title">消费包类型</div>
            <Tabs type="card">
              <Tab-pane label="收入金额">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <hobit-packagemoney :chart-data="packageMoney" />
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
              <Tab-pane label="充值人次">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <hobit-packageplayer :chart-data="packageTimes" />
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
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">充值频次和额度</div>
          <Tabs type="card">
            <Tab-pane label="每周充值次数">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <hobit-weektimes :chart-data="weekTimes" />
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
            <Tab-pane label="每月充值次数">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <hobit-monthtimes :chart-data="monthTimes" />
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
            <Tab-pane label="每周充值额度">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <hobit-quotaweek :chart-data="weekQuota" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstMonthRateData"
                  border
                  style="width: 100%;"
                >
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
            <Tab-pane label="每月充值额度">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <hobit-quotamonth :chart-data="monthQuota" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstMonthRateData"
                  border
                  style="width: 100%;"
                >
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
          <div slot="title">充值间隔</div>
          <Tabs type="card">
            <Tab-pane label="充值间隔">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <hobit-interval :chart-data="rechargeInterval" />
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
import {
  findPayType,
  findConsumeType,
  findPayHobitQuota,
  findPayHobitInterval
} from "@/api/incomeAnalysis";
import FindSearch from "@/common/FindSearch";
import HobitRechargemoney from "./components/HobitRechargemoney";
import HobitRechargeplayer from "./components/HobitRechargeplayer";
import HobitPackagemoney from "./components/HobitPackagemoney";

import HobitPackageplayer from "./components/HobitPackageplayer";
import HobitWeektimes from "./components/HobitWeektimes";
import HobitMonthtimes from "./components/HobitMonthtimes";

import HobitQuotaweek from "./components/HobitQuotaweek";
import HobitQuotamonth from "./components/HobitQuotamonth";

import NewChannelweek from "./components/NewChannelweek";
import NewChanneltwoweek from "./components/NewChanneltwoweek";
import HobitInterval from "./components/HobitInterval";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "付费习惯",
  components: {
    FindSearch,
    HobitRechargemoney,
    HobitRechargeplayer,

    HobitPackagemoney,
    HobitPackageplayer,

    HobitWeektimes,
    HobitMonthtimes,
    HobitQuotaweek,
    HobitQuotamonth,

    NewChannelweek,
    NewChanneltwoweek,
    HobitInterval
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

      //充值方式 收入金额
      rechargeMoney: {
        val: [],
        cDate: []
      },
      dayAddPayTab: [],

      //充值方式 充值人次
      rechargeTimes: {
        val: [],
        cDate: []
      },
      dayPayplayerTab: [],

      //消费包类型 收入金额
      packageMoney: {
        val: [],
        cDate: []
      },
      dayRateTab: [],

      //消费包类型 充值人次
      packageTimes: {
        val: [],
        cDate: []
      },

      firstDayRateTab: [],

      //充值频次和额度 每周充值次数
      weekTimes: {
        val: [],
        cDate: []
      },
      firstWeekRateTab: [],

      //充值频次和额度 每月充值次数
      monthTimes: {
        val: []
      },
      firstPayLevelTab: [],

      //充值频次和额度 每周充值额度
      weekQuota: {
        val: []
      },
      firstPayMoneyTab: [],

      //充值频次和额度 每月充值额度
      monthQuota: {
        val: []
      },
      firstPayMoneyTab: [],

      //充值间隔
      rechargeInterval: {
        val: []
      },
      firstPayMoneyTab: [],

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
      country: "",
      allTimes: [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "eleven",
        "twentyOne",
        "thirtyOne",
        "fortyOne",
        "fiftyOne"
      ],
      allQuota: [
        "zero",
        "ten",
        "fifty",
        "oneHundred",
        "twoHundred",
        "fiveHundred",
        "oneThousand",
        "threeThousand",
        "fiveThousand",
        "tenThousand"
      ]
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
        //充值方式  收入金额
        //findPayType(gameType, channelId, deviceType, type, beginTime, endTime)
        findPayType(
          data.company,
          data.channel,
          data.loginMethod,
          1,
          data.startTime,
          data.endTime
        ).then(response => {
          this.rechargeMoney.val.push(response.data.count.payType_1);
          this.rechargeMoney.val.push(response.data.count.payType_2);
          this.rechargeMoney.val.push(response.data.count.payType_3);
          this.rechargeMoney.val.push(response.data.count.payType_4);

          this.listLoading = false;
        });
      //充值方式 充值人次
      //findPayType(gameType, channelId, deviceType, type, beginTime, endTime)
      findPayType(
        data.company,
        data.channel,
        data.loginMethod,
        2,
        data.startTime,
        data.endTime
      ).then(response => {
        this.rechargeTimes.val.push(response.data.count.payType_1);
        this.rechargeTimes.val.push(response.data.count.payType_2);
        this.rechargeTimes.val.push(response.data.count.payType_3);
        this.rechargeTimes.val.push(response.data.count.payType_4);

        this.listLoading = false;
      });

      this.packageMoney.val = [];
      //消费包类型
      //findConsumeType(gameType, channelId, deviceType, type, beginTime, endTime)
      findConsumeType(
        data.company,
        data.channel,
        data.loginMethod,
        1,
        data.startTime,
        data.endTime
      ).then(response => {
        this.packageMoney.val.push(response.data.count.chargeType_1);
        this.packageMoney.val.push(response.data.count.chargeType_2);
        this.packageMoney.val.push(response.data.count.chargeType_3);
        this.packageMoney.val.push(response.data.count.chargeType_4);
        this.packageMoney.val.push(response.data.count.chargeType_5);
        this.packageMoney.val.push(response.data.count.chargeType_6);
        this.packageMoney.val.push(response.data.count.chargeType_7);
        this.packageMoney.val.push(response.data.count.chargeType_8);
        this.listLoading = false;
      });

      //消费包类型
      //findConsumeType(gameType, channelId, deviceType, type, beginTime, endTime)
      findConsumeType(
        data.company,
        data.channel,
        data.loginMethod,
        2,
        data.startTime,
        data.endTime
      ).then(response => {
        this.packageTimes.val.push(response.data.count.chargeType_1);
        this.packageTimes.val.push(response.data.count.chargeType_2);
        this.packageTimes.val.push(response.data.count.chargeType_3);
        this.packageTimes.val.push(response.data.count.chargeType_4);
        this.packageTimes.val.push(response.data.count.chargeType_5);
        this.packageTimes.val.push(response.data.count.chargeType_6);
        this.packageTimes.val.push(response.data.count.chargeType_7);
        this.packageTimes.val.push(response.data.count.chargeType_8);
        this.listLoading = false;
      });
      this.weekTimes.val = [];
      //充值频次和额度  每周次数
      //findPayHobitQuota(gameType, channelId, deviceType, type, beginTime, endTime)
      findPayHobitQuota(
        data.company,
        data.channel,
        data.loginMethod,
        1,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;
        for (let item of this.allTimes) {
          this.weekTimes.val.push(this.dataList[item]);
        }

        this.listLoading = false;
      });
      this.monthTimes.val = [];
      //充值频次和额度 每月次数
      //findPayHobitQuota(gameType, channelId, deviceType, type, beginTime, endTime)
      findPayHobitQuota(
        data.company,
        data.channel,
        data.loginMethod,
        2,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;
        for (let item of this.allTimes) {
          this.monthTimes.val.push(this.dataList[item]);
        }

        this.listLoading = false;
      });

      this.weekQuota.val = [];
      //充值频次和额度 每周额度
      //findPayHobitQuota(gameType, channelId, deviceType, type, beginTime, endTime)
      findPayHobitQuota(
        data.company,
        data.channel,
        data.loginMethod,
        3,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;
        for (let item of this.allQuota) {
          this.weekQuota.val.push(this.dataList[item]);
        }
        this.listLoading = false;
      });

      this.monthQuota.val = [];
      //充值频次和额度 每月额度
      //findPayHobitQuota(gameType, channelId, deviceType, type, beginTime, endTime)
      findPayHobitQuota(
        data.company,
        data.channel,
        data.loginMethod,
        4,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;
        for (let item of this.allQuota) {
          this.monthQuota.val.push(this.dataList[item]);
        }
        this.listLoading = false;
      });

      this.rechargeInterval.val = [];
      //充值间隔
      //findPayHobitInterval(gameType, channelId, deviceType, beginTime, endTime)
      findPayHobitInterval(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data.count;
        let allInterval = [
          "first",
          "one",
          "twentyFour",
          "oneDay",
          "twoDay",
          "threeDay",
          "fourDay",
          "fiveDay",
          "oneWeek",
          "twoWeek",
          "oneMonth",
          "threeMonth",
          "oneYear"
        ];
        for (let item of allInterval) {
          this.rechargeInterval.val.push(this.dataList[item]);
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
