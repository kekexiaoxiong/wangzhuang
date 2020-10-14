<template>
  <div class="app-container">
    <div class="lf-sideBar">
      <el-tree :data="dataMenu" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
     <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findAllMenu } from "@/api/menu";
export default {
  data() {
    return {
         form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      drawer: true, //element抽屉
      dataMenu: [
        {
          label: "菜单管理",
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
      }
    };
  },
  watch: {},
  mounted() {
    this.allMenu();
  },
  methods: {
      handleNodeClick(data) {
       
      },
    allMenu() {
      findAllMenu().then(response => {
        this.dataMenu[0].children = [];

        
        let menuData = response.data;

        console.log(menuData)
        let menuDataTree = []; //侧边树型菜单
        
        //遍历输出树型菜单
        for (let item in menuData) {
            if (menuData[item].menuName) {
              menuDataTree.push({
                label: menuData[item].menuName,
                children: []
              });
            }
            
            if(menuData[item].children){
                for(let i of menuData[item].children){
                   menuDataTree[item].children.push({
                   label: i.menuName
                 });
                }
            }
            }
           
            for(let item of menuDataTree){
                this.dataMenu[0].children.push(item);
            }
      });
    }
  }
};
</script>
<style >
.lf-sideBar {
  height: calc(100vh - 50px);
  width: 140px;
  border: 1px solid #cccccc;
  float: left;
}
</style>
