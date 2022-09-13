<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片视图 -->
      <el-card class="box-card">
        <!-- 搜索框部分 -->
        <el-row :gutter="20">
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-input
                  v-model="queryInfo.title"
                  placeholder="根据用户名搜索"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button
                  class="btnpermissionr"
                  size="small"
                  plain
                  @click="emptypermissions"
                  >清空</el-button
                >
                <el-button
                  class="btnpermissionr"
                  size="small"
                  type="primary"
                  plain
                  @click="searchpermissions"
                  >搜索</el-button
                >
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-button
              type="success"
              icon="el-icon-edit"
              @click="addpermissions"
              >新增权限组</el-button
            >
          </el-col>
        </el-row>

        <!-- 提示信息部分 -->
        <el-alert :title="countstext" type="info" show-icon :closable="false">
        </el-alert>
        <!-- 表格部分 -->
        <el-table
          v-loading="loading"
          element-loading-text="给我一点时间"
          :data="permissionsTableData"
          style="width: 100%"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column align="right" prop="title" label="用户名">
          </el-table-column>
          <el-table-column
            align="right"
            prop="update_date"
            label="日期"
            sortable
          >
          </el-table-column>
          <el-table-column align="right" label="操作">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button
                plain
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showedit(scope.row)"
              ></el-button>
              <!-- 删除按钮 -->
              <el-button
                plain
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeById(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <el-pagination
          style="text-align: right; margin-top: 20px"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(page)"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="Number(pagesize)"
          layout="total,prev, pager, next, sizes,  jumper"
          :total="counts"
        >
        </el-pagination>
      </el-card>

      <!-- 新增权限弹窗 -->
      <el-dialog
        title="创建权限组"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="closeadd"
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="100px"
          class="demo-ruleForm"
          style="width: 400px; margin-left: 120px"
        >
          <el-form-item label="用户名" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item label="权限分配">
            <!-- 树节点 -->
            <el-tree
              :default-checked-keys="defkeyss"
              :default-expanded-keys="[1]"
              :data="treeData"
              show-checkbox
              node-key="id"
              ref="treeRef"
              highlight-current
              :props="defaultProps"
            >
            </el-tree>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addperInfo">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑弹框 -->
      <el-dialog
        title="编辑权限组"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="closeedit"
      >
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="100px"
          class="demo-ruleForm"
          style="width: 400px; margin-left: 120px"
        >
          <el-form-item label="用户名" prop="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="权限分配">
            <el-tree
              :default-checked-keys="defkeys"
              :default-expanded-keys="[1]"
              :data="treeData"
              show-checkbox
              node-key="id"
              ref="edittreeRef"
              highlight-current
              :props="defaultProps"
            >
            </el-tree>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureedit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-alert {
  margin: 20px 0;
}
.btnpermissionr {
  height: 36px;
}
button.el-button--success {
  float: right !important;
}
</style>

<script>
import { getPermissionsList, delPermissionsDetail } from '@/api/permissions'
import {
  postAddPermissions,
  getPermissionsDetail,
  putEditPermissionsDetail
} from '@/api/permissions'
import { getMenusList, delMenusDetail } from '@/api/menus'
// import { permissionlist, simple, add, detail, remove, update } from '@/api/base/permissions.js'
// import { list } from '@/api/base/menus'
export default {
  name: 'base-permissions',
  data() {
    return {
      loading: true,
      // 权限列表查询参数
      queryInfo: {
        title: '',
        page: 1,
        pagesize: 10
      },
      counts: 0, // 总条数,用在alert和分页上
      pagesize: '', //页大小
      pages: 1, // 总页数
      page: '1', // 当前页码
      countstext: '',
      // 表格数据来源
      permissionsTableData: [],
      // 新增权限组的显示状况
      addDialogVisible: false,
      // 新增权限的数据
      addForm: {
        title: '',
        permissions: this.data
      },
      // 新增权限的验证在规则
      addFormRules: {
        title: [{ required: true, message: '请填写用户名', trigger: 'blur' }]
      },
      // 树形图的数据
      treeData: [],
      // 树形图的配置
      defaultProps: {
        children: 'childs',
        label: 'title'
      },

      // 编辑框的数据
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        title: [{ required: true, message: '请填写用户名', trigger: 'blur' }]
      },
      // 添加弹框
      defkeyss: [],
      // 编辑树形图的默认选中项
      defkeys: []
    }
  },
  created() {
    //获取用户权限列表
    this.getpermissions()
  },
  methods: {
    // 获取用户权限列表
    async getpermissions() {
      try {
        const res = await getPermissionsList(this.queryInfo)
        console.log(res)
        // this.$message.success('获取权限成功!')
        // // 赋值之前对时间进行处理
        // res.list.forEach((item) => {
        //   item.update_date = this.$dayjs(item.update_date).format('YYYY-MM-DD')
        // })
        this.permissionsTableData = res.list
        this.counts = res.counts
        this.countstext = `共${this.counts}条数据`
        // console.log(res)
      } catch (error) {
        console.log(error)
        this.$message.error('获取权限失败!')
      }
      this.loading = false
    },
    // 当前每页显示多少数据
    handleSizeChange(pagesize) {
      this.queryInfo.pagesize = pagesize
      this.getpermissions()
    },
    // 当前多少页
    handleCurrentChange(page) {
      this.queryInfo.page = page
      this.getpermissions()
    },
    // 清空操作
    emptypermissions() {
      this.queryInfo.title = ''
      this.getpermissions()
    },
    // -搜索查询操作
    searchpermissions() {
      this.getpermissions()
    },
    // -新增权限组,点击事件,树形图获取数据  新增权限组
    async addpermissions() {
      // 添加弹框出现
      this.addDialogVisible = true
      // this.getTreeInfo()
      // 解决重复渲染
      this.treeData = []
      // 获取菜单列表
      const data = await getMenusList()

      // 获取的数据还有三级数据 没有获取到三级数据是points 循环将childs替代points
      // 定时器
      setTimeout(() => {
        data.forEach((item) => {
          if (item.points) {
            item.childs = item.points
          } else {
            item.childs.forEach((item1) => {
              item1.childs = item1.points
            })
          }
        })
      })

      console.log(data)
      // 为其添加一个父节点
      const result = {
        id: 1,
        title: '系统菜单和页面权限点',
        childs: [...data]
      }
      this.treeData.push(result)
      // push操作在每次点击添加的时候都会执行,会造成重复渲染的问题.解决:每次点击之前将树形图的数据来源置空
      // this.treeData = data
    },

    // 添加弹框的表单重置
    closeadd() {
      this.$refs.addFormRef.resetFields()
    },
    // -点击确定,确定添加  确定
    addperInfo() {
      // 表单验证
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // // 把添加的一级ID去掉
        // this.defkeyss = this.defkeyss.forEach(item => {
        //   return item !== 1
        // })
        // 深拷贝
        this.defkeyss = [...this.$refs.treeRef.getCheckedKeys()]

        try {
          const data = await postAddPermissions({
            title: this.addForm.title,
            permissions: this.defkeyss
          })
          this.$message.success('添加成功!')
          // 更新视图
          this.getpermissions()
          // console.log(data)
        } catch (error) {
          // console.log(error)
          this.$message.error('添加失败')
        }
        // 关闭弹框
        this.addDialogVisible = false
      })
    },

    // 编辑部分
    //编辑框关闭处理
    closeedit() {
      this.$refs.editFormRef.resetFields()
      this.defkeys = []
    },

    // 获取树形图的数据(抽离出来函数)  编辑的时候触发
    async getTreeInfo(row) {
      // 解决重复渲染
      this.treeData = []
      // 获取菜单列表
      const data = await getMenusList()
      // 获取的数据还有三级数据没有获取到三级数据是points 循环将childs替代points
      // 加了个定时器
      setTimeout(() => {
        data.forEach((item) => {
          //   item.childs.forEach((item1) => {
          //     item1.childs = item1.points
          //   })
          if (item.points) {
            item.childs = item.points
          } else {
            item.childs.forEach((item1) => {
              item1.childs = item1.points
            })
          }
        })
        console.log(data)
      })

      // 为其添加一个父节点
      const result = {
        id: 1,
        title: '系统菜单和页面权限点',
        childs: [...data]
      }

      this.treeData.push(result)
      // 调用递归函数,获取三级节点
      this.getLeafkeys(result, this.defkeys)
      // console.log(row)
      console.log(this.defkeys) // this.defkeys默认选中项的id 包含__ob__: Observer].无法识别
    },
    // 点击编辑获取数据
    async showedit(row) {
      // console.log(row)
      try {
        this.editDialogVisible = true
        this.getTreeInfo(row) //获取树形图的数据
        // 获取权限详情
        const data = await getPermissionsDetail(row.id, row)
        // console.log(data)
        this.editForm = data
        console.log(this.editForm)
        console.log(this.defkeys)
        // console.log(data.permissions) // data.permissions是当前用户名的所有的权限
        // 遍历data.permissions和this.defkeys共同的部分,并转换
        const newArr = []
        setTimeout(() => {
          data.permissions.forEach((permissions) => {
            this.defkeys.forEach((item) => {
              if (permissions === item) {
                newArr.push(permissions)
              }
            })
          })
          // 深拷贝
          this.defkeys = JSON.parse(JSON.stringify(newArr))
          console.log(this.defkeys)
        }, 100)
      } catch (error) {
        console.log(error)
        this.$message.error('获取用户权限信息失败!')
      }
    },

    // 递归函数
    getLeafkeys(node, arr) {
      if (!node.childs) {
        return arr.push(node.id)
      }
      node.childs.forEach((item) => {
        this.getLeafkeys(item, arr)
      })
    },
    //点击编辑的确定,确认修改
    async sureedit() {
      this.defkeys = [...this.$refs.edittreeRef.getCheckedKeys()]
      // console.log(this.defkeys)
      try {
        const data = await putEditPermissionsDetail(this.editForm.id, {
          id: this.editForm.id,
          title: this.editForm.title,
          permissions: this.defkeys
        })
        // const { data } = await update(this.editForm)
        this.$message.success('更新成功')
        // 更新视图
        this.getpermissions()
      } catch (error) {
        this.$message.error('更新失败')
        // console.log(error)
      }
      // 关闭弹窗
      this.editDialogVisible = false
    },
    // 删除
    async removeById(row) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('您取消了操作')
      }
      try {
        const data = await delPermissionsDetail(row.id)
        this.getpermissions()
        //  关闭弹窗
        this.editDialogVisible = false
        // 成功提醒
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
