<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">关键等级</div>
          <Tabs type="card">
            <div class="Keylevel" id="importantLevelChart">
              <ul id="levelStageChart">
                <li v-for="(item,i) in levelData.slice(0,8)" :key="i">
                  <span title="16816.72">
                    <font>
                      <small class="CNY"></small>
                    </font>
                    <small>SUM</small>
                    <strong>{{item.sum}}</strong>
                  </span>
                  <span title="24:00 hours">
                    <small>AVG</small>
                    <strong>{{item.avg}}secs</strong>
                    <small></small>
                  </span>
                  <b class="left">{{i+1}}级</b>
                </li>
              </ul>
              <ul id="levelStageChart">
                <li v-for="(num,j) in levelData.slice(8,13)" :key="j">
                  <span title="16816.72">
                    <font>
                      <small class="CNY"></small>
                    </font>
                    <small>SUM</small>
                    <strong>{{num.sum}}</strong>
                  </span>
                  <span title="24:00 hours">
                    <small>AVG</small>
                    <strong>{{num.avg}}secs</strong>
                    <small></small>
                  </span>
                  <b class="left">{{j+9}}级</b>
                </li>
              </ul>
            </div>
            <!-- <Tab-pane label="关键等级">
              <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                <progress-firstdaylev :chart-data="firstLevData" />
              </div>
            </Tab-pane>-->
          </Tabs>
        </Card>
      </div>
    </el-row>

    <el-row class="mbtm">
      <div class="chart-wrapper tab-custom">
        <Card shadow>
          <div slot="title">等级详情</div>
          <table
            height="100%"
            width="100%"
            cellspacing="0px"
            cellpadding="0px"
            border="0"
            class="table_style"
            id="valueinfogrid"
          >
            <thead>
              <tr class="thBgStyle">
                <th class="sorting_disabled center" rowspan="1" colspan="1">等级</th>
                <th class="sorting_disabled center" rowspan="1" colspan="1">升级时长</th>
                <th class="sorting_disabled center" rowspan="1" colspan="1">等级停滞率</th>
                <th class="sorting_disabled center" rowspan="1" colspan="1">付费次数</th>
                <th class="sorting_disabled center" rowspan="1" colspan="1">付费金额</th>
                <th class="sorting_disabled center" rowspan="1" colspan="2">详情</th>
              </tr>
            </thead>
            <tbody v-for="(item,index) in tableData" :key="index">
              <tr
                class="tbBgStyle"
                :class="[charTimes[index] !== charTrends[index] ? 'openBgColor':'closeBgColor']"
              >
                <td class="sorting_disabled center" rowspan="1" colspan="1">
                  <p
                    :class="charTimes[index] !== charTrends[index]?'openTableAroww':'closeTableAroww'"
                  >{{item.title}}</p>
                </td>
                <td
                  class="sorting_disabled center"
                  rowspan="1"
                  colspan="1"
                >{{item.durationSecondAver}}</td>
                <td class="sorting_disabled center" rowspan="1" colspan="1">{{item.stagnationRate}}</td>
                <td class="sorting_disabled center" rowspan="1" colspan="1">{{item.payCount}}</td>
                <td class="sorting_disabled center" rowspan="1" colspan="1">{{item.payMoney}}</td>
                <td class="sorting_disabled center" rowspan="1" colspan="2">
                  <a
                    class="detail"
                    data-name="upgradeTime"
                    data-id="1"
                    @click="levelTime(item,index)"
                  >
                    <span
                      :class="charTimes[index] !== charTrends[index]? 'openColor': 'closeColor'"
                      v-text="charTimes[index]? '收回':'升级时长'"
                    ></span>
                  </a>
                  <!-- {{item.upgradeDuration}} -->
                  <a
                    class="detail"
                    data-name="upgradeTime"
                    data-id="1"
                    @click="dayInfo(item,index)"
                  >
                    <span
                      :class="charTimes[index] !== charTrends[index]? 'openColor' :'closeColor'"
                      v-text="charTrends[index]? '收回':'按日趋势'"
                    ></span>
                  </a>
                </td>
              </tr>
              <tr class="tbBgEchart" v-if="charTimes[index]">
                <td class="sorting_disabled center" rowspan="1" colspan="7">
                  <Card shadow>
                    <div slot="title">{{item.title}}</div>
                    <Tabs type="card">
                      <Tab-pane label="首付等级">
                        <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 1">
                          <level-upgradetime :chart-data="upgradeTimeData" />
                        </div>
                        <div class="picbox_chart_table_div picbox" v-if="tabCt1 == 2">
                          <el-table
                            v-loading="listLoading"
                            :data="payPeoplesTab"
                            border
                            style="width: 100%;"
                          >
                            <el-table-column align="center" label="等级">
                              <template slot-scope="scope">{{scope.row.key}}</template>
                            </el-table-column>
                            <el-table-column align="center" label="充值人数">
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
                        :class="{'hover':tabCt1==1}"
                        @click="chartBtn(1,tabCt2)"
                      >
                        <font class="pic_icon">图表</font>
                      </a>
                      <a
                        role="tableBtn"
                        class="pic_but l"
                        :class="{'hover':tabCt1==2}"
                        @click="chartBtn(2,tabCt2)"
                      >
                        <font class="table_icon">表格</font>
                      </a>
                    </div>
                  </Card>
                </td>
              </tr>
              <tr class="tbBgEchart" v-if="charTrends[index]">
                <td class="sorting_disabled center" rowspan="1" colspan="7">
                  <Card shadow>
                    <div slot="title">{{item.title}} 升级时长分布</div>
                    <Tabs type="card">
                      <Tab-pane label="升级时长">
                        <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                          <!-- <trends-upgradetimes :chart-data="trendUpgradeTime" /> -->
                        </div>
                        <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 2">
                          <el-table
                            v-loading="listLoading"
                            :data="payPeoplesTab"
                            border
                            style="width: 100%;"
                          >
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
                      <Tab-pane label="等级停滞率">
                        <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                          <!-- <trends-levelstoprate :chart-data="trendLevStop" /> -->
                        </div>
                        <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 2">
                          <el-table
                            v-loading="listLoading"
                            :data="payPeoplesTab"
                            border
                            style="width: 100%;"
                          >
                            <el-table-column align="center" label="等级">
                              <template slot-scope="scope">{{scope.row.key}}</template>
                            </el-table-column>
                            <el-table-column align="center" label="充值人数">
                              <template slot-scope="scope">{{scope.row.val}}</template>
                            </el-table-column>
                          </el-table>
                        
                        </div>
                      </Tab-pane>
                      <Tab-pane label="付费次数">
                        <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                          <!-- <trends-paytimes :chart-data="trendPayTimes" /> -->
                        </div>
                        <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 2">
                          <el-table
                            v-loading="listLoading"
                            :data="payPeoplesTab"
                            border
                            style="width: 100%;"
                          >
                            <el-table-column align="center" label="等级">
                              <template slot-scope="scope">{{scope.row.key}}</template>
                            </el-table-column>
                            <el-table-column align="center" label="充值人数">
                              <template slot-scope="scope">{{scope.row.val}}</template>
                            </el-table-column>
                          </el-table>
                        
                        </div>
                      </Tab-pane>
                      <Tab-pane label="付费金额">
                        <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 1">
                          <!-- <trends-paymoney :chart-data="trendPayMoney" /> -->
                        </div>
                        <div class="picbox_chart_table_div picbox" v-if="tabCt2 == 2">
                          <el-table
                            v-loading="listLoading"
                            :data="payPeoplesTab"
                            border
                            style="width: 100%;"
                          >
                            <el-table-column align="center" label="等级">
                              <template slot-scope="scope">{{scope.row.key}}</template>
                            </el-table-column>
                            <el-table-column align="center" label="充值人数">
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
                        @click="chartBtn(tabCt1,1)"
                      >
                        <font class="pic_icon">图表</font>
                      </a>
                      <a
                        role="tableBtn"
                        class="pic_but l"
                        :class="{'hover':tabCt2==2}"
                        @click="chartBtn(tabCt1,2)"
                      >
                        <font class="table_icon">表格</font>
                      </a>
                    </div>
                  </Card>
                </td>
              </tr>
            </tbody>
          </table>
          <Tabs type="card"></Tabs>
        </Card>
      </div>
    </el-row>
  </div>
