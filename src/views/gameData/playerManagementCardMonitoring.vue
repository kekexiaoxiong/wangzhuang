<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="PlayerCheckPointMonitoringData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家ID" width="180">
        <template slot-scope="scope">{{scope.row.rid}}</template>
      </el-table-column>
      <el-table-column align="center" label="玩家昵称" prop="nick" width="180"></el-table-column>
      <el-table-column align="center" label="登录方式" width="120">
        <template slot-scope="scope">{{scope.row.platformType|platformTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="关卡" width="100px">
        <template slot-scope="scope">{{scope.row.checkpoint}}</template>
      </el-table-column>
      <el-table-column align="center" label="进入房间时间" width="200">
        <template slot-scope="scope">{{scope.row.entryTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="退出房间时间" width="200">
        <template slot-scope="scope">{{scope.row.outTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="游戏记录次数" prop="gameCount" width="140"></el-table-column>
      <el-table-column align="center" label="金币变化" prop="winGold" width="200"></el-table-column>
      <el-table-column align="center" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button @click="queryInfo(scope.row)" size="mini" type="primary">查看详情</el-button>
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

    <el-dialog :close-on-click-modal="false" :visible.sync="infoVisible" width="60%">
      <h2 style="margin-top:-20px">{{title}}</h2>

      <el-table :data="infoDataList" style="width: 100%">
        <el-table-column align='center' label="序号" width="100">
          <template slot-scope="scope">
            <span>{{(pageIndexDetail - 1) * pageSizeDetail + scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="玩家ID" width="180">
          <template slot-scope="scope">{{scope.row.rid}}</template>
        </el-table-column>
        <el-table-column align="center" label="玩家昵称" width="180">
          <template slot-scope="scope">{{nickName}}</template>
        </el-table-column>
        <el-table-column align="center" label="关卡" width="100px">
          <template slot-scope="scope">{{scope.row.checkPoint}}</template>
        </el-table-column>
        <el-table-column align="center" label="输赢金币" prop="winGold" width="180"></el-table-column>
        <el-table-column align="center" label="变化之前金币" width="180">
          <template slot-scope="scope">{{scope.row.beforeGold}}</template>
        </el-table-column>
        <el-table-column align="center" label="游戏时间" width="200">
          <template slot-scope="scope">{{scope.row.cdate|fmtDate('yyyy-MM-DD hh:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align="center" label="中连线倍数" prop="multiple" width="100"></el-table-column>
      </el-table>
      <div style="text-align: center ; margin-top:30px;">
        <!-- 分页 -->
        <div class="pages">
          <el-pagination
            :current-page="pageIndexDetail"
            :page-size="pageSizeDetail"
            :page-sizes="[15, 20, 30, 40]"
            :total="totalDetail"
            @current-change="currentChangeDetail"
            @size-change="sizeChangeDetail"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findPlayerCheckPointMonitoring,
  findPlayerGameLog
} from "@/api/gameData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "玩家关卡监控",
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
      infoVisible: false,

      PlayerCheckPointMonitoringData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      pageIndexDetail:1,
      pageSizeDetail:15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      infoDataList: [],
      nickName:'',
      ridDetail:'',
    };
  },
  created() {
    if (this.$route.query.startDate != null) {
      this.startDate = this.$route.query.startDate;
    }
    if (this.$route.query.endDate != null) {
      this.endDate = this.$route.query.endDate;
    }
    if (this.$route.query.rid != null) {
      this.rid = this.$route.query.rid;
    }
    this.findFormData();
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值

      if (this.$route.query.startDate != null) {
        form.startTimeNone = this.$route.query.startDate;
      }
      if (this.$route.query.endDate != null) {
        form.endTimeNone = this.$route.query.endDate;
      }
      if (this.$route.query.rid != null) {
        form.rid = this.$route.query.rid;
      }

      this.fetchData(form);
    },
    //获取数据
    //findPlayerCheckPointMonitoring(pageIndex, pageSize, checkPoint, rid, platformType, beginTime, endTime)
    fetchData(data) {
      this.$refs.childHide.loginHide = true; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.checkpointHide = true;
      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.playerNicknameHide = false;
      this.listLoading = true;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;
      findPlayerCheckPointMonitoring(
        this.pageIndex,
        this.pageSize,

        data.checkpoint,
        data.rid,
        data.loginMethod,
        data.startTimeNone,
        data.endTimeNone
      ).then(response => {
        this.PlayerCheckPointMonitoringData = response.data.records;
       
        this.total = response.data.total;
        this.listLoading = false;
        
      });
    },

    queryInfo(data) {
      let form = this.$refs.childHide.form;
      this.ridDetail = data.rid;
      this.infoVisible = true;
      findPlayerGameLog(
        this.pageIndexDetail,
        this.pageSizeDetail,
        form.checkpoint,
        this.ridDetail,
        form.startTimeNone,
        form.endTimeNone
      ).then(res => {
        this.infoDataList = res.data.records;
        this.nickName = data.nick
        console.log(this.infoDataList)
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
    },


     // 整体数据分页组件
    currentChangeDetail(size) {
      this.pageIndexDetail = size;
      this.queryInfo();
      //每页下拉显示数据
    },
    sizeChangeDetail(currentPage) {
      this.pageSizeDetail = currentPage;
      this.queryInfo();
      //点击第几页
    }




  }
};
</script>
