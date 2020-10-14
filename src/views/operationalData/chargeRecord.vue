<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="fetchData"></find-search>
    <el-table v-loading="listLoading" :data="orderInfo" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="订单编号" prop="orderNum" width="120"></el-table-column>
      <el-table-column align="center" label="购买时间" width="180">
        <template slot-scope="scope">{{scope.row.cdate|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column align="center" label="本地购买时间" width="150">
        <template
          slot-scope="scope"
        >{{scope.row.cdate|localDateTime(scope.row.regAddress,'yyyy-MM-DD hh:mm:ss')}}</template>
      </el-table-column>

      <el-table-column align="center" label="公司" width="100">
        <template slot-scope="scope">{{scope.row.gameType|gameTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="登录方式" width="100">
        <template slot-scope="scope">{{scope.row.platformType|platformTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="商品类型" width="100">
        <template slot-scope="scope">{{scope.row.buyType|buyTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="支付方式" width="100">
        <template slot-scope="scope">{{scope.row.payType|payTypeFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label="玩家ID" prop="rid" width="120"></el-table-column>
      <el-table-column align="center" label="玩家昵称" prop="nick" width="120"></el-table-column>
      <el-table-column align="center" label="购买面额" prop="payMoney" width="100"></el-table-column>
      <el-table-column align="center" label="充值前钻石" prop="beforeDiamond" width="110"></el-table-column>
      <el-table-column align="center" label="充值后钻石" prop="afterDiamond" width="110"></el-table-column>
      <el-table-column align="center" label="赠送钻石" prop="givingDiamond" width="110"></el-table-column>
      <el-table-column align="center" label="获得钻石" prop="getDiamond" width="120"></el-table-column>
      <el-table-column align="center" label="充值前金币" prop="beforeGold" width="120"></el-table-column>
      <el-table-column align="center" label="充值后金币" prop="afterGold" width="120"></el-table-column>
      <el-table-column align="center" label="赠送金币" prop="givingGold" width="120"></el-table-column>
      <el-table-column align="center" label="获得金币" prop="getGold" width="120"></el-table-column>
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button @click="queryRoleInfo(scope.row)" size="mini" type="primary">玩家详情</el-button>
          <el-button @click="queryBuriedLog(scope.row)" size="mini" type="primary">行为记录</el-button>
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
import { findChargeRecord } from "@/api/operationalData";
import FindSearch from "@/common/FindSearch";
export default {
  name: "实时收入",
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
      orderInfo: [], //整体数据
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
    //findChargeRecord(pageIndex, pageSize, rid, nick, buyType, chargeType, payType, payMoney, platformType, gameType, beginTime, endTime)
    fetchData(data) {
      this.$refs.childHide.channelHide = false; //隐藏子组件不要的下拉菜单
      this.$refs.childHide.typeOfPurchaseHide = true;
      this.$refs.childHide.purchaseAmountHide = true;
      this.$refs.childHide.paymentMethodHide = true;
      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.playerNicknameHide = true;

      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;

      this.$refs.childHide.startTimeDefault = true;
      this.$refs.childHide.endTimeDefault = true;

      this.listLoading = true;
      console.log(data);
      findChargeRecord(
        this.pageIndex,
        this.pageSize,
        data.rid,
        data.nick,
        data.buyType,
        data.chargeType,
        data.payType,
        data.payMoney,
        data.loginMethod,
        data.company,
        data.startTimeNone,
        data.endTimeNone
      ).then(response => {
        this.orderInfo = response.data.records;

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
    },

    //行为记录玩家信息
    queryBuriedLog(row) {
      //查询支付时间前后1个小时数据
      this.$router.push({
        path: "/player_behaviour_analysis",
        query: {
          rid: row.rid,
          beginTime: row.cdate - 1000 * 60 * 60,
          endTime: row.cdate + 1000 * 60 * 60
        }
      });
    },

    //玩家详情
    queryRoleInfo(row) {
      this.$router.push({
        path: "/views/operationalData/extendChannel",
        query: { rid: row.rid }
      });
    }
  }
};
</script>
