<template>
  <div class="app-container">
    <div class="searchContent">
      <el-form :model="form" label-width="100px" style="overflow: auto;">
        <!-- 最大最小金币 -->
        <el-form-item label="最小金币:" prop="sortNo" style="float:left;">
          <el-input-number size="medium" @change="handleChange" :min="0" :step="10000000" v-model="startGold"></el-input-number>
        </el-form-item>

        <el-form-item label="最大金币:" prop="sortNo" style="float:left;">
          <el-input-number size="medium" @change="handleChange" :min="0" :step="10000000" v-model="endGold"></el-input-number>
        </el-form-item>

        <!-- 金币排序 -->
        <el-form-item label="金币排序:" prop="sortNo" style="float:left;">
          <el-select style="width:150px;float:left;"   v-model="form.sortType"  placeholder="金币排序">
            <el-option label="正序" :value="1"></el-option>
            <el-option  label="倒序" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label style="float:left;">
          <el-button type="primary" size="mini" @click="findFormData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <find-search ref="childHide" v-on:searchData="fetchData"></find-search> -->
    <el-table
      v-loading="listLoading"
      :data="newOldData"
      border
      style="width: 100%;"
      class="mtop"
    >
     <el-table-column align='center' label="玩家ID" prop="rid" width="208"></el-table-column>
        <el-table-column align='center' label="玩家名称" prop="nick" width="220"></el-table-column>
        <el-table-column align='center' label="购买发放金币" prop="buy_send" width="120"></el-table-column>
        <el-table-column align='center' label="后台发放金币" prop="backstage_send" width="120"></el-table-column>
        <el-table-column align='center' label="注册发放金币" prop="reg_send" width="120"></el-table-column>
        <el-table-column align='center' label="绑定平台发放金币" prop="bind_platform_send" width="150"></el-table-column>
        <el-table-column align='center' label="签到发放金币" prop="sign_send" width="120"></el-table-column>
        <el-table-column align='center' label="任务发放金币" prop="task_send" width="120"></el-table-column>
        <el-table-column align='center' label="升级发放金币" prop="levelUp_send" width="120"></el-table-column>
        <el-table-column align='center' label="定时金币发放金币" prop="fixedTime_send" width="150"></el-table-column>
        <el-table-column align='center' label="系统赠送" prop="sys_giving" width="150"></el-table-column>
        <el-table-column align='center' label="金币总发放" prop="total_send" width="150"></el-table-column>
        <el-table-column align='center' label="金币总消耗" prop="total_consume" width="150"></el-table-column>
        <el-table-column align='center' label="游戏金币" prop="game_send" width="150"></el-table-column>
        <el-table-column align='center' label="现有金币" prop="gold" width="100"></el-table-column>
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
import { findPlayerEconomyGold } from "@/api/gameData";
//import FindSearch from "@/common/FindSearch";
export default {
  name: "玩家当日经济概况",
  components: {
    
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
      startGold:0,
      endGold:1000000000,
      newOldData: [], //整体数据
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      
      form:{
            sortType: 1,
      }
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
      handleChange(value) {
        console.log(value);
      },
    findFormData() {
       
     // let form = this.$refs.childHide.form; //取出子组件的下拉框初始值
      this.fetchData();
       
    },
    //获取数据
    //findPlayerEconomyGold(pageIndex, pageSize, sortType, startGold, endGold)
    fetchData() {
      //this.$refs.childHide.loginHide = false; //隐藏子组件不要的下拉菜单
      this.listLoading = true;
      findPlayerEconomyGold(
        this.pageIndex,
        this.pageSize,
        this.form.sortType,
        this.startGold,
        this.endGold,      
      ).then(response => {
        
        this.newOldData = response.data.records;
        console.log(this.newOldData);
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

<style lang="scss" scoped>
.searchContent {
  margin: 30px;
  text-align: left;

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
