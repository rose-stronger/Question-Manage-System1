<template>
  <div>
    <div class="m-10">
      <el-alert :title="`共有${total}条数据`" type="info" show-icon> </el-alert>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="subjectName"
        label="所属学科"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="标签名称"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="创建者"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="创建日期"
        width="200"
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
          <el-button
            type="text"
            @click="enable(row.id, row.state)"
            v-if="row.state === 1"
            >禁用</el-button
          >
          <el-button type="text" @click="enable(row.id, row.state)" v-else
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
import { getTagsList, stateList, deleteTagsList } from '@/api/tags'
import pagingVue from '@/components/paging'
export default {
  name: 'tagsDialogVue',
  components: { pagingVue },
  data() {
    return {
      tableData: [],
      query: {
        page: 1,
        pagesize: 10
        // state: null,
        // tagName: 1,
        // subjectID: null
      },
      total: 1
      // shuju=''
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    /**
     * 列表
     */
    async getList() {
      const res = await getTagsList(this.query)
      // console.log(res + 1)
      this.total = res.counts
      this.tableData = res.items
      this.$emit('tableData', this.query)
      this.$emit('shuju', this.tableData)
    },
    /**
     * 跳转
     */
    async getData() {
      const res = await getTagsList({
        ...this.query,
        subjectID: this.$route.query.id
      })
      this.total = res.counts
      this.tableData = res.items
    },
    async sousu() {
      if (this.$route.query.id) {
        await this.getData()
      } else {
        await this.getList()
      }
    },

    /**
     * 状态
     */
    async enable(id, state) {
      await stateList(id, state === 1 ? 0 : 1)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      if (this.$route.query.id) {
        this.getData()
      } else {
        this.getList()
      }
    },
    /**
     * 修改
     */
    modify(id) {
      this.$emit('modify', id)
    },
    /**
     * 删除
     */
    async del(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteTagsList(id)
          if (this.$route.query.id) {
            this.getData()
          } else {
            this.getList()
          }

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
    }
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.query.id) {
          this.getData()
        } else {
          this.getList()
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style></style>
