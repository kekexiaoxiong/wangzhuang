<template>
  <div class="Connect">
    <!-- 搜索 -->
    <div class="connectSearch">
      <div class="search_item">
        <p>选择链接地址：</p>
        <el-select @change="searchConnect" placeholder="选择链接地址" v-model="link">
          <el-option :key="index" :label="item" :value="item" v-for="(item,index) in linkList"></el-option>
        </el-select>
      </div>
      <div class="search_item">
        <p>选择开始时间：</p>
        <el-date-picker @change="searchStartTime" format="yyyy-MM-dd" placeholder="选择开始日期" type="date"
                        v-model="startDate" value-format="yyyy-MM-dd"></el-date-picker>
      </div>
      <div class="search_item">
        <p>选择结束时间：</p>
        <el-date-picker @change="searchEndTime" format="yyyy-MM-dd" placeholder="选择结束日期" type="date" v-model="endDate"
                        value-format="yyyy-MM-dd"></el-date-picker>
      </div>
    </div>
    <!-- table表格 -->
    <div class="connectTable">
      <el-table :data="connInfo" :header-cell-style="styleObj" border style="width: 100%">
        <el-table-column :formatter="common.timestampToTime" align='center' label="日期" prop="cdate"
                         width="210"></el-table-column>
        <el-table-column align='center' label="点击" prop="clickCount" width="190"></el-table-column>
        <el-table-column align='center' label="下载" prop="downCount" width="190"></el-table-column>
        <el-table-column align='center' label="安卓注册" prop="androidReg" width="190"></el-table-column>
        <el-table-column align='center' label="ios注册" prop="iosReg" width="190"></el-table-column>
        <el-table-column align='center' label="总注册" prop="totalReg" width="190"></el-table-column>
        <el-table-column align='center' label="充值人数" prop="payCount" width="190"></el-table-column>
        <el-table-column align='center' label="充值金额" prop="payMoney" width="190"></el-table-column>
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
        linkList: [],  //链接下拉数据
        link: '',
        styleObj: {   // 设置表头的样式
          'fontSize': '16px',
          'color': '#333'
        },
        startDate: '',
        endDate: '',
        connInfo: [],
        pageNow: 1,
        pageSize: 15,
        url: '',
        total: 0,
      }
    },
    components: {
      pages
    },
    created() {
      this.getUrlList()
      this.getConnectData()
    },
    methods: {
      //链接搜索
      searchConnect(val) {
        this.url = val;
        this.getConnectData()
      },
      //日期搜索
      searchStartTime(val) {
        this.startDate = val;
        this.getConnectData()
      },
      searchEndTime(val) {
        this.endDate = val;
        this.getConnectData()
      },
      //获取链接数据
      getUrlList() {
        this.https.fetchPost(this.apis.operate.links, {
          key: this.https.key,
          sessionKey: sessionStorage.getItem('sessionKey'),
        }).then(res => {
          if (res.data.code == 200) {
            sessionStorage.setItem('sessionKey', res.data.sessionKey)
            this.linkList = JSON.parse(res.data.content);
          }
        })
      },
      //获取链接推广表格数据
      getConnectData() {
        this.https.fetchPost(this.apis.operate.linkCode, {
          key: this.https.key,
          sessionKey: sessionStorage.getItem('sessionKey'),
          type: 1,
          pageSize: this.pageSize,
          pageNow: this.pageNow,
          beginTime: this.startDate,
          endTime: this.endDate,
          url: this.url,
        }).then(res => {
          if (res.data.code == 200) {
            sessionStorage.setItem('sessionKey', res.data.sessionKey)
            this.connInfo = JSON.parse(res.data.content);
            this.total = res.data.count;
            console.log(this.total)
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
        this.getConnectData(); //更新列表
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNow = v; //当前页
        this.getConnectData(); //更新列表
      },
    }
  }
</script>

<style lang="scss" scoped>
  .connectSearch {
    text-align: left;
    margin-bottom: 20px;

    .search_item {
      display: inline-block;
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


