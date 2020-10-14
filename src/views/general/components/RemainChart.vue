<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
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
      chart: null
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
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {

    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
     
    },
    // ,window.onresize = this.chart.resize
    setOptions({ secondRemain, cDate,sevenRemain,thirtyRemain } = {}) {
      this.chart.setOption({
        xAxis: {
          data: cDate,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        　dataZoom:{
 　　　　type:"inside"         //详细配置可见echarts官网
 　　　},
        grid: {
          left: 15,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10],
          formatter: function(params) {
            var result = params[0].axisValue + "</br>";
            params.forEach(function(item, arr) {
                result +=
                  item.marker + item.seriesName + ": " + item.data +"%"+ "</br>";
            
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
          data: ['次日玩家留存率', '7日玩家留存率','30日玩家留存率']
        },
        series: [
          {
          name: '次日玩家留存率', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: sevenRemain,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },

        {
          name: '7日玩家留存率',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: sevenRemain,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
          {
          name: '30日玩家留存率',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
             color: "#72cb68",
              lineStyle: {
                color: "#72cb68",
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: thirtyRemain,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        ]
      })
    }
  }
}
</script>
