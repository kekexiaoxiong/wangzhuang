<template>
  <div class="app-container">
    <Tabs size="small">
      <Tab-pane label="代币开关">
        <el-button @click="addToken()" size="mini" type="primary">新增</el-button>
        <el-table
          v-loading="listLoading"
          :data="tokenConfigData"
          border
          style="width: 100%;"
          class="mtop"
        >
          <el-table-column align="center" label="序号" prop="pId">
            <template slot-scope="scope">{{scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column align="center" label="奇数日关卡" prop="openOdd"></el-table-column>
          <el-table-column align="center" label="偶数日关卡" prop="openEven"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" size="mini" type="primary">编辑</el-button>
              <el-button @click="deleteData(scope.row)" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </Tab-pane>
    </Tabs>

    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="addVisible" :close-on-click-modal="false" width="25%">
      <el-form :model="addform" class="addForm" label-width="120px" ref="form">
        <el-form-item label="奇数日关卡：">
          <el-select placeholder="请选择" v-model="addform.openOdd">
            <el-option
              :disabled="item.disabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in options"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="偶数日关卡：">
          <el-select placeholder="请选择" v-model="addform.openEven">
            <el-option
              :disabled="item.disabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in optionsEven"
            ></el-option>
          </el-select>
        </el-form-item>

        <h3>1.当前已选择的关卡不允许继续选择</h3>
        <h3>2.配置提交后将于当天晚上0点生效</h3>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button type="primary" size="mini" @click="confirmAddition()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框2 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="25%"
    >
      <el-form :model="editform" class="addForm" label-width="120px" ref="form">
         <el-form-item label="奇数日关卡：">
          <el-select placeholder="请选择" v-model="editform.openOdd">
            <el-option
              :disabled="item.disabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in options"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="偶数日关卡：">
          <el-select placeholder="请选择" v-model="editform.openEven">
            <el-option
              :disabled="item.disabled"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in optionsEven"
            ></el-option>
          </el-select>
        </el-form-item>

        <h3>1.当前已选择的关卡不允许继续选择</h3>
        <h3>2.配置提交后将于当天晚上0点生效</h3>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button type="primary" size="mini" @click="editUpload()">确 定</el-button>
      </div>
    </el-dialog>
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
  findTimeLimit,
  findFreeCheckpoint,
  updateTimeLimit,
  updateFreeCheckpoint,
  findTokenConfig,
  updateTokenConfig
} from "@/api/AdConfiguration";
import FindSearch from "@/common/FindSearch";
export default {
  name: "代币管理",
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
      limitActiveData: [], //限时活动
      tokenConfigData: [], //限时免费岛屿
      dialogFormVisible: false,
      dialogFormVisible2: false,
      addVisible: false,
      addform: {},
      editform: {},
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 15,
      deviceType: 0,
      platformType: "",
      total: "",
      country: "",
      checkpointSelect: [],
      options: [
        {
          value: 0,
          label: "无"
        },
        {
          value: 1000101,
          label: "1000101"
        },
        {
          value: 1000102,
          label: "1000102"
        },
        {
          value: 1000103,
          label: "1000103"
        },
        {
          value: 1000201,
          label: "1000201"
        },
        {
          value: 1000202,
          label: "1000202"
        },
        {
          value: 1000203,
          label: "1000203"
        },
        {
          value: 1000301,
          label: "1000301"
        },
        {
          value: 1000302,
          label: "1000302"
        },
        {
          value: 1000303,
          label: "1000303"
        },
        {
          value: 1000401,
          label: "1000401"
        },
        {
          value: 1000402,
          label: "1000402"
        },
        {
          value: 1000403,
          label: "1000403"
        },
        {
          value: 1000501,
          label: "1000501"
        },
        {
          value: 1000502,
          label: "1000502"
        },
        {
          value: 1000503,
          label: "1000503"
        },
        {
          value: 1000601,
          label: "1000601"
        },
        {
          value: 1000602,
          label: "1000602"
        },
        {
          value: 1000603,
          label: "1000603"
        },
        {
          value: 1000801,
          label: "1000801"
        },
        {
          value: 1000802,
          label: "1000802"
        },
        {
          value: 1000803,
          label: "1000803"
        }
      ],
      optionsEven: [
        {
          value: 0,
          label: "无"
        },
        {
          value: 1000101,
          label: "1000101"
        },
        {
          value: 1000102,
          label: "1000102"
        },
        {
          value: 1000103,
          label: "1000103"
        },
        {
          value: 1000201,
          label: "1000201"
        },
        {
          value: 1000202,
          label: "1000202"
        },
        {
          value: 1000203,
          label: "1000203"
        },
        {
          value: 1000301,
          label: "1000301"
        },
        {
          value: 1000302,
          label: "1000302"
        },
        {
          value: 1000303,
          label: "1000303"
        },
        {
          value: 1000401,
          label: "1000401"
        },
        {
          value: 1000402,
          label: "1000402"
        },
        {
          value: 1000403,
          label: "1000403"
        },
        {
          value: 1000501,
          label: "1000501"
        },
        {
          value: 1000502,
          label: "1000502"
        },
        {
          value: 1000503,
          label: "1000503"
        },
        {
          value: 1000601,
          label: "1000601"
        },
        {
          value: 1000602,
          label: "1000602"
        },
        {
          value: 1000603,
          label: "1000603"
        },
        {
          value: 1000801,
          label: "1000801"
        },
        {
          value: 1000802,
          label: "1000802"
        },
        {
          value: 1000803,
          label: "1000803"
        }
      ]
    };
  },
  mounted() {
    this.findFormData();
  },
  methods: {
    findFormData() {
      this.fetchData();
    },
    //获取数据
    //findPlayerRatain(pageIndex, pageSize, gameType, country, channelId, beginTime, endTime)
    fetchData(data) {
      //限时活动
      findTimeLimit().then(response => {
        this.limitActiveData = response.data.records;

        this.listLoading = false;
      });

      //查询代币配置
      findTokenConfig().then(response => {
        this.tokenConfigData = response.data;
        console.log(this.freeCheckData);
        this.listLoading = false;
      });
    },

    addToken() {
      this.addVisible = true;
    },

    //新增
    confirmAddition() {
      let data = {
        openEven: this.addform.openEven,
        openOdd: this.addform.openOdd
      };
      addTokenConfig(data).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });
    },
    //取消编辑
    cancel() {
      this.dialogFormVisible = false;
      this.addVisible = false;
    },

    //编辑
    edit(c) {
       
      this.editform.openOdd = c.openOdd;
      this.editform.openEven = c.openEven;
      this.editform.cId = c.cId

      //选择关卡
      this.$common.findCheckpoint().then(res => {
        if (res.data) {
          for (let item of res.data) {
            this.checkpointSelect.push(item);
            console.log(this.paymentMethodSelect);
          }
        }
      });

      this.dialogFormVisible = true;
    },

    //代币配置编辑
    editUpload() {
      let data = {
        cid: this.editform.cId,
        openEven: this.editform.openEven,
        openOdd: editform.openOdd
      };

      updateTokenConfig(data).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });
    },

    //删除限时活动免费岛屿
    deleteData(d) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteFreeCheckpoint(d.cId).then(res => {
            this.findFormData();
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
    currentChange(currentPage) {
      this.pageIndex = currentPage;
      this.findFormData();
      //每页下拉显示数据
    },
    sizeChange(size) {
      this.pageSize = size;
      this.findFormData();
      //点击第几页
    }
  }
};
</script>
