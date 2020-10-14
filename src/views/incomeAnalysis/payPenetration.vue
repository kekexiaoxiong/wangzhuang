<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">付费率</div>
          <Tabs type="card">
            <Tab-pane label="首日付费率">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <seep-firstdayrate :chart-data="firstPayRate" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table v-loading="listLoading" :data="firstPayTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="日付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
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
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <seep-firstweekrate :chart-data="firstWeekRateData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="firstWeekRateTab"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="付费用户数">
                    <template slot-scope="scope">{{scope.row.count}}</template>
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
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <seep-firstmonthrate :chart-data="firstMonthTab" />
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
                  <el-table-column align="center" label="首月付费率">
                    <template slot-scope="scope">{{scope.row.count}}</template>
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
          <div slot="title">ARPU</div>
          <Tabs type="card">
            <Tab-pane label="ARPU(日)">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <seep-dayarpu :chart-data="arpuData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt10 == 2">
                <el-table v-loading="listLoading" :data="arpuTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="ARPU(日)">
                    <template slot-scope="scope">{{scope.row.count}}</template>
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
            <Tab-pane label="ARPPU(日)">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <seep-dayarppu :chart-data="arppuData" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 2">
                <el-table v-loading="listLoading" :data="arppuTab" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="ARPPU(日)">
                    <template slot-scope="scope">{{scope.row.count}}</template>
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
            <div slot="title">各地区付费渗透</div>
            <Tabs type="card">
              <Tab-pane label="日均付费率">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <seep-countrydayave :chart-data="aveDayRateData" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="aveDayRateTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="日均付费率">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="日均ARPU">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <seep-countrydayarpu :chart-data="aveDayArpuData" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="aveDayArpuTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="日均arpu">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="日均ARPPU">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <seep-countrydayarppu :chart-data="aveDayArppuData" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="aveDayArppuTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="日均arppu">
                      <template slot-scope="scope">{{scope.row.val}}</template>
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
            <div slot="title">各渠道付费渗透</div>
            <Tabs type="card">
              <Tab-pane label="日均付费率">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <seep-channeldayave :chart-data="aveChannel" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="aveChannelTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人均付费率">
                      <template slot-scope="scope">{{scope.row.value}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="日均ARPU">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <seep-channeldayarpu :chart-data="arpuChannel" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="arpuChannelTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="日均arpu">
                      <template slot-scope="scope">{{scope.row.val}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <Tab-pane label="日均ARPPU">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <seep-channeldayarppu :chart-data="arppuChannel" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="arpuChannelTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="日均arppu">
                      <template slot-scope="scope">{{scope.row.val}}</template>
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
  </div>
</template>

<script>
import {
  findPayInfiltration,
  findCountryPayPenetration,
  findChannelsPayPenetration
} from "@/api/incomeAnalysis";
import FindSearch from "@/common/FindSearch";
import SeepFirstdayrate from "./components/SeepFirstdayrate";
import SeepFirstweekrate from "./components/SeepFirstweekrate";

import SeepFirstmonthrate from "./components/SeepFirstmonthrate";
import SeepDayave from "./components/SeepDayave";
import SeepDayarpu from "./components/SeepDayarpu";
import SeepDayarppu from "./components/SeepDayarppu";

import SeepCountrydayarpu from "./components/SeepCountrydayarpu";
import SeepCountrydayarppu from "./components/SeepCountrydayarppu";
import SeepCountrydayave from "./components/SeepCountrydayave";

import SeepChanneldayarppu from "./components/SeepChanneldayarppu";
import SeepChanneldayarpu from "./components/SeepChanneldayarpu";
import SeepChanneldayave from "./components/SeepChanneldayave";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "付费渗透",
  components: {
    FindSearch,
    SeepFirstdayrate,
    SeepFirstweekrate,
    SeepFirstmonthrate,
    SeepDayave,
    SeepDayarpu,
    SeepDayarppu,
    SeepCountrydayarpu,
    SeepCountrydayarppu,
    SeepCountrydayave,

    SeepChanneldayarppu,
    SeepChanneldayarpu,
    SeepChanneldayave
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

      //首日付费率
      firstPayRate: {
        dayRate: [],
        cDate: []
      },
      //表格数据
      firstPayTab: [],

      //首周付费率
      firstWeekRateData: {
        rate: [],
        cDate: []
      },

      //表格数据
      firstWeekRateTab: [],

      //首月付费率
      firstMonthRate: {
        rate: [],
        cDate: []
      },

      //表格数据
      firstMonthTab: [],

      //arpu
      arpuData: {
        arpu: [],
        cDate: []
      },

      //arpu表格数据
      arpuTab: [],

      //arppu
      arppuData: {
        arppu: [],
        cDate: []
      },

      //arppu表格数据
      arppuTab: [],

      //各地区日均付费率
      aveDayRateData: {
        val: []
      },

      //各地区日均付费率表格数据
      aveDayRateTab: [],

      //各地区日均arpu
      aveDayArpuData: {
        val: []
      },

      //各地区日均arpu表格数据
      aveDayArpuTab: [],

      //各地区日均arppu
      aveDayArppuData: {
        val: []
      },

      //各地区日均arppu表格
      aveDayArppuTab: [],

      //各渠道平均付费率
      aveChannel: {
        val: []
      },

      //各渠道平均付费率表格
      aveChannelTab: [],

      //各渠道日均arpu
      arpuChannel: {
        val: []
      },

      //各渠道日均arpu表格数据
      arpuChannelTab: [],

      //各渠道日均arppu
      arppuChannel: {
        val: []
      },
      //各渠道arppu表格数据
      arppuChannelTab: [],

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
        //付费率
        //findPayInfiltration(gameType, channelId, deviceType, beginTime, endTime)
        findPayInfiltration(
          data.company,
          data.channel,
          data.loginMethod,
          data.startTime,
          data.endTime
        ).then(response => {
          //首日付费率
          this.dataList = response.data.firstDayChargeNumRate;
          for (let item of this.dataList) {
            var time_str = item.cdate;
            var newDate = this.$options.filters["fmtDate"](
              time_str,
              "yyyy-MM-DD"
            );
            //首日
            this.firstPayRate.dayRate.push(item.dayRate);
            this.firstPayRate.cDate.push(newDate);

            this.firstPayTab.push({
              key: newDate,
              count: item.dayRate
            });
          }

          //首周付费率
          this.dataList = response.data.firstWeekChargeNumRate;
          for (let item of this.dataList) {
            var time_str = item.cdate;
            var newDate = this.$options.filters["fmtDate"](
              time_str,
              "yyyy-MM-DD"
            );

            this.firstWeekRateData.rate.push(item.firstWeekChargeNumRate);
            this.firstWeekRateData.cDate.push(newDate);
            this.firstWeekRateTab.push({
              key: newDate,
              count: item.firstWeekChargeNumRate
            });
          }

          //首月付费率
          this.dataList = response.data.firstMonthChargeNumRate;
          for (let item of this.dataList) {
            var time_str = item.cdate;
            var newDate = this.$options.filters["fmtDate"](
              time_str,
              "yyyy-MM-DD"
            );

            this.firstMonthRate.rate.push(item.firstMonthChargeNumRate);
            this.firstMonthRate.cDate.push(newDate);
            this.firstMonthTab.push({
              key: newDate,
              count: item.firstMonthChargeNumRate
            });
          }

          //arpu
          this.dataList = response.data.firstMonthChargeNumRate;
          for (let item of this.dataList) {
            var time_str = item.cdate;
            var newDate = this.$options.filters["fmtDate"](
              time_str,
              "yyyy-MM-DD"
            );

            this.arpuData.arpu.push(item.arpu);
            this.arpuData.cDate.push(newDate);
            this.arpuTab.push({
              key: newDate,
              count: item.arpu
            });
          }

          //arppu
          this.dataList = response.data.firstMonthChargeNumRate;
          for (let item of this.dataList) {
            var time_str = item.cdate;
            var newDate = this.$options.filters["fmtDate"](
              time_str,
              "yyyy-MM-DD"
            );

            this.arppuData.arppu.push(item.arppu);
            this.arppuData.cDate.push(newDate);
            this.arppuTab.push({
              key: newDate,
              count: item.arppu
            });
          }
          console.log(this.arppuData);
          this.listLoading = false;
        });

      this.aveDayArpuData.val = [];
      this.aveDayRateData.val = [];
      this.aveDayArppuData.val = [];
      //各地区付费渗透
      //findCountryPayPenetration(gameType, channelId, deviceType, beginTime, endTime)
      findCountryPayPenetration(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //日均付费率
        let aveDayCount = response.data.chargeRate.count;

        let allCountryEn = [
          "AMERICA",
          "MALAYSIA",
          "TAIWAN",
          "AUSTRALIA",
          "CANADA",
          "OTHER",
          "ENGLAND"
        ];

        let allCountryCh = [
          "美国",
          "马来西亚",
          "台湾",
          "澳大利亚",
          "加拿大",
          "其他",
          "英国"
        ];
        console.log(aveDayCount);
        for (let item in allCountryEn) {
          console.log(allCountryEn[item])
          this.aveDayRateData.val.push(
            (aveDayCount[allCountryEn[item]] * 100).toFixed(2)
          );
          //表格
          this.aveDayRateTab.push({
            key: allCountryCh[item],
            val: (aveDayCount[allCountryEn[item]] * 100).toFixed(2)
          });
        }

        //日均arpu
        let aveDayArpuCount = response.data.arpu.count;
        for (let item of allCountryEn) {
          this.aveDayArpuData.val.push(
            (aveDayArpuCount[item] * 100).toFixed(2)
          );

          //表格
          this.aveDayArpuTab.push({
            key: allCountryCh[item],
            val: (aveDayArpuCount[item] * 100).toFixed(2)
          });
        }

        //日均arppu
        let aveDayArppuCount = response.data.arppu.count;

        for (let item of allCountryEn) {
          this.aveDayArppuData.val.push(
            (aveDayArppuCount[item] * 100).toFixed(2)
          );

           //表格
          this.aveDayArppuTab.push({
            key: allCountryCh[item],
            val: (aveDayArppuCount[item] * 100).toFixed(2)
          });
        }
        console.log(this.aveDayArppuData);

        this.listLoading = false;
      });
      this.arppuChannel.val = [];
      this.arpuChannel.val = [];
      this.aveChannel.val = [];
      //各渠道付费渗透
      //findChannelsPayPenetration(gameType, channelId, deviceType, beginTime, endTime)
      findChannelsPayPenetration(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //日均付费率
        let aveDayCount = response.data.chargeRate.count;

       
        let allChannelEn = [
          "LEYOU_IOS",
          "TAIWAN_GOOGLEPLAY",
          "TAIWAN_IOS",
          "LEYOU_GOOGLEPLAY"
        ];

        for (let item in allChannelEn) {
          this.aveChannel.val.push((aveDayCount[allChannelEn[item]] * 100).toFixed(2));


           //表格
          this.aveChannelTab.push({
            key: allChannelEn[item],
            val: this.aveChannel.val.push((aveDayCount[allChannelEn[item]] * 100).toFixed(2))
          });

        }

        //日均arpu
        let aveDayArpuCount = response.data.arpu.count;
        for (let item in allChannelEn) {
          this.arpuChannel.val.push((aveDayArpuCount[allChannelEn[item]] * 100).toFixed(2));

                     //表格
          this.arpuChannelTab.push({
            key: allChannelEn[item],
            val:  this.arpuChannel.val.push((aveDayArpuCount[allChannelEn[item]] * 100).toFixed(2))
          });
        }

        //日均arppu
        let aveDayArppuCount = response.data.arppu.count;

        for (let item of allChannelEn) {
          this.arppuChannel.val.push((aveDayArppuCount[item] * 100).toFixed(2));

               //表格
          this.arppuChannelTab.push({
            key: allChannelEn[item],
            val:  this.arppuChannel.val.push((aveDayArpuCount[allChannelEn[item]] * 100).toFixed(2))
          });
        }
        console.log(this.aveDayArppuData);

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
