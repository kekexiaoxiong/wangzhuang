<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="user-container">
        <div>欢迎你：{{name}}</div>
      </div>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="updatePassWord">
            <span style="display:block;">update passWord</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 查询用户角色弹窗 -->
    <el-dialog title="更改密码" width="30%" :visible.sync="passWordVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="100px" style="overflow: auto;">
        <el-form-item label="旧密码:" prop="sortNo"  style="float:left;">
          <el-input size="mini" placeholder="请输入旧密码" show-password style="width:150px;" v-model="form.oldPassWord"></el-input>
        </el-form-item><br>
        <el-form-item label="新密码:" prop="sortNo"  style="float:left;">
          <el-input size="mini"  placeholder="请输入新密码" show-password style="width:150px;" v-model="form.passWord"></el-input>
        </el-form-item><br>
         <el-form-item label="用户编号:" prop="sortNo"  style="float:left;">
          <el-input size="mini"  placeholder="" show-password style="width:150px;" v-model="form.userNo"></el-input>
        </el-form-item><br>
      
      </el-form>
       <el-button size="mini" @click="cancel()">取 消</el-button>
       <el-button type="primary" size="mini" @click="newPassWord()">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { updateUserPassword } from "@/api/user";

import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      userRoleData: [],
      passWordVisible: false,
      form:{

      },
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"])
  },
  methods: {
    updatePassWord() {
      this.passWordVisible = true;
    },
    cancel(){
       this.passWordVisible = false;
    },
    newPassWord() {


      updateUserPassword({"oldPassword":this.form.oldPassWord,"password":this.form.passWord,"userNo":this.form.userNo}).then(res => {

            this.$message({
              type: "success",
              message: "修改密码成功"
            });
      })
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;

    height: 100%;
    line-height: 50px;
    position: relative;

    &:focus {
      outline: none;
    }
    .user-container {
      position: absolute;
      right: 100px;
      top: 50%;
      margin-top: -25px;
      width: 150px;
      font-size: 18px;
      color: #5a5e66;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      float: right;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          top: -25px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
