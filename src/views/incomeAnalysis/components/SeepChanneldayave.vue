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
        console.log(this.chartData.count)
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    // ,window.onresize = this.chart.resize
    setOptions({ val} = {}) {
      this.chart.setOption({
        xAxis: {
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
            params.forEach(function(item) {
              console.log(item);
              result += item.marker + item.seriesName+': '+ item.data+'%' +'</br>';
            });
            return result;
          },
        },
        yAxis:[ {
             type: "category",
          data: ['LEYOU_IOS', 'TAIWAN_GOOGLEPLAY','TAIWAN_IOS','LEYOU_GOOGLEPLAY'],
          axisTick: {
            show: false
          }
        },
           ],
        legend: {
          data: ['日均付费率']
        },
        series: 
          {
          name: '日均付费率', 
          barWidth:15, 
          smooth: true,
          type: 'bar',
          data: val,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }     
      })
    }
  }
}
</script>
