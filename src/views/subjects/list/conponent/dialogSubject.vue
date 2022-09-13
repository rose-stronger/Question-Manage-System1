<template>
  <div>
    <el-dialog
      :title="isShow ? '新增学科' : '修改学科'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="30%"
      @closed="closed"
    >
      <!-- <span>这是一段信息</span> -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="活动名称" prop="subjectName">
          <el-input
            v-model="form.subjectName"
            placeholder="请输入学科名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否显示" v-model="form.isFrontDisplay">
          <el-switch
            v-model="Switch"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @input="handleInput"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addSubjectsList,
  courseDetails,
  modifyCourseDetails
} from '@/api/subject'
export default {
  name: 'dialogSubjectVue',
  props: {
    visible: Boolean,
    isShow: Boolean,
    modifyId: Number
  },
  data() {
    return {
      Switch: true,
      value: null,
      form: {
        subjectName: '',
        isFrontDisplay: null
        // id: this.modifyId,
      },
      rules: {
        subjectName: [
          { required: true, message: '请输入学科名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // this.determine();
    // this.getDetails();
    // this.handleInput()
  },
  methods: {
    handleInput(event) {
      this.form.isFrontDisplay = event === true ? 1 : 0
      console.log(this.value)
    },
    /**
     * 取消
     */
    cancel() {
      this.$emit('update:visible', false)
    },
    /**
     * 确定
     */
    async determine() {
      if (this.isShow) {
        await addSubjectsList(this.form)
        console.log(this.form.isFrontDisplay)
      } else {
        console.log(this.modifyId)
        // await modifyCourseDetails({ id: this.modifyId, ...this.form });
        await modifyCourseDetails(this.modifyId, {
          id: this.modifyId,
          ...this.form
        })
      }

      this.$emit('OnSuccess')
      // console.log(res);
      this.cancel()
    },
    /**
     * 清空表单内容
     */
    closed() {
      this.$refs.form.resetFields()
    },
    /**
     * 详情
     */
    async getDetails() {
      const res = await courseDetails(this.modifyId)
      this.form.subjectName = res.subjectName
      console.log(res)
      console.log('--11---')
    }
  },
  watch: {
    visible(val) {
      if (val && this.modifyId && this.isShow === false) {
        this.getDetails()
        this.Switch = false
      }
    }
  }
}
</script>

<style></style>
