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
      console.log(this.chartData);
      
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    // ,window.onresize = this.chart.resize
    setOptions({ total, rate } = {}) {
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
            data: [
              "1级",
              "2-20级",
              "21-40级",
              "41-60级",
              "61-80级",
              "81-100级",
              "101-120级",
              "121-140级",
              "141-160级",
              "161-180级",
              "181-200级",
              "200级+"
            ],
            axisTick: {
              show: false
            }
          },
          {
            type: "category",
            data: [],
            axisTick: {
              show: false
            }
          }
        ],
        legend: {
          data: ["充值人数"]
        },
        series: {
          name: "充值人数",
          barWidth: 15,
          smooth: true,
          type: "bar",
          data: total,
          animationDuration: 2800,
          animationEasing: "cubicInOut"
        }
      });
    }
  }
};
</script>
