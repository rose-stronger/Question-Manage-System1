<template>
  <el-card>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <tabsContent
          :data="tableData"
          @onSuccess="getSelectedQuestionListAPI_first()"
        ></tabsContent>
      </el-tab-pane>
      <el-tab-pane label="待审核" name="second">
        <tabsContent
          :data="tableData"
          @onSuccess="getSelectedQuestionListAPI_first()"
        ></tabsContent>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="third">
        <tabsContent
          :data="tableData"
          @onSuccess="getSelectedQuestionListAPI_first()"
        ></tabsContent>
      </el-tab-pane>
      <el-tab-pane label="已拒绝" name="forth">
        <tabsContent
          :data="tableData"
          @onSuccess="getSelectedQuestionListAPI_first()"
        ></tabsContent>
      </el-tab-pane>
    </el-tabs>
    <!-- 预览 -->
    <!-- <previewDialogVue
      :visible.sync="previewDialogVisible"
      :getObj="getObj"
    ></previewDialogVue> -->
    <!-- 审核 -->
    <!-- <checkDialogVue
      :visible.sync="checkDialogVisible"
      :selId="selId"
    ></checkDialogVue> -->
  </el-card>
</template>

<script>
// import {
//   getSelectedQuestionList,
//   getBasicRandomsDetail,
//   postAddSelectedQuestion,
//   patchSelectedQuestion,
//   getQuesCheckState
// } from '@/api/questionBank'
import { getSelectedQuestionList } from '@/api/questionBank'

// import previewDialogVue from '@/views/questions/choice/previewDialog.vue'
// import checkDialogVue from '@/views/questions/choice/quesCheckStateDialog.vue'
import tabsContent from '@/views/questions/choice/tabsContent.vue'

export default {
  components: {
    // previewDialogVue,
    // checkDialogVue,
    tabsContent
  },
  data() {
    return {
      tabsName: [
        {
          label: '全部',
          name: 'first'
        },
        {
          label: '待审核',
          name: 'second'
        },
        {
          label: '已审核',
          name: 'third'
        },
        ,
        {
          label: '已拒绝',
          name: 'forth'
        }
      ],
      tableData: [],
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
    // highlight(item) {
    //   return item.replace(/<[^>]+>/g, '') // 去掉所有的html标记
    // },
    deleteRow(id) {
      // rows.splice(index, 1)
      /**
       * 调删除接口
       */

      this.$confirm('此操作将永久删除该题目, 是否继续?').then(async () => {
        await patchSelectedQuestion(id).then(() => {
          this.$message.success('删除成功！')
          this.getSelectedQuestionListAPI_first()
        })
      })
    },
    async getSelectedQuestionListAPI_first() {
      const { items, counts } = await getSelectedQuestionList(this.query)
      this.tableData = items
      this.counts = counts
    },
    async getSelectedQuestionListAPI_sec() {
      this.chkState = 0
      const { items, counts } = await getSelectedQuestionList({
        ...this.query,
        chkState: this.chkState
      })
      this.tableData = items
      this.counts = counts
    },
    async getSelectedQuestionListAPI_th() {
      this.chkState = 1
      const { items, counts } = await getSelectedQuestionList({
        ...this.query,
        chkState: this.chkState
      })
      this.tableData = items
      this.counts = counts
    },
    async getSelectedQuestionListAPI_four() {
      this.chkState = 2
      const { items, counts } = await getSelectedQuestionList({
        ...this.query,
        chkState: this.chkState
      })
      this.tableData = items
      this.counts = counts
    },

    // formatterQuesType(row, column, cellValue, index) {
    //   // console.log(cellValue);
    //   if (cellValue === '1') {
    //     return '单选'
    //   } else if (cellValue === '2') {
    //     return '多选'
    //   } else {
    //     return '简答'
    //   }
    // },
    // formatterDifficulty(row, column, cellValue, index) {
    //   // console.log(cellValue);
    //   if (cellValue === '1') {
    //     return '简单'
    //   } else if (cellValue === '2') {
    //     return '一般'
    //   } else {
    //     return '困难'
    //   }
    // },
    // formatterCheckState(row, column, cellValue, index) {
    //   // console.log(cellValue)
    //   if (cellValue === '2') {
    //     return '拒绝'
    //   } else if (cellValue === '1') {
    //     return '通过'
    //   } else {
    //     return '待审核'
    //   }
    // },
    // formatterPubState(row, column, cellValue, index) {
    //   // console.log(cellValue);
    //   if (cellValue === '1') {
    //     return '待发布'
    //   } else {
    //     return '未发布'
    //   }
    // },
    // formatterDate(row, column, cellValue, index) {
    //   const date = new Date(cellValue)
    //   date.getFullYear()
    //   return ` ${date.getFullYear()}- ${(date.getMonth() + 1)
    //     .toString()
    //     .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`
    // },
    handleClick(tab, event) {
      console.log(tab, event)
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
    }
    /**
     * 上下架
     */
    // isPublish(id, state) {

    //   if (state === 0) {
    //     this.$confirm('确定要上架吗？').then(async () => {
    //       await postAddSelectedQuestion(id, 1)
    //       this.$message.success('上架成功！！')
    //       this.getSelectedQuestionListAPI_first()
    //     })
    //   } else {
    //     this.$confirm('确定要上架吗？').then(async () => {
    //       await postAddSelectedQuestion(id, 0)
    //       this.$message.success('上架成功！！')
    //       this.getSelectedQuestionListAPI_first()
    //     })
    //   }

    // state = !state
    // }
  },
  created() {
    this.getSelectedQuestionListAPI_first()
  },
  watch: {
    immediate: true, // 第一次的数据，也要当做是一种变化
    deep: true,
    activeName(val) {
      console.log(val)
      if (val === 'first') {
        this.getSelectedQuestionListAPI_first()
      } else if (val === 'second') {
        this.getSelectedQuestionListAPI_sec()
      } else if (val === 'third') {
        this.getSelectedQuestionListAPI_th()
      } else {
        this.getSelectedQuestionListAPI_four()
      }
    }
  }
}
</script>
