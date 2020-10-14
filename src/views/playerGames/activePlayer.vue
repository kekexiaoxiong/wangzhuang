<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">玩家活跃</div>
          <Tabs type="card">
            <Tab-pane label="日活跃">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <act-lineday :chart-data="dayLivelyList" />
              </div> 
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabDayLivelyList"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.time }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="新用户">
                    <template slot-scope="scope">{{scope.row.newPlayer}}</template>
                  </el-table-column>

                  <el-table-column align="center" label="老用户">
                    <template slot-scope="scope">{{scope.row.oldPlayer}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="合计">
                    <template slot-scope="scope">{{scope.row.oldNew}}</template>
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
            <Tab-pane label="周活跃">
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 1">
                <act-lineweek :chart-data="weekLivelyList" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt8 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabWeekLivelyList"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.time }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="活跃用户">
                    <template slot-scope="scope">{{scope.row.newPlayer}}</template>
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
            <Tab-pane label="月活跃">
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 1">
                <act-linemonth :chart-data="monthLivelyList" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt9 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabMonthLivelyList"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.time }}</template>
                  </el-table-column>
                  <el-table-column align="center" label="活跃用户">
                    <template slot-scope="scope">{{scope.row.newPlayer}}</template>
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
            <Tab-pane label="DAU/MAU">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <act-linedaumau :chart-data="loyaltyList" />
              </div>
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 2">
                <el-table
                  v-loading="listLoading"
                  :data="tabLoyaltyList"
                  border
                  style="width: 100%;"
                >
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.time}}</template>
                  </el-table-column>
                  <el-table-column align="center" label="DAU/MAU">
                    <template slot-scope="scope">{{scope.row.newPlayer}}</template>
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
              @click="chartBtn(1,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,1,1,1)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt1==2}"
              @click="chartBtn(2,tabCt2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,2,2,2)"
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
            <div slot="title">活跃玩家已玩天数</div>
            <Tabs type="card">
              <Tab-pane label="活跃玩家已玩天数">
                <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                  <act-daysplayed :chart-data="daysPlayed" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="tabDaysPlayed"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="天数">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人数">
                      <template slot-scope="scope">{{scope.row.count}}</template>
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
            <div slot="title">活跃玩家等级</div>
            <Tabs type="card">
              <Tab-pane label="活跃玩家等级">
                <div class="picbox_chart_table_div picbox" v-if="tabCt3 == 1">
                  <act-level :chart-data="levelPlayer" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt3 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="tabLevelPlayer"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="等级">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人数">
                      <template slot-scope="scope">{{scope.row.count}}</template>
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
            <div slot="title">活跃玩家地区</div>
            <Tabs type="card">
              <Tab-pane label="活跃玩家地区">
                <div class="picbox_chart_table_div picbox" v-if="tabCt4 == 1">
                  <act-conutry :chart-data="countryPlayer" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt4 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="tabCountryPlayer"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="地区">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人数">
                      <template slot-scope="scope">{{scope.row.count}}</template>
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
            <div slot="title">活跃玩家渠道</div>
            <Tabs type="card">
              <Tab-pane label="活跃玩家渠道">
                <div class="picbox_chart_table_div picbox" v-if="tabCt5 == 1">
                  <act-channel :chart-data="channelPlayer" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt5 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="tabChannelPlayer"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="渠道">
                      <template slot-scope="scope">{{scope.row.key}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="人数">
                      <template slot-scope="scope">{{scope.row.count}}</template>
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
import {
  findPlayerActive,
  findPlayerActiveDay,
  findPlayerActiveLevel,
  findPlayerActiveCountry,
  findPlayerActiveChannel
} from "@/api/playerGames";
import FindSearch from "@/common/FindSearch";
import ActLineday from "./components/ActLineday";
import ActLineweek from "./components/ActLineweek";
import ActLinemonth from "./components/ActLinemonth";
import ActLinedaumau from "./components/ActLinedaumau";
import ActDaysplayed from "./components/ActDaysplayed";
import ActLevel from "./components/ActLevel";
import ActConutry from "./components/ActConutry";
import ActChannel from "./components/ActChannel";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "活跃玩家",
  components: {
    FindSearch,
    ActLineday,
    ActLineweek,
    ActLinemonth,
    ActLinedaumau,
    ActDaysplayed,
    ActLevel,
    ActConutry,
    ActChannel
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
      //活跃玩家
      dayLivelyList: {
        newPlayer: [],
        cDate: [],
        oldPlayer: [],
        oldNew: []
      },
      tabDayLivelyList: [],
      weekLivelyList: {
        newPlayer: [],
        cDate: []
      },
      tabWeekLivelyList: [],

      monthLivelyList: {
        newPlayer: [],
        cDate: []
      },
      tabMonthLivelyList: [],

      loyaltyList: {
        newPlayer: [],
        cDate: []
      },
      tabLoyaltyList: [],
      //活跃玩家已玩天数

      daysPlayed: {
        count: {},
        rate: {}
      },
      tabDaysPlayed: [],
      //活跃玩家等级
      levelPlayer: {
        count: {},
        rate: {}
      },
      tabLevelPlayer: [],

      //活跃玩家地区
      countryPlayer: {
        count: {},
        rate: {}
      },
      tabCountryPlayer: [],
      //活跃玩家渠道
      channelPlayer: {
        count: {},
        rate: {}
      },
      tabChannelPlayer: [],

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
    chartBtn(a, b, c, d, e, f, g, h, i, k) {
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
    //获取活跃玩家折线图数据
    //findPlayerActive(gameType, channelId, deviceType, beginTime, endTime)
    fetchData(data) {

     
      this.dayLivelyList.newPlayer = [];
      this.dayLivelyList.cDate = [];
      this.dayLivelyList.oldPlayer = [];
      this.dayLivelyList.oldNew = [];
      this.weekLivelyList.newPlayer = [];
      this.weekLivelyList.cDate = [];
      this.monthLivelyList.newPlayer = [];
      this.monthLivelyList.cDate = [];
      this.loyaltyList.newPlayer = [];
      this.loyaltyList.cDate = [];
      findPlayerActive(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        //日活跃
        this.dataList = response.data;
        for (let item of this.dataList.dayLivelyList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](time_str,"yyyy-MM-DD ");
          this.dayLivelyList.newPlayer.push(item.newAccountLivelyCount);
          this.dayLivelyList.cDate.push(newDate);
          this.dayLivelyList.oldPlayer.push(item.oldAccountLivelyCount);
          this.dayLivelyList.oldNew.push(item.accountLivelyCount);
          // 表格数据
          this.tabDayLivelyList.push({
            time: newDate,
            newPlayer: item.newAccountLivelyCount,
            oldPlayer: item.oldAccountLivelyCount,
            oldNew: item.accountLivelyCount
          });
          // this.lineChartData.cdate.push(item.cdate);
        }
        //周活跃
        for (let item of this.dataList.weekLivelyList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](time_str,"yyyy-MM-DD ");
          this.weekLivelyList.newPlayer.push(item.weekLivelyCount);
          this.weekLivelyList.cDate.push(newDate);

          //表格数据
          this.tabWeekLivelyList.push({
            time: newDate,
            newPlayer: item.weekLivelyCount
          });
        }

        //月活跃
        for (let item of this.dataList.monthLivelyList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](time_str,"yyyy-MM-DD ");;
          this.monthLivelyList.newPlayer.push(item.monthLivelyCount);
          this.monthLivelyList.cDate.push(newDate);

          //表格数据
          this.tabMonthLivelyList.push({
            time: newDate,
            newPlayer: item.monthLivelyCount
          });
        }
        // DAU/MAU
        for (let item of this.dataList.loyaltyList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](time_str,"yyyy-MM-DD");;
          this.loyaltyList.newPlayer.push((item.loyalty*100).toFixed(2));
          this.loyaltyList.cDate.push(newDate);

          //表格数据
          this.tabLoyaltyList.push({ time: newDate, newPlayer: item.loyalty });
        }

        this.total = response.data.total;
        this.listLoading = false;

       
      });
       this.tabDaysPlayed = [];
      //获取活跃玩家已玩天数数据
      // findPlayerActiveDay(gameType, channelId, deviceType, beginTime, endTime)
      findPlayerActiveDay(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;
        this.daysPlayed.count = this.dataList.count;
        //表格数据
        let allDays = [
          "1天",
          "2-3天",
          "4-7天",
          "8-14天",
          "15-30天",
          "31-90天",
          "91-180天",
          "181-365天",
          "一年以上"
        ];
        let allDaysEn = [
          "one",
          "two",
          "four",
          "eight",
          "fifteen",
          "thirtyOne",
          "ninetyOne",
          "halfAYear",
          "year"
        ];
         Object.keys(this.daysPlayed.count).forEach((item,index) =>{
             this.tabDaysPlayed.push({
            key: "",
            count: this.daysPlayed.count[allDaysEn[index]],
            rate: ""
          });
        })
        let rt = this.dataList.rate;
        Object.keys(rt).forEach((item, index, arr) => {
          this.daysPlayed.rate[item] = (rt[item] * 100).toFixed(2) + "%";
          this.tabDaysPlayed[index].key = allDays[index];
          this.tabDaysPlayed[index].rate =
            (rt[allDaysEn[index]] * 100).toFixed(2) + "%";
        });

        this.total = response.data.total;
        this.listLoading = false;
      });


      this.tabLevelPlayer = [];
      //获取活跃玩家等级数据
      // findPlayerActiveLevel(gameType, channelId, deviceType, beginTime, endTime)
      findPlayerActiveLevel(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;
        this.levelPlayer.count = this.dataList.count;

        let allLevel = [
          "1级",
          "2-11级",
          "12-18级",
          "19-35级",
          "36-59级",
          "60-66级",
          "67-83级",
          "84-92级",
          "93-113级",
          "113级+"
        ];
        let allLevelEn = [
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
        ];

        Object.keys(this.levelPlayer.count).forEach((item,index) =>{
             this.tabLevelPlayer.push({
            key: "",
            count: this.levelPlayer.count[allLevelEn[index]],
            rate: ""
          });
        })
        let rt = this.dataList.rate;
        Object.keys(rt).forEach((item, index, arr) => {
          this.levelPlayer.rate[item] = (rt[item] * 100).toFixed(2) + "%";
          this.tabLevelPlayer[index].key = allLevel[index];
          this.tabLevelPlayer[index].rate =
            (rt[allLevelEn[index]] * 100).toFixed(2) + "%";
        });

        this.total = response.data.total;
        this.listLoading = false;
      });

      this.tabCountryPlayer = []
      //获取活跃玩家地区数据
      // findPlayerActiveCountry(gameType, channelId, deviceType, beginTime, endTime)
      findPlayerActiveCountry(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;
        this.countryPlayer.count = this.dataList.count;

        let allCountry = [
          "马来西亚",
          "英国",
          "美国",
          "澳大利亚",
          "台湾",
          "加拿大",
          "其他"
        ];
        for (let item in this.countryPlayer.count) {
          this.tabCountryPlayer.push({
            key: "",
            count: this.countryPlayer.count[item],
            rate: ""
          });
        }

        let rt = this.dataList.rate;
        Object.keys(rt).forEach((item, index, arr) => {
          this.countryPlayer.rate[item] = (rt[item] * 100).toFixed(2) + "%";
          this.tabCountryPlayer[index].key = allCountry[index];
          this.tabCountryPlayer[index].rate =
            (rt[allCountry[index]] * 100).toFixed(2) + "%";
        });

        this.total = response.data.total;
        this.listLoading = false;
      });

      this.tabChannelPlayer = []
      //获取活跃玩家渠道数据
      // findPlayerActiveChannel(gameType, channelId, deviceType, beginTime, endTime)
      findPlayerActiveChannel(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;
        this.channelPlayer.count = this.dataList.count;

        let allChannel = [
          "LEYOU_IOS",
          "TAIWAN_GOOGLEPLAY",
          "TAIWAN_IOS",
          "LEYOU_GOOGLEPLAY"
        ];
        for (let item in this.channelPlayer.count) {
          this.tabChannelPlayer.push({
            key: "",
            count: this.channelPlayer.count[item],
            rate: ""
          });
        }
        let rt = this.dataList.rate;

        Object.keys(rt).forEach((item, index, arr) => {
          this.channelPlayer.rate[item] = (rt[item] * 100).toFixed(2) + "%";
          this.tabChannelPlayer[index].key = allChannel[index];
          this.tabChannelPlayer[index].rate =
            (rt[allChannel[index]] * 100).toFixed(2) + "%";
        });

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
