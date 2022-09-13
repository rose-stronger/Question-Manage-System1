<template>
  <div>
    <el-card>
      <div class="navBar-box">
        <div class="left">
          <el-input
            v-model="searchName"
            placeholder="根据用户名搜索"
          ></el-input>
          <el-button
            class="clear-box"
            style="margin-left: 10px"
            @click="clearClick"
            >清空</el-button
          >
          <el-button type="primary" @click="searchKey(searchName)"
            >搜索</el-button
          >
        </div>
        <div class="right">
          <el-button type="success" class="right-btn" @click="addPermission">
            <i class="el-icon-edit"></i>
            新增权限组</el-button
          >
        </div>
      </div>
      <!-- 消息提示的文案 -->
      <el-alert
        class="mt-20"
        :closable="false"
        :title="`共${counts} 条数据`"
        type="info"
        show-icon
      >
      </el-alert>
      <!-- 表单数据 -->
      <el-table :data="tableData" style="width: 100%" class="mt-20">
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column prop="title" label="用户名" width="180" align="center">
        </el-table-column>
        <el-table-column
          sortable
          prop="create_date"
          :formatter="formOfDateFormatter"
          label="日期"
          align="center"
        >
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <!-- 编辑按钮 -->
            <!-- {{ row.id }} -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              class="primary-btn"
              @click="onEdit(row, row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDelete(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mt-20 pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[5, 10, 15, 25]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
      >
      </el-pagination>
      <!-- 新增权限组 -->
      <addPermissionDialog
        @onSuccess="getPermissionsListAPI()"
        :visible.sync="addPermissionDialogVisible"
        :tableDataList="tableData"
        :menusList="menusList"
        :isAdd="isAdd"
        :row="row"
        :selId="selId"
        :defkeysE="defkeys"
      />
      <!-- 编辑用户 -->
    </el-card>
  </div>
</template>

<script>
import { getPermissionsList, delPermissionsDetail } from '@/api/permissions'
// import { getPermissionsList, DelUser } from "@/api/permissions";
import addPermissionDialog from '@/views/permissions/addPermissionDialog.vue'

import { getMenusList, delMenusDetail } from '@/api/menus'
export default {
  components: {
    addPermissionDialog
  },
  data() {
    return {
      input: '',
      tableData: [],
      data: [],
      query: {
        page: 1,
        pagesize: 10,
        /**
         * 关键字 就是搜索关键字
         */
        // keyword
        title: ''
      },
      searchName: '',
      counts: 0,
      addPermissionDialogVisible: false,
      isAdd: true,
      selId: null,
      delId: null,
      row: {},
      data: [],
      // 树形图存储的数据
      menusList: [],
      // 添加弹框
      defkeys: [],
      selId: ''
    }
  },
  methods: {
    // 获取用户权限列表
    async getPermissionsListAPI() {
      // const { counts, list } = await getPermissionsList(this.query)
      try {
        const res = await getPermissionsList(this.query)
        this.data = res
        this.tableData = res.list
        this.counts = res.counts

        this.counts = res.counts
        console.log(this.data)
      } catch (error) {
        this.$message.error('获取权限失败!')
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.query.pagesize = val
      this.getPermissionsListAPI()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.query.page = val
      this.getPermissionsListAPI()
    },
    /**
     * 搜索
     */
    searchKey(word) {
      this.query.title = word
      this.getPermissionsListAPI()
    },
    /**
     * 清空
     */
    clearClick() {
      this.searchName = ''
      this.query.title = ''
      this.getPermissionsListAPI()
    },
    /**
     * 日期格式化
     */
    formOfDateFormatter(row, column, cellValue, index) {
      const date = new Date(cellValue)
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`
    },

    /**
     * 新增用户  当点击 添加 用户时
     */
    async addPermission() {
      this.isAdd = true
      this.addPermissionDialogVisible = true
      // 解决重复渲染
      this.menusList = []
      // 获取菜单列表
      const res = await getMenusList()

      // 获取菜单列表

      // 获取的数据还有三级数据没有获取到三级数据是points 循环将childs替代points
      res.forEach((item) => {
        item.childs.forEach((item1) => {
          item1.childs = item1.points
        })
      })

      // // 为其添加一个父节点

      const result = {
        id: 1,
        title: '系统菜单和页面权限点',
        childs: [...res]
      }
      this.menusList.push(result)
      // console.log(this.menusList)

      // push操作在每次点击添加的时候都会执行,会造成重复渲染的问题.解决:每次点击之前将树形图的数据来源置空
    },
    onEdit(row, id) {
      this.isAdd = false
      this.selId = id
      this.row = row
      console.log(this.row)
      this.addPermissionDialogVisible = true
      this.getTreeInfo(row) //获取树形图的数据
      // 获取权限详情
      // 下页  addpermission
      // catch (error) {
      //   console.log(error)
      //   this.$message.error('获取用户权限信息失败!')
      // }
    },
    async getTreeInfo(row) {
      // 解决重复渲染
      this.menusList = []
      // 获取菜单列表
      const data = await getMenusList()
      // 获取的数据还有三级数据没有获取到三级数据是points 循环将childs替代points
      data.forEach((item) => {
        item.childs.forEach((item1) => {
          item1.childs = item1.points
        })
      })
      // console.log([...data])
      console.log(data)
      // // 为其添加一个父节点
      const result = {
        id: 1,
        title: '系统菜单和页面权限点',
        childs: [...data]
      }
      // console.log(result)

      this.menusList.push(result)
      // 调用递归函数,获取三级节点
      this.getLeafkeys(result, this.defkeys)
      // console.log(row)
      console.log(this.defkeys) // this.defkeys默认选中项的id 包含__ob__: Observer].无法识别
    },
    getLeafkeys(node, arr) {
      if (!node.childs) {
        return arr.push(node.id)
      }
      node.childs.forEach((item) => {
        this.getLeafkeys(item, arr)
      })
    },
    onDelete(id) {
      this.$confirm('确定要删除吗？？').then(async () => {
        await delPermissionsDetail(id)
        this.$message.success('删除成功！！')
        this.getPermissionsListAPI()
      })
    }
  },
  created() {
    this.getPermissionsListAPI()
  }
}
</script>

<style lang="scss" scoped>
.navBar-box {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  .left {
    display: flex;
  }
  // ::v-deep .el-button--primary {
  //   color: #409eff;
  //   background: #ecf5ff;
  //   border-color: #b3d8ff;
  // }
}
::v-deep .el-button--primary.is-circle {
  color: #fff;
  background-color: #b3d8ff;
  border-color: #409eff;
}

::v-deep.el-button--danger {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
.pagination {
  text-align: end;
}
</style>
