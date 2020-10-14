<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">玩家留存</div>
          <Tabs type="card">
            <Tab-pane label="新增账户留存">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <remain-newaccount :chart-data="newAcountData" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt1 == 2">
                <el-table v-loading="listLoading" :data="dataList" border style="width: 100%;">
                  <el-table-column align="center" label="日期">
                    <template slot-scope="scope">{{scope.row.cdate | fmtDate2('yyyy-MM-DD HH:mm:ss')}}</template>
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
      <el-col :xs="24" :sm="8" :lg="8" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">次日平均留存玩家</div>
            <div class="dateRemain">
              <div class="dateRemain-left i">AVG</div>
              <div class="dateRemain-right i">{{retain2dayAver}}</div>
            </div>
          </Card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">7日平均留存玩家</div>
            <div class="dateRemain">
              <div class="dateRemain-left i">AVG</div>
              <div class="dateRemain-right i">{{retain7dayAver}}</div>
            </div>
          </Card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">30日平均留存玩家</div>
            <div class="dateRemain">
              <div class="dateRemain-left i">AVG</div>
              <div class="dateRemain-right i">{{retain30dayAver}}</div>
            </div>
          </Card>
        </div>
      </el-col>
    </el-row>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">
            玩家留存
            <div class="selectPosition">
              <div class="buttonDiv left">
                <label class="left selectlble">用户群：</label>
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
            <Tab-pane label="玩家留存">
              <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                <remain-level ref="childRemain" :chart-data="alanayLevel" />
              </div>
              <div class="picbox_chart_table_div" v-if="tabCt2 == 2">
                <el-table v-loading="listLoading" :data="tabData" border style="width: 100%;">
                  <el-table-column align="center" :label="typeTitle">
                    <template slot-scope="scope">{{scope.row.key}}</template>
                  </el-table-column>
                  <el-table-column align="center" :label="countTitle">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                  </el-table-column>

                  <el-table-column align="center" :label="rateTitle">
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
              @click="chartBtn(tabCt1,1,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,1,tabCt7,tabCt7)"
            >
              <font class="pic_icon">图表</font>
            </a>
            <a
              role="tableBtn"
              class="pic_but l"
              :class="{'hover':tabCt2==2}"
              @click="chartBtn(tabCt1,2,tabCt3,tabCt4,tabCt5,tabCt6,tabCt7,2,tabCt7,tabCt7)"
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
import { findAccountRemain, findRemainPlayerAnalyze,findRemainPlayerAver } from "@/api/playerGames";
import FindSearch from "@/common/FindSearch";
import RemainNewaccount from "./components/RemainNewaccount";
import RemainLevel from "./components/RemainLevel";

