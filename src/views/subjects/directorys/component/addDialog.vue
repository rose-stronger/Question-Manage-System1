<template>
  <div>
    <el-dialog
      :title="isShow ? '新增目录' : '修改目录'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="20%"
      @closed="closeda"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属学科" prop="subjectID" v-if="!$route.query.id">
          <el-select v-model="form.subjectID" placeholder="请选择">
            <!-- <el-option label="请选择" value="请选择"></el-option> -->
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option> </el-select
        ></el-form-item>
        <el-form-item label="目录名称" prop="directoryName">
          <el-input
            v-model="form.directoryName"
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
import {
  addcatalogueList,
  detailsList,
  modifyList,
  modifyListLWX
} from '@/api/catalogue'

export default {
  name: 'addDialogVue',
  props: {
    visible: Boolean,
    isShow: Boolean,
    modifyId: Number
  },
  data() {
    return {
      query: {
        subjectName: ''
      },
      Numberid: Number(this.$route.query.id),
      form: { subjectID: '', directoryName: '' },
      rules: {
        subjectID: [
          { required: true, message: '请选择所属学科', trigger: 'blur' }
        ],
        directoryName: [
          { required: true, message: '请输入目录名称', trigger: 'blur' }
        ]
      },
      subjectList: []
    }
  },
  created() {
    this.getsubjectsList()
    // this.newlyAdded()
  },
  methods: {
    //取消
    cancel() {
      this.$emit('update:visible', false)
    },
    /**
     * 确定
     */
    async determine() {
      // 新增
      if (this.isShow) {
        if (this.$route.query.id) {
          await addcatalogueList({
            directoryName: this.form.directoryName,
            subjectID: this.Numberid,
            id: null

            // id: null
          })
        } else {
          await addcatalogueList(this.form)
        }
      } else {
        /**
         * 修改
         */

        await modifyListLWX(this.modifyId, this.form)
      }

      this.$emit('OnSuccess')
      this.cancel()
    },
    /**
     * 学科
     */
    async getsubjectsList() {
      const res = await simpleList(this.query)
      console.log(res)
      console.log('1111')
      // console.log(res)
      this.subjectList = res
      // console.log(this.subjectList)
      // console.log('---')
    },
    /**
     * 防止回显
     */
    closeda() {
      this.$refs.form.resetFields()
    },
    /**
     * 修改页面回显
     */
    async getdetailsList() {
      this.form = await detailsList(this.modifyId)
      // this.form = {
      //   subjectID: '',
      //   directoryName: ''
      // }
      // console.log(this.form)
      // console.log('---')
    }
  },
  watch: {
    visible(val) {
      if (val && this.isShow === false && this.modifyId) {
        this.getdetailsList()
      }
    }
  }
}
</script>

<style></style>
