<template>
  <div class="app-container">
   <div>45</div>
   <div>cesggggg</div>
    <div>
      hello
    </div>
    
   
  </div>
</template>

<script>
import { findDepartUser, addDepartUser, delDepartUser } from "@/api/departUser";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
            addDepartUserVisible: false , //添加用户弹窗
            departUserData: [],  // 部门用户数据



    };
  },


  methods: {
    


    // //分页查询所有用户
    // findAllDepartUser() {
    //   findDepartUser().then(res => {
    //     if (res.data) {
    
    //     }
    //   });
    // },

    // //打开添加用户弹窗
    // addOpenDialog(){
    //     this.addDepartUserVisible = true;


    // },

    // //添加部门用户
    // addDepartmentUser() {
    //   addDepartUser().then(res => {
    //     if (res.data) {
   
    //       this.addDepartUserVisible = false;
    //     }
    //   });
    // },

    // //删除部门用户
    // delDepartmentUser() {
    //   delDepartUser().then(res => {
    //     if (res.data) {
  
    //     }
    //   });
    // }



  }
};
</script>