const newAcountData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "玩家留存",
  components: {
    FindSearch,
    RemainNewaccount,
    RemainLevel
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
      newAcountData: {
        secondRemain: [],
        cDate: [],
        sevenRemain: [],
        thirtyRemian: []
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

      retain2dayAver:'',
      retain7dayAver:'',
      retain30dayAver:'',

      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      groupType: 1, //1  7 30
      analyzeType: 1, // 1234

      tabType:[
        "level1",
        "level2",
        "level3",
        "level4",
        "level5",
        "level6",
        "level7",
        "level8",
        "level9",
        "level10",
        "level11",
        "level12",
        "level13",
        "level14",
        "level15",
        "level16",
        "level17",
        "level18",
        "level19",
        "level20",
        "level21",
        "level22",
        "level23",
        "level24",
        "level25",
        "level26",
        "level27",
        "level28",
        "level29"
      ], //初始化等级count
      keyType: [
        "1级",
        "2级",
        "3级",
        "4级",
        "5级",
        "6级",
        "7级",
        "8级",
        "9级",
        "10级",
        "11级",
        "12级",
        "13级",
        "14级",
        "15级",
        "16级",
        "17级",
        "18级",
        "19级",
        "20级",
        "21级",
        "22级",
        "23级",
        "24级",
        "25级",
        "26级",
        "27级",
        "28级",
        "29级"
      ], //初始化表格数据

      alanayLevel: {
        lev: "",
        count: [],
        rate: [],
        index: 1
      },

      //用户分析表格label
      typeTitle: "新增日等级",
      countTitle: "留存用户",
      rateTitle: "百分比",

      tabData: [],

      levData: [
        "level1",
        "level2",
        "level3",
        "level4",
        "level5",
        "level6",
        "level7",
        "level8",
        "level9",
        "level10",
        "level11",
        "level12",
        "level13",
        "level14",
        "level15",
        "level16",
        "level17",
        "level18",
        "level19",
        "level20",
        "level21",
        "level22",
        "level23",
        "level24",
        "level25",
        "level26",
        "level27",
        "level28",
        "level29"
      ],

      timesData: ["one", "two", "four", "six", "eleven", "twenty", "fifty"],

      durationData: [
        "oneSecond",
        "elevenSecond",
        "oneMinutes",
        "threeMinutes",
        "tenMinutes",
        "thirtyMinutes",
        "oneHours",
        "towHours",
        "fourHours"
      ],
      payData: ["chargeUser", "notChargeUser"],
      pay: ["付费", "未付费"],
      level: [
        "1级",
        "2级",
        "3级",
        "4级",
        "5级",
        "6级",
        "7级",
        "8级",
        "9级",
        "10级",
        "11级",
        "12级",
        "13级",
        "14级",
        "15级",
        "16级",
        "17级",
        "18级",
        "19级",
        "20级",
        "21级",
        "22级",
        "23级",
        "24级",
        "25级",
        "26级",
        "27级",
        "28级",
        "29级"
      ], // 等级
      times: [
        "1次",
        "2-3次",
        "4-5次",
        "6-10次",
        "11-20次",
        "21-50次",
        "大于50次"
      ], //次数

      duration: [
        "0-10s",
        "11-60s",
        "1-3mins",
        "3-10mins",
        "10-30mins",
        "30-60mins",
        "1-2hours",
        "2-4hours",
        ">4hours"
      ] //时长
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
      (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.listLoading = true);
      this.newAcountData.accountInc = [];
      this.newAcountData.cdate = [];
      this.newAcountData.deceiveInc = [];
      this.fetchData(form);
    },

     childData(data) {
      if (data == 1) {
        this.tabType = this.levData;
        this.keyType = this.level;
        this.typeTitle = "新增日等级";
        this.countTitle = "留存用户";
        this.rateTitle = "百分比";
      
      } else if (data == 2) {
        this.tabType = this.timesData;
        this.keyType = this.times;
        this.typeTitle = "游戏次数";
        this.countTitle = "留存用户";
        this.rateTitle = "百分比";
      } else if (data == 3) {
        this.tabType = this.durationData;
        this.keyType = this.duration;
        this.typeTitle = "游戏时长";
        this.countTitle = "留存用户";
        this.rateTitle = "百分比";
      } else {
        this.tabType = this.payData;
        this.keyType = this.pay;
        this.typeTitle = "是否付费";
        this.countTitle = "留存用户";
        this.rateTitle = "百分比";
      }
     },

    //分析方式
    choose_addr(index) {
      // this.alanayLevel = {};
      this.tabData = [];
      this.dayClick = false;
      let data = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.selectedDay = this.addList[index];
      //查询留存用户分析
      //findRemainPlayerAnalyze(gameType, channelId, deviceType, groupType, analyzeType, beginTime, endTime)
      if (index == 0) {
        this.groupType = 1;
      } else if (index == 1) {
        this.groupType = 7;
      } else {
        this.groupType = 30;
      }

      findRemainPlayerAnalyze(
        data.company,
        data.channel,
        data.loginMethod,
        this.groupType,
        this.analyzeType,
        data.startTime,
        data.endTime
      ).then(response => {
        this.alanayLevel.count = response.data.count;
        this.alanayLevel.rate = response.data.rate;
      

        let levCount = response.data.count;
        let levRate = response.data.rate;  
        for (let i in this.tabType) {         
          this.tabData.push({
            key: this.keyType[i],
            count: levCount[this.tabType[i]],
            rate: (levRate[this.tabType[i]]*100).toFixed(2)+'%'
          });
        }
           this.listLoading = false;
        
      });
    },

    choose_play(index) {
      this.tabData = [];
      let data = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.selectedPlayer = this.addPlay[index - 1];
      this.playClick = false;
      this.childData(index)
      //查询留存用户分析
      //findRemainPlayerAnalyze(gameType, channelId, deviceType, groupType, analyzeType, beginTime, endTime)
      findRemainPlayerAnalyze(
        data.company,
        data.channel,
        data.loginMethod,
        this.groupType,
        (this.analyzeType = index),
        data.startTime,
        data.endTime
      ).then(response => {
          
        this.alanayLevel.count = response.data.count;
        this.alanayLevel.rate = response.data.rate;
        this.alanayLevel.index = index;

      
        let levCount = response.data.count;
        let levRate = response.data.rate;
        for (let i in this.tabType) {
          this.tabData.push({
            key: this.keyType[i],
            count: levCount[this.tabType[i]],
            rate: (levRate[this.tabType[i]]*100).toFixed(2)+'%',
          });
        }
           this.listLoading = false;
      });
    },

    //获取数据
   
    fetchData(data) {

      this.newAcountData.secondRemain = [];
      this.newAcountData.cDate = [];
      this.newAcountData.thirtyRemian = [];
       this.tabBindCount = []
      this.tabData = []


      //查询平均留存玩家数据
     // findRemainPlayerAver(gameType, channelId, deviceType, beginTime, endTime) 
      findRemainPlayerAver(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.retain2dayAver = response.data.retain2dayAver.toFixed(2);
        this.retain7dayAver = response.data.retain7dayAver.toFixed(2);
        this.retain30dayAver = response.data.retain30dayAver.toFixed(2);
        console.log( this.dataL )
          this.listLoading = false;
      });
      //findAccountRemain(gameType, channelId, deviceType, beginTime, endTime)
      findAccountRemain(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.dataList = response.data;
       
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](time_str,"yyyy-MM-DD ");;
          this.newAcountData.secondRemain.push(
            (item.secondRemain * 100).toFixed(2)
          );
          this.newAcountData.cDate.push(newDate);
          this.newAcountData.sevenRemain.push(
            (item.sevenRemain * 100).toFixed(2)
          );
          this.newAcountData.thirtyRemian.push(
            (item.thirtyRemian * 100).toFixed(2)
          );
          // this.newAcountData.cdate.push(item.cdate);
        }
        //玩家绑定账户类型数据
        this.bindCount = response.data.bindData;

        //表格数据
        for (let item in this.bindCount) {
          this.tabBindCount.push({ key: item, value: this.bindCount[item] });
        }
        this.total = response.data.total;
        this.listLoading = false;
      });

      //初始化留存分析
      //findRemainPlayerAnalyze(gameType, channelId, deviceType, groupType, analyzeType, beginTime, endTime)
      findRemainPlayerAnalyze(
        data.company,
        data.channel,
        data.loginMethod,
        this.groupType,
        this.analyzeType,
        data.startTime,
        data.endTime
      ).then(response => {
        this.alanayLevel.count = response.data.count;
        this.alanayLevel.rate = response.data.rate;
        let levCount = response.data.count;
        let levRate = response.data.rate;

        let level = this.$refs.childRemain.levData; //取出子组件level
        let keyLevel = this.$refs.childRemain.level; //取出子组件level

      
        for (let i in level) {
          this.tabData.push({
            key: keyLevel[i],
            count: levCount[level[i]],
            rate: (levRate[level[i]]*100).toFixed(2)+'%'
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
.dateRemain {
  width: 100%;
  height: 50px;
  // color: ;
  background-color: #f5f5f5;
  .i {
    width: 50%;
    text-align: center;
    line-height: 50px;
    color: #515a6e;
    float: left;
    font-size: 20px;
  }
}
</style>
