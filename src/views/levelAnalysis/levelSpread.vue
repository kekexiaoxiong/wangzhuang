<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">玩家等级分布</div>
          <Tabs type="card">
            <Tab-pane label="玩家等级分布">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <level-spread :chart-data="levelSpreadData" />
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
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,1,1)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt10==2}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,2,2)"
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
          <div slot="title">游戏次数等级分布</div>
          <Tabs type="card">
            <Tab-pane label="游戏次数等级分布">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <level-times :chart-data="timesSpread" />
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
         
          </Tabs>
          <div class="after">
            <a
              role="chartBtn"
              class="pic_but l"
              :class="{'hover':tabCt10==1}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,1,tabCt11,1)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt10==2}"
              @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,2,tabCt11,2)"
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
          <div slot="title">流失玩家停留等级</div>
          <Tabs type="card">
            <Tab-pane label="7日未登录玩家">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <level-weeknotlogin :chart-data="lossWeekPlayer" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="incomeMoneyTab"
                  border
                  style="width: 100%;"
                >
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
            <Tab-pane label="14日未登录玩家">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <level-twoweeknotlogin :chart-data="lossTwoWeekPlayer" />
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
            <Tab-pane label="30日未登录">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <level-monthnotlogin :chart-data="lossMonthPlayer" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="rechargePeopleTab"
                  border
                  style="width: 100%;"
                >
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
    
  </div>
</template>

<script>
import { findLevSpread, findLevTimes ,findLevStop} from "@/api/levelAnalysis";
import FindSearch from "@/common/FindSearch";
import LevelSpread from "./components/LevelSpread";

import LevelTimes from "./components/LevelTimes";
import LevelWeeknotlogin from "./components/LevelWeeknotlogin";

import LevelTwoweeknotlogin from "./components/LevelTwoweeknotlogin";
import LevelMonthnotlogin from "./components/LevelMonthnotlogin";


const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "等级分布",
  components: {
    FindSearch,
    LevelSpread,
    LevelTimes,
    LevelWeeknotlogin,
    LevelTwoweeknotlogin,
    LevelMonthnotlogin,
    
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
      //玩家等级分布
      levelSpreadData: {
        val: [],
        cDate: []
      },

      incomeMoneyTab: [],

      //游戏次数等级分布
      timesSpread: {
        val: [],
        cDate: []
      },
      rechargeTimesTab: [],

      //流失玩家停留等级 7日
      lossWeekPlayer: {
        chargeUserNum: [],
        cDate: []
      },
      rechargePeopleTab: [],

       //流失玩家停留等级 14日
      lossTwoWeekPlayer: {
        val: [],
        total: [],
        cDate: []
      },
      dayAddPayTab: [],
      firstDayRateTab: [],

      //流失玩家停留等级 30日
      lossMonthPlayer: {
        val: [],
        cDate: []
      },
      payPeoplesTab: [],


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
     this.levelSpreadData.val = [];
     this.levelSpreadData.cDate = [];
      //玩家等级分布
      //findLevSpread(gameType, channelId, deviceType, beginTime, endTime)
      findLevSpread(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //等级分布
        this.dataList = response.data;
        console.log(this.dataList);
        for(let item of this.dataList){
            this.levelSpreadData.val.push(item.count);
            this.levelSpreadData.cDate.push(item.level+"级");
        }
       
        this.listLoading = false;
         
      });
       
   this.timesSpread.val = [];
   this.timesSpread.cDate = [];
      //次数等级分布
     // findLevTimes(gameType, channelId, deviceType, type, beginTime, endTime)
      findLevTimes(
        data.company,
        data.channel,
        data.loginMethod,
        1,
        data.startTime,
        data.endTime
      ).then(response => {
        //次数等级分布
        this.dataList = response.data;
         for(let item of this.dataList){
            this.timesSpread.val.push(item.count);
            this.timesSpread.cDate.push(item.level+"级");
        }
        this.listLoading = false;
      });


    //流失玩家停留等级 1 2 3 
    // findLevStop(gameType, channelId, deviceType, type, beginTime, endTime)
      findLevStop(
        data.company,
        data.channel,
        data.loginMethod,
        1,
        data.startTime,
        data.endTime
      ).then(response => {
        //次数等级分布
        this.dataList = response.data;
         for(let item of this.dataList){
            this.lossWeekPlayer.val.push(item.count);
            this.lossWeekPlayer.cDate.push(item.level+"级");
        }
        this.listLoading = false;
      });

 //流失玩家停留等级 1 2 3 
     // findLevStop(gameType, channelId, deviceType, type, beginTime, endTime)
      findLevStop(
        data.company,
        data.channel,
        data.loginMethod,
        2,
        data.startTime,
        data.endTime
      ).then(response => {
        //次数等级分布
        this.dataList = response.data;
         for(let item of this.dataList){
            this.lossTwoWeekPlayer.val.push(item.count);
            this.lossTwoWeekPlayer.cDate.push(item.level+"级");
        }
        this.listLoading = false;
      });

      //流失玩家停留等级 type取值为 1 2 3 
     // findLevStop(gameType, channelId, deviceType, type, beginTime, endTime)
      findLevStop(
        data.company,
        data.channel,
        data.loginMethod,
        3,
        data.startTime,
        data.endTime
      ).then(response => {
        //次数等级分布
        this.dataList = response.data;
         for(let item of this.dataList){
            this.lossMonthPlayer.val.push(item.count);
            this.lossMonthPlayer.cDate.push(item.level+"级");
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
