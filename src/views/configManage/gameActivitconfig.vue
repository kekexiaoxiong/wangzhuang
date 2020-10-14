<template>
  <div class="app-container">
    <Tabs size="small"  @on-click="handleChange" v-model="activeKey">
      <Tab-pane label="限时活动"  name="0" >
        <el-table
          v-loading="listLoading"
          :data="limitActiveData"
          border
          style="width: 100%;"
          class="mtop"
        >
          <el-table-column align="center" label="活动ID" prop="unionId"></el-table-column>
          <el-table-column align="center" label="开始时间" prop="startTime"></el-table-column>
          <el-table-column align="center" label="结束时间" prop="endTime"></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">{{scope.row.openFlag|timeLimitStateFormat}}</template>
          </el-table-column>
          <el-table-column align="center" label="状态修改">
            <template slot-scope="scope">
              <el-button @click="edit1(scope.row)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </Tab-pane>
      <Tab-pane label="限时免费岛屿" name="1">
        <el-button type="primary" size="mini" @click="addFreeCheckpoint">新增</el-button>
        <el-table
          v-loading="listLoading"
          :data="freeCheckData"
          border
          style="width: 100%;"
          class="mtop"
        >
          <el-table-column align="center" label="关卡号" prop="checkPoint"></el-table-column>
          <el-table-column align='center' label="关卡类型" >
            <template slot-scope="scope">{{scope.row.type|freeCheckpointFormat}}</template>
          </el-table-column>
          <el-table-column align="center" label="排序号" prop="sort"></el-table-column>
          <el-table-column align="center" label="开始时间" prop="startTime"></el-table-column>
          <el-table-column align="center" label="结束时间" prop="endTime"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="edit2(scope.row)" size="mini" type="primary">编辑</el-button>
              <el-button @click="deleteBtn(scope.row)" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </Tab-pane>
    </Tabs>

    <!-- 弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-form :model="addform" class="addForm" label-width="120px" ref="form">
        <el-form-item label="活动ID：">{{addform.unionId}}</el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间"
            type="datetime"
            v-model="addform.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间"
            type="datetime"
            v-model="addform.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态：">
          <!-- <Radio-group :model.sync="addform.openFlag">
            <Radio value="true">开启</Radio>
            <Radio value="false">关闭</Radio>
          </Radio-group>-->
          <el-radio-group v-model="addform.openFlag">
            <el-radio label="true">开启</el-radio>
            <el-radio label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button type="primary" size="mini" @click="confirmAddition()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹框2 -->
    <el-dialog
      :title="title2"
      :visible.sync="dialogFormVisible2"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form class="addForm" label-width="120px" ref="form">
        <el-form-item label="关卡编号:">
          <el-select
            style="width:150px;float:left;"
            v-model="aditform.checkPoint"
            placeholder="请选择关卡编号"
          >
