<template>
  <div class="paging" v-if="total != 0">
    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :page-sizes="[15, 20, 30, 40]"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // total: '',
        page: 1,
      }
    },
    props: {
      pageSize: {
        type: Number,
        default: 15,
      },
      total: {
        type: Number,
        default: '',
      },
      pageNum: {
        type: Number,
        default: 1,
      }
    },
    methods: {
      //每页展示条数
      handleSizeChange(val) {
        this.$emit('handleSizeChangeSub', val);
      },
      //当前页
      handleCurrentChange(val) {
        this.$emit('handleCurrentChangeSub', val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .paging {
    margin-top: 50px;
  }
</style>


