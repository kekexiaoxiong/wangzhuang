<template>
  <div class="app-container">
    <div class="meun-box">
      <div class="lf-sideBar">
        <el-tree
          :data="dataMenu"
          node-key="label"
          :default-expanded-keys="['菜单管理']"
          :default-checked-keys="['菜单管理']"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <el-button type="warning" size="mini" @click="addMenu()" v-if="add">添加</el-button>
            <el-button type="danger" size="mini" @click="delMenu()" v-if="del">删除</el-button>
            <!-- <el-button type="warning" size="mini" @click="findApiMenuUser()" v-if="configure">api配置</el-button> -->
          </span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            v-on:click="changeEdit()"
            v-if="edit"
          >点击编辑</el-button>
        </div>
        <div class="text item">
          <div class="rf-form">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="菜单名称：">
                <el-input
                  v-model="itemMenuDetail.menuName"
                  :disabled="forbid"
                  @input="change($event)"
                />
              </el-form-item>
              <el-form-item label="菜单编号：" v-if="meunIdHide">
                <el-input
                  v-model="itemMenuDetail.menuNo"
                  :disabled="forbid"
                  @input="change($event)"
                />
              </el-form-item>
              <el-form-item label="前端路由：">
                <el-input
                  v-model="itemMenuDetail.menuRouter"
                  :disabled="forbid"
                  @input="change($event)"
                />
              </el-form-item>
              <el-form-item label="菜单ID：" v-if="meunIdHide">
                <el-input v-model="itemMenuDetail.id" :disabled="forbid"  @input="change($event)" />
              </el-form-item>
              <el-form-item label="备注：">
                <el-input
                  v-model="itemMenuDetail.remark"
                  :disabled="forbid"
                  @input="change($event)"
                />
              </el-form-item>
              <el-form-item label="菜单排序：">
                <el-input
                  v-model="itemMenuDetail.menuOrder"
                  :disabled="forbid"
                  @input="change($event)"
                />
              </el-form-item>
              <el-form-item label="icon：">
                <el-input v-model="itemMenuDetail.icon" :disabled="forbid" @input="change($event)" />
              </el-form-item>
              <el-form-item label="父菜单ID：">
                <el-input
                  v-model="itemMenuDetail.parentId"
                  :disabled="forbid"
                  @input="change($event)"
                />
              </el-form-item>

              <el-form-item label="菜单状态：">
                <el-select v-model="itemMenuDetail.state" placeholder="选择菜单状态">
                  <el-option label="正常" :value="1" />
                  <el-option label="禁用" :value="2" />
                  <el-option label="锁定" :value="3" />
                  <el-option label="注销" :value="4" />
                </el-select>
              </el-form-item>

              <!-- <el-form-item label="菜单状态">
                <el-input
                  v-model="itemMenuDetail.state"
                  :disabled="forbid"
                  @input="change($event)"
                />
              </el-form-item>-->

              <el-button
                type="warning"
                size="mini"
                align="center"
                @click="submitMenu()"
                v-show="submitButton"
              >保存</el-button>
              <el-button
                type="warning"
                size="mini"
                align="center"
                @click="saveMenu()"
                v-show="saveButton"
              >保存</el-button>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 抽屉 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <el-tabs v-model="activeName">
        <el-tab-pane label="api配置" name="second">
          api配置
          <el-tree
            :data="sideApiMenu"
            show-checkbox
            node-key="apiNo"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="treeChecked"
            :props="defaultProps"
          ></el-tree>
          <el-button type="warning" size="mini" @click="saveApiNo()">保存</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
import {
  findAllMenu,
  updateMenu,
  addNewMenu,
  deleteMenu,
  apiMenu,
  findApiMenu,
  findAllApi
} from "@/api/menu";

