<template>
  <div>
    <el-dialog
      :title="isAdd ? '创建权限组' : '编辑权限组'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="30%"
      :before-close="handleClose"
      @close="closeAdd"
    >
      <span>
        <el-form
          :model="ruleForm"
          :rules="addRules"
          ref="addRuleFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <!--  prop="permissions"校验使用 -->
          <el-form-item label="权限分配">
            <!-- menusList -->
            <!-- 树型结构 menusList-->
            <!-- 分别通过default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点。需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。 -->
            <el-tree
              @check-change="handleCheckChange"
              default-expand-all
              :data="menusList"
              show-checkbox
              node-key="id"
              :props="defaultProps"
              :default-checked-keys="defkeys"
              :default-expanded-keys="[1]"
              ref="treeRef"
              highlight-current
            >
            </el-tree>
          </el-form-item>
        </el-form>
        <!--  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"-->
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  postAddPermissions,
  getPermissionsDetail,
  putEditPermissionsDetail
} from '@/api/permissions'
import { getMenusList, delMenusDetail } from '@/api/menus'

export default {
  name: 'base-permissions',
  props: {
    visible: {
      type: Boolean
    },
    menusList: {
      type: Array
    },
    isAdd: {
      type: Boolean
    },
    row: {
      type: Object
    },
    defkeysE: {
      type: Array
    }
  },
  data() {
    return {
      // 存储 新增权限的数据
      ruleForm: {
        // id: this.selId,
        title: '',
        permissions: this.getArr
      },

      addRules: {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },

      defaultProps: {
        /**
         * 后台节点名字总是在变化？？？？
         */
        // children: "points",
        children: 'childs',
        label: 'title'
      },
      getArr: [],
      // 添加弹框 获取所有节点
      defkeys: [],
      defkeysElect: []
    }
  },

  methods: {
    onCancel() {
      this.$emit('update:visible', false)
      // console.log(this.menusList);
    },
    async onConfirm() {
      /**
       * 新增
       */

      if (this.isAdd) {
        // this.treeData = data
        // await postAddPermissions({
        //   ...this.ruleForm,
        //   permissions: this.getArr
        // })
        // this.$message.success('添加用户成功！！')
        // 表单验证
        this.$refs.addRuleFormRef.validate(async (valid) => {
          if (!valid) return
          // // 把添加的一级ID去掉
          // this.defkeyss = this.defkeyss.forEach(item => {
          //   return item !== 1
          // })
          console.log(this.$refs.treeRef.getCheckedKeys()) //[29,35]
          // this.defkeys = [...this.$refs.treeRef.getCheckedKeys()]
          this.defkeys = this.$refs.treeRef.getCheckedKeys()

          console.log(this.defkeys)

          try {
            const { data } = await postAddPermissions({
              title: this.ruleForm.title,
              permissions: this.defkeys
            })
            this.$message.success('添加成功!')
            // 更新视图 获取用户权限列表
            this.$emit('onSuccess')

            // console.log(data)
          } catch (error) {
            // console.log(error)
            this.$message.error('添加失败')
          }
          // 关闭弹框
          this.$emit('update:visible', false)
        })
      } else {
        /**
         * 成功了！！
         */
        // await putEditPermissionsDetail(this.selId, {
        //   ...this.ruleForm,
        //   permissions: this.getArr
        // })
        // this.$message.success('修改用户成功！！')

        this.defkeys = [...this.$refs.treeRef.getCheckedKeys()]
        // console.log(this.defkeys)
        try {
          const { data } = await putEditPermissionsDetail({
            id: this.ruleForm.id,
            title: this.ruleForm.title,
            permissions: this.defkeys
          })
          // const { data } = await update(this.editForm)
          this.$message.success('更新成功')
          // 更新视图
          this.$emit('onSuccess')
        } catch (error) {
          this.$message.error('更新失败')
          // console.log(error)
        }
        // 关闭弹窗
        this.$emit('update:visible', false)
      }
    },
    handleClose(done) {
      done()
    },
    closeAdd() {
      this.$refs.addRuleFormRef.resetFields()
      // 默认选中的值为空
      this.defkeys = []
    },
    // resetForm() {
    //   // this.$refs.ruleFormRef.resetFields()
    // },
    /**
     * 回显
     */
    async getPermissionsDetailAPI() {
      console.log(this.row)
      const data = await getPermissionsDetail(this.row.id, this.ruleForm)
      // 这里有数据
      console.log(data)
      this.ruleForm = data
      console.log(this.menusList)
      // console.log(data.permissions) // data.permissions是当前用户名的所有的权限
      // 遍历data.permissions和this.defkeys共同的部分,并转换
      const newArr = []
      // defkeysE 是 选中的
      setTimeout(() => {
        this.menusList.forEach((permissions) => {
          data.permissions.forEach((item) => {
            if (permissions === item) {
              newArr.push(permissions)
            }
          })
        })
        this.defkeys = JSON.parse(JSON.stringify(newArr))
        console.log(this.defkeys)
      }, 1000)
    },

    /**
     * 记录节点的变化 来获取 数组
     */
    handleCheckChange(data, checked, indeterminate) {
      // 点几个传几个id

      if (checked) {
        this.getArr.push(data.id)
      } else {
        this.getArr.pop(data.id)
      }
    }
  },
  created() {
    // this.set()
  },
  watch: {
    visible(val) {
      console.log(val)
      console.log(this.row.id)
      if (val && !this.isAdd && this.row.id) {
        console.log('==========')
        this.getPermissionsDetailAPI()
      }
    }
  }
}
</script>

<style></style>