</template>

<script>
import {
  findLevKey,
  findLevDetail,
  findLevDuration,
  findTrend
} from "@/api/levelAnalysis";
import FindSearch from "@/common/FindSearch";
import LevelUpgradetime from "./components/LevelUpgradetime";

import TrendsLevelstoprate from "./components/TrendsLevelstoprate";
import TrendsPaymoney from "./components/TrendsPaymoney";
import TrendsPaytimes from "./components/TrendsPaytimes";
import TrendsUpgradetimes from "./components/TrendsUpgradetimes";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "等级详情",
  components: {
    FindSearch,
    LevelUpgradetime,
    TrendsLevelstoprate,
    TrendsPaymoney,
    TrendsPaytimes,
    TrendsUpgradetimes
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

      payPeoplesTab:[],
      total:0,
      pageIndex:15,      
      tabCt1: 1,
      tabCt2:1,
      datalist: [],
      levelData: [],
      tableData: [],
      tbBgTimes: false,
      tbBgTrends: false,
      charTimes: [], //展开和关闭chart
      charTrends: [],
      upgradeTimeData: {
        count: [],
        rate: []
      },
      pageSize:15,
      //按日趋势升级时长
      trendUpgradeTime:{
          count:[],
          cDate:[],
      },

     //按日趋势等级停滞率
      trendLevStop:{
          count:[],
          cDate:[],
      },

     //按日趋势付费次数
      trendPayTimes:{
          count:[],
          cDate:[],
      },

     //按日趋势付费金额
      trendPayMoney:{
          count:[],
          cDate:[],
      },

      level: ""
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    //表格切换
    chartBtn(a, b) {
      this.tabCt1 = a;
      this.tabCt2 = b;
      this.findFormData();
    },

    findFormData() {
      (this.$refs.childHide.countryHide = false), //隐藏国家下拉框
        (this.listLoading = true);
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.fetchData(form);
    },

    fetchData(data) {
      //关键等级
      //findLevKey(gameType, channelId, deviceType, beginTime, endTime)
      findLevKey(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.levelData = response.data;
      });
      //  this.charTimes = [];
      //  this.charTrends = [];
      //等级详情
      //findLevDetail(gameType, channelId, deviceType, beginTime, endTime)
      findLevDetail(
        data.company,
        data.channel,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.tableData = response.data;
        for (let item of this.tableData) {
          this.charTimes.push(false);
          this.charTrends.push(false);
        }
     
        this.tableData.forEach(function(obj) {
          //   obj.upgradeDuration = "升级时长";
          //   obj.trendByDay = "按日趋势";
          obj.bgColor = false;
          obj.isactive = false;
          obj.isTimes = false;
          obj.isTrends = false;
        });
      });

      this.upgradeTimeData.count = [];
      this.upgradeTimeData.rate = [];
      //升级时长
      // findLevDuration(gameType, channelId, deviceType, level, beginTime, endTime)
      findLevDuration(
        data.company,
        data.channel,
        data.loginMethod,
         this.level,
        data.startTime,
        data.endTime
      ).then(response => {
        this.datalist = response.data;
        for (let item of this.datalist) {
          this.upgradeTimeData.count.push(item.count);
          this.upgradeTimeData.rate.push(item.rate + "%");
        }
      });

        //按日趋势
      // findTrend(gameType, channelId, deviceType, level, beginTime, endTime)

      findTrend(
        data.company,
        data.channel,
        data.loginMethod,
        this.level,
        data.startTime,
        data.endTime
      ).then(response => {
        this.datalist = response.data;
        for(let item of this.datalist){
            var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD "
          );
            this.trendUpgradeTime.count.push(item.durationSecond)
            this.trendUpgradeTime.tiem.push(newDate)
        }
      });




    },

    //点击升级时长展开
    levelTime(item, index) {
      this.$set(this.charTimes, index, !this.charTimes[index]);
      this.$set(this.charTrends, index, false);

      for (let i in this.charTimes) {
        if (i != index) {
          this.$set(this.charTimes, i, false);
          this.$set(this.charTrends, i, false);
        }
      }
    //   this.level = item.title;
    //   this.findFormData();
    },

    //点击按日趋势
    dayInfo(item, index) {
      this.$set(this.charTimes, index, false);
      this.$set(this.charTrends, index, !this.charTrends[index]);

      for (let i in this.charTimes) {
        if (i != index) {
          this.$set(this.charTimes, i, false);
          this.$set(this.charTrends, i, false);
        }
      }
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

// 关键等级图
.Keylevel {
  background: #fff;
  border: 1px solid #c0c5cb;
  height: 290px;
  padding: 0 35px;
  width: 100%;
}

.Keylevel ul {
  list-style: none;
  height: 120px;
  width: 90%;
  background: url(./../../assets/img/level_bg.png) repeat-x;
  margin: 0 auto;
}

.Keylevel ul li {
  float: left;
  position: relative;
  width: 12.5%;
  top: 14px;
}

.Keylevel ul li span {
  display: block;
  margin-top: 30px;
  height: 32px;
  line-height: 28px;
  color: #7a889b;
  font-size: 12px;
  font-weight: bold;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.Keylevel ul li b {
  background: none repeat scroll 0 0 #efd07d;
  border: 2px solid #dcab25;
  border-radius: 50px 50px 50px 50px;
  color: #ffffff;
  display: block;
  font-size: 16px;
  height: 50px;
  position: absolute;
  right: -27px;
  top: 50px;
  line-height: 50px;
  text-align: center;
  text-shadow: 1px 1px 1px #c8b66f;
  width: 50px;
}

.Keylevel ul li b.left {
  left: -27px;
}

.Keylevel ul li span font {
  font-size: 12px;
  vertical-align: middle;
}

.Keylevel ul li span small {
  font-size: 12px;
  margin: 0 3px;
  font-weight: bold;
}
.Keylevel ul li span strong {
  color: #465160;
  vertical-align: middle;
}
// 等级详情
// .remainTimes {
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 200px;
//   .remainLeft,
//   .remainRight {
//     width: 48%;
//     height: 50px;
//     .dateRemain {
//       width: 100%;
//       height: 50px;
//       background-color: #f5f5f5;
//       border-bottom: 1px solid #c9ccd3;
//       &:last-child {
//         border-bottom: none;
//       }
//       .i {
//         width: 50%;
//         padding-left: 5%;
//         text-align: left;
//         box-sizing: border-box;
//         line-height: 50px;
//         color: #515a6e;
//         float: left;
//         font-size: 16px;
//       }
//     }
//   }
// }

// .recent-player-open {
//   width: 100%;
//   .open {
//     background-color: #71889f;

//     .i {
//       span {
//         color: #fff;
//       }
//     }
//     .buttom {
//       span {
//         background: url(./../../assets/img/tableAroww_hover.png) no-repeat left
//           center;
//       }
//     }
//   }
.openBgColor {
  background: #71889f;
  color: #fff;
}
.closeBgColor {
  background: #ecf1f4;
  color: #465160;
}
.recent-player-table {
  .table_style1 tr {
    border: 1px solid #dbdcde;
    th {
      border-bottom: 0;
      color: #60686b;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      font-weight: normal;
      text-align: center;
    }
    td {
      p {
        display: block;
        padding-left: 20px;
        min-height: 20px;
        display: block;
      }
      .closeTableAroww {
        background: url(./../../assets/img/tableAroww.png) no-repeat;
        background-position-x: 30%;
        background-position-y: center;
      }
      .openTableAroww {
        background: url(./../../assets/img/tableAroww_hover.png) no-repeat;
        background-position-x: 30%;
        background-position-y: center;
      }
      .closeColor {
        color: #4ba04d;
        margin: 0 5px;
      }
      .openColor {
        color: #fff;
        margin: 0 5px;
      }
      .lf {
        text-align: left;
      }
      text-align: center;
      // color: #465160;
      padding: 0 15px;
      overflow: hidden;
      height: 40px;
      line-height: 40px;
    }
  }
}

//table 样式
.table_style {
  background: #fff;

  .thBgStyle {
    background: #dbe3e6;
    height: 30px;

    .center {
      color: #60686b;
      text-align: center;
      line-height: 30px;
      font-weight: normal;
    }
  }
  .tbBgStyle {
    height: 30px;
    .center {
      text-align: center;
      line-height: 30px;
      font-weight: normal;
      border-top: 1px solid #acb9c1;
    }
    .closeTableAroww {
      background: url(./../../assets/img/tableAroww.png) no-repeat;
      background-position-x: 25%;
      background-position-y: center;
    }
    .openTableAroww {
      background: url(./../../assets/img/tableAroww_hover.png) no-repeat;
      background-position-x: 30%;
      background-position-y: center;
    }
    .closeColor {
      color: #4ba04d;
      margin: 0 5px;
    }
    .openColor {
      color: #fff;
      margin: 0 5px;
    }
  }
  .tbBgEchart td {
    background: #fff;
    padding: 10px 0;
  }
  .ivu-card-body {
    padding: 16px !important;
  }
}

.tab-custom .ivu-card-body {
  padding: 0px;
}
</style>
