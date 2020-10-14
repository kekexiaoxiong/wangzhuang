<template>
  <div class="myChart1">
    <div id="myChart" style="width:100%; height:500px;"></div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="overInfo" :header-cell-style="styleObj" border style="width: 100%">
        <el-table-column align='center' label="游戏ID" prop="rid" width="120"></el-table-column>
        <el-table-column align='center' label="游戏昵称" prop="nick" width="120"></el-table-column>
        <el-table-column align='center' label="登录方式" prop="platformType" width="100">
          <template slot-scope="scope">{{scope.row.platformType|platformTypeFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="设备种类" prop="devicetype" width="120">
          <template slot-scope="scope">{{scope.row.deviceType|deviceTypeFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="下载渠道" prop="channelId" width="100">
          <template slot-scope="scope">{{scope.row.channelId|chanelFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="注册时间" width="150">
          <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align='center' label="注册IP" prop="regIp" width="120"></el-table-column>
        <el-table-column align='center' label="注册地域" prop="regAddress" width="100"></el-table-column>
        <el-table-column align='center' label="登录IP" prop="loginIp" width="120"></el-table-column>
        <el-table-column align='center' label="登录地域" prop="loginAddress" width="100"></el-table-column>
        <el-table-column align='center' label="最后一次登录时间" width="150">
          <template slot-scope="scope">{{scope.row.lastLoginTime|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align='center' label="账号状态" prop="state" width="90">
          <template slot-scope="scope">{{scope.row.state|accountStateFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="是否在线" width="90">
          <template slot-scope="scope">{{scope.row.onlineState|onlineStateFormat}}</template>
        </el-table-column>
        <el-table-column align='center' label="历史总充值" prop="historyPay" width="110"></el-table-column>
        <el-table-column align='center' label="等级" prop="level" width="80"></el-table-column>
        <el-table-column align='center' label="VIP" prop="vip" width="80"></el-table-column>
        <el-table-column align='center' label="钻石" prop="diamond" width="120"></el-table-column>
        <el-table-column align='center' label="金币" prop="gold" width="120"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pages">
      <pages :page-size='pageSize' :total='total' @handleCurrentChangeSub="handleCurrentChangeFun"
             @handleSizeChangeSub="handleSizeChangeFun"></pages>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import pages from '@/common/pages/page';

  export default {
    data() {
      return {
        styleObj: {   // 设置表头的样式
          'fontSize': '16px',
          'color': '#333'
        },
        overInfo: [],
        pageNow: 1,
        pageSize: 15,
        channelId: 0,
        total: 0,
        lineSeries: [],
        option: {
          title: {
            text: '新增账号折线图',
            left: 'center'
          },
          tooltip: {              //鼠标滑过提示框样式
            trigger: 'item',
            padding: 10,
            backgroundColor: 'rgba(9, 131, 195, 0.53)',
            formatter: function (params) {
              let htmlStr = '';
              htmlStr += '<div><p>实时新增账号数量</p></div>';
              var color = params.color;//图例颜色
              htmlStr += '<div>';
              //为了保证和原来的效果一样，这里自己实现了一个点的效果
              htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';
              //圆点后面显示的文本
              htmlStr += '<p style="display:inline-block">' + params.seriesName + ' 数量：' + params.data[1] + '</p>';
              htmlStr += '</div>';
              return htmlStr;
            },
          },
          legend: {               //图例样式
            orient: 'vertical',
            x: 'left',
            show: true,
            data: ['今日', '昨日'],
          },
          grid: {                   //折线位置
            top: '8%',
            right: '10%',
          },
          xAxis: {                  //x轴样式
            type: 'category',
            name: '时间',
            boundaryGap: [0, 100],
            axisTick: {
              show: true
            },
            splitLine: {
              show: false,
              //  改变轴线颜色
              lineStyle: {
                color: '#1f516d'
              }
            },

          },
          yAxis: {                         //y轴样式
            type: "value",
            name: "数量",
            axisLabel: {
              show: true
            },
            axisTick: {
              show: true
            },
            splitLine: {
              lineStyle: {
                color: "#1f516d",
              }
            },
          },

          calculable: true,
          series: [],
          animation: false,
          dataZoom: [
          ],
        },
      }
    },
    components: {
      pages
    },
    mounted() {
      this.getlineData();
      this.getoverviewInfo();
    },
    methods: {
      //获取折线图数据  新增账号
      getlineData() {
        this.https.fetchPost(this.apis.operate.registerData, {
          key: this.https.key,
          sessionKey: sessionStorage.getItem('sessionKey'),
        }).then(res => {
          if (res.data.code == 200) {
            sessionStorage.setItem('sessionKey', res.data.sessionKey)
            let datas = JSON.parse(res.data.content);
            this.lineSeries = []
            for (var i = 0; i < datas.length; i++) {
              var data = [];
              var temp = null
              var score = 0;
              for (var j = 0; j < datas[i].length; j++) {
                var dateTime = this.$options.filters['fmtDate'](datas[i][j].date, "hh:mm");
                score = datas[i][j].count
                data.push([dateTime, score]);
              }
              var tempName = "今日";
              var tempColor = "#1E90FF";
              if (i == 0) {
                tempName = "今日";
                tempColor = "#1E90FF";
              } else {
                tempName = "昨日";
                tempColor = "#EE7600";
              }
              temp = {
                name: tempName,
                type: "line",
                color: tempColor,
                data: data,
                smooth: true,
                symbolSize: 15,//调整圆点大小
                itemStyle: {//此处为指向阴影效果
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(30, 144, 255，0.5)'
                  }
                },
              };
              this.option.series.push(temp)
            }
            this.drawLine();
          }
        })
      },
      drawLine() {
        //动态获取时间
        var tt = this.$options.filters['GetDateStr'](1) + " 00:00:00";
        var data = this.$options.filters['getDateArray'](new Date(tt), 5 * 1000 * 60, 12 * 24)
        this.option.xAxis.data = data;
        //设置x轴展示位置
        var startHours = this.$options.filters['fmtDate']((new Date()).valueOf(), "hh");
        var startValueDateStr = this.$options.filters['GetDateStr'](0) + " " + startHours + ":00";
        var startValueDate = this.$options.filters['fmtDate']((new Date(startValueDateStr)).valueOf() - 30*60*1000, "hh:mm")
        var endValueDate = this.$options.filters['fmtDate']((new Date(startValueDateStr)).valueOf(), "hh:mm");
        var zoom = {
          type: 'inside',
          show: true,
          startValue: startValueDate,
          endValue: endValueDate,
        };
        this.option.dataZoom.push(zoom);
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        myChart.clear();
        // 绘制图表
        myChart.setOption(this.option)
        console.log(this.option)
      },
      //获取表格数据
      getoverviewInfo() {
        this.overInfo = []
        this.https.fetchPost(this.apis.operate.extension, {
          key: this.https.key,
          sessionKey: sessionStorage.getItem('sessionKey'),
          pageNow: this.pageNow,
          pageSize: this.pageSize,
          channelId: this.channelId,
        }).then(res => {
          if (res.data.code == 200) {
            sessionStorage.setItem('sessionKey', res.data.sessionKey)
            this.overInfo = JSON.parse(res.data.content);
            console.log(this.overInfo)
            this.total = res.data.count;
            for (let i in this.overInfo) {
              for (let j in this.channelList) {
                console.log(this.channelList[j])

                if (this.overInfo[i].channelId == j) {
                  console.log(this.overInfo)
                  this.overInfo[i].channelId = this.channelList[j]
                }
              }
            }
          } else if (res.data.code == -3 || res.data.code == -4 || res.data.code == -5) {
            this.$message({
              message: res.data.info,
              type: 'error',
              duration: 3000
            });
            setTimeout(() => {
              this.$router.push({
                path: '/login'
              })
            }, 2000)
          }else if (res.data.code == -7){
            sessionStorage.setItem('sessionKey', res.data.sessionKey);
            this.$message({
              message: res.data.info,
              type: 'warning',
              duration: 3000
            });
          } else {
            this.$message({
              message: res.data.info,
              type: 'error',
              duration: 3000
            });
          }
        })
      },
      // 分页
      handleSizeChangeFun(v) {
        this.pageSize = v;
        this.getoverviewInfo(); //更新列表
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNow = v; //当前页
        this.getoverviewInfo(); //更新列表
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
