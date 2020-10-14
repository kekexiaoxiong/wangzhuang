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
      chart: null
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
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
      console.log(this.chartData);
    },
    // ,window.onresize = this.chart.resize
    setOptions({ v1, v2, v3, v4, v5, v6, v7, v8, v9, v10 } = {}) {
      this.chart.setOption({
        xAxis: {
          data: [
            "新增首日",
            "+1日",
            "+2日",
            "+3日",
            "+4日",
            "+5日",
            "+6日",
            "+7日"
          ],
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
          padding: [5, 10],
          formatter: function(params) {
            var result = params[0].axisValue + "</br>";
            params.forEach(function(item) {
              result +=
                item.marker +
                item.seriesName +
                ": " +
                item.data +
                "%" +
                "</br>";
            });
            return result;
          }
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ["1-3级", "4-6级","7-9级", "10-12级","13-15级", "16-18级","19-21级", "22-24级","25-27级", "28-30级",]
        },
        series: [
          {
            name: "1-3级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: v1,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "4-6级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v2,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "7-9级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v3,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "10-12级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v4,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "13-15级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v5,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "16-18级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v6,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "19-21级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v7,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "22-24级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v8,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "25-27级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v9,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "28-30级占当前日期所有等级总人数的百分比",
            itemStyle: {
              normal: {
                // color: '#FF005A',
                lineStyle: {
                  // color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",

            data: v10,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
        ]
      });
    }
  }
};
</script>
