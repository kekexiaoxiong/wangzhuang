<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">在线玩家</div>
          <Tabs type="card">
            <Tab-pane label="在线玩家">
              <div
                class="picbox_chart_table_div picbox"
                style="position:relative"
                v-if="tabCt1 == 1"
              >
                <div
                  id="highCharts"
                  style="width: 30%; height: 300px; background:#fff; float: left; "
                ></div>
                <div style="width:30%; position:absolute; top:220px;left:50%-50px;">
                  <h4 style="text-align: center;">最高在线人数</h4>
                  <p style="text-align:center;">{{maxCount}}</p>
                </div>

                <!-- <test-chart :chart-data="dayAddPayData"/> -->
                <pay-newaddplayer :chart-data="onlinePlayerData" />
              </div>
         
            </Tab-pane>
          </Tabs>
          <!-- <div class="after">
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
          </div> -->
        </Card>
      </div>
    </el-row>
    <el-row class="mbtm">
      <div class="chart-wrapper">
        <Card shadow>
          <div slot="title">每日在线用户</div>
          <Tabs type="card">
            <Tab-pane label="ACU">
              <div class="picbox_chart_table_div picbox" v-if="tabCt10 == 1">
                <acu-chart :chart-data="acuData" />
              </div>
          
            </Tab-pane>
            <Tab-pane label="PCU">
              <div class="picbox_chart_table_div picbox" v-if="tabCt11 == 1">
                <pcu-chart :chart-data="pcuData" />
              </div>
         
            </Tab-pane>
            <Tab-pane label="ACU/PCU">
              <div class="picbox_chart_table_div picbox" v-if="tabCt12 == 1">
                <acupcu-chart :chart-data="acuPcuData" />
              </div>
          
            </Tab-pane>
          </Tabs>
      
        </Card>
      </div>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :lg="12" class="mbtm">
        <div class="chart-wrapper">
          <Card shadow>
            <div slot="title">首付金额</div>
            <Tabs type="card">
              <Tab-pane label="首付金额">
                <div class="picbox_chart_table_div picbox" v-if="tabCt4 == 1">
                  <pay-firstmoney :chart-data="firstPayMoney" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt4 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="firstPayMoneyTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="首付金额">
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
                :class="{'hover':tabCt4==1}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,1,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt4==2}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,2,tabCt5,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
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
            <div slot="title">首付充值包类型</div>
            <Tabs type="card">
              <Tab-pane label="充值包类型">
                <div class="picbox_chart_table_div picbox" v-if="tabCt5 == 1">
                  <pay-firstpackagetype :chart-data="firstRechargeType" />
                </div>
                <div class="picbox_chart_table_div" v-if="tabCt5 == 2">
                  <el-table
                    v-loading="listLoading"
                    :data="firstRechargeTypeTab"
                    border
                    style="width: 100%;"
                  >
                    <el-table-column align="center" label="充值包类型">
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
                :class="{'hover':tabCt5==1}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,1,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
              >
                <font class="pic_icon">图表</font>
              </a>
              <a
                role="tableBtn"
                class="pic_but l"
                :class="{'hover':tabCt5==2}"
                @click="chartBtn(tabCt1,tabCt2,tabCt3,tabCt4,2,tabCt6,tabCt7,tabCt8,tabCt9,tabCt10,tabCt11,tabCt12)"
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
  findOnlinePlayer,
  findMaxAcuAndPcu,
  findAcuAndPcu
} from "@/api/onlineAnalysis";
import FindSearch from "@/common/FindSearch";
import AcuChart from "./components/AcuChart";
import PayFirstmoney from "./components/PayFirstmoney";
import AcupcuChart from "./components/AcupcuChart";
import PayFirstpackagetype from "./components/PayFirstpackagetype";
import PayFirstpay from "./components/PayFirstpay";
import PcuChart from "./components/PcuChart";

import PayNewaddplayer from "./components/PayNewaddplayer";

import TestChart from "./components/TestChart";

// 最主要是这里模块的引入 很坑
import Highcharts from "highcharts/highstock";
// 这个一定要引入 不然报错
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge.js";
HighchartsMore(Highcharts);
SolidGauge(Highcharts);