<!--            <el-option label="全部" :value="''"/>-->
            <el-option
              v-for="(item,index) in checkpointSelect"
              :label="item.key"
              :key="index"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关卡类型：">
          <el-radio v-model="aditform.type" :label="0">正常</el-radio>
          <el-radio v-model="aditform.type" :label="1">热门</el-radio>
          <el-radio v-model="aditform.type" :label="2">新增</el-radio>

        </el-form-item>
        <el-form-item label="排序：">
          <el-input-number size="medium" :min="0" v-model="aditform.sort"></el-input-number>
        </el-form-item>

        <el-form-item label="开始时间：">
          <el-date-picker
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间"
            type="datetime"
            v-model="aditform.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间"
            type="datetime"
            v-model="aditform.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel()">取 消</el-button>
        <el-button type="primary" size="mini" @click="freeCheckpointConfirm()">确 定</el-button>
      </div>
    </el-dialog>
    <div style="text-align: center ; margin-top:30px;">
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          :current-page="pageIndex"
          :page-size="pageSize"
          :page-sizes="[15, 20, 30, 40]"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    findTimeLimit,
    findFreeCheckpoint,
    updateTimeLimit,
    updateFreeCheckpoint,
    addFreeCheckpoint
  } from '@/api/AdConfiguration'
  import FindSearch from '@/common/FindSearch'

  export default {
    name: '游戏活动配置',
    components: {
      FindSearch
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        limitActiveData: [], //限时活动
        freeCheckData: [], //限时免费岛屿
        dialogFormVisible: false,
        dialogFormVisible2: false,
        addform: {
          openFlag: ''
        },
        aditform: {},
        list: null,
        listLoading: true,
        pageIndex: 1,
        pageSize: 15,
        deviceType: 0,
        platformType: '',
        total: 0,
        country: '',
        checkpointSelect: [],
        title2: "新增",
        activeKey : "0",
      }
    },
    mounted() {
      this.handleChange()
    },
    methods: {
      findFormData() {
        this.handleChange()
      },
      handleChange(){
        this.total = 0
        this.pageIndex = 1
        if (this.activeKey == 0){
          this.getFindTimeLimitData()
        }else {
          this.getFindFreeCheckpointData()
        }
      },
      getFindTimeLimitData(){
        //限时活动
        findTimeLimit().then(response => {
          this.limitActiveData = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      getFindFreeCheckpointData(){
        //限时免费岛屿
        findFreeCheckpoint().then(response => {
          this.freeCheckData = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      //获取数据
      //findPlayerRatain(pageIndex, pageSize, gameType, country, channelId, beginTime, endTime)
      // fetchData(data) {
      //
      //
      //
      // },

      //取消编辑
      cancel() {
        this.dialogFormVisible = false
        this.dialogFormVisible2 = false
      },

      confirmAddition() {
        let data = {
          endTime: JSON.parse(this.addform.endTime),
          openFlag: JSON.parse(this.addform.openFlag),
          startTime: JSON.parse(this.addform.startTime),
          unionId: this.addform.unionId
        }
        updateTimeLimit(data).then(res => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      },
      //限时活动编辑
      edit1(d) {
        this.addform.unionId = d.unionId
        this.addform.startTime = d.startTime
        this.addform.endTime = d.endTime
        this.addform.openFlag = d.openFlag.toString()

        this.dialogFormVisible = true
      },

      //编辑免费岛屿
      edit2(c) {
        this.aditform = JSON.parse(JSON.stringify(c))
        //选择关卡
        this.$common.findCheckpoint().then(res => {
          if (res.data) {
            for (let item of res.data) {
              this.checkpointSelect.push(item)
            }
          }
        })
        this.title2 = "编辑"
        this.dialogFormVisible2 = true
      },
      addFreePoint(){
        let data = {
          checkPoint: this.aditform.checkPoint,
          sort: this.aditform.sort,
          type: this.aditform.type,
          startTime: this.aditform.startTime,
          endTime: this.aditform.endTime
        }

        addFreeCheckpoint(data).then(res => {
          this.dialogFormVisible2 = false
          this.getFindFreeCheckpointData();
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        })
      },
      //修改免费岛屿
      editFreePoint() {
        let data = {
          checkPoint: this.aditform.checkPoint,
          id: this.aditform.id,
          sort: this.aditform.sort,
          type: this.aditform.type,
          startTime: this.aditform.startTime,
          endTime: this.aditform.endTime
        }

        updateFreeCheckpoint(data).then(res => {
          this.dialogFormVisible2 = false
          this.getFindFreeCheckpointData();
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      },

      //删除限时活动免费岛屿
      deleteBtn(d) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteFreeCheckpoint(d.checkPoint).then(res => {
              this.findFormData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      //点击新增限时免费岛屿
      addFreeCheckpoint(){
        this.aditform = {type:0}
        this.checkpointSelect = [];
        //选择关卡
        this.$common.findCheckpoint().then(res => {
          if (res.data) {
            for (let item of res.data) {
              this.checkpointSelect.push(item)
            }
          }
        })
        this.title2 = "新增";
        this.dialogFormVisible2 = true
      },
      //限时免费岛屿点击确认
      freeCheckpointConfirm(){
        if (this.aditform.id !== null && this.aditform.id !== undefined){
          //编辑
          this.editFreePoint()
        }else {
          this.addFreePoint()
        }
      },
      // 整体数据分页组件
      currentChange(currentPage) {
        this.pageIndex = currentPage
        this.findFormData()
        //每页下拉显示数据
      },
      sizeChange(size) {
        this.pageSize = size
        this.findFormData()
        //点击第几页
      }
    }
  }
</script>
