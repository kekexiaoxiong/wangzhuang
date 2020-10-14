<template>
  <div class="app-container">
    <el-form :model="formFind" label-width="100px" style="overflow: auto;">
      <el-form-item label="api编号:" prop="sortNo" style="float:left;">
        <el-input size="mini" placeholder="请输入api编号" style="width:150px;" v-model="formFind.apiNo"></el-input>
      </el-form-item>
      <el-form-item label="api名称:" prop="sortNo" style="float:left;">
        <el-input
          size="mini"
          placeholder="请输入api名称"
          style="width:150px;"
          v-model="formFind.apiName"
        ></el-input>
      </el-form-item>
      <el-form-item label="请求方式:" prop="sortNo" style="float:left;">
        <el-input
          size="mini"
          placeholder="请输入请求方式"
          style="width:150px;"
          v-model="formFind.apiMethod"
        ></el-input>
      </el-form-item>
      <el-form-item label="api组:" prop="sortNo" style="float:left;">
        <el-input
          size="mini"
          placeholder="请输入api组"
          style="width:150px;"
          v-model="formFind.groupName"
        ></el-input>
      </el-form-item>
      <el-form-item label style="float:left;">
        <el-button type="primary" size="mini" @click="findFormData()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="mini" @click="addApiModal">新增</el-button>

    <el-table :data="apiData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="修改日期">
        <template slot-scope="scope">{{scope.row.updateTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template slot-scope="scope">{{scope.row.createUser}}</template>
      </el-table-column>
      <el-table-column align="center" label="修改人">
        <template slot-scope="scope">{{scope.row.updateUser}}</template>
      </el-table-column>
      <el-table-column align="center" label="api名称">
        <template slot-scope="scope">{{scope.row.apiName}}</template>
      </el-table-column>
      <el-table-column align="center" label="api请求方式">
        <template slot-scope="scope">{{scope.row.apiMethod}}</template>
      </el-table-column>
      <el-table-column align="center" label="api编号">
        <template slot-scope="scope">{{scope.row.apiNo}}</template>
      </el-table-column>
      <el-table-column align="center" label="api组">
        <template slot-scope="scope">{{scope.row.groupName}}</template>
      </el-table-column>
      <el-table-column align="center" label="apiUri">
        <template slot-scope="scope">{{scope.row.apiUri}}</template>
      </el-table-column>
      <el-table-column align="center" label width="200">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="apiUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="apiDelate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center ; margin-top:30px;">
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          :current-page="apiPageNow"
          :page-size="apiPageSize"
          :page-sizes="[15, 20, 30, 40]"
          :total="total"
          @current-change="roleCurrentChange"
          @size-change="roleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      :title="titleMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item label="请求方式">
          <el-select v-model="form.apiMethod" auto-complete="off" placeholder="请选择你的请求方式">
            <el-option label="GET" :value="1" />
            <el-option label="POST" :value="2" />
            <el-option label="PUT" :value="3" />
            <el-option label="DELETE" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="api名称">
          <el-input v-model="form.apiName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="api编号">
          <el-input v-model="form.apiNo" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="form.apiState" auto-complete="off">
            <el-option label="使用" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="api地址">
          <el-input v-model="form.apiUri" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="api组">
          <el-input v-model="form.groupName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button type="primary" size="mini" @click="addUserApi()" v-show="addShow">确 定</el-button>
        <el-button type="primary" size="mini" @click="handelUserApi()" v-show="editShow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getList, findAllApi } from "@/api/api";
import { addApi, updateApi, findList, deleteApi } from "@/api/api";
import qs from "qs";

export default {
  name:'api管理',
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
      apiNoChange: "false",
      addShow: false,
      editShow: false,

      list: null,
      listLoading: true,
      apiPageNow: 1,
      apiPageSize: 15,
      apiData: [],
      total: 0,
      formFind: {
        apiNo: "",
        apiName: "",
        apiMethod: "",
        groupName: ""
      },
      dialogFormVisible: false,
      form: {},
      //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
      titleMap: {
        addEquipment: "添加api",
        editEquipment: "编辑api"
      },
      //新增和编辑弹框标题
      dialogStatus: ""
    };
  },
  created() {
    this.getapiData();
  },
  methods: {
    //查询用户角色信息
    getapiData() {
      this.apiData = [];
      findList().then(response => {
        let data = response.data;
        this.apiPageSize = data.size;
        this.apiPageNow = data.pages;
        this.total = data.total;
        this.apiData = data.records;
      });
    },

    //查询所有api
    //findAllApi(apiNo, apiName, apiMethod, groupName)
    findFormData() {
      findAllApi(
        this.formFind.apiNo,
        this.formFind.apiName,
        this.formFind.apiMethod,
        this.formFind.groupName
      ).then(res => {
        this.$message({
          type: "success",
          message: "已查询成功"
        });
        this.apiPageSize = 15;
        this.apiPageNow = 1;
        this.total = 1;
        this.apiData = res.data;
      });
    },

    //分页组件
    roleCurrentChange(size) {
      this.apiPageSize = size;
      this.getapiData();
      //每页下拉显示数据
    },
    roleSizeChange(currentPage) {
      this.apiPageNow = currentPage;
      this.getapiData();
      //点击第几页
    },

    //新增
    addApiModal() {
      this.form = {};
      this.addShow = true;

      this.editShow = false;
      this.apiNoChange = false;
      //显示弹框
      this.dialogFormVisible = true;
      //新增弹框标题
      this.dialogStatus = "addEquipment";
    },
    // 请求数据
    addUserApi() {
      addApi({
        apiMethod: this.form.apiMethod,
        apiName: this.form.apiName,
        apiNo: this.form.apiNo,
        apiState: this.form.apiState,
        apiUri: this.form.apiUri,
        groupName: this.form.groupName
      }).then(response => {
        if (response.code == 200) {
          this.getapiData();
          this.addShow = false;
          this.dialogFormVisible = false;
        }
      });
    },
    //取消隐藏不用的按钮
    cancel() {
      this.dialogFormVisible = false;
      this.editShow = false;
      this.addShow = false;
    },
    //  axios.post("http://localhost:9528/api/v1/sysRole/role", qs.stringify(params)).then(res => {
    //   }
    // );
    //编辑
    apiUpdate(data) {
      this.form = {};
      this.form = JSON.parse(JSON.stringify(data));

      this.form.apiMethod = data.apiMethod;
      this.form.apiState = data.apiState;
      this.editShow = true;
      this.addShow = false;
      //显示输入角色编号选项
      this.apiNoChange = true;
      //显示弹框
      this.dialogFormVisible = true;
      //编辑弹框标题
      this.dialogStatus = "editEquipent";
    },

    //编辑请求
    handelUserApi() {
      this.editShow = false;
      this.apiNoChange = false;
      //显示弹框
      this.dialogFormVisible = false;

      updateApi({
        apiMethod: this.form.apiMethod,
        apiName: this.form.apiName,
        apiNo: this.form.apiNo,
        apiState: this.form.apiState,
        apiUri: this.form.apiUri,
        groupName: this.form.groupName
      }).then(response => {
        if (response.code == 200) {
          this.getapiData();
        }
      });
    },

    //删除数据
    apiDelate(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteApi(data.id).then(response => {
            if (response.code == 200) {
              this.getapiData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
