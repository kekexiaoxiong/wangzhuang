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
    setOptions({ count,rate} = {}) {
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
          padding: [5, 10]
        },
        yAxis:[ {
             type: "category",
          data: ['1级', '2-11级','12-18级','19-35级','36-59级', '60-66级','67-83级','84-92级','93-113级','113级+'],
          axisTick: {
            show: false
          }
        },
          {
             type: "category",
          data: [rate.one, rate.two,rate.twelve,rate.nineteen,rate.thirtySix,rate.sixty, rate.sixtySeven ,rate.eightyFour ,rate.ninetyThree,rate.oneHundredAndThirteen],
          axisTick: {
            show: false
          }

        } ],
        legend: {
          data: ['玩家人数', '新增设备']
        },
        series: 
          {
          name: '玩家人数', 
          barWidth:15, 
          smooth: true,
          type: 'bar',
          data: [count.one, count.two,count.twelve,count.nineteen,count.thirtySix,
          count.sixty, count.sixtySeven ,count.eightyFour ,count.ninetyThree,count.oneHundredAndThirteen],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }     
      })
    }
  }
}
</script>
