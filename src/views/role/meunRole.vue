<template>
  <div class="app-container">
    <p>用户页</p>


    <el-button type="warning" size="mini" @click="addMeunNo()">添加</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
addDepartRole,
findDepartRole,
delDepartRole
} from "@/api/departRole";
export default {

  data() {
    return {
     
   
    }
  },
  watch: {
   
  },

  methods: {
   
  }
}
</script>

