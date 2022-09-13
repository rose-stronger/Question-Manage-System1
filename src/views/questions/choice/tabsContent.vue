<template>
  <div>
    <!--  -->
    <el-table :data="data" style="width: 100%" max-height="600">
      <el-table-column prop="number" label="试题编号" width="150">
      </el-table-column>
      <el-table-column prop="subject" label="学科" width="120">
      </el-table-column>
      <el-table-column prop="catalog" label="目录" width="120">
      </el-table-column>
      <el-table-column
        prop="questionType"
        :formatter="formatterQuesType"
        label="题型"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="question" label="题干" width="300">
        <template #default="{ row }">
          <!-- {{}} -->
          <!-- {{ highlight(row.question) }} -->
          {{ row.question | filterHtml }}
        </template>
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="录入时间"
        :formatter="formatterDate"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="difficulty"
        :formatter="formatterDifficulty"
        label="难度"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="creator" label="录入人" width="120">
      </el-table-column>
      <el-table-column
        prop="chkState"
        label="审核状态"
        :formatter="formatterCheckState"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="chkRemarks" label="审核意见" width="120">
      </el-table-column>

      <el-table-column prop="chkUser" label="审核人" width="120">
      </el-table-column>
      <el-table-column
        prop="publishState"
        label="发布状态"
        :formatter="formatterPubState"
        width="120"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="{ row }">
          <!-- {{ row.publishState }} -->

          <el-button type="text" size="small" @click="preview(row.id)">
            预览
          </el-button>
          <el-button
            :class="{ disabled: row.chkState !== 0 }"
            :disabled="row.chkState !== 0"
            type="text"
            size="small"
            @click="checkSate(row.id)"
          >
            审核
          </el-button>
          <el-button
            type="text"
            size="small"
            :class="{ disabled: row.publishState === 1 }"
            :disabled="row.publishState === 1"
            @click="editJump(row.id)"
          >
            修改
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="isPublish(row.id, row.publishState)"
          >
            {{ row.publishState === 1 ? '上架' : '下架' }}
          </el-button>
          <el-button
            :class="{ disabled: row.publishState === 1 }"
            :disabled="row.publishState === 1"
            @click="deleteRow(row.id)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 预览 -->
    <previewDialogVue
      :visible.sync="previewDialogVisible"
      :getObj="getObj"
    ></previewDialogVue>
    <!-- 审核 -->
    <checkDialogVue
      :visible.sync="checkDialogVisible"
      :selId="selId"
    ></checkDialogVue>
  </div>
</template>

<script>
import previewDialogVue from '@/views/questions/choice/previewDialog.vue'
import checkDialogVue from '@/views/questions/choice/quesCheckStateDialog.vue'
import {
  deleteBankList,
  getSelectedQuestionList,
  getBasicRandomsDetail,
  postAddSelectedQuestion,
  patchSelectedQuestion,
  getQuesCheckState
} from '@/api/questionBank'
export default {
  components: {
    previewDialogVue,
    checkDialogVue
  },
  props: {
    data: {
      type: Array
    }
  },
  /**
   * 过滤器
   */
  filters: {
    filterHtml: function (item) {
      return item.replace(/<[^>]+>/g, '')
    }
    // 过滤器名字:函数(要过滤的原数据,参数){
    //       过滤器的功能
    //       return 过滤的结果
  },
  data() {
    return {
      previewDialogVisible: false,
      checkDialogVisible: false,
      selId: null,
      query: {
        page: 1,
        pagesize: 10
      },
      counts: 0,
      activeName: 'first',
      isNext: null,
      // previewDialogVisible: false,
      // checkDialogVisible: false,
      getObj: null,
      // selId: null,
      chkState: null,
      getCheckObj: null
    }
  },
  methods: {
    async getSelectedQuestionListAPI_first() {
      const { items, counts } = await getSelectedQuestionList(this.query)
      this.tableData = items
      this.counts = counts
    },
    async getSelectedQuestionListAPI() {
      const { items, counts } = await getSelectedQuestionList({
        page: 1,
        pagesize: 10
      })
      this.tableData = items
      this.counts = counts
    },
    formatterQuesType(row, column, cellValue, index) {
      // console.log(cellValue);
      if (cellValue === '1') {
        return '单选'
      } else if (cellValue === '2') {
        return '多选'
      } else {
        return '简答'
      }
    },
    formatterDifficulty(row, column, cellValue, index) {
      // console.log(cellValue);
      if (cellValue === '1') {
        return '简单'
      } else if (cellValue === '2') {
        return '一般'
      } else {
        return '困难'
      }
    },
    formatterCheckState(row, column, cellValue, index) {
      // console.log(cellValue)
      if (cellValue === '2') {
        return '拒绝'
      } else if (cellValue === '1') {
        return '通过'
      } else {
        return '待审核'
      }
    },
    formatterPubState(row, column, cellValue, index) {
      // console.log(cellValue);
      if (cellValue === '1') {
        return '待发布'
      } else {
        return '未发布'
      }
    },
    formatterDate(row, column, cellValue, index) {
      const date = new Date(cellValue)
      date.getFullYear()
      return ` ${date.getFullYear()}- ${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`
    },
    /**
     * 预览  有些bug
     */
    async preview(id) {
      console.log(id)
      // this.tableData
      this.previewDialogVisible = true
      const res = await getBasicRandomsDetail(id, this.isNext)
      console.log(res)
      this.getObj = res
    },
    /**
     * 审核
     */
    async checkSate(id) {
      this.selId = id
      this.checkDialogVisible = true

      // const res = await getQuesCheckState(id)

      /**
       * 数据是一个 [{}]  所以 要提取出来
       */
      // res.map((item) => {
      //   this.getCheckObj = item // 根据自己需求可以拼接
      // })
      // console.log(this.getCheckObj)
      // console.log(this.getCheckObj.checker)
      // console.log(this.getCheckObj.chkState)
    },
    editJump(id) {
      this.$router.push({
        path: '/questions/new',
        query: {
          id: id
        }
      })
    },
    deleteRow(id) {
      // rows.splice(index, 1)
      /**
       * 调删除接口
       */

      this.$confirm('此操作将永久删除该题目, 是否继续?').then(async () => {
        // await patchSelectedQuestion(id)
        await deleteBankList(id)
        this.$message.success('删除成功！')
        // this.getSelectedQuestionListAPI()
        this.$emit('onSuccess')
        //   setTimeout(() => {
        //     this.getSelectedQuestionListAPI_first()
        //   }, 1000)
      })
    },
    /**
     * 上下架
     */
    isPublish(id, state) {
      if (state === 0) {
        try {
          this.$confirm('确定要上架吗？').then(async () => {
            await postAddSelectedQuestion(id, 1)
            // this.getSelectedQuestionListAPI_first()
            this.$emit('onSuccess')
            this.$message.success('上架成功！！')
          })
        } catch (error) {
          // console.log(error)
          this.$message.error('上架失败')
        }
      } else {
        this.$confirm('确定要下架吗？').then(async () => {
          await postAddSelectedQuestion(id, 0)
          // this.getSelectedQuestionListAPI_first()
          this.$emit('onSuccess')
          this.$message.success('下架成功！！')
        })
      }

      // state = !state
    }
  },
  created() {
    // this.getSelectedQuestionListAPI_first()
    this.$emit('onSuccess')
  }
}
</script>

<style></style>
