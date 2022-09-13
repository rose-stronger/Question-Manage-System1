<template>
  <div>
    <el-dialog
      title="预览文章"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="65%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <h2>{{ tableData.title }}</h2>
      <div>
        <span ref="createTime">{{ timer }}</span>
        <span class="guan">超级管理员</span>
        <i class="el-icon-thumb"></i>
        <span>{{ tableData.visits }}</span>
      </div>
      <template>
        <div v-html="tableData.articleBody"></div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { detailsArticleList } from '@/api/interview'
export default {
  name: 'previewformVue',
  props: {
    visible: Boolean,
    previewId: Number
  },
  data() {
    return {
      tableData: {},
      loading: false,
      timer: ''
    }
  },
  created() {
    // this.getlist()
  },
  methods: {
    async getlist() {
      console.log(this.previewId)
      const res = await detailsArticleList(this.previewId)
      this.tableData = res
      this.$emit('previewform')
      this.timer = this.tableData.createTime
      console.log(this.timer)
      this.formatterTimer()
    },
    /**
     * 格式化时间
     */
    formatterTimer() {
      // console.log('-------------')

      const date = new Date(this.timer)
      this.timer = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)} ${date
        .getHours()
        .toString()
        .padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date
        .getSeconds()
        .toString()
        .padStart(2, 0)}`
    }
  },
  watch: {
    visible(val) {
      if (val && this.previewId) {
        this.getlist()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.guan {
  margin: 0 20px;
}
i {
  margin: 10px;
}
// img {
//   width: 100px !important;
// }
</style>
