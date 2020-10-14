<template>
  <div class="Overview">
    <!-- 搜索框 -->
    <div class="search">
      <div class="search_item">
        <p>选择渠道种类：</p>
        <el-select placeholder="选择渠道种类" v-model="channelId">
          <el-option :value="0" label="全渠道"></el-option>
          <el-option :key="index" :label="item" :value="index" v-for="(item,index) in channelList"></el-option>
        </el-select>
      </div>
      <div class="search_item">
        <p>在线类型：</p>
        <el-select placeholder="选择在线类型" v-model="onlineState">
          <el-option value="" label="全部"></el-option>
          <el-option value="1" label="在线"></el-option>
          <el-option value="2" label="离线"></el-option>
        </el-select>
      </div>
      <div class="search_item">
        <p>玩家ID：</p>
        <el-input placeholder="请输入玩家ID" style="width: 200px" v-model="rid"></el-input>
      </div>
      <div class="search_item">
        <el-button @click.stop='yesterDay' type="primary">昨日新增</el-button>
      </div>
      <div class="search_item">
        <el-button @click.stop='threeDay' type="primary">最近3日</el-button>
      </div>
      <div class="search_item">
        <el-button @click.stop='sevenDay' type="primary">最近7日</el-button>
      </div>
      <!--            <div class="search_item">-->
      <!--                 <el-button type="primary">导出</el-button>-->
      <!--            </div>-->
    </div>
    <div class="search">
      <div class="search_item">
        <p>选择开始时间：</p>
        <el-date-picker format="yyyy-MM-dd" placeholder="选择开始日期" type="date" v-model="startDate"
                        value-format="yyyy-MM-dd"></el-date-picker>
      </div>
      <div class="search_item">
        <p>选择结束时间：</p>
        <el-date-picker format="yyyy-MM-dd" placeholder="选择结束日期" type="date" v-model="endDate"
                        value-format="yyyy-MM-dd"></el-date-picker>
      </div>
      <div class="search_item">
        <el-button @click.stop='searchBtn' style="margin-top:5px" type="primary">搜索</el-button>
      </div>
    </div>
    <!-- table表格 -->
    <div class="overTable">
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
        <el-table-column align='center' label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="queryPlayGameLog(scope.row)" size="mini" type="primary">游戏记录</el-button>
          </template>
        </el-table-column>
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
  import pages from '@/common/pages/page'

  export default {
    data() {
      return {
        channelList: [],  //渠道数据
        channelId: '',
        startDate: '',
        endDate: '',
        styleObj: {   // 设置表头的样式
          'fontSize': '16px',
          'color': '#333'
        },
        overInfo: [],
        total: 0,
        pageNow: 1,
        pageSize: 15,
        onlineState: "",
        rid: "",
      }
    },
    components: {
      pages
    },
    created() {
      this.getChannelData()
      this.getoverviewInfo()
    },
    methods: {
      //点击搜索
      searchBtn() {
        this.pageNow = 1;
        this.pageSize = 15;
        this.total = 0;
        this.getoverviewInfo();
      },
      //渠道 搜索
      searchChannel(val) {
        this.channelId = val;
        this.getoverviewInfo()
      },
      //日期搜索
      searchStartTime(val) {
        this.startDate = val;
        this.getoverviewInfo()
      },
      searchEndTime(val) {
        this.endDate = val;
        this.getoverviewInfo()
      },
      //获取渠道下拉框数据
      getChannelData() {
        this.https.fetchPost(this.apis.operate.channel, {
          key: this.https.key,
          sessionKey: sessionStorage.getItem('sessionKey')
        }).then(res => {
          if (res.data.code == 200) {
            this.channelList = JSON.parse(res.data.content)
          }
        })
      },
      //获取表格数据
      getoverviewInfo() {
        if (this.channelId == '') {
          this.channelId = 0;
        }
        this.overInfo = [];
        this.https.fetchPost(this.apis.operate.extension, {
          key: this.https.key,
          sessionKey: sessionStorage.getItem('sessionKey'),
          pageNow: this.pageNow,
          pageSize: this.pageSize,
          channelId: this.channelId,
          onlineState: this.onlineState,
          rid: this.rid,
          beginTime: this.startDate,
          endTime: this.endDate
        }).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            sessionStorage.setItem('sessionKey', res.data.sessionKey)
            this.overInfo = JSON.parse(res.data.content);
            this.total = res.data.count;
            console.log(this.overInfo)
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
          } else if (res.data.code == -7) {
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
      queryPlayGameLog(row) {
        this.$router.push({
          path: '/playercheckpoint',
          query: {rid: row.rid, startDate: this.startDate, endDate: this.endDate}
        });
      },

      //点击昨天
      yesterDay() {
        this.pageNow = 1;
        this.startDate = this.GetDateStr(-1);
        this.endDate = this.GetDateStr(-1);
        this.getoverviewInfo()
      },
      // 最近三天
      threeDay() {
        this.pageNow = 1;
        this.startDate = this.GetDateStr(-3);
        this.endDate = this.GetDateStr(-1);
        this.getoverviewInfo()
      },
      // 最近七天
      sevenDay() {
        this.pageNow = 1;
        this.startDate = this.GetDateStr(-7);
        this.endDate = this.GetDateStr(-1);
        this.getoverviewInfo()
      },
      // 获取日期
      GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1)
        var d = (dd.getDate() < 10 ? '0' + (dd.getDate()) : dd.getDate())
        return y + "-" + m + "-" + d;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    text-align: left;
    margin-bottom: 20px;

    .search_item {
      display: inline;
      margin-right: 20px;

      p {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
</style>


