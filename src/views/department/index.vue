<template>
  <div class="dashboard-container">
    <el-input
      size="mini"
      placeholder="请输入部门名字"
      style="width:180px; margin-right:20px;"
      v-model="input4"
    ></el-input>
    <el-input
      size="mini"
      placeholder="请输入部门编号"
      style="width:180px;margin-right:20px;"
      v-model="input5"
    ></el-input>

    <el-button type="primary" size="mini" @click="findDepartment()">查询部门</el-button>

    <div class="mtop">
      <el-button type="success" size="mini" @click="addDepartment()">添加部门</el-button>
    </div>
    <el-table :data="departmentData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" width="180" label="创建日期">
        <template slot-scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>
      <el-table-column align="center" width="180" label="修改日期">
        <template slot-scope="scope">{{scope.row.updateTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template slot-scope="scope">{{scope.row.createUser}}</template>
      </el-table-column>
      <el-table-column align="center" label="修改人">
        <template slot-scope="scope">{{scope.row.updateUser}}</template>
      </el-table-column>
      <el-table-column align="center" label="部门名字">
        <template slot-scope="scope">{{scope.row.departmentName}}</template>
      </el-table-column>

      <el-table-column align="center" label="部门id">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label width="200">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="updateDepartment(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteDartment(scope.row)">删除</el-button>

          <el-button type="primary" size="mini" @click="departmentModal(scope.row)">部门角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center ; margin-top:30px;">
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          :current-page="departPageNow"
          :page-size="departPageSize"
          :page-sizes="[15, 20, 30, 40]"
          :total="total"
          @current-change="departCurrentChange"
          @size-change="departSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>

    <!-- 部门角色弹框 -->
    <el-dialog
      :title="titleMap[dialogStatus]"
      :visible.sync="dialogRoleModal"
      :close-on-click-modal="false"
    >
      <el-button type="success" size="mini" @click="getAllRoles()">添加角色</el-button>

      <el-table
        :data="departmentRoleData.slice((departRoleCurrentPage-1)*departRolePagesize,departRolePagesize*departRoleCurrentPage)"
        border
        style="width: 100%;"
        class="mtop"
      >
        <el-table-column align="center" width="180" label="创建日期">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column align="center" width="180" label="修改日期">
          <template slot-scope="scope">{{scope.row.updateTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="部门名字">
          <template slot-scope="scope">{{scope.row.departmentName}}</template>
        </el-table-column>

        <el-table-column align="center" label="角色名字">
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>

        <el-table-column align="center" width="80">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteDartmentRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="departRoleSizeChange"
        @current-change="departRoleCurrentChange"
        :current-page="departRoleCurrentPage"
        :page-size="departRolePagesize"
        layout="total, prev, pager, next"
        :total="departmentRoleData.length"
      ></el-pagination>

      <!-- 子弹窗 -->
      <el-dialog
        append-to-body
        :title="titleMap[dialogStatus]"
        :visible.sync="addRoleVisible"
        :close-on-click-modal="false"
      >
        <el-table :data="roleData" border style="width: 100%;margin-top:2rem;">
          <el-table-column align="center" label="角色名称">
            <template slot-scope="scope">{{scope.row.roleName}}</template>
          </el-table-column>

          <el-table-column align="center" label="添加" width="200">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="addDepartmentRole(scope.row)">确定</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="text-align: center ; margin-top:30px;">
          <!-- 分页 -->
          <div class="pages">
            <el-pagination
              :current-page="rolePageNow"
              :page-size="rolePageSize"
              :page-sizes="[15, 20, 30, 40]"
              :total="allTotal"
              @current-change="roleCurrentChange"
              @size-change="roleSizeChange"
              layout="total, prev, pager, next"
            ></el-pagination>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="updataDepartReq()" v-show="editShow">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>

    <!-- 弹框 -->
    <el-dialog
      :title="titleMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item label="部门名称">
          <el-input v-model="form.departmentName" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色编号" v-if="roleNoChange">
          <el-input v-model="form.roleNo" auto-complete="off"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="mac">
          <el-input v-model="form.mac" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出场时间">
          <div class="block" style="margin-top:40px">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addDepartReq()" v-show="addShow">确 定</el-button>
        <el-button type="primary" @click="updataDepartReq()" v-show="editShow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  addDepart,
  findDepart,
  delDpart,
  updateDepart
} from "@/api/department";
import {
  addDepartRole,
  findDepartRole,
  delDepartRole,
  getRoles
} from "@/api/departRole";

export default {
  name: " 部门管理",
  data() {
  
    return {
      departmentData: [],
      departmentRoleData: [], //存储部门角色
      pageIndex: 1,
      pageSize: 15,
      departPageNow: 1,
      departPageSize: 15,
      departmentNo: "",
      departmentName: "",
      input4: "",
      dialogFormVisible: false,
      dialogRoleModal: false,
      titleMap: {
        addEquipment: "添加部门",
        editEquipment: "编辑部门"
      },
      form: {},
      addShow: false, //部门添加按钮
      editShow: false, // 编辑按钮
      departmentNo: "", //存储编辑的部门编号
      addRoleVisible: false,
      roleData: [],

      rolePageSize: 5,
      rolePageNow: 1,
      allTotal: "",

      departPageIndex: 1,
      departPageSize: 15,

      departRolePagesize: 5, //部门角色分页
      departRoleCurrentPage: 1
    };
  },
  computed: {
    ...mapGetters(["name", "menuList", "accessedRouters"])
  },
  mounted() {
    this.findDepartment();
  },
  methods: {
    //添加部门角色信息
    getAllRoles() {
      this.addRoleVisible = true;
      //查询用户角色信息
      getRoles(this.rolePageNow, this.rolePageSize, "").then(response => {
        // this.rolePageSize = data.size;
        // this.rolePageNow = data.pages;
        this.allTotal = response.data.total;
        this.roleData = response.data.records;
      });
    },

    //部门角色弹窗
    departmentModal(data) {
      this.dialogRoleModal = true;
      this.departmentNo = data.departmentNo;

      //查询部门所有角色

      this.findDepartRoleCommon();
    },

    //添加部门角色
    addDepartmentRole(e) {
      let data = {
        departmentNo: this.departmentNo,
        roleNo: e.roleNo
      };
      addDepartRole(data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "已添加成功"
          });

          this.findDepartment();
        }
      });
    },

    //删除部门角色
    deleteDartmentRole(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delDepartRole(data.id).then(res => {
            if (res.code == 200) {
              this.findDepartRoleCommon();
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

    //增加部门
    addDepartment() {
      this.form = {};
      this.dialogFormVisible = true;
      this.addShow = true;
      this.editShow = false;
    },
    //增加部门发送请求
    addDepartReq() {
      let data = {
        departmentName: this.form.departmentName
      };
      addDepart(data).then(res => {
        if (res.code == 200) {
          this.findDepartment();
          this.dialogFormVisible = false;
        }
      });
    },

    //查询部门
    findDepartment() {
      findDepart(
        this.pageIndex,
        this.pageSize,
        this.departmentNo,
        this.departmentName
      ).then(res => {
        if (res.data) {
          this.departmentData = res.data.records;

          console.log(res.data);
        }
      });
    },
    //删除部门
    deleteDartment(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delDpart(data.departmentNo).then(res => {
            if (res.code == 200) {
              this.findDepartment();
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

    //修改部门
    updateDepartment(e) {
      this.form = {};
      this.dialogFormVisible = true;
      this.addShow = false;
      this.editShow = true;
      this.departmentNo = e.departmentNo;
      // let data = {
      //   departmentName:e.departmentName,
      //   departmentNo:e.departmentNo
      // }
    },

    //修改部门发送请求
    updataDepartReq() {
      this.$confirm("此操作将永久改变该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          updateDepart({
            departmentName: this.form.departmentName,
            departmentNo: this.departmentNo
          }).then(res => {
            if (res.code == 200) {
              this.$message({
                showClose: true,
                message: res.message,
                type: "success"
              });
              this.findDepartment();
              this.dialogFormVisible = false;
            }else{
              this.$message({
                showClose: true,
                message: res.message,
                type: "warning"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },

    //取消隐藏不用的按钮
    cancel() {
      this.addRoleVisible = false;
      this.findDepartRoleCommon();
    },

    //查询部门信息公共的
    findDepartRoleCommon() {
      findDepartRole(
        this.departPageIndex,
        this.departPageSize,
        this.departmentNo
      ).then(res => {
        if (res.code == 200) {
          this.departmentRoleData = res.data.records;
        }
      });
    },

    //部门分页组件
    departCurrentChange(size) {
      this.departPageSize = size;
      //每页下拉显示数据
    },
    departSizeChange(currentPage) {
      this.departPageNow = currentPage;
      //点击第几页
    },

    //角色分页组件
    roleCurrentChange(val) {
      //点击第几页
      this.rolePageNow = val;
      this.getAllRoles();
    },
    roleSizeChange(val) {
      this.rolePageSize = val;
    },

    //部门分页
    departRoleSizeChange(val) {
      this.departRolePagesize = val;
    },

    departRoleCurrentChange(val) {
      this.departRoleCurrentPage = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
}

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