export default {
  name: "菜单管理",
  data() {
    return {
      meunIdHide:false,
      //按钮隐藏
      del: true,
      add: true,
      configure: true,
      edit: true,

      sideApiMenu: [],
      activeName: "second", //tabs标签栏
      menuApiTree: [], //菜单api树型结构

      forbid: true,
      saveButton: false,
      submitButton: false,
      menuDetail: [],
      itemMenuDetail: {
        menuName: "",
        menuNo: "",
        menuRouter: "",
        id: "",
        remark: "",
        menuOrder: "",
        icon: "",
        parentId: "",
        state: ""
      },
      form: {
        type: []
        //    menuName,
        //    menuNo,
        //    menuRouter,
        //    id,
        //    remark,
        //    menuOrder
      },
      drawer: false, //element抽屉

      dataMenu: [
        {
          label: "菜单详情",
          children: [
            //    {
            //     label: '二级 1-1',
            //     children: [{
            //       label: '三级 1-1-1'
            //     }]
            //   },
            //   {
            //     label: '二级 1-1',
            //     children: [{
            //       label: '三级 1-1-1'
            //     }]
            //   }
          ]
        }
      ],

      apiMenuTree: [
        {
          label: "菜单api",
          children: [
            //    {
            //     label: '二级 1-1',
            //     children: [{
            //       label: '三级 1-1-1'
            //     }]
            //   },
            //   {
            //     label: '二级 1-1',
            //     children: [{
            //       label: '三级 1-1-1'
            //     }]
            //   }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      menuId: "", //菜单api  查询存储的menuId
      parentId: "" //点击添加默认父id
    };
  },
  watch: {},
  mounted() {
    this.allMenu();
  },
  methods: {
    change(e) {
      this.$forceUpdate();
    },

    changeEdit() {
      (this.add = false),
        (this.del = false),
        (this.configure = false),
        (this.forbid = !this.forbid);
      this.saveButton = true;
      this.submitButton = false;
      this.meunIdHide = false;

    },

    //菜单详情点击选中某一个菜单
    handleNodeClick(data) {
      (this.add = true), (this.del = true), (this.saveButton = false);
      (this.configure = true), (this.edit = true), (this.forbid = true);
      if (data.label == "菜单详情") {
        this.itemMenuDetail = [];
        return;
      } else {
        this.itemMenuDetail = [];
        this.meunIdHide = true;
        for (let item of this.menuDetail) {
          if (item.id === data.id) {
            this.itemMenuDetail.menuName = item.menuName;
            this.itemMenuDetail.menuNo = item.menuNo;
            this.itemMenuDetail.menuRouter = item.menuRouter;
            this.itemMenuDetail.id = item.id;
            this.itemMenuDetail.remark = item.remark;
            this.itemMenuDetail.menuOrder = item.menuOrder;
            this.itemMenuDetail.icon = item.icon;
            this.itemMenuDetail.parentId = item.parentId;
            this.parentId = item.parentId; //点击添加 默认父id
            this.itemMenuDetail.state = item.state;
            this.menuId = item.id;
          }
        }
      }
    },
    // 查询所有菜单
    allMenu() {
      findAllMenu().then(response => {
        this.dataMenu[0].children = [];

        let menuData = response.data;
        console.log(menuData);
        for (let item of menuData) {
          this.menuDetail.push(item);
          if (item.children) {
            for (let i of item.children) {
              this.menuDetail.push(i);
            }
          }
        }

        //菜单管理默认初始值

        this.menuId = this.menuDetail[0].id;
        this.itemMenuDetail.menuName = this.menuDetail[0].menuName;
        this.itemMenuDetail.menuNo = this.menuDetail[0].menuNo;
        this.itemMenuDetail.menuRouter = this.menuDetail[0].menuRouter;
        this.itemMenuDetail.id = this.menuDetail[0].id;
        this.itemMenuDetail.remark = this.menuDetail[0].remark;
        this.itemMenuDetail.menuOrder = this.menuDetail[0].menuOrder;
        this.itemMenuDetail.icon = this.menuDetail[0].icon;
        this.itemMenuDetail.parentId = this.menuDetail[0].parentId;

        this.itemMenuDetail.state = this.menuDetail[0].state;

        //this.form = JSON.parse(JSON.stringify(menuData));

        let menuDataTree = []; //侧边树型菜单

        //遍历输出树型菜单
        for (let item in menuData) {
          if (menuData[item].menuName) {
            menuDataTree.push({
              id: menuData[item].id,
              label: menuData[item].menuName,
              children: []
            });
          }

          if (menuData[item].children) {
            for (let i of menuData[item].children) {
              menuDataTree[item].children.push({
                id: i.id,
                label: i.menuName
              });
            }
          }
        }

        for (let item of menuDataTree) {
          this.dataMenu[0].children.push(item);
        }

        console.log(this.dataMenu[0]);
      });
    },

    //保存所有菜单
    saveMenu() {
      let data = {
        icon: this.itemMenuDetail.icon,
        id: this.itemMenuDetail.id,
        menuName: this.itemMenuDetail.menuName,
        menuOrder: this.itemMenuDetail.menuOrder,
        menuRouter: this.itemMenuDetail.menuRouter,
        parentId: this.itemMenuDetail.parentId,
        remark: this.itemMenuDetail.remark,
        state: this.itemMenuDetail.state
      };
      updateMenu(data).then(response => {
        if (response.code == 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.allMenu();
        }
      });
    },

    //添加菜单
    addMenu() {
      
      (this.del = false),
        (this.configure = false),
        (this.edit = false),
        (this.forbid = false);
      this.itemMenuDetail = {
        menuName: "",
        menuNo: "",
        menuRouter: "",
        id: "",
        remark: "",
        menuOrder: "",
        icon: "",
        parentId: "",
        state: ""
      };
      this.itemMenuDetail.parentId = this.parentId;
      this.submitButton = true;
      this.saveButton = false;
      this.meunIdHide = false;
    },
    //提交保存菜单
    submitMenu() {
      // if(this.itemMenuDetail[6]&& this.itemMenuDetail[0]&&this.itemMenuDetail[5])
      let data = {
        icon: this.itemMenuDetail.icon,
        menuName: this.itemMenuDetail.menuName,
        menuOrder: parseInt(this.itemMenuDetail.menuOrder),
        menuRouter: this.itemMenuDetail.menuRouter,
        parentId: this.itemMenuDetail.parentId,
        remark: this.itemMenuDetail.remark,
        state: this.itemMenuDetail.state
      };
      console.log(this.form.type);
      addNewMenu(data).then(response => {
        if (response.code == 200) {
           this.$message({
            type: "success",
            message: "保存成功"
          });
        }
      });
    },

    //删除菜单
    delMenu() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMenu(this.itemMenuDetail.id).then(response => {
            if (response.code) {
              this.allMenu();
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

    //所有api
    findApiMenuUser() {
      (this.del = false),
        (this.add = false),
        (this.edit = false),
        (this.drawer = true);

      // let data = {
      //     apiNos:[

      //     ],
      //     menuId:
      // };
      findAllApi().then(response => {
        if (response.code == 200) {
          let apiMenu = response.data;

          //遍历输出api配置
          //   for (let item in apiMenu) {
          //     if (apiMenu[item].apiName) {
          //       this.menuApiTree.push({
          //         label: apiMenu[item].apiName,
          //         children: []
          //       });
          //     }
          //   }

          //   for (let item of this.menuApiTree) {
          //     this.apiMenuTree[0].children.push(item);
          //   }
          console.log(apiMenu);
        }
      });
    }
  }
};
</script>
<style >
/* .meun-box {
  min-width: 700px;
  overflow-x: scroll;
} */
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.box-card{
  overflow-y:hidden;
}
.lf-sideBar {
  height: calc(100vh - 50px);
  width: calc(100% - 80%);
  min-width: 120px;
  border: 1px solid #cccccc;
  float: left;
  overflow-y:hidden;

  
}
.box-card:hover{
  overflow-y: scroll;
}

.lf-sideBar:hover {
    overflow-y: scroll;
}
::-webkit-scrollbar {
width: 6px;

}
::-webkit-scrollbar-track {
background-color: #fff;
border-left: 1px solid #fff;

}
::-webkit-scrollbar-thumb {
background-color: #ccc;
border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
background-color: #aaa;
}
::-webkit-scrollbar-thumb:active{
background-color:#333;
}
.box-card {
  height: calc(100vh - 50px);
}
/* .rf-form {
  height: calc(100vh - 50px);
  width: calc(100% - 30%);
  min-width: 460px;
  float: left;
  margin-left: 50px;
} */
</style>
