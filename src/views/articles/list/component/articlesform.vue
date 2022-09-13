<template>
  <div>
    <div class="m-10">
      <el-alert :title="`共有${total}条数据`" type="info" show-icon> </el-alert>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="title" label="文章标题" width="200" align="center">
      </el-table-column>
      <el-table-column prop="visits" label="阅读数" width="200" align="center">
      </el-table-column>
      <el-table-column
        prop="username"
        label="录入人"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="录入时间"
        width="150"
        align="center"
        :formatter="formatterTimer"
      >
      </el-table-column>
      <el-table-column prop="state" label="状态" width="200" align="center">
        <template #default="{ row }">
          <span>{{ row.state === 1 ? '已启用' : '已禁用' }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="操作" align="center">
        <template #default="{ row }">
          <el-button type="text" @click="preview(row.id)">预览</el-button>
          <el-button
            type="text"
            v-if="row.state === 1"
            @click="getState(row.id, row.state)"
            >禁用</el-button
          >
          <el-button type="text" v-else @click="getState(row.id, row.state)"
            >启用</el-button
          >
          <el-button
            type="text"
            :disabled="row.state === 1"
            @click="modify(row.id)"
            >修改</el-button
          >
          <el-button
            type="text"
            :disabled="row.state === 1"
            @click="del(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagingVue
      :total="total"
      :query="query"
      @onSuccess="getList"
      @onSizeChange="query.pagesize"
    ></pagingVue>
  </div>
</template>

<script>
import {
  getArticleList,
  deleteArticleList,
  stateArticleList
} from '@/api/interview'
import pagingVue from '@/components/paging'
export default {
  name: 'articlesFormVue',
  components: {
    pagingVue
  },
  data() {
    return {
      tableData: [],
      query: { page: 1, pagesize: 10 },
      total: 1
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    async getList() {
      const res = await getArticleList(this.query)
      console.log(res)
      this.tableData = res.items
      this.total = res.counts
      this.$emit('fangfa', this.query)
      console.log(this.$router)
    },
    /**
     * 修改
     */
    modify(id) {
      this.$emit('modify', id)
    },
    /**
     * 预览
     */
    preview(id) {
      this.$emit('preview', id)
    },
    /**
     * 状态
     */
    async getState(id, state) {
      await stateArticleList(id, state === 1 ? 0 : 1)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.getList()
    },

    /**
     * 格式化时间
     */
    formatterTimer(row, column, cellValue, index) {
      // console.log('-------------')

      // console.log(cellValue)
      const date = new Date(cellValue)
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)} ${date
        .getHours()
        .toString()
        .padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date
        .getSeconds()
        .toString()
        .padStart(2, 0)}`
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteArticleList(id)
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style></style>
