<template>
  <div>
    <el-dialog
      :title="isAdd ? '添加菜单' : '编辑菜单'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="30%"
      :before-close="handleClose"
      @open="resetForm"
    >
      <span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="权限组名称" prop="is_point">
            <el-radio-group v-model="ruleForm.is_point">
              <el-radio :label="false" value="">菜单</el-radio>
              <el-radio :label="true" value="">权限点</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="权限组名称" prop="pid">
            <el-select
              ref="selectTree"
              v-model="ruleForm.pid"
              placeholder="主导航"
            >
              <el-option label="主导航" value="主导航"></el-option>
              <!--   v-for="item in formatData(tableDataList)"
                :key="item.id"
                :label="item.title"
                :value="item.id" -->
              <el-option
                v-for="item in tableDataList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
                style="display: none"
              />
              <el-tree
                class="main-select-el-tree"
                ref="selecteltree"
                :data="tableDataList"
                node-key="id"
                highlight-current
                :props="defaultProps"
                @node-click="handleNodeClick"
                :current-node-key="value"
                :expand-on-click-node="expandOnClickNode"
                default-expand-all
              />
            </el-select>
          </el-form-item>
          <el-form-item label="权限代码" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="权限标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postAddMenus, getMenusDetail, putEditMenusDetail } from '@/api/menus'
export default {
  props: {
    visible: {
      type: Boolean
    },
    tableDataList: {
      type: Array
    },
    isAdd: {
      type: Boolean
    },
    selId: {
      type: Number
    }
  },
  data() {
    return {
      ruleForm: {
        code: '',
        title: '',
        is_point: '',
        pid: ''
      },

      rules: {
        code: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入email', trigger: 'blur' }],
        is_point: [],
        pid: []
      },
      defaultProps: {
        children: 'childs',
        label: 'title'
      },
      obj: {},
      expandOnClickNode: true,
      value: 6
    }
  },
  methods: {
    onCancel() {
      this.$emit('update:visible', false)
    },
    async onConfirm() {
      if (this.isAdd) {
        await postAddMenus(this.ruleForm)
        this.$message.success('添加菜单成功！！')
      } else {
        await putEditMenusDetail(this.selId, { ...this.ruleForm })
        this.$message.success('编辑菜单成功！！')
      }

      this.onCancel()

      this.$emit('onSuccess')
    },
    handleClose(done) {
      done()
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    async getMenusDetailAPI() {
      const res = await getMenusDetail(this.selId)
      console.log(res)
      this.ruleForm = res
    },

    handleNodeClick(node) {
      // this.value = node.id;
      this.ruleForm.pid = node.title
      this.$refs.selectTree.blur()
    },
    formatData(data) {
      let options = []
      data.forEach((item, key) => {
        options.push({ label: item.label, value: item.id })
        if (item.children) {
          item.children.forEach((items, keys) => {
            options.push({ label: items.label, value: items.id })
            if (items.children) {
              items.children.forEach((itemss, keyss) => {
                options.push({ label: itemss.label, value: itemss.id })
                if (itemss.children) {
                  itemss.children.forEach((itemsss, keysss) => {
                    options.push({ label: itemsss.label, value: itemsss.id })
                  })
                }
              })
            }
          })
        }
      })
      return options
    }
  },
  watch: {
    visible(val) {
      // console.log(this.selId);
      if (val && !this.isAdd && this.selId) {
        this.getMenusDetailAPI()
      }
    }
  }
}
</script>

<style></style>
