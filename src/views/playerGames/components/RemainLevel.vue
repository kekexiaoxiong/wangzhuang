<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "290px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
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
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      console.log(this.chartData);
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    // ,window.onresize = this.chart.resize
    setOptions({ count, rate, index } = {}) {
      let countLevel = [
        count.level1,
        count.level2,
        count.level3,
        count.level4,
        count.level5,
        count.level6,
        count.level7,
        count.level8,
        count.level9,
        count.level10,
        count.level11,
        count.level12,
        count.level13,
        count.level14,
        count.level15,
        count.level16,
        count.level17,
        count.level18,
        count.level19,
        count.level20,
        count.level21,
        count.level22,
        count.level23,
        count.level24,
        count.level25,
        count.level26,
        count.level27,
        count.level28,
        count.level29
      ];
      let rateLevel = [
        rate.level1,
        rate.level2,
        rate.level3,
        rate.level4,
        rate.level5,
        rate.level6,
        rate.level7,
        rate.level8,
        rate.level9,
        rate.level10,
        rate.level11,
        rate.level12,
        rate.level13,
        rate.level14,
        rate.level15,
        rate.level16,
        rate.level17,
        rate.level18,
        rate.level19,
        rate.level20,
        rate.level21,
        rate.level22,
        rate.level23,
        rate.level24,
        rate.level25,
        rate.level26,
        rate.level27,
        rate.level28,
        rate.level29
      ];

      let countTimes = [
        count.one,
        count.two,
        count.four,
        count.six,
        count.eleven,
        count.twenty,
        count.fifty
      ];
      let rateTimes = [
        rate.one,
        rate.two,
        rate.four,
        rate.six,
        rate.eleven,
        rate.twenty,
        rate.fifty
      ];
      let countDuration = [
        count.oneSecond,
        count.elevenSecond,
        count.oneMinutes,
        count.threeMinutes,
        count.tenMinutes,
        count.thirtyMinutes,
        count.oneHours,
        count.towHours,
        count.fourHours
      ];
      let rateDuration = [
        rate.oneSecond,
        rate.elevenSecond,
        rate.oneMinutes,
        rate.threeMinutes,
        rate.tenMinutes,
        rate.thirtyMinutes,
        rate.oneHours,
        rate.towHours,
        rate.fourHours
      ];

      let ratePay = [rate.chargeUser, rate.notChargeUser];

      let countData = [];
      let rateData = [];
      let yData = [];
     
      if (index == "1") {
        countData = countLevel;
        rateData = rateLevel;
        yData = this.level;
      } else if (index == "2") {
        countData = countTimes;
        rateData = rateTimes;
        yData = this.times;
      } else if (index == "3") {
        countData = countDuration;
        rateData = rateDuration;
        yData = this.duration;
      } else if(index == "4"){
        countData = this.countPay;
        rateData = ratePay;
        yData = this.pay;
      }

      for (let item in rateData) {
        rateData[item] = (rateData[item] * 100).toFixed(2) + "%";
      }
      console.log(index);

      this.chart.setOption({
        xAxis: {
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        dataZoom: {
          type: "inside" //详细配置可见echarts官网
        },
        grid: {
          left: 15,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: [
          {
            type: "category",
            data: yData,
            axisTick: {
              show: false
            }
          },
          {
            type: "category",
            data: rateData,
            axisTick: {
              show: false
            }
          }
        ],
        legend: {
          data: ["人数"]
        },
        series: {
          name: "人数",
          barWidth: 15,
          smooth: true,
          type: "bar",
          data: countData,
          animationDuration: 2800,
          animationEasing: "cubicInOut"
        }
      });
    }
  }
};
</script>
