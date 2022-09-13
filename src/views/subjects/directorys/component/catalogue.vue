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
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="directoryName"
        label="目录名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="创建者"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="创建日期"
        width="160"
        align="center"
        :formatter="formatterTimer"
      >
      </el-table-column>
      <el-table-column
        prop="totals"
        label="面试题数量"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="150"
        align="center"
        :v-model="state"
      >
        <template #default="{ row }">
          <span>{{ row.state === 1 ? '已启用' : '已禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template #default="{ row }">
          <div>
            <el-button
              v-if="row.state === 1"
              type="text"
              @click="Enable(row.id, row.state)"
              >禁用</el-button
            >
            <el-button v-else type="text" @click="Enable(row.id, row.state)"
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
              @click="del(row.id)"
              :disabled="row.state === 1"
              >删除</el-button
            >
          </div>
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
  directoryList,
  catalogueList,
  detelecatalogueList
} from '@/api/catalogue'

import pagingVue from '@/components/paging'
export default {
  name: 'catalogueVue',
  components: {
    pagingVue
  },
  data() {
    return {
      tableData: [],
      query: {
        page: 1,
        pagesize: 10,
        subjectID: null,
        directoryName: '',
        stateL: null
      },

      total: null,
      state: 0,
      res: {}
    }
  },
  created() {
    // this.getList()
    // this.getdate()
    // this.getsimpleList()
    // this.Enable();
  },
  methods: {
    /**
     * 获取列表数据
     */
    async getList() {
      const res = await directoryList(this.query)
      // console.log(res)
      this.tableData = res.items
      this.total = res.counts

      this.$emit('tableData', this.query)

      // console.log(this.query.subjectID)
      // console.log(this.$route.query.id)
      // console.log('-----')
      // this.query.state = res.item.state;
      // console.log(this.query.state);
      // console.log(this.state);
    },
    /**
     * 获取数据
     */
    async getdate() {
      const res = await directoryList({
        ...this.query,
        subjectID: this.$route.query.id
      })
      this.tableData = res.items
      this.total = res.counts
      this.$emit('tableData', this.query)
      console.log(this.tableData)
      // console.log(res)
      console.log('213')
    },
    /**
     * 状态
     */
    async Enable(id, state) {
      await catalogueList(id, state === 1 ? 0 : 1)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      if (this.$route.query.id) {
        this.getdate()
      } else {
        this.getList()
      }
    },
    /**
     * 删除
     */
    del(id) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await detelecatalogueList(id)
          if (this.$route.query.id) {
            this.getdate()
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
     * 修改
     */
    modify(id) {
      this.$emit('modify', id)
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
          this.getdate()
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
