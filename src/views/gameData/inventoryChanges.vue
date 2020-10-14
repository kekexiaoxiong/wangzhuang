   <template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="库存1" name="1">用户管理</el-tab-pane>
      <el-tab-pane label="库存2" name="2">配置管理</el-tab-pane>
      <el-tab-pane label="库存3" name="3">角色管理</el-tab-pane>
      <el-tab-pane label="库存4" name="4">定时任务补偿</el-tab-pane>
      <el-tab-pane label="库存5" name="5">角色管理</el-tab-pane>
      <el-tab-pane label="JackPot" name="6">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-table
      v-loading="listLoading"
      :data="playerLoginLogData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD')}}</template>
      </el-table-column>
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">{{scope.row.rid}}</template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">{{scope.row.nick}}</template>
      </el-table-column>
      <el-table-column align="center" label="登录次数" width="160px">
        <template slot-scope="scope">{{scope.row.login_count}}</template>
      </el-table-column>
      <el-table-column align="center" label="登录类型">
        <template slot-scope="scope">{{scope.row.loginType|platformTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="queryInfo(scope.row)" size="mini" type="primary">登录详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center ; margin-top:30px;">
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          :current-page="pageIndex"
          :page-size="pageSize"
          :page-sizes="[15, 20, 30, 40]"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { findPlayerLoginLog } from "@/api/gameData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "关卡监控",
  components: {
    FindSearch
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      playerLoginLogData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: ""
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.fetchData(form);
    },
    //获取数据
    //findPlayerLoginLog(pageIndex, pageSize, rid, platformType, beginTime, endTime)
    fetchData(data) {
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.loginHide = false;
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.playerNicknameHide = false;
      this.$refs.childHide.checkpointHide = true;
      this.$refs.childHide.timeHide = true;
      this.listLoading = true;
      findPlayerLoginLog(
        this.pageIndex,
        this.pageSize,
        data.rid,
        data.loginMethod,
        data.startTime,
        data.endTime
      ).then(response => {
        this.playerLoginLogData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      
      });
    },

    // 整体数据分页组件
    currentChange(size) {
      this.pageIndex = size;
      this.findFormData();
      //每页下拉显示数据
    },
    sizeChange(currentPage) {
      this.pageSize = currentPage;
      this.findFormData();
      //点击第几页
    }
  }
};
</script>
