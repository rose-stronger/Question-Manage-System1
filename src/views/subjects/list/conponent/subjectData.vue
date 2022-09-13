<template>
  <div>
    <div class="m-10">
      <el-alert :title="`共有${total}条数据`" type="info" show-icon> </el-alert>
    </div>
    <el-table :data="tableData" style="width: 100%" class="m-10">
      <el-table-column type="index" label="序号" width="60" align="center">
      </el-table-column>
      <el-table-column
        prop="subjectName"
        label="学科名称"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="创造者"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="创建日期"
        width="150"
        align="center"
        :formatter="formatterTimer"
      >
      </el-table-column>
      <el-table-column
        prop="isFrontDisplay"
        label="前台是否显示"
        width="150"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ row.isFrontDisplay === 1 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="twoLevelDirectory"
        label="二级目录"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tags" label="标签" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="totals"
        label="题目数量"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="text"
            @click="classification(row.id, row.subjectName)"
            >学科分类</el-button
          >
          <el-button type="text" @click="subjectLabel(row.id, row.subjectName)"
            >学科标签</el-button
          >
          <el-button type="text" @click="modify(row.id)">修改</el-button>
          <el-button type="text" @click="del(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagingVue
      :total="total"
      :query="query"
      @onSuccess="getlist"
      @onSizeChange="query.pagesize"
    ></pagingVue>
  </div>
</template>

<script>
import { subjectsList, deletesubjectsList } from '@/api/subject'
import pagingVue from '@/components/paging'
export default {
  name: 'subjectDataVue',
  // props: {
  //   dialogVisible: Boolean,
  // },
  components: {
    pagingVue
  },
  data() {
    return {
      tableData: [],
      total: 0,
      query: {
        page: 1,
        pagesize: 10,
        subjectName: ''
      }
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    /**
     * 获取列表
     */
    async getlist() {
      const res = await subjectsList(this.query)
      console.log(res)
      console.log('----')
      this.tableData = res.items
      this.total = res.counts
      console.log(this.tableData)
      this.$emit('famgfa', this.query)
    },
    /**
     * 删除
     */
    del(id) {
      this.$confirm('是否删除 ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deletesubjectsList(id)
          this.getlist()
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
      // this.$emit("modifyID", id);
      // this.dialogVisible = true;
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
    /**
     * 学科分类跳转
     */
    classification(id, subjectName) {
      this.$router.push({
        path: '/subjects/directorys',
        query: {
          id: id,
          name: subjectName
        }
      })
    },
    /**
     * 学科标签跳转
     */
    subjectLabel(id, subjectName) {
      this.$router.push({
        path: '/subjects/tags',
        query: {
          id: id,
          name: subjectName
        }
      })
    }
  }
}
</script>

<style></style>
