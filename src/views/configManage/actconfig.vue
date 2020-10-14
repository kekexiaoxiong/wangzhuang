<template>
  <div class="dashboard-container">
    <Tabs size="small">
      <Tab-pane label="公告配置">
        <div class="mtop">
          <el-button type="success" size="mini" @click="addAdConfig()">新增</el-button>
        </div>
        <el-table :data="noticeConfigData" border style="width: 100%;" class="mtop">
          <el-table-column align="center" label="序号" width="100">
            <template slot-scope="scope">
              <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">{{scope.row.createTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column align="center" label="修改时间">
            <template slot-scope="scope">{{scope.row.updateTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column align="center" label="标题">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column align="center" label="内容" width="200">
            <template slot-scope="scope">{{scope.row.content}}</template>
          </el-table-column>
          <el-table-column align="center" label="开始时间">
            <template slot-scope="scope">{{scope.row.startTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="结束时间">
            <template slot-scope="scope">{{scope.row.endTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="关服时间">
            <template slot-scope="scope">{{scope.row.closeServerTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="奖励详情">
            <template slot-scope="scope">{{scope.row.rewardDetail}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200rem">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" size="mini" type="primary">编辑</el-button>
              <!--            <el-button @click="deleteHornMsg(scope.row)" size="mini" type="danger">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </Tab-pane>
      <Tab-pane label="活动公告">    <el-table :data="activeData" border style="width: 100%;" class="mtop">
          <el-table-column align="center" label="序号" width="100">
            <template slot-scope="scope">
              <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">{{scope.row.createTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column align="center" label="修改时间">
            <template slot-scope="scope">{{scope.row.updateTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column align="center" label="标题">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column align="center" label="内容" width="200">
            <template slot-scope="scope">{{scope.row.content}}</template>
          </el-table-column>
          <el-table-column align="center" label="开始时间">
            <template slot-scope="scope">{{scope.row.startTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="结束时间">
            <template slot-scope="scope">{{scope.row.endTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="关服时间">
            <template slot-scope="scope">{{scope.row.closeServerTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="奖励详情">
            <template slot-scope="scope">{{scope.row.rewardDetail}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200rem">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" size="mini" type="primary">编辑</el-button>
              <!--            <el-button @click="deleteHornMsg(scope.row)" size="mini" type="danger">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table></Tab-pane>
      <Tab-pane label="系统公告">    <el-table :data="systemData" border style="width: 100%;" class="mtop">
          <el-table-column align="center" label="序号" width="100">
            <template slot-scope="scope">
              <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">{{scope.row.createTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column align="center" label="修改时间">
            <template slot-scope="scope">{{scope.row.updateTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column align="center" label="标题">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column align="center" label="内容" width="200">
            <template slot-scope="scope">{{scope.row.content}}</template>
          </el-table-column>
          <el-table-column align="center" label="开始时间">
            <template slot-scope="scope">{{scope.row.startTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="结束时间">
            <template slot-scope="scope">{{scope.row.endTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="关服时间">
            <template slot-scope="scope">{{scope.row.closeServerTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="奖励详情">
            <template slot-scope="scope">{{scope.row.rewardDetail}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200rem">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" size="mini" type="primary">编辑</el-button>
              <!--            <el-button @click="deleteHornMsg(scope.row)" size="mini" type="danger">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table></Tab-pane>
      <Tab-pane label="紧急公告">    <el-table :data="urgentData" border style="width: 100%;" class="mtop">
          <el-table-column align="center" label="序号" width="100">
            <template slot-scope="scope">
              <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">{{scope.row.createTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column align="center" label="修改时间">
            <template slot-scope="scope">{{scope.row.updateTime|fmtDate2('yyyy-MM-DD hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column align="center" label="标题">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column align="center" label="内容" width="200">
            <template slot-scope="scope">{{scope.row.content}}</template>
          </el-table-column>
          <el-table-column align="center" label="开始时间">
            <template slot-scope="scope">{{scope.row.startTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="结束时间">
            <template slot-scope="scope">{{scope.row.endTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="关服时间">
            <template slot-scope="scope">{{scope.row.closeServerTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="奖励详情">
            <template slot-scope="scope">{{scope.row.rewardDetail}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200rem">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" size="mini" type="primary">编辑</el-button>
              <!--            <el-button @click="deleteHornMsg(scope.row)" size="mini" type="danger">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table></Tab-pane>
    </Tabs>

    
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
    <!-- 新建弹框 -->
    <el-dialog :before-close="handleClose" :title="title" :visible.sync="addVisible" width="55%">
      <el-form :model="addform" class="addForm" label-width="120px" ref="form">
        <el-form-item label="标题：">
          <el-input v-model="addform.title" placeholder="请输入公告标题"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input :rows="5" placeholder="请输入公告内容" type="textarea" v-model="addform.content"></el-input>
        </el-form-item>
        <el-form-item label="有效时间：">
          <el-date-picker
            v-model="addform.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择开始日期时间"
          ></el-date-picker>-
          <el-date-picker
            v-model="addform.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="关服时间：">
          <el-date-picker
            v-model="addform.closeServerTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择关服时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="补偿金币：" prop="sortNo">
          <el-input-number
            size="medium"
            label="请输入金币数量"
            @change="handleChange"
            :min="0"
            v-model="addform.gold"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="补偿钻石：" prop="sortNo">
          <el-input-number
            size="medium"
            label="请输入钻石数量"
            @change="handleChange"
            :min="0"
            v-model="addform.diamond"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="补偿道具：">
          <el-select placeholder="请选择" style="float:left" v-model="addform.item">
            <el-option :value="0" label="无"></el-option>
            <el-option
              :key="item.cId"
              :label="item.description_0"
              :value="item.cId"
              v-for="item in itemList"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span class="dialog-footer" slot="footer">
        <el-button size="mini" @click="addVisible = false">取 消</el-button>
        <el-button size="mini" @click="confirmAddition" type="primary">确 定</el-button>
      </span>
    </el-dialog>
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
        style="width: 100%;margin-top:2rem;"
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

import { findNotice, findDepart, delDpart } from "@/api/AdConfiguration";
import {
  addDepartRole,
  findDepartRole,
  delDepartRole,
  getRoles
} from "@/api/departRole";

export default {
  name: "配置管理",
  data() {
    return {
      addVisible: false,
      noticeConfigData: [],
      title: "新增",

      addform: {},
      itemList: [], //道具列表
      activeData: [],

      systemData:[],
      urgentData:[],
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
    this.fun();
    this.deepClone(this.b);
  },
  methods: {
    confirmAddition() {
      let data = {
        closeServerTime: this.addform.closeServerTime,
        content: this.addform.content,
        diamond: this.addform.diamond,
        endTime: this.addform.endTime,
        gold: this.addform.closeServerTime,
        item: this.addform.item,
        startTime: this.addform.startTime,
        title: this.addform.title
      };
      addNotice(data).then(res => {
         this.$message({
            type: "success",
            message: "已添加成功"
          });
      });
    },

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
    addAdConfig() {
      this.form = {};
      this.addVisible = true;
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
          this.addVisible = false;
        }
      });
    },

    //查询部门
    findDepartment() {
      findNotice().then(res => {
        if (res.data) {
          this.noticeConfigData = res.data.records;

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
            } else {
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
