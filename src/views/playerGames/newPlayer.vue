<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">新增玩家</div>
          <Tabs type="card">
            <Tab-pane label="新增设备与账户">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <line-chart :chart-data="lineChartData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table v-loading="listLoading" :data="dataList" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template
                      slot-scope="scope"
                    >{{scope.row.cdate | fmtDate2('yyyy-MM-DD HH:mm:ss')}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="新增设备">
                    <template slot-scope="scope">{{scope.row.deceiveInc}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="新增玩家">
                    <template slot-scope="scope">{{scope.row.accountInc}}</template>
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
              @click="chartBtn(1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,1,tabCt7,tabCt7)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt1==2}"
              @click="chartBtn(2,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,2,tabCt7,tabCt7)"
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
            <div slot="title">玩家绑定账户类型</div>
            <Tabs type="card">
              <Tab-pane label="玩家绑定账户类型">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <bind-account :chart-data="bindCount" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="tabBindCount"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="账户类型">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="数量">
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
                :class="{'hover':tabCt2==1}"
                @click="chartBtn(tabCt1,1,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt2==2}"
                @click="chartBtn(tabCt1,2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7)"
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
            <div slot="title">玩家注册账户类型</div>
            <Tabs type="card">
              <Tab-pane label="玩家注册账户类型">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <register-account :chart-data="regisCount" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="tabRegisCount"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="账户类型">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="数量">
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
                :class="{'hover':tabCt3==1}"
                @click="chartBtn(tabCt1,tabCt2,1,tabCt4,tabCt5,tabCt6,tabCt7)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt3==2}"
                @click="chartBtn(tabCt1,tabCt2,2,tabCt4,tabCt5,tabCt6,tabCt7)"
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
            <div slot="title">玩家地区</div>
            <Tabs type="card">
              <Tab-pane label="玩家地区">
                <div class="picbox_chart_table_div picbox" v-if="tabCt4 == 1">
                  <country-chart :chart-data="countryCount" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt4 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="tabCountryCount"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="新增设备">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="新增玩家">
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
                :class="{'hover':tabCt4==1}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,1,tabCt5,tabCt6,tabCt7)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt4==2}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,2,tabCt5,tabCt6,tabCt7)"
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
            <div slot="title">玩家渠道</div>
            <Tabs type="card">
              <Tab-pane label="玩家渠道">
                <div class="picbox_chart_table_div picbox" v-if="tabCt5 == 1">
                  <channel-chart :chart-data="channelCount" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt5 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="tabChannelCount"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="玩家数量">
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
                :class="{'hover':tabCt5==1}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,1,tabCt6,tabCt7)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt5==2}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,2,tabCt6,tabCt7)"
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
import { findNewPlayer } from "@/api/playerGames";
import FindSearch from "@/common/FindSearch";
import LineChart from "./components/LineChart";
import BindAccount from "./components/BindAccount";
import RegisterAccount from "./components/RegisterAccount";

import CountryChart from "./components/CountryChart";
import ChannelChart from "./components/ChannelChart";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "新增玩家",
  components: {
    FindSearch,
    LineChart,
    BindAccount,
    RegisterAccount,
    CountryChart,
    ChannelChart
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
      lineChartData: {
        accountInc: [],
        cDate: [],
        deceiveInc: []
      },
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
    chartBtn(a, b, c, d, e, f, g) {
      this.tabCt1 = a;
      this.tabCt2 = b;
      this.tabCt3 = c;
      this.tabCt4 = d;
      this.tabCt5 = e;
      this.tabCt6 = f;
      this.tabCt7 = g;
    },

    info() {
      this.$Message.info("这是一条普通的提醒");
    },
    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.fetchData(form);
    },
    //获取数据
    //findNewPlayer(gameType, channelId, deviceType, beginTime, endTime)
    fetchData(data) {
      (this.pageIndex = 1),
        (this.pageSize = 15),
        (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.listLoading = true);
      findNewPlayer(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.listLoading = false;
        //新增设备与账户
        this.lineChartData.accountInc = [];
        this.lineChartData.cDate = [];
        this.lineChartData.deceiveInc = [];
        this.dataList = response.data.newAccountList;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
          this.lineChartData.accountInc.push(item.accountInc);
          this.lineChartData.cDate.push(newDate);
          this.lineChartData.deceiveInc.push(item.deceiveInc);
          // this.lineChartData.cdate.push(item.cdate);
        }
        //玩家绑定账户类型数据
        this.bindCount = response.data.bindData;
        this.tabBindCount = [];
        //表格数据
        for (let item in this.bindCount) {
          this.tabBindCount.push({ key: item, value: this.bindCount[item] });
        }

        //注册账户类型数据
        this.tabRegisCount = [];
        this.regisCount = response.data.registerData;
        for (let item in this.regisCount) {
          this.tabRegisCount.push({ key: item, value: this.regisCount[item] });
        }

        //地区数据
        this.tabCountryCount = [];
        let chinaCountry = [
          "美国",
          "马来西亚",
          "台湾",
          "澳大利亚",
          "加拿大",
          "英国",
          "其他"
        ];
        let enCountry = [
          "america",
          "malaysia",
          "taiwan",
          "australia",
          "canada",
          "england",
          "other"
        ];
        this.countryCount = response.data.countryData;
        for (let item in chinaCountry) {
          this.tabCountryCount.push({
            key: chinaCountry[item],
            value: this.countryCount.count[enCountry[item]]
          });
        }

        // for(let item in  this.countryCount.rate){
        //   this.tabCountryCount.push({key:item,value:this.countryCount.rate[item]})
        // }

        //渠道数据
        this.tabChannelCount = [];
        this.channelCount = response.data.channelData;
        for (let item in this.channelCount) {
          this.tabChannelCount.push({
            key: item,
            value: this.channelCount[item]
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
