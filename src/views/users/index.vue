<template>
  <div class="app-container">
    <el-input
      size="mini"
      placeholder="请输入用户名字"
      style="width:180px; margin-right:20px;"
      v-model="userName"
    ></el-input>
    <el-input
      size="mini"
      placeholder="请输入部门编号"
      style="width:180px;margin-right:20px;"
      v-model="input5"
    ></el-input>

    <el-button type="primary" size="mini" @click="findAllUser()">查询用户</el-button>

    <div  class="mtop">
      <el-button type="success" size="mini" @click="addUserDialog()">添加用户</el-button>
    </div>
    <el-table :data="userData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="创建日期">
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
      <el-table-column align="center" label="登录账号">
        <template slot-scope="scope">{{scope.row.accountNo}}</template>
      </el-table-column>
      <el-table-column align="center" label="用户名称">
        <template slot-scope="scope">{{scope.row.userName}}</template>
      </el-table-column>
      <el-table-column align="center" label="用户性别">
        <template slot-scope="scope">{{scope.row.sex | userSexFormat}}</template>
      </el-table-column>
      <el-table-column align="center" label width="350">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="UserRoleDialog(scope.row)">用户角色</el-button>
          <el-button type="warning" size="mini" @click="resetPassDialog(scope.row)">重置密码</el-button>
          <el-button type="warning" size="mini" @click="updataUserDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delUserInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center ; margin-top:30px;">
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          :current-page="userPageNow"
          :page-size="userPageSize"
          :page-sizes="[15, 20, 30, 40]"
          :total="usertotal"
          @current-change="userCurrentChange"
          @size-change="userSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog title="添加用户" center :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="addUserform" label-width="140px">
        <el-form-item label="登录账号:" prop="sortNo">
          <el-input v-model="addUserform.accountNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码:" prop="sortNo">
          <el-input v-model="addUserform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称:" prop="sortNo">
          <el-input v-model="addUserform.userName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="部门:" prop="sortNo">
          <el-select v-model="addUserform.departmentNo" placeholder="请选择部门">
            <el-option
              v-for="(item,index) in allDepart"
              v-bind:label="item.departmentName"
              :key="index"
              :value="item.departmentNo"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型:" prop="sortNo">
          <el-select v-model="addUserform.departmentUserType" placeholder="请选择部门用户类型">
            <el-option label="普通成员" :value="1" />
            <el-option label="部门管理" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户性别:" prop="sortNo">
          <el-select v-model="addUserform.sex" placeholder="请选择性别">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
            <el-option label="其他" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="addUserInfo()" v-show="addShow">确 定</el-button>
        <el-button type="primary" size="mini" @click="resetUserPassword()" v-show="editShow">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="重置密码" :visible.sync="resetPasswordVisible" :close-on-click-modal="false">
      <el-form :model="addUserform">
        <el-form-item label="新密码" prop="sortNo">
          <el-input v-model="addUserform.userName" placeholder="请输入新密码" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="resetUserPassword()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹窗 -->
    <el-dialog title="用户信息" :visible.sync="updateUserVisible" :close-on-click-modal="false" center>
      <el-form :model="editForm" label-width="140px">
        <el-form-item label="用户名:" prop="sortNo">
          <el-input v-model="editForm.userName" :disabled="false" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sortNo">
          <el-select v-model="editForm.sex" placeholder="请选择你的性别">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
            <el-option label="其他" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型:" prop="sortNo">
          <el-select v-model="editForm.departmentUserType" placeholder="请选择部门用户类型">
            <el-option label="普通成员" :value="1" />
            <el-option label="部门管理" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门:" prop="sortNo">
          <el-select v-model="editForm.departmentNo" placeholder="请选择部门">
            <el-option
              v-for="(item,index) in allDepart"
              v-bind:label="item.departmentName"
              :key="index"
              :value="item.departmentNo"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态:" prop="sortNo">
          <el-select v-model="editForm.state" placeholder="请选择用户状态">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
            <el-option label="锁定" :value="3" />
            <el-option label="注销" :value="4" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="updateUserInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查询用户角色弹窗 -->
    <el-dialog
      :title="titleRole[dialogStatus]"
      :visible.sync="findUserRoleVisible"
      :close-on-click-modal="false"
    >
      <el-button type="success" size="mini" @click="findAllUserRole()">添加角色</el-button>
      <el-table :data="userRoleData" border style="width: 100%;" class="mtop">
        <el-table-column align="center" label="用户名称">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column align="center" label="角色名称">
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>

        <el-table-column align="center" width="80">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="deleteUserRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="userRoleSizeChange"
        @current-change="userRoleCurrentChange"
        :current-page="userRolePageNow"
        :page-size="userRolePageSize"
        layout="total, prev, pager, next"
        :total="roleTotal"
      ></el-pagination>

      <!-- 添加用户角色 -->
      <el-dialog
        append-to-body
        :title="titleRole[dialogStatus]"
        :visible.sync="addUserRoleVisible"
        :close-on-click-modal="false"
      >
        <el-table :data="allRoleData" border style="width: 100%;" class="mtop">
          <el-table-column align="center" label="角色名称">
            <template slot-scope="scope">{{scope.row.roleName}}</template>
          </el-table-column>

          <el-table-column align="center" width="80">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="addRole(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination
          @size-change="allUserRoleSizeChange"
          @current-change="allUserRoleCurrentChange"
          :current-page="allUserRolePageNow"
          :page-size="allUserRolePageSize"
          layout="total, prev, pager, next"
          :total="allRoleTotal"
        ></el-pagination>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {
  findUserInfo,
  delUser,
  addUser,
  resetPassword,
  updateUser,
  addAllDepart,
  findAllRole,
  addUserRole,
  delUserRole,
  getRoles
} from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name:"用户管理",
  data() {
    return {
      labelPosition: "left",
      dialogFormVisible: false, //弹窗
      resetPasswordVisible: false, //重置密码弹窗
      updateUserVisible: false, //编辑用户弹窗
      findUserRoleVisible: false, //查询当前用户角色弹窗
      addUserRoleVisible: false, //添加用户角色弹窗

      userRoleData: [], //  用户角色
      form: { departmentName: "" },
      addUserform: {}, //添加用户信息
      userData: [], //所有用户信息
      userPageNow: 1, //
      userPageSize: 15,
      usertotal: "",

      userRolePageNow: 1, //查询用户角色当前页
      userRolePageSize: 5, //查询用户角色页面数量
      roleTotal: "", //用户角色数量

      allUserRolePageNow: 1, //所有角色当前页
      allUserRolePageSize: 5, //所有角色每页显示数量
      allRoleTotal: "", // 所有角色数量

      userName: "", //用户名
      input5: "",

      editForm: {}, //编辑用户存储的信息

      addShow: false,
      editShow: false,
      allDepart: [],
      titleMap: {
        addEquipment: "添加用户",
        editEquipment: "编辑用户"
      },
      titleRole: {
        addEquipment: "添加用户",
        editEquipment: "编辑用户"
      },
      userNo: "", // 重置密码
      userRoleNo: "" //用户角色
    };
  },
  computed: {
    ...mapGetters(["name", "menuList", "accessedRouters"])
  },
  mounted() {
    this.findAllUser();
  },
  methods: {
    //查询系统用户信息
    findAllUser() {
      findUserInfo(this.userPageNow, this.userPageSize, this.userName).then(
        res => {
          if (res.code == 200) {
            this.usertotal = res.data.total;
            this.userData = res.data.records;
            console.log(this.userData);
          }
        }
      );
    },

    // 查询所有部门信息
    findAllDepart() {
      addAllDepart().then(res => {
        if (res.code == 200) {
          this.allDepart = res.data;
          for (let item of this.allDepart) {
            console.log(item.departmentName);
          }
        }
      });
    },

    //添加用户打开弹窗
    addUserDialog() {
      this.dialogFormVisible = true;
      this.addShow = true;
      this.editShow = false;

      this.findAllDepart();
    },

    //添加用户
    addUserInfo() {
      let data = {
        accountNo: this.addUserform.accountNo,
        password: this.addUserform.password,
        sex: this.addUserform.sex,
        userName: this.addUserform.userName,
        departmentNo: this.addUserform.departmentNo,
        departmentUserType: this.addUserform.departmentUserType
      };
      addUser(data).then(res => {
        if (res.code == 200) {
          this.findAllUser();
          this.dialogFormVisible = false;
        }
      });
    },

    //查询用户角色信息
    findUserRole() {
      findAllRole(
        this.allUserRolePageNow,
        this.allUserRolePageSize,
        this.userNo
      ).then(res => {
        this.userRoleData = res.data.records;
        console.log(res.data);
      });
    },

    //打开用户角色弹窗
    UserRoleDialog(data) {
      this.userNo = data.userNo;
      this.findUserRoleVisible = true;
      this.findUserRole();
    },

    //查询所有用户角色
    findAllUserRole() {
      this.addUserRoleVisible = true;

      getRoles(this.allUserRolePageNow, this.allUserRolePageSize, "").then(
        response => {
          let data = response.data;
          this.allUserRolePageSize = data.size;
          this.allUserRolePageNow = data.pages;
          this.allRoleTotal = data.total;
          this.allRoleData = data.records;
        }
      );
    },

    //添加用户角色
    addRole(data) {
      addUserRole({
        roleNo: data.roleNo,
        userNo: this.userNo
      }).then(res => {
        if (res.code == 200) {
          this.findUserRole();
          this.$message({
            type: "success",
            message: "已添加成功"
          });
        }
      });
    },

    //删除用户角色
    deleteUserRole(data) {
      this.delCommon(
        delUserRole(data.id).then(res => {
          this.findUserRole();
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
      );
    },
    //编辑用户弹窗
    updataUserDialog(data) {
      // 编辑用户反选
      this.editForm = JSON.parse(JSON.stringify(data));

      this.updateUserVisible = true;
      this.editForm.userName = data.userName;
      this.editForm.userNo = data.userNo;
      // if( data.sex === 1){
      //    this.editForm.sex = "男";
      // }else if(data.sex === 2){
      //   this.editForm.sex = "女";
      // }else{
      //   this.editForm.sex = "其他";
      // }

      this.findAllDepart();
    },

    //编辑用户
    updateUserInfo() {
      this.updateUserVisible = true;
      let data = {
        departmentNo: this.editForm.departmentNo,
        departmentUserType: this.editForm.departmentUserType,
        sex: this.editForm.sex,
        userName: this.editForm.userName,
        userNo: this.editForm.userNo,
        state: this.editForm.state
      };

      this.$confirm("此操作将永久改变该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          updateUser(data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.updateUserVisible = false;
            }else{
              this.$message({
                type: "warning",
                message: res.message
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

    //删除用户
    delUserInfo(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser(data.userNo).then(res => {
            if (res.code == 200) {
              this.findAllUser();
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

    //重置密码打开弹窗
    resetPassDialog(data) {
      this.userNo = data.userNo;
      this.resetPasswordVisible = true;
    },

    //重置密码
    resetUserPassword() {
      let data = {
        userNo: this.userNo
      };
      resetPassword(data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "重置密码成功"
          });
          this.resetPasswordVisible = false;
          this.findAllUser();
        }
      });
    },

    //取消隐藏不用的按钮
    cancel() {
      this.updateUserVisible = false;
      this.dialogFormVisible = false;
      this.resetPasswordVisible = false;
      // this.findDepartRoleCommon();
    },

    //用户分页组件
    userCurrentChange(val) {
      this.userPageSize = val;
      //每页下拉显示数据
    },
    userSizeChange(currentPage) {
      this.userPageNow = currentPage;
      //点击第几页
    },

    //用户角色分页组件
    userRoleCurrentChange(val) {
      this.userRolePageSize = val;
      //每页下拉显示数据
    },
    userRoleSizeChange(currentPage) {
      this.userRolePageNow = currentPage;
      //点击第几页
    },

    //用户所有角色分页组件
    allUserRoleCurrentChange(val) {
      this.allUserRolePageSize = val;
      //每页下拉显示数据
    },
    allUserRoleSizeChange(currentPage) {
      this.allUserRolePageNow = currentPage;
      //点击第几页
    }
  }
};
</script>

<style >
</style>

