<template>
  <div>
    <el-card>
      <div class="navBar-box">
        <!-- 右侧按钮 -->
        <div class="right">
          <el-button type="success" class="right-btn" @click="addMenus">
            <i class="el-icon-edit"></i>
            添加菜单</el-button
          >
        </div>
      </div>

      <!-- 表单数据  row-key="id"
        :tree-props="{ children:  points'childs' }"-->
      <el-table
        :data="tableData"
        style="width: 100%"
        class="mt-20"
        default-expand-all
        row-key="id"
        :tree-props="{ children: 'childs' }"
      >
        <el-table-column prop="title" label="标题" width="180" align="center">
        </el-table-column>
        <el-table-column prop="code" label="权限点代码" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center" width="180">
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

      <!-- 添加菜单 -->
      <addMenusDialog
        @onSuccess="getMenusListAPI()"
        :visible.sync="addMenusDialogVisible"
        :tableDataList="tableData"
        :isAdd="isAdd"
        :selId="selId"
      />
      <!-- 编辑用户 -->
    </el-card>
  </div>
</template>

<script>
import { getMenusList, delMenusDetail } from "@/api/menus";

import addMenusDialog from "@/views/menus/addMenusDialog.vue";
export default {
  components: {
    addMenusDialog,
  },
  data() {
    return {
      input: "",
      tableData: [],

      searchName: "",
      counts: 0,
      addMenusDialogVisible: false,
      isAdd: true,
      selId: null,
      delId: null,
      defaultProps: {
        children: "childs",
        label: "title",
      },
    };
  },
  methods: {
    async getMenusListAPI() {
      const res = await getMenusList();
      this.tableData = res;

      // this.counts = counts;
      // this.selecCourse();
    },
    handleNodeClick(data) {
      console.log(data);
    },

    /**
     * 添加菜单
     */
    addMenus() {
      this.isAdd = true;
      this.addMenusDialogVisible = true;
    },
    /**
     * 本来想修改二三级chiilds points名字  但是不知道为啥 二三级的名字突然又统一了
     */
    selecCourse(e) {
      console.log(e);
      //获取列表

      console.log(this.tableData);
      //循环数组
      this.tableData = this.tableData.map((i) => {
        // console.log(i);
        //在父数组中找到deptVOList二级数组，在二级数组中查找userVOList三级数组名字，改为deptVOList
        JSON.parse(JSON.stringify(i.childs).replace(/points/g, "childs"));
        //修改值为二级数组，将二级数组更新
        i.childs = JSON.parse(
          JSON.stringify(i.childs).replace(/points/g, "childs")
        );
      });
      console.log(this.tableData);
    },

    onEdit(id) {
      this.isAdd = false;
      this.selId = id;
      this.addMenusDialogVisible = true;
    },
    async onDelete(id) {
      await delMenusDetail(id);
      this.$confirm("确定要删除吗？？").then(() => {
        this.$message.success("删除成功！！");
        this.getMenusListAPI();
      });
    },
  },
  created() {
    this.getMenusListAPI();
  },
};
</script>

<style lang="scss" scoped>
.navBar-box {
  display: flex;
  flex-direction: row-reverse;
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
