<template>
   <div id="highCharts" style="width: 30%; height: 300px;  "></div>
</template>

<script>
// import echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
 import resize from './mixins/resize'

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




export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '40%'
    },
     float: {
      type: String,
      default: 'right'
    },
    height: {
      type: String,
      default: '290px'
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
      maxCount:0
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
     this.draw();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {



      draw() {
      if (this.onlineList.maxCount != null) {
        this.maxCount = this.onlineList.maxCount;
        var nowCount = 0;
        if (this.onlineList.today != null && this.onlineList.today.length > 0) {
          console.log(this.onlineList);
          nowCount = this.onlineList.today[this.onlineList.today.length - 1].totalCount;
        }
        new Highcharts.chart("onlinePlayerChart", {
          yAxis: {
            min: 0,
            max: 5,
            labels: {
                enabled: false
            },//
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
              data: [2],
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
              data: [2],//nowCount

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
      }
    },
    // initChart() {
    //   this.chart = echarts.init(this.$el, 'macarons')
    //   this.setOptions(this.chartData)
    //   console.log(this.chartData.newPlayer)
    // },
     // ,window.onresize = this.chart.resize
//     setOptions({ dayFirstChargeNum, cDate,dayFirstChargeNumAver } = {}) {
//       this.chart.setOption({
//         xAxis: {
//           data: cDate,
//           boundaryGap: false,
//           axisTick: {
//             show: false
//           }
//         },
//         　dataZoom:{
//  　　　　type:"inside"         //详细配置可见echarts官网
//  　　　},
//         grid: {
//           left: 15,
//           right: 15,
//           bottom: 20,
//           top: 30,
//           containLabel: true
//         },
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: {
//             type: 'cross'
//           },
//           padding: [5, 10]
//         },
//         yAxis: {
//           axisTick: {
//             show: false
//           }
//         },
//         legend: {
//           data: ['日新增付费玩家', '历史平均', ]
//         },
//         series: [
//           {
//           name: '日新增付费玩家', itemStyle: {
//             normal: {
//               color: '#FF005A',
//               lineStyle: {
//                 color: '#FF005A',
//                 width: 2
//               }
//             }
//           },
//           smooth: true,
//           type: 'line',
//           data: dayFirstChargeNum,
//           animationDuration: 2800,
//           animationEasing: 'cubicInOut'
//         },

//         {
//           name: '历史平均',
//           smooth: true,
//           type: 'line',
//           itemStyle: {
//             normal: {
//               color: '#3888fa',
//               lineStyle: {
//                 color: '#3888fa',
//                 width: 2
//               },
//               areaStyle: {
//                 color: '#f3f8ff'
//               }
//             }
//           },
          
//           data: dayFirstChargeNumAver,
//           animationDuration: 2800,
//           animationEasing: 'quadraticOut'
//         },
         
//         ]
//       })
//     }
  }
}
</script>
