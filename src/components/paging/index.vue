<template>
  <div class="block">
    <el-pagination
      @current-change="onCurrentPageChange"
      @size-change="onSizeChange"
      :current-page="query.page"
      :page-sizes="[1, 5, 10, 20, 30, 40, 50, 100]"
      :page-size="query.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagingVue',
  props: {
    total: Number,
    query: Object
  },
  data() {
    return {
      // currentPage4: null,
    }
  },
  methods: {
    onCurrentPageChange(val) {
      console.log(val)
      this.query.page = val
      this.$emit('onSuccess')
    },
    onSizeChange(currentSize) {
      // console.log(currentSize);
      this.$emit('onSizeChange')

      this.query.pagesize = currentSize
      console.log(this.query.pagesize)
      // this.getData();
      this.$emit('onSuccess')
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  text-align: right;
}
</style>
