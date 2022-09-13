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
          <el-button type="success" class="right-btn" @click="addUser">
            <i class="el-icon-edit"></i>
            新增用户</el-button
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
        <el-table-column prop="id" label="序号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column
          prop="permission_group_title"
          label="权限组名称"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="role" label="角色" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <!-- 编辑按钮 -->

            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              class="primary-btn"
              @click="onEdit(row.id)"
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
      <!-- 添加用户 -->
      <addUserDialog
        @onSuccess="getUserListAPI()"
        :visible.sync="addUserDialogVisible"
        :tableDataList="tableData"
        :isAdd="isAdd"
        :selId="selId"
      />
      <!-- 编辑用户 -->
    </el-card>
  </div>
</template>

<script>
import { getUserList, DelUser } from "@/api/user";
import addUserDialog from "@/views/users/addUserDialog.vue";
export default {
  components: {
    addUserDialog,
  },
  data() {
    return {
      input: "",
      tableData: [],
      query: {
        page: 1,
        pagesize: 10,
        /**
         * 关键字 就是搜索关键字
         */
        // keyword
        username: "",
      },
      searchName: "",
      counts: 0,
      addUserDialogVisible: false,
      isAdd: true,
      selId: null,
      delId: null,
    };
  },
  methods: {
    async getUserListAPI() {
      const { counts, list } = await getUserList(this.query);
      this.tableData = list;
      console.log(list);
      this.counts = counts;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.pagesize = val;
      this.getUserListAPI();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.query.page = val;
      this.getUserListAPI();
    },
    /**
     * 搜索
     */
    searchKey(word) {
      this.query.username = word;
      this.getUserListAPI();
    },
    /**
     * 清空
     */
    clearClick() {
      this.searchName = "";
      this.query.username = "";
      this.getUserListAPI();
    },
    /**
     * 新增用户
     */
    addUser() {
      this.isAdd = true;
      this.addUserDialogVisible = true;
    },
    onEdit(id) {
      this.isAdd = false;
      this.selId = id;
      this.addUserDialogVisible = true;
      // this.getUserDetailAPI();

      // const res = await getUserDetail(id);
      // console.log(res);
      //  this.tableData=
    },
    async onDelete(id) {
      // this.delId = id;
      await DelUser(id);
      this.$confirm("确定要删除吗？？").then(() => {
        this.$message.success("删除成功！！");
        this.getUserListAPI();
      });
    },
  },
  created() {
    this.getUserListAPI();
  },
};
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
