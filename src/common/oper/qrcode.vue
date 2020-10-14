<template>
  <div class="QRcode">
    <!-- 搜索 -->
    <div class="codeSearch">
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
      <el-table :data="codeInfo" :header-cell-style="styleObj" border style="width: 100%">
        <el-table-column :formatter="common.timestampToTime" align='center' label="日期" prop="cdate"
                         width="220"></el-table-column>
        <el-table-column align='center' label="下载" prop="downCount" width="220"></el-table-column>
        <el-table-column align='center' label="安卓注册" prop="androidReg" width="220"></el-table-column>
        <el-table-column align='center' label="ios注册" prop="iosReg" width="220"></el-table-column>
        <el-table-column align='center' label="总注册" prop="totalReg" width="220"></el-table-column>
        <el-table-column align='center' label="充值人数" prop="payCount" width="220"></el-table-column>
        <el-table-column align='center' label="充值金额" prop="payMoney" width="220"></el-table-column>
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
        startDate: '',
        endDate: '',
        codeInfo: [],
        styleObj: {   // 设置表头的样式
          'fontSize': '16px',
          'color': '#333'
        },
        pageSize: 15,
        pageNow: 1,
        startDate: '',
        endDate: '',
        total: 0,
      }
    },
    components: {
      pages
    },
    created() {
      this.getCodeData()
    },
    methods: {
      // 日期搜索
      searchStartTime(val) {
        this.startDate = val;
        this.getCodeData()
      },
      searchEndTime(val) {
        this.endDate = val;
        this.getCodeData()
      },
      //获取二维码推广表格数据
      getCodeData() {
        this.https.fetchPost(this.apis.operate.linkCode, {
          key: this.https.key,
          sessionKey: sessionStorage.getItem('sessionKey'),
          type: 2,
          pageSize: this.pageSize,
          pageNow: this.pageNow,
          beginTime: this.startDate,
          endTime: this.endDate,
        }).then(res => {
          if (res.data.code == 200) {
            sessionStorage.setItem('sessionKey', res.data.sessionKey)
            this.codeInfo = JSON.parse(res.data.content);
            this.total = res.data.count;
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
        this.getCodeData(); //更新列表
      },
      handleCurrentChangeFun(v) { //页面点击
        this.pageNow = v; //当前页
        this.getCodeData(); //更新列表
      },
    }
  }
</script>

<style lang="scss" scoped>
  .codeSearch {
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