Highcharts.setOptions({
  chart: {
    type: "solidgauge",
    backgroundColor: "#f5f5f5"
  },
  title: null,
  pane: {
    center: ["50%", "60%"],
    size: "60%",
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor:
        (Highcharts.theme && Highcharts.theme.background2) || "#EEE",
      innerRadius: "60%",
      outerRadius: "100%",
      shape: "arc"
    }
  },
  tooltip: {
    enabled: false
  },
  yAxis: {
    stops: [
      [0.1, "#55BF3B"] // green
    ],
    lineWidth: 0,
    minorTickInterval: null,
    tickPixelInterval: 400,
    tickWidth: 0,
    title: {
      y: -120
    },
    labels: {
      y: 16
    }
  }
});

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
};
export default {
  name: "在线分析",
  components: {
    FindSearch,
    AcuChart,
    PayFirstmoney,
    AcupcuChart,
    PayFirstpackagetype,
    PayFirstpay,
    PcuChart,

    PayNewaddplayer,

    TestChart
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
      //在线玩家
      onlinePlayerData: {
        today: [],
        yesterday: [],
        cDate: []
      },

      dayAddPayTab: [],

      //acu
      acuData: {
        acu: [],
        cDate: []
      },
      dayPayplayerTab: [],

      //pcu
      pcuData: {
        pcu: [],
        cDate: []
      },
      dayPayplayerTab: [],

       //acu/pcu
      acuPcuData: {
        acuPcu: [],
        cDate: []
      },
      dayPayplayerTab: [],

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

      nowCount: 0,
      maxCount: 0
    };
  },
  mounted() {
    this.findFormData();
    
  },
  methods: {
    draw() {
      // this.maxCount = this.onlineList.maxCount;
      // var nowCount = 0;
      // if (this.onlineList.today != null && this.onlineList.today.length > 0) {
      //   console.log(this.onlineList);
      //   nowCount = this.onlineList.today[this.onlineList.today.length - 1].totalCount;
      // }
      console.log(this.nowCount)
      new Highcharts.chart("highCharts", {
        yAxis: {
          min: 0,
          max:this.maxCount,
          labels: {
            enabled: false
          }, //
          title: {
            text: "当前在线人数"
          }
        },
        credits: {
          enabled: false
        },
        series: [
          {
            //  name: "当前在线人数",
            data: [this.nowCount],
            // tooltip: {
            //   valueSuffix: " km/h"
            // },
            type: "solidgauge",
            dataLabels: {
              enabled: false
            }
          },
          {
            type: "gauge",
            data: [this.nowCount],

            dataLabels: {
              y: -150,
              borderWidth: 0,
              useHTML: false,
              color: "#666666",
              style: { fontSize: "36px" }
            },
            detail: {
              formatter: "{value}",
              offsetCenter: [0, "10%"],
              textStyle: {
                color: "auto",
                fontSize: 20
              }
            },

            dial: {
              //仪表盘指针
              radius: "120%",
              rearLength: "0%",
              backgroundColor: "#435068",
              borderColor: "#435068",
              borderWidth: 1,
              baseWidth: 10,
              topWidth: 1,
              baseLength: "10%"
            },
            pivot: {
              //设置速度仪中间点的颜色
              radius: 5,
              borderWidth: 0,
              backgroundColor: "#435068"
            }
          }
        ]
      });
    },

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
      //日新增

      //查询付费转化折线图数据
      //findOnlinePlayer(beginTime, endTime)
      findOnlinePlayer(data.startTime, data.endTime).then(response => {
        this.dataList = response.data.yesterday;
        this.nowCount = response.data.nowCount;
        this.maxCount = response.data.maxCount;
        
      this.draw();
        console.log(this.nowCount);
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD HH:mm"
          );
          this.onlinePlayerData.yesterday.push(item.totalCount);
          this.onlinePlayerData.cDate.push(newDate);
        }
        this.dataList = response.data.today;
        for (let item of this.dataList) {
          var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD HH:mm"
          );
          this.onlinePlayerData.today.push(item.totalCount);
        }

        console.log(this.onlinePlayerData);
        this.listLoading = false;
      });

      //查询acupcu数据
      //findAcuAndPcu(beginTime, endTime) 
      findAcuAndPcu(data.startTime, data.endTime).then(response => {
        //acu

        this.dataList = response.data;
        for(let item of this.dataList){
          this.acuData.acu.push(item.acu)
           var time_str = item.cdate;
          var newDate = this.$options.filters["fmtDate"](
            time_str,
            "yyyy-MM-DD HH:mm:ss"
          );
          this.acuData.cDate.push(newDate)

          // pcu
          this.pcuData.pcu.push(item.pcu);
          this.pcuData.cDate.push(newDate);

          // acu/pcu
           this.acuPcuData.acuPcu.push((item.acuPcu*100).toFixed(2));
          this.acuPcuData.cDate.push(newDate);


        }

        console.log(this.acuData);




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
.chart {
  float: left;
}
.highcharts-background {
  fill: #ffffff;
  text-align: center;
}
</style>
