<template>
  <div class="app-container">
    <el-button type="primary" size="mini" @click="addEquipment">新增</el-button>


    <el-table :data="roleData" border style="width: 100%;" class="mtop">
      <el-table-column align="center" label="日期" width="160">
        <template slot-scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="修改日期" width="160">
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
      <!-- <el-table-column align="center" label="角色编号">
        <template slot-scope="scope">{{scope.row.roleNo}}</template>
      </el-table-column>-->
      <el-table-column align="center" label="绑定人数">
        <template slot-scope="scope">{{scope.row.bindNum}}</template>
      </el-table-column>
      <el-table-column align="center" label="绑定人数" width="250">
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
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="api配置" name="1">
          <el-tree
            :data="dataConfigureApi"
            show-checkbox
            node-key="apiNo"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="treeChecked"
            :props="defaultProps"
          ></el-tree>
          <el-button
            type="success"
            class="butCenter"
            size="mini"
            v-if="showApi"
            @click="saveApiNo()"
          >保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="菜单配置" name="2">
          <el-tree
            :data="menuDataTree"
            show-checkbox
            node-key="meunId"
            ref="meunTree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="meunChecked"
            :props="defaultPropsRight"
          ></el-tree>
          <el-button
            type="success"
            size="mini"
            class="butCenter"
            v-if="showMeun"
            @click="saveMeunNo()"
          >保存</el-button>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="api配置" name="1"></el-tab-pane>
        <el-tab-pane label="菜单配置" name="2"></el-tab-pane>
      </el-tabs>-->
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
  findAllApi,
  submitApi,
  findMeun,
  findRoleMeun,
  submitMeunApi,
  addRoleMeun
} from "@/api/role";
import request from "@/utils/request";
import qs from "qs";

import axios from "axios";
import { findAllMenu } from "../../api/menu";

