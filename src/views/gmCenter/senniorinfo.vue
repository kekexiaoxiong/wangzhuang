<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="vipManagerData"
      border
      style="width: 100%;"
      class="mtop"
    >
    
         <el-table-column align='center' label="UID" prop="uid" width="100"></el-table-column>
        <el-table-column align='center' label="名称" prop="nick" width="100"></el-table-column>
        <el-table-column align='center' label="充值总额" prop="payMoney" width="100"></el-table-column>
        <el-table-column align='center' label="金币数量" prop="gold" width="100"></el-table-column>
        <el-table-column align='center' label="钻石数量" prop="diamond" width="100"></el-table-column>
        <el-table-column align='center' label="账号状态" prop="state" width="100"></el-table-column>
        <el-table-column align='center' label="操作">
          <template slot-scope="scope">
            <el-button @click="bindType(scope.row)" size="mini" type="primary">绑定方式</el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' label="游戏时长(分)" width="140">
          <template slot-scope="scope">{{scope.row.onlineTime/60|numFilter}}</template>
        </el-table-column>
        <!-- <el-table-column :formatter="common.ToTimeHourReg" align='center' label="注册时间" prop="regTime"
                         width="170"></el-table-column> -->
        <el-table-column align='center' label="注册渠道" prop="channelId" width="100"></el-table-column>
        <el-table-column align='center' label="注册IP" prop="regIp" width="150"></el-table-column>
        <el-table-column align='center' label="机器码" prop="machineCode" width="180"></el-table-column>
        <el-table-column  label="最后登录时间"  width="170">
          <template slot-scope="scope">{{scope.row.lastLoginTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align='center' label="最后登录IP" prop="lastLoginIp" width="150"></el-table-column>
        <el-table-column align='center' label="最后登录地区" prop="lastLoginAddress" width="128"></el-table-column>
        <el-table-column align='center' label="操作" width="400">
          <template slot-scope="scope">
            <el-button @click="offline(scope.row)" size="mini" type="danger">强制下线</el-button>
            <el-button @click="emptyData(scope.row,2)" size="mini" type="danger">清空金币</el-button>
            <el-button @click="emptyData(scope.row,3)" size="mini" type="danger">清空钻石</el-button>
            <el-button @click="emptyData(scope.row,4)" size="mini" type="danger">清空代币</el-button>
            <el-button @click="Frozen(scope.$index, scope.row)" size="mini" type="danger"
                       v-if="scope.row.state == '正常'">封停
            </el-button>
            <el-button @click="Thaw(scope.$index, scope.row)" size="mini" type="danger" v-if="scope.row.state == '冻结'">
              解封
            </el-button>
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
import { findVipManager } from "@/api/gmCenter";
import FindSearch from "@/common/FindSearch";
export default {
  name: "高级账号信息及管理",
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
      vipManagerData: [], //整体数据
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
    bindType(a){

    },

    offline(a,b){

    },
    emptyData(a,b){

    },
    Frozen(a,b){

    },
    Thaw(a,b){

    },

    findFormData() {
      let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      console.log(form.startTime + "___" + form.endTime);
      this.fetchData(form);
    },
    //获取数据
    //findVipManager(nick, machineCode, lastIp, rid, pageIndex, pageSize)
    fetchData(data) {

      this.$refs.childHide.buttomHide1 = true;
      this.$refs.childHide.buttomHide = false;

      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.loginHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.playerIdHide = true;
      this.$refs.childHide.playerNicknameHide = true;
      this.$refs.childHide.machineCodeHide = true;
      this.$refs.childHide.lastIpHide = true;

      this.listLoading = true;
      findVipManager(
        data.nick,
        data.machineCode,
        data.lastIp,
        data.rid,
        this.pageIndex,
        this.pageSize
      ).then(response => {
        this.vipManagerData = response.data.records;
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
