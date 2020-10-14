<template>
  <div class="app-container">
    <find-search ref="childHide" v-on:searchData="findFormData"></find-search>
    <el-table
      v-loading="listLoading"
      :data="whileListData"
      border
      style="width: 100%;"
      class="mtop"
    >
      <el-table-column align="center" label="玩家ID">
        <template slot-scope="scope">{{scope.row.rid}}</template>
      </el-table-column>
      <el-table-column align="center" label="玩家昵称">
        <template slot-scope="scope">{{scope.row.nick}}</template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteWhile(scope.row)" size="mini" type="primary">删除</el-button>
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
import { findWhileList, delWhileList } from "@/api/gmCenter";
import FindSearch from "@/common/FindSearch";
export default {
  name: "白名单",
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
      whileListData: [], //整体数据
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
      console.log(form.startTime + "___" + form.endTime);
      this.fetchData(form);
    },
    //获取数据
    //findWhileList(rid)
    fetchData(data) {
      this.$refs.childHide.buttomHide1 = true;
      this.$refs.childHide.buttomHide = false;


      this.$refs.childHide.companyHide = false;
      this.$refs.childHide.countryHide = false;
      this.$refs.childHide.loginHide = false;
      this.$refs.childHide.channelHide = false;
      this.$refs.childHide.startTimeHide = false;
      this.$refs.childHide.endTimeHide = false;
      this.$refs.childHide.receiveIdHide = true;
      this.listLoading = true;
      findWhileList(data.receiveId).then(response => {
        this.whileListData = response.data;
        console.log(this.whileListData);
        this.total = response.data.total;
        this.listLoading = false;
        
      });
    },
    deleteWhile(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除白名单操作
          delWhileList(data.rid).then(res => {
            if (res.code == 200) {
              this.findFormData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
