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
      console.log(this.chartData.val)
    },
    // ,window.onresize = this.chart.resize
    setOptions({ val } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['1级','2-11级','12-18级','19-35级','36-59级','60-66级','67-83级','84-92级','93-113级','113级+'],
          boundaryGap: true,
         // boundaryGap: [0, 100],
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
            params.forEach(function(item) {
              result += item.marker + item.seriesName+': '+ item.data+'人' +'</br>';
            });
            return result;
          },
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
      
        legend: {
          data: ['首日等级']
        },
        series: [
          {
          name: '首日等级', itemStyle: {
            normal: {
             // color: '#FF005A',
              lineStyle: {
               // color: '#FF005A',
                width: 10
              }
            }
          },
          smooth: true,
          type: 'bar',
      
          data: val,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },

        
        ]
      })
    }
  }
}
</script>
