<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">新玩家等级</div>
          <Tabs type="card">
            <Tab-pane label="首日等级">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <progress-firstdaylev :chart-data="firstLevData" />
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
            <Tab-pane label="首周等级">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <progress-firstweeklev :chart-data="firstWeekData" />
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
            <Tab-pane label="14日等级">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <progress-twoweeklev :chart-data="twoWeekLevData" />
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

    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">新玩家7日内等级变迁</div>
          <Tabs type="card">
            <Tab-pane label="新玩家7日内等级变迁">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <progress-weeklevchange :chart-data="newPlayerWeekChange" />
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
  </div>
</template>

<script>
import {
  findLevNewPlayer,
  findLevTimes,
  findLevStop,
  findLevWeekChange
} from "@/api/levelAnalysis";
import FindSearch from "@/common/FindSearch";
import ProgressFirstdaylev from "./components/ProgressFirstdaylev";
import ProgressFirstweeklev from "./components/ProgressFirstweeklev";
import ProgressTwoweeklev from "./components/ProgressTwoweeklev";
import ProgressWeeklevchange from "./components/ProgressWeeklevchange";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "新玩家进度",
  components: {
    FindSearch,
    ProgressFirstdaylev,
    ProgressFirstweeklev,
    ProgressTwoweeklev,
    ProgressWeeklevchange
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
      //首日等级
      firstLevData: {
        val: [],
        cDate: []
      },

      incomeMoneyTab: [],

      //首周等级
      firstWeekData: {
        val: [],
        cDate: []
      },
      rechargeTimesTab: [],

      //14日等级
      twoWeekLevData: {
        val: [],
        cDate: []
      },
      rechargePeopleTab: [],

      //新玩家7日内等级变迁
      newPlayerWeekChange: {
        v1: [],
        v2: [],
        v3: [],
        v4: [],
        v5: [],
        v6: [],
        v7: [],
        v8: [],
        v9: [],
        v10: [],
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
      country: "",
      allLevEn: [
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
      this.firstLevData.val = [];
      //玩家等级分布
      //findLevNewPlayer(gameType, channelId, deviceType, type, beginTime, endTime)
      findLevNewPlayer(
        data.company,
        data.channel,
        data.loginMethod,
        1,
        data.startTime,
        data.endTime
      ).then(response => {
        //等级分布
        this.dataList = response.data.count;

        for (let item of this.allLevEn) {
          this.firstLevData.val.push(this.dataList[item]);
        }
        this.listLoading = false;
      });

     this.firstWeekData.val = [];
      //首周等级 type 2
      //findLevNewPlayer(gameType, channelId, deviceType, type, beginTime, endTime)
      findLevNewPlayer(
        data.company,
        data.channel,
        data.loginMethod,
        2,
        data.startTime,
        data.endTime
      ).then(response => {
        //等级分布
        this.dataList = response.data.count;
        for (let item of this.allLevEn) {
          this.firstWeekData.val.push(this.dataList[item]);
        }
        this.listLoading = false;
      });

        this.twoWeekLevData.val = [];
      //14日等级  type 3
      //findLevNewPlayer(gameType, channelId, deviceType, type, beginTime, endTime)
      findLevNewPlayer(
        data.company,
        data.channel,
        data.loginMethod,
        3,
        data.startTime,
        data.endTime
      ).then(response => {
        //等级分布
        this.dataList = response.data.count;
        for (let item of this.allLevEn) {
          this.twoWeekLevData.val.push(this.dataList[item]);
        }
        this.listLoading = false;
        console.log(this.twoWeekLevData.val);
      });

       //7日等级变迁
      //findLevWeekChange(gameType, channelId, deviceType, beginTime, endTime)
      findLevWeekChange(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //等级分布
        this.dataList = response.data;
        let allDaysEn = ['one','two','three','four','five','six','seven']
        this.newPlayerWeekChange.v1.push();
        for(let item in this.dataList){
          this.newPlayerWeekChange.v1.push((this.dataList[item][0]*100).toFixed(2));
            this.newPlayerWeekChange.v2.push((this.dataList[item][1]*100).toFixed(2));
            this.newPlayerWeekChange.v3.push((this.dataList[item][2]*100).toFixed(2));
            this.newPlayerWeekChange.v4.push((this.dataList[item][3]*100).toFixed(2));
            this.newPlayerWeekChange.v5.push((this.dataList[item][4]*100).toFixed(2));
            this.newPlayerWeekChange.v6.push((this.dataList[item][5]*100).toFixed(2));
            this.newPlayerWeekChange.v7.push((this.dataList[item][6]*100).toFixed(2));
            this.newPlayerWeekChange.v8.push((this.dataList[item][7]*100).toFixed(2));
            this.newPlayerWeekChange.v9.push((this.dataList[item][8]*100).toFixed(2));
            this.newPlayerWeekChange.v10.push((this.dataList[item][9]*100).toFixed(2));

        }
        console.log(this.newPlayerWeekChange)
        this.listLoading = false;
        console.log(this.newPlayerWeekChange.v1);
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
