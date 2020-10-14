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
      v-model="departNo"
    ></el-input>

    <el-button type="primary" size="mini" @click="findAllUser()">查询用户</el-button>

    <div class="mtop">
      <el-button type="success" size="mini" @click="addOpenDialog()">添加用户</el-button>
    </div>
    <el-table :data="departUserData" border style="width: 100%;" class="mtop">
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
      <el-table-column align="center" label="用户名称">
        <template slot-scope="scope">{{scope.row.userName}}</template>
      </el-table-column>
      <el-table-column align="center" label="用户性别">
        <template slot-scope="scope">{{scope.row.sex}}</template>
      </el-table-column>
      <el-table-column align="center" label width="200">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="resetPassDialog(scope.row)">重置密码</el-button>
          <el-button type="danger" size="mini" @click="delDepartmentUser(scope.row)">删除</el-button>
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

    <!-- 添加用户弹窗 -->
    <el-dialog
      
      :visible.sync="addDepartUserVisible"
      :close-on-click-modal="false"
    >
      <el-table :data="allUserData" border style="width: 100%;" class="mtop">
        <el-table-column align="center" label="部门名字">
          <template slot-scope="scope">{{scope.row.departmentName}}</template>
        </el-table-column>

        <el-table-column align="center" label="用户名字">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>

        <el-table-column align="center" width="80">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="addDepartmentUser(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->

      <el-pagination
        @size-change="allUserSizeChange"
        @current-change="allUserCurrentChange"
        :current-page="allUserPageNow"
        :page-size="allPageSize"
        layout="total, prev, pager, next"
        :total="allTotal"
      ></el-pagination>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <!-- <el-button type="primary" @click="addDepartmentUser()">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findDepartUser,
  addDepartUser,
  delDepartUser,
  findUserInfo
} from "@/api/departUser";
import { mapGetters } from "vuex";
export default {
  name:'部门用户',
  data() {
    return {
      usertotal:'',
      addDepartUserVisible: false, //添加用户弹窗
      departUserData: [], // 部门用户数据
      userPageNow: 1, //当前页
      userPageSize: 15, //
      allUserPageNow: 1, //所有用户当前页
      allPageSize: 5, //所有用户每页显示条数
      allTotal: "",
      departmentNo: "", //部门编号
      addDepartUserform: {}, //
      userName: "",
      departNo:"",
      allUserData: [] ,//所有用户信息
     
    };
  },
  mounted() {
    this.findAllDepartUser();
  },
  computed: {
    // ...mapGetters(["userNo"])
  },
  methods: {
    // 分页查询所有用户
    findAllDepartUser() {
      findDepartUser(
        this.userPageNow,
        this.userPageSize,
        this.departmentNo
      ).then(res => {
        if (res.data) {
          this.departUserData = res.data.records;
          this.usertotal = res.data.total
        }
      });
    },

    // 打开添加用户弹窗
    addOpenDialog() {
      this.addDepartUserVisible = true;

      //查询系统用户信息

      findUserInfo(this.allUserPageNow, this.allPageSize, this.userName).then(
        res => {
          if (res.code == 200) {
            this.allTotal = res.data.total;

            this.allUserData = res.data.records;

            console.log(res.data);
          }
        }
      );
    },

    userNo() {
      return this.$store.state.userNo;
    },

    // 添加部门用户
    addDepartmentUser(data) {
      addDepartUser({
        departmentNo: data.departmentNo,
        userNo: this.userNo
      }).then(res => {

        if (res.data) {
          this.$message({
            type: "success",
            message: "已添加成功"
          });
          this.addDepartUserVisible = false;
        }
      });
    },


    
    // 删除部门用户
    delDepartmentUser(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delDepartUser(data.id).then(res => {
            if (res.data) {
              this.findAllDepartUser();
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

    // 取消隐藏不用的按钮
    cancel() {
      this.addDepartUserVisible = false;

      // this.findDepartRoleCommon();
    },

    

    //所有用户分页组件
    allUserCurrentChange(size) {
      this.allPageSize = size;
      //每页下拉显示数据
    },
    allUserSizeChange(currentPage) {
      this.allUserPageNow = currentPage;
      //点击第几页
    },

     //所有用户分页组件
    userCurrentChange(size) {
      this.userPageSize = size;
      //每页下拉显示数据
    },
    userSizeChange(currentPage) {
      this.userPageNow = currentPage;
      //点击第几页
    }
  }
};
</script>
<style lang="scss">
.el-pagination {
  text-align: center;
}
</style>
