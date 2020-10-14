<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="fetchGoldSurvey"></find-search>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="金币概况" name="1">
        <el-table
          v-loading="listLoading"
          :data="goldSurveyData"
          border
          style="width: 100%;"
          class="mtop"
        >
          <el-table-column align="center" label="日期" width="152">
            <template slot-scope="scope">{{scope.row.cdate}}</template>
          </el-table-column>
          <el-table-column align="center" label="购买发放金币" prop="buy_send" width="120"></el-table-column>
          <el-table-column align="center" label="后台发放金币" prop="backstage_send" width="120"></el-table-column>
          <el-table-column align="center" label="注册发放金币" prop="reg_send" width="120"></el-table-column>
          <el-table-column align="center" label="绑定平台发放金币" prop="bind_platform_send" width="150"></el-table-column>
          <el-table-column align="center" label="签到发放金币" prop="sign_send" width="120"></el-table-column>
          <el-table-column align="center" label="任务发放金币" prop="task_send" width="120"></el-table-column>
          <el-table-column align="center" label="升级发放金币" prop="levelup_send" width="120"></el-table-column>
          <el-table-column align="center" label="定时金币发放金币" prop="fixedtime_send" width="150"></el-table-column>
          <el-table-column align="center" label="金币总发放" prop="total_send" width="150"></el-table-column>
          <el-table-column align="center" label="slot游戏回收金币" prop="slot_commission" width="150"></el-table-column>
          <el-table-column align="center" label="后台金币收回" prop="backstage_recover" width="120"></el-table-column>
          <el-table-column align="center" label="金币总回收" prop="total_recover" width="108"></el-table-column>
          <el-table-column align="center" label="金币平衡" prop="balance" width="100"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="砖石概况" name="2">
        <el-table
          v-loading="listLoading"
          :data="diamondSurveyData"
          border
          style="width: 100%;margin-top:2rem;"
        >
          <el-table-column align="center" label="日期" width="152">
            <template slot-scope="scope">{{scope.row.cdate}}</template>
          </el-table-column>
          <el-table-column align="center" label="购买发放钻石" prop="buy_send" width="120"></el-table-column>
          <el-table-column align="center" label="后台发放钻石" prop="backstage_send" width="120"></el-table-column>
          <el-table-column align="center" label="注册发放钻石" prop="reg_send" width="120"></el-table-column>
          <el-table-column align="center" label="绑定平台发放钻石" prop="bind_platform_send" width="150"></el-table-column>
          <el-table-column align="center" label="签到发放钻石" prop="sign_send" width="118"></el-table-column>
          <el-table-column align="center" label="任务发放钻石" prop="task_send" width="118"></el-table-column>
          <el-table-column align="center" label="代币游戏发放钻石" prop="token_game_send" width="150"></el-table-column>
          <el-table-column align="center" label="钻石总发放" prop="total_send" width="106"></el-table-column>
          <el-table-column align="center" label="定时金币回收钻石" prop="fixed_time_recover" width="150"></el-table-column>
          <el-table-column align="center" label="slot游戏回收钻石" prop="slot_recover" width="148"></el-table-column>
          <el-table-column align="center" label="后台收回钻石" prop="backstage_recover" width="120"></el-table-column>
          <el-table-column align="center" label="钻石总回收" prop="total_recover" width="108"></el-table-column>
          <el-table-column align="center" label="钻石平衡" prop="balance" width="90"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="代币概况" name="3">
        <el-table
          v-loading="listLoading"
          :data="tokenSurveyData"
          border
          style="width: 100%;margin-top:2rem;"
        >
          <el-table-column align="center" label="日期" width="152">
            <template slot-scope="scope">{{scope.row.cdate}}</template>
          </el-table-column>
          <el-table-column align="center" label="slots游戏发放代币" prop="slot_send" width="200"></el-table-column>
          <el-table-column align="center" label="后台发放代币" prop="backstage_send" width="200"></el-table-column>
          <el-table-column align="center" label="代币总发数" prop="total_send" width="200"></el-table-column>
          <el-table-column align="center" label="代币游戏回收代币" prop="game_recover" width="200"></el-table-column>
          <el-table-column align="center" label="后台回收代币" prop="backstage_recover" width="180"></el-table-column>
          <el-table-column align="center" label="代币总回收" prop="total_recover" width="180"></el-table-column>
          <el-table-column align="center" label="代币平衡" prop="balance" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="金币持有量" name="4">
        <el-table
          v-loading="listLoading"
          :data="holdingsData"
          border
          :span-method="cellMerge"
          style="width: 100%;margin-top:2rem;"
        >
          <el-table-column align="center" label="时间" prop="cdate" width="300">
            <template slot-scope="scope">
              <p>{{showTime}}</p>
              <p style="height:50px;line-height:50px;">-</p>
              <p>{{lastTime}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="持有金币数量" prop="doc" width="300"></el-table-column>
          <el-table-column align="center" label="玩家数量" prop="count"></el-table-column>
          <el-table-column align="center" label="比例" prop="rate"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="砖石持有量" name="5">
        <el-table
          v-loading="listLoading"
          :data="masonryData"
          border
          :span-method="cellMerge"
          style="width: 100%;margin-top:2rem;"
        >
          <el-table-column align="center" label="时间" prop="cdate" width="300">
            <template slot-scope="scope">
              <p>{{showTime}}</p>
              <p style="height:50px;line-height:50px;">-</p>
              <p>{{lastTime}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="持有砖石数量" prop="doc" width="300"></el-table-column>
          <el-table-column align="center" label="玩家数量" prop="count"></el-table-column>
          <el-table-column align="center" label="比例" prop="rate"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="代币持有量" name="6">
        <el-table
          v-loading="listLoading"
          :data="tokenData"
          border
          :span-method="cellMerge"
          style="width: 100%;margin-top:2rem;"
        >
          <el-table-column align="center" label="时间" prop="cdate" width="300">
            <template slot-scope="scope">
              <p>{{showTime}}</p>
              <p style="height:50px;line-height:50px;">-</p>
              <p>{{lastTime}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" label="持有代币数量" prop="doc" width="300"></el-table-column>
          <el-table-column align="center" label="玩家数量" prop="count"></el-table-column>
          <el-table-column align="center" label="比例" prop="rate"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="玩家排行" name="7">玩家排行</el-tab-pane>
    </el-tabs>

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
import {
  findGoldSurvey,
  findDiamondSurvey,
  findTokenSurvey,
  findHoldings
} from "@/api/gameData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "整体数据",
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
      activeName: "1",
      goldSurveyData: [], //整体数据
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
    handleClick(tab, event) {
      console.log(tab, event);
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      if (tab.name == 2) {
        this.fetchDiamondSurvey(form);
      } else if (tab.name == 3) {
        this.fetchTokenSurvey(form);
      } else if (tab.name == 4) {
        this.fetchHoldings(form);
      } else if (tab.name == 5) {
        this.fetchToken(form);
      } else if (tab.name == 6) {
        this.fetchToken(form);
      } else {
        this.fetchPlayerRanking(form);
      }
    },
    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.fetchGoldSurvey(form);
    },
    //获取数据 金币概况
    //findGoldSurvey(pageIndex, pageSize, beginTime, endTime)
    fetchGoldSurvey(data) {
      this.$refs.childHide.companyHide = false; //隐藏公司下拉框
      this.$refs.childHide.countryHide = false; //隐藏国家下拉框
      this.$refs.childHide.loginHide = false; //隐藏登录方式下拉框
      this.$refs.childHide.channelHide = false; //隐藏渠道下拉框
      this.$refs.childHide.playerIdHide = false; //隐藏玩家id input框
      this.$refs.childHide.gradeHide = false; //隐藏vip等级下拉框
      this.$refs.childHide.startTimeHide = true;
      this.$refs.childHide.endTimeHide = true;
      this.$refs.childHide.buttomHide = true;
      this.listLoading = true;
      console.log(data);
      findGoldSurvey(
        this.pageIndex,
        this.pageSize,
        data.startTime,
        data.endTime
      ).then(response => {
        this.goldSurveyData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
        
      });
    },

    //获取数据 砖石概况
    //findDiamondSurvey(pageIndex, pageSize, beginTime, endTime)
    fetchDiamondSurvey(data) {
      this.$refs.childHide.companyHide = false; //隐藏公司下拉框
      this.$refs.childHide.countryHide = false; //隐藏国家下拉框
      this.$refs.childHide.loginHide = false; //隐藏登录方式下拉框
      this.$refs.childHide.channelHide = false; //隐藏渠道下拉框
      this.$refs.childHide.playerIdHide = false; //隐藏玩家id input框
      this.$refs.childHide.gradeHide = false; //隐藏vip等级下拉框
      this.$refs.childHide.startTimeHide = true;
      this.$refs.childHide.endTimeHide = true;
       this.$refs.childHide.buttomHide = true;
      this.listLoading = true;

      findDiamondSurvey(
        this.pageIndex,
        this.pageSize,
        data.startTime,
        data.endTime
      ).then(response => {
        this.diamondSurveyData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    //获取数据 代币概况
    //findTokenSurvey(pageIndex, pageSize, beginTime, endTime)
    fetchTokenSurvey(data) {
      this.$refs.childHide.companyHide = false; //隐藏公司下拉框
      this.$refs.childHide.countryHide = false; //隐藏国家下拉框
      this.$refs.childHide.loginHide = false; //隐藏登录方式下拉框
      this.$refs.childHide.channelHide = false; //隐藏渠道下拉框
      this.$refs.childHide.playerIdHide = false; //隐藏玩家id input框
      this.$refs.childHide.gradeHide = false; //隐藏vip等级下拉框
      this.$refs.childHide.startTimeHide = true;
      this.$refs.childHide.endTimeHide = true;
       this.$refs.childHide.buttomHide = true;
      this.listLoading = true;

      findTokenSurvey(
        this.pageIndex,
        this.pageSize,
        data.startTime,
        data.endTime
      ).then(response => {
        this.tokenSurveyData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    //获取数据 金币 持有量
    //findHoldings(pageIndex, pageSize, dateTime, type)
    fetchHoldings(data) {
      let dateTime;
      this.$common.findHoldWeek().then(res => {
        dateTime = res.data.cdate;
        console.log(res.data);
      });
      this.$refs.childHide.companyHide = false; //隐藏公司下拉框
      this.$refs.childHide.countryHide = false; //隐藏国家下拉框
      this.$refs.childHide.loginHide = false; //隐藏登录方式下拉框
      this.$refs.childHide.channelHide = false; //隐藏渠道下拉框
      this.$refs.childHide.playerIdHide = false; //隐藏玩家id input框
      this.$refs.childHide.gradeHide = false; //隐藏vip等级下拉框
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.buttomHide = false;

      this.listLoading = true;

      findHoldings(this.pageIndex, this.pageSize, dateTime, 1).then(
        response => {
          this.holdingsData = response.data.records;
          this.total = response.data.total;
          this.listLoading = false;
          this.getSpanArrOne(this.holdingsData);
        }
      );
    },

    //获取实时时间

    // 合并第一列表格
    cellMerge({ row, column, rowIndex, columnIndex }) {
      let length = this.goldHoldList.length;
      if (columnIndex == 0) {
        const _row = this.spanArrOne[rowIndex];
        const _col = 1;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    //第一列合并的数据
    getSpanArrOne(data) {
      this.spanArrOne = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArrOne.push(1);
          this.posOne = 0;
        } else {
          this.spanArrOne[this.posOne] += 1; //需要合并的行数
          this.spanArrOne.push(0); //新增被合并的行
        }
      }
    },
    // 修改第一列的样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        //指定列号
        return {
          fontSize: "22px",
          color: "#333"
        };
      } else {
        return "";
      }
    },

    //获取数据 代币 持有量
    //findHoldings(pageIndex, pageSize, dateTime, type)
    fetchToken(data) {
      let dateTime;
      this.$common.findHoldWeek().then(res => {
        dateTime = res.data.cdate;
        console.log(res.data);
      });
      this.$refs.childHide.companyHide = false; //隐藏公司下拉框
      this.$refs.childHide.countryHide = false; //隐藏国家下拉框
      this.$refs.childHide.loginHide = false; //隐藏登录方式下拉框
      this.$refs.childHide.channelHide = false; //隐藏渠道下拉框
      this.$refs.childHide.playerIdHide = false; //隐藏玩家id input框
      this.$refs.childHide.gradeHide = false; //隐藏vip等级下拉框

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.buttomHide = false;

      this.listLoading = true;

      findToken(this.pageIndex, this.pageSize, dateTime, 2).then(response => {
        this.tokenData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
        this.getSpanArrOne(this.tokenData);
      });
    },

    //获取数据 钻石 持有量
    //findHoldings(pageIndex, pageSize, dateTime, type)
    fetchMasonry(data) {
      let dateTime;
      this.$common.findHoldWeek().then(res => {
        dateTime = res.data.cdate;
        console.log(res.data);
      });
      this.$refs.childHide.companyHide = false; //隐藏公司下拉框
      this.$refs.childHide.countryHide = false; //隐藏国家下拉框
      this.$refs.childHide.loginHide = false; //隐藏登录方式下拉框
      this.$refs.childHide.channelHide = false; //隐藏渠道下拉框
      this.$refs.childHide.playerIdHide = false; //隐藏玩家id input框
      this.$refs.childHide.gradeHide = false; //隐藏vip等级下拉框
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.buttomHide = false;

      this.listLoading = true;

      findMasonry(this.pageIndex, this.pageSize, dateTime, 3).then(response => {
        this.masonryData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
        this.getSpanArrOne(this.masonryData);
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
