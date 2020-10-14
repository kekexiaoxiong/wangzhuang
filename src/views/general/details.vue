<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">在线趋势</div>
          <Tabs type="card">
            <Tab-pane label="在线趋势">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <trend-line :chart-data="onlineGeneral" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table v-loading="listLoading" :data="onlineGeneralTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="最高在线">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="平均在线">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
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
              @click="chartBtn(1,1,1,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt1==2}"
              @click="chartBtn(2,2,2,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11)"
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
          <div slot="title">关键指标</div>
          <Tabs type="card">
            <Tab-pane label="新增设备与账户">
              <div class="picbox_chart_table_div picbox" v-if="tabCt4 == 1">
                <index-countchart :chart-data="accountDeceive" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt4 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="accountDeceiveTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="新增账户">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="新增设备">
                    <template slot-scope="scope">{{scope.row.val2}}</template>
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
            <Tab-pane label="活跃玩家">
              <div class="picbox_chart_table_div picbox" v-if="tabCt5 == 1">
                <index-activechart :chart-data="livelyPlayer" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt5 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="livelyPlayerTab"
                  border
                  style="width: 100%;"
                >
                   <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="新玩家">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="老玩家">
                    <template slot-scope="scope">{{scope.row.val2}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="合计">
                    <template slot-scope="scope">{{scope.row.val3}}</template>
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
            <Tab-pane label="付费玩家">
              <div class="picbox_chart_table_div picbox" v-if="tabCt6 == 1">
                <index-paychart :chart-data="payPlayer" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt6 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="payPlayerTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="新玩家付费数">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="老玩家付费数">
                    <template slot-scope="scope">{{scope.row.val2}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="合计">
                    <template slot-scope="scope">{{scope.row.val3}}</template>
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
            <Tab-pane label="收入">
              <div class="picbox_chart_table_div picbox" v-if="tabCt7 == 1">
                <index-incomechart :chart-data="income" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt7 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="incomeTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="新玩家付费金额">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="老玩家付费金额">
                    <template slot-scope="scope">{{scope.row.val2}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="合计">
                    <template slot-scope="scope">{{scope.row.val3}}</template>
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
              :class="{'hover':tabCt7==1}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,1,1,1,1,tabCt8,tabCt9,tabCt10,tabCt11)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt7==2}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,2,2,2,2,tabCt8,tabCt9,tabCt10,tabCt11)"
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
          <div slot="title">付费渗透</div>
          <Tabs type="card">
            <Tab-pane label="日付费率">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <payment-ratechart :chart-data="dayRateChart" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt8 == 2">
                <el-table v-loading="listLoading" :data="dayRateTab" border style="width: 100%;">
                    <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="日付费率">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="历史平均">
                    <template slot-scope="scope">{{scope.row.val2}}</template>
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
            <Tab-pane label="日ARPU">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <payment-arpuchart :chart-data="dayArpu" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="dayArpuTab"
                  border
                  style="width: 100%;"
                >
                   <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="日ARPU">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="历史平均">
                    <template slot-scope="scope">{{scope.row.val2}}</template>
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
            <Tab-pane label="日ARPPU">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <payment-arppuchart :chart-data="dayArppu" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="dayArppuTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="日ARPPU">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="历史平均">
                    <template slot-scope="scope">{{scope.row.val2}}</template>
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
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,1,1,1,tabCt11)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt10==2}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,2,2,2,tabCt11)"
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
          <div slot="title">玩家留存</div>
          <Tabs type="card">
            <Tab-pane label="新增账户留存">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <remain-chart :chart-data="remainData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt11 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="remainDataTab"
                  border
                  style="width: 100%;"
                >
                 <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="次日玩家留存率">
                    <template slot-scope="scope">{{scope.row.val1}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="7日玩家留存率">
                    <template slot-scope="scope">{{scope.row.val2}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="30日玩家留存率">
                    <template slot-scope="scope">{{scope.row.val3}}</template>
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
              :class="{'hover':tabCt11==1}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,1)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt11==2}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,2)"
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
import { findLineGraph, findTotleData } from "@/api/general";
import FindSearch from "@/common/FindSearch";

import LineChart from "./components/LineChart";
import TrendLine from "./components/TrendLine";
import IndexCountchart from "./components/IndexCountchart";
import IndexActivechart from "./components/IndexActivechart";
import IndexPaychart from "./components/IndexPaychart";
import IndexIncomechart from "./components/IndexIncomechart";
import PaymentRatechart from "./components/PaymentRatechart";

import PaymentArpuchart from "./components/PaymentArpuchart";
import PaymentArppuchart from "./components/PaymentArppuchart";

import RemainChart from "./components/RemainChart";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "游戏概述",
  components: {
    FindSearch,
    LineChart,

    TrendLine,
    IndexCountchart,
    IndexActivechart,
    IndexPaychart,
    IndexIncomechart,
    PaymentRatechart,
    PaymentArpuchart,
    PaymentArppuchart,
    RemainChart
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

      //在线趋势
      onlineGeneral: {
        count: [],
        rate: [],
        cDate: []
      },

      onlineGeneralTab: [],

      //新增设备和账户
      accountDeceive: {
        count: [],
        rate: [],
        cDate: []
      },

      accountDeceiveTab: [],

      //活跃玩家
      livelyPlayer: {
        count: [],
        rate: [],
        total: [],
        cDate: []
      },

      livelyPlayerTab: [],

      //付费玩家
      payPlayer: {
        count: [],
        rate: [],
        total: [],
        cDate: []
      },
      payPlayerTab: [],

      //收入
      income: {
        count: [],
        rate: [],
        total: [],
        cDate: []
      },
      incomeTab: [],

      //日付费率
      dayRateChart: {
        count: [],
        rate: [],
        cDate: []
      },
      dayRateTab: [],

      //日ARPU
      dayArpu: {
        count: [],
        rate: [],
        cDate: []
      },
      dayArpuTab: [],

      //日ARPPU
      dayArppu: {
        count: [],
        rate: [],
        cDate: []
      },
      dayArppuTab: [],

      //玩家留存
      remainData: {
        secondRemain: [],
        sevenRemain: [],
        thirtyRemain: [],
        cDate: []
      },
      remainDataTab: [],

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

    //获取数据

    fetchData(data) {
      (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.listLoading = true);
         this.onlineGeneral.count = [];
         this.onlineGeneral.rate = [];
         this.onlineGeneral.cDate = [];
         this.onlineGeneralTab = [];
      //查询游戏概况线图数据
      //findLineGraph(gameType, channelId, deviceType, beginTime, endTime)
      findLineGraph(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
      
        //最高在线和平均在线
        this.dataList = response.data.onlineTotalList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.onlineGeneral.count.push(item.onlineCountHigh);
          this.onlineGeneral.rate.push((item.onlineCountAvr * 100).toFixed(2));
          this.onlineGeneral.cDate.push(newDate);

          //表格
          this.onlineGeneralTab.push({
            date:newDate,
            val1:item.onlineCountHigh,
            val2:(item.onlineCountAvr * 100).toFixed(2)+'%'

          })
        }
        console.log(this.onlineGeneral);

        this.accountDeceive.count = [];

        this.accountDeceive.rate = [];
        this.accountDeceive.cDate = [];
        this.accountDeceiveTab = [];

        //新增设备和账户
        this.dataList = response.data.accountList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.accountDeceive.count.push(item.accountInc);
          this.accountDeceive.rate.push(item.deceiveInc);
          this.accountDeceive.cDate.push(newDate);

          //表格
          this.accountDeceiveTab.push({
            date:newDate,
            val1:item.accountInc,
            val2:item.deceiveInc
          })
          
        }


        this.livelyPlayer.count = [];
        this.livelyPlayer.rate = [];
        this.livelyPlayer.total = [];
        this.livelyPlayer.cDate = [];

        this.livelyPlayerTab = [];
        //活跃玩家
        this.dataList = response.data.livelyPlayerList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.livelyPlayer.count.push(item.newAccountLivelyCount);
          this.livelyPlayer.rate.push(item.oldAccountLivelyCount);
          this.livelyPlayer.total.push(item.accountLivelyCount);
          this.livelyPlayer.cDate.push(newDate);

          //表格
          this.livelyPlayerTab.push({
            date:newDate,
            val1:item.newAccountLivelyCount,
            val2:item.oldAccountLivelyCount,
            val3:item.accountLivelyCount
          })
        }

        this.payPlayer.count = [];
        this.payPlayer.rate = [];
        this.payPlayer.total = [];
        this.payPlayer.cDate = [];

        this.payPlayerTab = [];
        //付费玩家
        this.dataList = response.data.chargeMoneyList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.payPlayer.count.push(item.newAccountChargeNum);
          this.payPlayer.rate.push(item.oldAccountChargeNum);
          this.payPlayer.total.push(item.chargeUserNum);
          this.payPlayer.cDate.push(newDate);

          //表格
          this.payPlayerTab.push({
            date:newDate,
            val1:item.newAccountChargeNum,
            val2:item.oldAccountChargeNum,
            val3:item.chargeUserNum
          })
        }

        //收入
        this.income.count = [];
        this.income.rate = [];
        this.income.total = [];
        this.income.cDate = [];
        this.incomeTab = [];

        this.dataList = response.data.chargeUserList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.income.count.push(item.newAccountChargeMoney);
          this.income.rate.push(item.oldAccountChargeMoney);
          this.income.total.push(item.chargeMoney);
          this.income.cDate.push(newDate);

          //表格
          this.incomeTab.push({
            date:newDate,
            val1:item.newAccountChargeMoney,
            val2:item.oldAccountChargeMoney,
            val3:item.chargeMoney
          })
        }

        this.dayRateChart.count = [];
        this.dayRateChart.rate = [];
        this.dayRateChart.cDate=  [] ;
        this.dayRateTab = [] ;     

         //日付费率
        this.dataList = response.data.chargeMoneyList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD"
          );
          this.dayRateChart.count.push((item.dayRate * 100).toFixed(2));
          this.dayRateChart.rate.push((item.dayRateAver * 100).toFixed(2));
          this.dayRateChart.cDate.push(newDate);

          //表格
          this.dayRateTab.push({
            date:newDate,
            val1:(item.dayRate * 100).toFixed(2)+'%',
            val2:(item.dayRateAver * 100).toFixed(2) + '%',
          })

        }



        this.dayArpu.count = [];
        this.dayArpu.rate = [];
        this.dayArpu.cDate = [];
        this.dayArpuTab = [];

        //日ARPU
        this.dataList = response.data.chargeMoneyList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD"
          );
          this.dayArpu.count.push((item.arpu * 100).toFixed(2));
          this.dayArpu.rate.push((item.arpuAver * 100).toFixed(2));
          this.dayArpu.cDate.push(newDate);

          //表格
          this.dayArpuTab.push({
            date:newDate,
            val1:(item.arpu * 100).toFixed(2)+'%',
            val2:(item.arpuAver * 100).toFixed(2) + '%'

          })


        }


        this.dayArppu.count = [];
        this.dayArppu.rate = [];
        this.dayArppu.cDate = [];
        this.dayArppuTab = [];

        //日ARPPU
        this.dataList = response.data.chargeMoneyList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD"
          );
          this.dayArppu.count.push((item.arppu * 100).toFixed(2));
          this.dayArppu.rate.push((item.arppuAver * 100).toFixed(2));
          this.dayArppu.cDate.push(newDate);

          //表格
          this.dayArppuTab.push({
            date:newDate,
            val1:(item.arppu * 100).toFixed(2)+'%',
            val2:(item.arppuAver * 100).toFixed(2) + '%'
          })
        }


        this.remainData.secondRemain = [];
        this.remainData.sevenRemain = [];
        this.remainData.thirtyRemain = [];
        this.remainData.cDate = [];
        this.remainDataTab = [];
        
        //玩家留存
        this.dataList = response.data.accountList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD"
          );
          this.remainData.secondRemain.push(
            (item.secondRemain * 100).toFixed(2)
          );
          this.remainData.sevenRemain.push(
            (item.sevenRemain * 100).toFixed(2)
          );
          this.remainData.thirtyRemain.push(
            (item.thirtyRemian * 100).toFixed(2)
          );
          this.remainData.cDate.push(newDate);



          this.remainDataTab.push({
            date:newDate,
            val1:(item.secondRemain * 100).toFixed(2)+'%',
            val2: (item.sevenRemain * 100).toFixed(2)+ '%',
            val3:(item.thirtyRemian * 100).toFixed(2) + '%'
          })
        }

        this.total = response.data.total;
        this.listLoading = false;
      });

      //查询游戏概况合计数据
      //findTotleData(gameType, channelId, deviceType, beginTime, endTime)
      findTotleData(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //新增设备与账户
        this.dataList = response.data.newAccountList;

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
