<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">玩家流失</div>
          <Tabs type="card">
            <Tab-pane label="连续7日不登陆">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <return-weekloss :chart-data="weekLossList" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table v-loading="listLoading" :data="tabWeekLoss" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="流失用户">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="流失率">
                    <template slot-scope="scope">{{scope.row.rate}}</template>
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
            <Tab-pane label="连续14日不登陆">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <return-twoweekloss :chart-data="twoWeekLossList" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabTwoWeekLoss"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="流失用户">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="流失率">
                    <template slot-scope="scope">{{scope.row.rate}}</template>
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
            <Tab-pane label="连续30日不登陆">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <return-monthloss :chart-data="monthWeekLossList" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabMonthWeekLoss"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="流失用户">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="流失率">
                    <template slot-scope="scope">{{scope.row.rate}}</template>
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
          <div slot="title">玩家回流</div>
          <Tabs type="card">
            <Tab-pane label="连续7日不登陆">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <return-weekbackflow :chart-data="weekBackflowList" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt10 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabWeekBackflow"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="回流用户">
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
            <Tab-pane label="连续14日不登陆">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <return-twoweekbackflow :chart-data="TwoWeekBackflowList" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabTwoWeekBackflow"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="回流用户">
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
            <Tab-pane label="连续30日不登陆">
              <div class="picbox_chart_table_div picbox" v-if="tabCt12 == 1">
                <return-monthbackflow :chart-data="monthBackflowList" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt12 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabMonthBackflow"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="回流用户">
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
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">
            流失用户分析
            <div class="selectPosition">
              <div class="buttonDiv left">
                <label class="left selectlble">分析方式：</label>
                <div class="selectlist" style="height: 16px; float: left;">
                  <div
                    class="relative"
                    tabindex="0"
                    style="z-index: auto;"
                    @click="dayClick = !dayClick"
                  >
                    <div class="dropselect">
                      <h4 title="连续7日不登陆" class="over">{{selectedDay}}</h4>
                    </div>
                  </div>
                  <ul
                    class="dropselistbox"
                    style="min-width: 100px; max-width: 328px; top: 42px;"
                    v-if="dayClick"
                  >
                    <li
                      v-for="(item,index) in addList"
                      @click="choose_addr(index)"
                      :key="index"
                    >{{item}}</li>
                  </ul>
                </div>
              </div>
              <div class="buttonDiv left" style="margin-left:0;">
                <label class="left selectlble">分析方式</label>
                <div class="selectlist" style="height: 16px; float: left;">
                  <div
                    class="relative"
                    tabindex="0"
                    style="z-index: auto;"
                    @click="playClick = !playClick"
                  >
                    <div class="dropselect">
                      <h4 title="全部玩家">{{selectedPlayer}}</h4>
                    </div>
                  </div>
                  <ul
                    class="dropselistbox"
                    style="min-width: 100px; max-width: 328px; top: 42px;"
                    v-if="playClick"
                  >
                    <li
                      v-for="(i,index) in addPlay"
                      @click="choose_play(index+1)"
                      :key="index"
                    >{{i}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Tabs type="card">
            <Tab-pane label="流失用户分析">
              <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                <return-analysis :chart-data="ReturnAnalysData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                <el-table v-loading="listLoading" :data="tabReturnAnalys" border style="width: 100%;">
                  <el-table-column align="center" :label="tabType">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="人数">
                    <template slot-scope="scope">{{scope.row.value}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="百分比">
                    <template slot-scope="scope">{{scope.row.rate}}</template>
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
              :class="{'hover':tabCt2==1}"
              @click="chartBtn(tabCt1,1,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt2==2}"
              @click="chartBtn(tabCt1,2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11)"
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
  findPlayerLossAndReturnListl,
  findPlayerLossDataLis
} from "@/api/playerGames";
import FindSearch from "@/common/FindSearch";

import ReturnWeekloss from "./components/ReturnWeekloss";
import ReturnTwoweekloss from "./components/ReturnTwoweekloss";
import ReturnMonthloss from "./components/ReturnMonthloss";
import ReturnWeekbackflow from "./components/ReturnWeekbackflow";
import ReturnTwoweekbackflow from "./components/ReturnTwoweekbackflow";
import ReturnMonthbackflow from "./components/ReturnMonthbackflow";
import ReturnAnalysis from "./components/ReturnAnalysis";
import ActChannel from "./components/ActChannel";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "玩家流失",
  components: {
    FindSearch,
    ReturnWeekloss,
    ReturnTwoweekloss,
    ReturnMonthloss,
    ReturnWeekbackflow,
    ReturnTwoweekbackflow,
    ReturnMonthbackflow,
    ReturnAnalysis
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
      selectedDay: "流失前等级",
      selectedPlayer: "全部玩家",
      //selecteAnalysis: "流失前等级",
      addList: ["流失前等级", "用户生命期", "付费金额", "付费次数"],
      // addPlay: ["全部玩家", "付费玩家"],
      addPlay: ["全部玩家", "付费玩家"],



      //流失分析
      tabType:'流失前等级',
      //7日流失
      weekLossList: {
        user: [],
        userRate: [],
        cDate: []
      },

      tabWeekLoss: [],

      //两周流失
      twoWeekLossList: {
        user: [],
        userRate: [],
        cDate: []
      },

      tabTwoWeekLoss: [],

      //一个月流失
      monthWeekLossList: {
        user: [],
        userRate: [],
        cDate: []
      },

      tabMonthWeekLoss: [],

      //7日回流
      weekBackflowList: {
        user: [],
        userRate: [],
        cDate: []
      },
      tabWeekBackflow: [],

      //两周回流
      TwoWeekBackflowList: {
        user: [],
        userRate: [],
        cDate: []
      },
      tabTwoWeekBackflow: [],

      //30日回流
      monthBackflowList: {
        user: [],
        userRate: [],
        cDate: []
      },
      tabMonthBackflow: [],

      //流失玩家分析
      ReturnAnalysData: {
        count: [],
        rate: [],
        index: 1,
        yData:["1级",
        "2-11级",
        "12-18级",
        "19-35级",
        "36-59级",
        "60-66级",
        "67-83级",
        "84-92级",
        "93-113级",
        "113级+",]
      },

      tabReturnAnalys: [],
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
      lossType: "1",
      chargeType: "1",
      analyzeType: "level", //流失前等级 level  、chargeNum 次数   、chargeMoney 金额 、 day用户生命期

      levelEn: [
        "one",
        "two",
        "twelve",
        "nineteen",
        "thirtySix",
        "sixty",
        "sixtySeven",
        "eightyFour",
        "ninetyThree",
        "oneHundredAndThirteen"
      ],
      chargeNumEn: [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "ten",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "fiftyMore"
      ],
      chargeMoneyEn: [
        "ten",
        "fifty",
        "oneHundred",
        "twoHundred",
        "fiveHundred",
        "oneThousand",
        "threeThousand",
        "fiveThousand",
        "tenThousand",
        "tenThousandMore"
      ],
      dayEn: [
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
      ],
      typeEn: [
        "one",
        "two",
        "twelve",
        "nineteen",
        "thirtySix",
        "sixty",
        "sixtySeven",
        "eightyFour",
        "ninetyThree",
        "oneHundredAndThirteen"
      ],
      
      times: ["未付费", "1次","2次", "3次","4次", "5次","6~10次", "11~20次","21~30次", "31~40次","41~50次", "大于50次"],
      level: [
        "1级",
        "2-11级",
        "12-18级",
        "19-35级",
        "36-59级",
        "60-66级",
        "67-83级",
        "84-92级",
        "93-113级",
        "113级+",
      ], // 等级
      life: [
        "1天",
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
        "12周以上"
      ], //次数

      pay: [
        "<￥10",
        "￥10~50",
        "￥50~100",
        "￥100~200",
        "￥200~500",
        "￥500~1000",
        "￥1000~3000",
        "￥3000~5000",
        "￥5000~10000",
        ">￥1000",
      ] //时长
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

    //分析方式
    choose_addr(index) {
      // this.alanayLevel = {};
      this.tabData = [];
      this.tabReturnAnalys = [];
      this.dayClick = false;
      let data = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.selectedDay = this.addList[index];

      this.ReturnAnalysData.count = [];
      this.ReturnAnalysData.rate = [];
      //查询留存用户分析
      //findPlayerLossDataLis(gameType, channelId, deviceType, lossType, chargeType, analyzeType, beginTime, endTime)
      if (index + 1 == 1) {
        this.analyzeType = "level";
        this.typeEn = this.levelEn;
        this.ReturnAnalysData.yData = this.level;
        this.tabType = "流失前等级"
      } else if (index + 1 == 2) {
        this.analyzeType = "day";
        this.typeEn = this.dayEn;
        this.ReturnAnalysData.yData = this.life;
        this.tabType = "用户生命期"
      } else if (index + 1 == 3) {
        this.analyzeType = "chargeMoney";
        this.typeEn = this.chargeMoneyEn;
        this.ReturnAnalysData.yData = this.pay;
        this.tabType = "付费金额"
      } else {
        this.analyzeType = "chargeNum";
        this.typeEn = this.chargeNumEn;
        this.ReturnAnalysData.yData = this.times;
        this.tabType = "付费次数"
      }

      findPlayerLossDataLis(
        data.company,
        data.channel,
        data.loginMethod,
        this.lossType,
        this.chargeType,
        this.analyzeType,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;
        for (let item in this.typeEn) {
          this.ReturnAnalysData.count.push(this.dataList.count[this.typeEn[item]]);
          this.ReturnAnalysData.rate.push(this.dataList.rate[this.typeEn[item]]);
          this.ReturnAnalysData.index = index + 1;


          this.tabReturnAnalys.push({
            key: this.ReturnAnalysData.yData[item],
            value: this.dataList.count[this.typeEn[item]],
            rate: this.dataList.rate[this.typeEn[item]],
          })
        }

        console.log( this.tabReturnAnalys )

      });
    },

    choose_play(index) {
      this.tabData = [];
      let data = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.selectedPlayer = this.addPlay[index - 1];
      this.playClick = false;

      this.ReturnAnalysData.count = [];
      this.ReturnAnalysData.rate = [];

      this.chargeType = index;

      //findPlayerLossDataLis(gameType, channelId, deviceType, lossType, chargeType, analyzeType, beginTime, endTime)
      findPlayerLossDataLis(
        data.company,
        data.channel,
        data.loginMethod,
        this.lossType,
        this.chargeType,
        this.analyzeType,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;
        for (let item of this.typeEn) {
          this.ReturnAnalysData.count.push(this.dataList.count[item]);
          this.ReturnAnalysData.rate.push(this.dataList.rate[item]);
        }

        console.log(this.ReturnAnalysData);
        let levCount = response.data.count;
        let levRate = response.data.rate;
        for (let i in this.tabType) {
          this.tabData.push({
            key: this.keyType[i],
            count: levCount[this.tabType[i]],
            rate: (levRate[this.tabType[i]] * 100).toFixed(2) + "%"
          });
        }
      });
    },

    fetchData(data) {
      //查询玩家流失折线图数据
      //findPlayerLossAndReturnListl(gameType, channelId, deviceType, beginTime, endTime)

      this.weekLossList.user = [];
      this.weekLossList.userRate = [];
      this.weekLossList.cDate = [];
      this.twoWeekLossList.user = [];
      this.twoWeekLossList.userRate = [];
      this.twoWeekLossList.cDate = [];
      this.monthWeekLossList.user = [];
      this.monthWeekLossList.userRate = [];
      this.monthWeekLossList.cDate = [];
      this.weekBackflowList.user = [];
      this.weekBackflowList.cDate = [];
      this.TwoWeekBackflowList.user = [];
      this.TwoWeekBackflowList.cDate = [];
      this.monthBackflowList.user = [];
      this.monthBackflowList.cDate = [];
      this.ReturnAnalysData.count = [];
      this.ReturnAnalysData.rate = [];
  console.log(this.weekBackflowList)
      findPlayerLossAndReturnListl(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //7日流失
        this.tabWeekLoss = [];
        this.dataList = response.data.weekLoss;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD"
          );
          this.weekLossList.user.push(item.weekLossCount);
          this.weekLossList.userRate.push(
            (item.weekLossCountRate * 100).toFixed(2)
          );
          this.weekLossList.cDate.push(newDate);
          this.tabWeekLoss.push({
            key: newDate,
            value: item.weekLossCount,
            rate: (item.weekLossCountRate * 100).toFixed(2) + "%"
          });
        }

        //14日流失
        this.tabTwoWeekLoss = []
        this.dataList = response.data.twoWeekLoss;

        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.twoWeekLossList.user.push(item.twoWeekLossCount);
          this.twoWeekLossList.userRate.push(
            (item.twoWeekLossCountRate * 100).toFixed(2)
          );
          this.twoWeekLossList.cDate.push(newDate);

          this.tabTwoWeekLoss.push({
            key: newDate,
            value: item.twoWeekLossCount,
            rate: (item.twoWeekLossCountRate * 100).toFixed(2) + "%"
          });
        }

        //30日流失
        this.tabMonthWeekLoss = []
        this.dataList = response.data.monthLoss;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.monthWeekLossList.user.push(item.monthLossCount);
          this.monthWeekLossList.userRate.push(
            (item.monthLossCountRate * 100).toFixed(2)
          );
          this.monthWeekLossList.cDate.push(newDate);

          this.tabMonthWeekLoss.push({
            key: newDate,
            value: item.monthLossCount,
            rate: (item.monthLossCountRate * 100).toFixed(2) + "%"
          });
        }

        //7日回流
        this.tabWeekBackflow = []
        this.dataList = response.data.weekReturn;

        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.weekBackflowList.user.push(item.weekReturnCount);
          // this.weekBackflowList.userRate.push((item.monthLossCountRate*100).toFixed(2));
          this.weekBackflowList.cDate.push(newDate);

          //表格数据
          this.tabWeekBackflow.push({
            key: newDate,
            value: item.weekReturnCount
          });
        }


      
        //14日回流
        this.tabTwoWeekBackflow = []
        this.dataList = response.data.twoWeekReturn;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.TwoWeekBackflowList.user.push(item.twoWeekReturnCount);
          //this.TwoWeekBackflowList.userRate.push((item.monthLossCountRate*100).toFixed(2));
          this.TwoWeekBackflowList.cDate.push(newDate);
          this.TwoWeekBackflowList.cDate.push(newDate);
          //表格数据
          this.tabTwoWeekBackflow.push({
            key: newDate,
            value: item.twoWeekReturnCount
          });
        }

        //30日回流
        this.tabMonthBackflow = [];
        this.dataList = response.data.monthReturn;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.monthBackflowList.user.push(item.monthReturnCount);
          // this.monthBackflowList.userRate.push((item.monthLossCountRate*100).toFixed(2));
          this.monthBackflowList.cDate.push(newDate);

          //表格数据
          this.tabMonthBackflow.push({
            key: newDate,
            value: item.monthReturnCount
          });
        }

        this.total = response.data.total;
        this.listLoading = false;
      });

      //查询玩家流失回流分析
      // findPlayerLossDataLis(gameType, channelId, deviceType, lossType, chargeType, analyzeType, beginTime, endTime)
      findPlayerLossDataLis(
        data.company,
        data.channel,
        data.loginMethod,

        this.lossType,
        this.chargeType,
        this.analyzeType,

        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;

        this.tabReturnAnalys = [];
        for (let item in this.levelEn) {
          this.ReturnAnalysData.count.push(this.dataList.count[this.levelEn[item]]);
          this.ReturnAnalysData.rate.push(this.dataList.rate[this.levelEn[item]]);
          this.ReturnAnalysData.index = 1;

          this.tabReturnAnalys.push({
            key: this.level[item],
            value: this.dataList.count[this.levelEn[item]],
            rate: this.dataList.rate[this.levelEn[item]],
          })
        }

        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    // 整体数据分页组件
    currentChange(size) {
      this.pageIndex = size;
      this.findFormData();
      // 每页下拉显示数据
    },
    sizeChange(currentPage) {
      this.pageSize = currentPage;
      this.findFormData();
      //点击第几页
    }
  }
};
</script>

<style lang="scss" >
@import "./../../assets/css/base.css";
</style>
