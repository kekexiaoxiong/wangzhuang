<template>
  <div class="app-container">
    <el-button type="primary" size="mini" @click="addEquipment">新增</el-button>

    <el-table :data="roleData" border style="width: 100%;margin-top:2rem;">
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
      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">{{scope.row.roleName}}</template>
      </el-table-column>
      <el-table-column align="center" label="角色编号">
        <template slot-scope="scope">{{scope.row.roleNo}}</template>
      </el-table-column>
      <el-table-column align="center" label="绑定人数">
        <template slot-scope="scope">{{scope.row.bindNum}}</template>
      </el-table-column>
      <el-table-column align="center" label="绑定人数" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="findApi(scope.row)"
            style="margin-left: 16px;"
          >设置权限</el-button>
          <el-button type="warning" size="mini" @click="handelEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handelDelete(scope.row)">删除</el-button>
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
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" auto-complete="off"></el-input>
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
        <el-button type="primary" @click="addUserRole()" v-show="addShow">确 定</el-button>
        <el-button type="primary" @click="handelUserEdit()" v-show="editShow">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 抽屉 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          用户管理
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          ></el-tree>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          配置管理
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          ></el-tree>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
  findApiList,
  findAllApi
} from "@/api/role";
import request from "@/utils/request";
import qs from "qs";

import axios from "axios";

export default {
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
      //tabs标签栏
      activeName: "second",
      //侧边栏树型结构
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
      
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },

      roleNoChange: "false",
      addShow: false,
      editShow: false,

      list: null,
      listLoading: true,
      rolePageNow: 1,
      rolePageSize: 15,
      roleData: [],
      total: 0,

      drawer: false, //element抽屉

      dialogFormVisible: false,
      form: {},
      //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
      titleMap: {
        addEquipment: "添加角色",
        editEquipment: "编辑设备"
      },
      //新增和编辑弹框标题
      dialogStatus: "",
      allApi: [] //所有的api
    };
  },
  created() {
    this.getRoleData();
  },
  methods: {
    //tabs标签栏切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //查询用户角色信息
    getRoleData() {
      getRoles().then(response => {
        let data = response.data;
        this.rolePageSize = data.size;
        this.rolePageNow = data.pages;
        this.total = data.total;
        this.roleData = data.records;
      });
    },
    //分页组件
    roleCurrentChange(size) {
      this.rolePageSize = size;
      //每页下拉显示数据
    },
    roleSizeChange(currentPage) {
      this.rolePageNow = currentPage;
      //点击第几页
    },

    //新增
    addEquipment() {
      this.form = {};
      this.addShow = true;
      this.roleNoChange = false;
      //显示弹框
      this.dialogFormVisible = true;
      //新增弹框标题
      this.dialogStatus = "addEquipment";
    },
    // 请求数据
    addUserRole() {
      this.dialogFormVisible = false;
      this.addShow = false;
      addRole({ roleName: this.form.roleName }).then(response => {
        if (response.code == 200) {
          this.$message({
            type: "success",
            message: "已添加成功"
          });
          this.getRoleData();
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
    handelEdit(data) {
      this.form = JSON.parse(JSON.stringify(data));
      this.editShow = true;
      //显示输入角色编号选项
      this.roleNoChange = true;
      //显示弹框
      this.dialogFormVisible = true;
      //编辑弹框标题
      this.dialogStatus = "editEquipent";
    },

    handelUserEdit() {
      this.editShow = false;
      this.roleNoChange = false;
      //显示弹框
      this.dialogFormVisible = false;

      this.$confirm("此操作将永久改变该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          updateRole({
            roleName: this.form.roleName,
            roleNo: this.form.roleNo
          }).then(response => {
            if (response.code == 200) {
              this.$message({
                type: "success",
                message: response.message
              });
              this.getRoleData();
            } else {
              this.$message({
                type: "warning",
                message: response.message
              });
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

    //弹出层
    open() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },

    //删除数据
    handelDelete(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRole(data.id).then(response => {
            if (response.code == 200) {
              this.getRoleData();
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

    //查询角色api
    findApi(data) {
      this.drawer = true;
      //角色api
      findApiList(data.roleNo).then(response => {
        if (response.code == 200) {
          console.log(response);
        }
      });
      //所有api
      findAllApi().then(response => {
        if (response.code == 200) {
          this.allApi.push(response.data);
          let api = [];
          let data = [];

          for (var i in this.allApi) {
            for (var j in this.allApi[i]) {
              if (data.indexOf(this.allApi[i][j].groupName) == -1) {
                data.push(this.allApi[i][j].groupName);
                api.push({
                  id: 1,
                  label: this.allApi[i][j].groupName,
                  children: []
                });
              }
            }
          }
         
          this.allApi.forEach(function(label, index, input) {
            input[index].forEach(function(item, i, arr) {
              api.forEach(function(c, d, array) {
                if(arr[i].groupName == array[d].label){
                   array[d].children.push({

                      id: arr[i].apiNo,
                      label: arr[i].apiName,
                    });
                }

               
              });

            
            });

            // data.push("label:" + input[index]);
          });
          for(var i in api){
              this.data.push(api[i])
          }
         
         console.log(this.data);
          // for (var i in this.allApi) {
          //   console.log(i);
          //   for (var j in this.allApi[i]) {
          //     console.log(j);
          //     groupNameId.push({
          //       id: this.allApi[i][j].id,
          //       label: this.allApi[i][j].createUser
          //     });
          //   }
          // }

          // for(var k in groupNameId){
          //    console.log(groupNameId[k].label)
          //   for(var b in api){
          //       if(api[b].label == groupNameId[k].label){
          //           api[b].children.push({
          //           id: groupNameId[k].id,
          //           label: groupNameId[k].label
          //         });
          //       }
          //   }
          // }

          // for (var n in api) {
          //       if ((api[n].label == this.allApi[i][j].groupName)) {
          //         api[n].children.push({
          //           id: this.allApi[i][j].id,
          //           label: this.allApi[i][j].createUser
          //         });
          //       }
          //     }
          console.log(this.allApi)
          console.log(api);
          // api.forEach(function(label, index, input) {
          //   input[index] = input[index].replace(/\"/g, "");
          //   console.log(api);
          //   data.push("label:" + input[index]);
          // });
          // console.log(data);
        }
      });
    }

    //查询所有api
  }
};
</script>
