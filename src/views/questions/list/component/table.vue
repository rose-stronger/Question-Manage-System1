<template>
  <div>
    <!-- <pageToolsVue :left="`共1条数据`"></pageToolsVue> -->
    <el-alert class="left" :title="`共${total}条数据`" type="info" show-icon>
    </el-alert>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="number" label="试题编号" width="150">
      </el-table-column>
      <el-table-column prop="subject" label="学科" width="100">
      </el-table-column>
      <el-table-column prop="catalog" label="目录" width="100">
      </el-table-column>
      <el-table-column
        prop="questionType"
        label="题型"
        width="100"
        :formatter="formQuestionType"
      >
      </el-table-column>
      <el-table-column prop="question" label="题干" width="200">
        <template #default="{ row }">
          <span v-html="row.question"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="录入时间"
        width="200"
        :formatter="formatterTimer"
      >
      </el-table-column>
      <el-table-column
        prop="difficulty"
        label="难度"
        width="100"
        :formatter="formDifficulty"
      >
      </el-table-column>
      <el-table-column prop="creator" label="录入人" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <!-- {{ row.id }} -->
          <!-- {{ row.id }} -->
          <!-- 预览 按钮 -->
          <el-button
            type="primary"
            icon="el-icon-video-camera-solid"
            circle
            @click="checkQuestion(row.id)"
          ></el-button>
          <!-- 修改 按钮 -->
          <el-button
            type="success"
            icon="el-icon-edit"
            circle
            @click="jumpPage(row.id)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(row.id)"
          ></el-button>
          <!-- 加入精选题库按钮 -->
          <el-button
            type="warning"
            icon="el-icon-check"
            circle
            @click="addSelectedQues(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagingVue
      :total="total"
      :query="query"
      @onSuccess="gitBankList"
      @onSizeChange="query.pagesize"
    ></pagingVue>
    <!-- 点击 预览 弹出 题目 -->
    <checkTitleDialog
      @onSuccess="gitBankList()"
      :visible.sync="checkTitleDialogVisible"
      :tableDataList="tableData"
      :isAdd="isAdd"
      :selId="selId"
      :getObj="getObj"
    />
  </div>
</template>

<script>
import {
  questionBankList,
  deleteBankList,
  getBasicRandomsDetail,
  postAddSelectedQuestion,
  patchTrueSelectedQuestion,
  getSelectedQuestionList
} from '@/api/questionBank'
import pagingVue from '@/components/paging'
import checkTitleDialog from '@/views/questions/list/component/checkTitleDialog.vue'

export default {
  name: 'tableVue',
  components: {
    pagingVue,
    checkTitleDialog
  },
  data() {
    return {
      tableData: [],
      total: 0,
      query: {
        pagesize: 10,
        page: 1
      },
      isNext: null,
      checkTitleDialogVisible: false,
      isAdd: true,
      selId: null,
      getObj: {},
      publishState: 0,
      selQuesArr: []
    }
  },
  created() {
    this.gitBankList()
    // this.getSelectedQuestionListAPI()
    // this.del()
  },
  methods: {
    /**
     * 获取列表数据
     */
    async gitBankList() {
      const res = await questionBankList({ ...this.query })
      // console.log(res);
      this.tableData = res.items
      this.total = res.counts
    },

    /**
     * 删除数据
     */
    del(id) {
      // console.log(id);
      this.$confirm('确定要删除吗？？').then(async () => {
        await deleteBankList(id, this.isNext).then(() => {
          this.$message.success('删除信息成功！！！')
          this.gitBankList()
        })
      })
    },
    /*
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
     * 题型
     */
    formQuestionType(row, column, cellValue, index) {
      // console.log(cellValue);
      if (cellValue === '1') {
        return '单选'
      } else if (cellValue === '2') {
        return '多选'
      } else {
        return '简答'
      }
    },
    /**
     * 难度
     */
    formDifficulty(row, column, cellValue, index) {
      if (cellValue === '1') {
        return '简单'
      } else if (cellValue === '2') {
        return '一般'
      } else {
        return '困难'
      }
    },
    /**
     *  点击 查看 弹出的 题库
     */

    async checkQuestion(id) {
      this.checkTitleDialogVisible = true
      this.selId = id
      console.log(this.selId)

      // this.$store.commit('SET_ID', id)
      // this.$store.state.jumpGetData.quesId = id
      // console.log(this.$store.state.jumpGetData.quesId)
      // this.$store.state.jumpGetData.isNext = this.isNext
      // this.checkTitleDialogVisible = true
      // this.$store
      //   .dispatch('jumpGetData/getQuestionsDetail', {
      //     id: this.$route.query.id,
      //     isNext: this.isNext
      //   })

      //   .then(() => {
      //     //  this.storeQuestionInfo = this.$store.state.jumpGetData.questionsInfo;
      //     console.log(this.$store.state.jumpGetData.questionsInfo)
      //     /**
      //      * 获取getobj 准备的是跳转路由的数据
      //      */
      //     this.getObj = this.$store.state.jumpGetData.questionsInfo
      //     console.log(this.getObj)
      //   })

      const res = await getBasicRandomsDetail(id, this.isNext)
      console.log(res)
      this.getObj = res

      console.log(this.getObj)
    },
    set() {},
    /**
     * 编辑 跳转路由
     */
    jumpPage(id) {
      this.$router.push({
        path: '/questions/new',
        query: {
          id: id
        }
      })
    },

    /**
     * 加入精选题库按钮
     */
    addSelectedQues(id) {
      this.$confirm('是否加入精选题库？').then(async () => {
        await patchTrueSelectedQuestion(id, 1).then(() => {
          this.$message.success('加入成功')

          // 重新获取列表
          this.gitBankList()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  margin-top: 20px;
  text-align: right;
}
.left {
  margin: 10px 0;
}
</style>
