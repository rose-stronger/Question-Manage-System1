<template>
  <div>
    <el-dialog
      :title="isshow ? '新增' : '修改'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="20%"
      @closed="closed"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属学科" prop="region" v-if="!$route.query.id">
          <el-select v-model="form.subjectID" placeholder="请选择">
            <!-- <el-option label="请选择" value="请选择"></el-option> -->
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option> </el-select
        ></el-form-item>
        <el-form-item label="目录名称" prop="tagName">
          <el-input
            v-model="form.tagName"
            placeholder="请输入目录名称"
          ></el-input>
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
import { simpleList } from '@/api/subject'
import { addedTagsList, echoList, modifyList } from '@/api/tags'
export default {
  name: 'DialogtagsVue',
  props: {
    visible: Boolean,
    isshow: Boolean,
    modifyId: Number
  },
  data() {
    return {
      query: {
        subjectName: ''
      },
      form: { subjectID: '', tagName: '' },
      rules: {
        region: [
          { required: true, message: '请选择所属学科', trigger: 'blur' }
        ],
        tagName: [
          { required: true, message: '请输入目录名称', trigger: 'blur' }
        ]
      },
      subjectList: [],
      NumberId: Number(this.$route.query.id)
    }
  },
  created() {
    this.getSubjectsList()
  },
  methods: {
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
      if (this.isshow) {
        if (this.$route.query.id) {
          await addedTagsList({
            tagName: this.form.tagName,
            subjectID: this.NumberId,
            id: null
          })
        } else {
          await addedTagsList(this.form)
        }
      } else {
        modifyList(this.modifyId, this.form)
      }
      this.$emit('onSuccess')
      this.cancel()
    },
    /**
     * 简单列表
     */
    async getSubjectsList() {
      const res = await simpleList(this.query)
      this.subjectList = res
      // console.log(res)
      // this.console.log(res)
      console.log('00000')
    },
    /**
     * 防止回显
     */
    closed() {
      this.$refs.form.resetFields()
      this.form = { subjectID: '', tagName: '' }
    },
    /**
     * 修改回显
     */
    async Echo() {
      this.form = await echoList(this.modifyId)
      // console.log(res)
      console.log(this.form)

      console.log('+++')
    }
  },
  watch: {
    visible(val) {
      if (val && this.isshow === false && this.modifyId) {
        this.Echo()
      }
    }
  }
}
</script>

<style></style>
