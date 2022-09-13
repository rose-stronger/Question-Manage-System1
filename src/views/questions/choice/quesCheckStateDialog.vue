<template>
  <el-dialog
    title="题目审核"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    width="50%"
    :before-close="handleClose"
  >
    <span>
      <!-- <el-form
        :model="getCheckObj"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      > -->
      <!-- <el-form-item>
          <el-radio-group v-model="getCheckObj.operation">
            <el-radio :label="'通过'">通过</el-radio>
            <el-radio :label="'拒绝'">拒绝</el-radio>

          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            v-model="getCheckObj.remarks"
            placeholder="请输入审核意见"
            >{{ getCheckObj.remarks }}</el-input
          >
        </el-form-item> -->
      <div>
        <el-radio v-model="checkData.chkState" label="1" @change="change"
          >通过</el-radio
        >
        <el-radio v-model="checkData.chkState" label="2" @change="change"
          >拒绝</el-radio
        >
        <p>审核意见:</p>
        <el-row>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            :rows="2"
            resize="none"
            v-model="checkData.chkRemarks"
          >
          </el-input>
        </el-row>
      </div>

      <span>
        <el-button type="primary" @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </span>

      <!-- </el-form> -->
    </span>
  </el-dialog>
</template>

<script>
import { PostQuesCheckSuggest } from '@/api/questionBank'

export default {
  props: {
    visible: {
      type: Boolean
    },
    // tableDataList: {
    //   type: Array
    // },
    // isAdd: {
    //   type: Boolean
    // },
    selId: {
      type: Number
    },
    getCheckObj: {
      type: Object
    }
  },
  data() {
    return {
      checkData: {
        chkState: '1', // 1 通过 2 不通过
        chkRemarks: '' // 审核备注
      }
      //       chkRemarks: "9999"
      // chkState: 2
      // id: 40
      // ruleForm: {
      //   checker: '',
      //   checkerID: '',
      //   chkTime: '',
      //   id: null,
      //   operation: null,
      //   questionsID: null,
      //   remarks: null
      // },

      // radio: 3,
    }
  },
  methods: {
    /**
     * 完善
     */
    async onConfirm() {
      if (this.checkData.chkRemarks.trim().length === 0) {
        return this.$message.warning('请输入审核意见')
      }
      const data = await PostQuesCheckSuggest(this.selId, {
        id: this.selId,
        chkState: +this.checkData.chkState,
        chkRemarks: this.checkData.chkRemarks
      })

      this.onCancel()
      this.$message.success('审核成功')
    },
    change() {
      console.log(this.checkData.chkState)
    },

    //======================================
    onCancel() {
      this.checkData.chkRemarks = ''
      this.$emit('update:visible', false)
    },

    handleClose(done) {
      done()

      // done()
    }
    // async getQuesCheckStateAPI() {
    //   console.log(this.selId)
    //   const res = await getQuesCheckState(this.selId)
    //   console.log(res) // 数组[{}]
    //   this.ruleFormNew = res
    //   this.ruleFormNew.map((item) => {
    //     this.ruleForm = item // 根据自己需求可以拼接
    //   })
    //   // this.ruleForm = { ...this.ruleForm }
    //   console.log(this.ruleForm)
    // }
  },
  created() {
    // this.getQuesCheckStateAPI()
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.confirm {
  text-align: center;
  margin-right: 50%;
}
</style>