export default {
  name:'角色管理',
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
      showApi: false,
      showMeun: false,
      treeChecked: [], // 默认选中的
      meunChecked: [], //角色菜单默认选中的
      //tabs标签栏
      activeName: "1",
      //侧边栏树型结构
      dataConfigureApi: [],
      menuDataTree: [],

      defaultProps: {
        children: "children",
        label: "label"
      },
      defaultPropsRight: {
        children: "children",
        label: "label",
        meunId: "meunId"
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
      formFind:{
        apiNo:'',
        apiName:'',
        apiMethod:'',
      },
      //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
      titleMap: {
        addEquipment: "添加角色",
        editEquipment: "编辑设备"
      },
      //新增和编辑弹框标题
      dialogStatus: "",
      allApi: [], //所有的api
      roleApi: [], //角色api
      roleNo: "", //保存roleNo
      roleMeun: [], //保存角色菜单,

      pageIndex: 1,
      pageSize: 15
    };
  },
  created() {
    this.getRoleData();
    // this.
  },
  // watch: {
  //   meunChecked: {
  //     handler(newName, oldName) {

  //   },
  //   deep: true,
  //   immediate: true
  //   }
  // } ,
  mounted() {
    this.getRoleData();
  },
  methods: {
    //tabs标签栏切换
    handleClick(tab, event) {
      if (tab.name == 2) {
      }
      console.log(tab, event);
    },
    //查询用户角色信息
    getRoleData() {
      getRoles(this.pageIndex, this.pageSize, "").then(response => {
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
            message: "已取消修改"
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

    //删除角色数据
    handelDelete(data) {
      this.delCommon(
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
          })
      );
    },

    //菜单el-tree正反选
    meunInverse(data) {
      this.meunChecked = [];

      //查询角色菜单
      findRoleMeun(data.roleNo).then(res => {
        if (res.code == 200) {
          let menuDataTree = this.menuDataTree;

          //查询所有菜单
          findMeun().then(response => {
            if (response.code == 200) {
              this.menuDataTree = [];
              let allMeun = response.data;
              let allMeunTree = [];
              for (let item in allMeun) {
                if (allMeun[item].menuName) {
                  allMeunTree.push({
                    meunId: allMeun[item].id,
                    label: allMeun[item].menuName,
                    children: []
                  });
                }

                if (allMeun[item].children) {
                  for (let i of allMeun[item].children) {
                    allMeunTree[item].children.push({
                      meunId: i.id,
                      label: i.menuName
                    });
                  }
                }
              }
              this.menuDataTree = allMeunTree;
              this.showMeun = true;

              //角色菜单反选
              let meunChecked = [];
              console.log(menuDataTree);
              for (let item of this.menuDataTree) {
                for (let j of this.roleMeun) {
                  if (item.meunId == j.menuId && item.children.length === 0) {
                    meunChecked.push(item.meunId);
                  }
                }

                if (item.children.length !== 0) {
                  for (let k of item.children) {
                    for (let c of this.roleMeun) {
                      if (k.meunId == c.menuId) {
                        meunChecked.push(k.meunId);
                      }
                    }
                  }
                }
              }
              this.meunChecked = meunChecked;
            }
          });
          this.roleMeun = res.data;
        }
      });
    },

    //查询api
    findApi(data) {
      this.roleNo = data.roleNo;
      this.treeChecked = [];
      //角色api
      findApiList(data.roleNo).then(response => {
        if (response.code == 200) {
          this.roleApi = [];
          this.roleApi = response.data;
          this.meunInverse(data);
          //所有api
          findAllApi().then(response => {
            if (response.code == 200) {
              this.allApi = [];
              this.allApi.push(response.data);

              this.dataConfigureApi = [];
              let api = []; //用api来保存，树型菜单
              let data = []; //用data来保存已有的不同的groupName 方便做判断

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

              //往api里面的children里面放apiName ，apiNo
              this.allApi.forEach(function(label, index, input) {
                input[index].forEach(function(item, i, arr) {
                  api.forEach(function(c, d, array) {
                    if (arr[i].groupName == array[d].label) {
                      array[d].children.push({
                        apiNo: arr[i].apiNo,
                        label: arr[i].apiName
                      });
                    }
                  });
                });
              });
              for (var i in api) {
                this.dataConfigureApi.push(api[i]);
              }

              //树型结构正反选
              let roleApi = this.roleApi;
              let treeChecked = this.treeChecked;
              this.dataConfigureApi.forEach(function(allItem, i, allApi) {
                allApi[i].children.forEach(function(childItem, c, childApi) {
                  roleApi.forEach(function(rollItem, j, roleApi) {
                    if (childApi[c].apiNo == roleApi[j].apiNo) {
                      treeChecked.push(roleApi[j].apiNo);
                    }
                  });
                });
              });

              this.drawer = true;
              this.showApi = true;
            }
          });
        }
      });
    },




    //提交保存的角色菜单
    saveMeunNo() {
      let meunApiList = this.$refs.meunTree.getCheckedNodes();
      console.log(meunApiList);
      let meunApi = {
        list: [],
        roleNo: this.roleNo
      };

      //遍历选中的apiNo,保存到subApi里面

      for (let item of meunApiList) {
        meunApi.list.push(item.meunId);
        if (item.children) {
          for (let j of item.children) {
            meunApi.list.push(j.meunId);
          }
        }
      }
      console.log(meunApi);

      submitMeunApi(meunApi).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
        }
      });
    },

    //添加角色菜单
    // addMeunNo(){
    //   let data = {
    //     menuId:'',
    //     roleNo:''
    //   }
    //   addRoleMeun(data).then(res => {
    //   })
    // },

    //提交保存的角色api
    saveApiNo() {
      //保存选中的apiNo
      let subApiList = this.$refs.tree.getCheckedNodes();

      let subApi = {
        apiNos: [],
        roleNo: this.roleNo
      };

      //遍历选中的apiNo,保存到subApi里面
      subApiList.forEach(function(item, index, arr) {
        if (arr[index].children) {
          for (let item of arr[index].children) {
            subApi.apiNos.push(item.apiNo);
          }
        }
      });

      submitApi(subApi)
        .then(response => {
          if (response.code == 200) {
            this.getRoleData();
            this.$message({
              type: "success",
              message: "保存成功"
            });
          }
        })
        .catch(response => {
          this.$message({
            type: "warning",
            message: "保存失败"
          });
        });
    }

    //查询所有菜单
    // findAllMenu(){

    // }
  }
};
</script>

<style lang="scss">
.butCenter {
  display: inline-block;
  margin: 20px auto;
  margin-left: 2rem;
  text-align: center;
}

:focus {
  outline: 0;
}
</style>
