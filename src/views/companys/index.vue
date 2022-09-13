<template>
  <div>
    <el-card>
      <!-- 表单数据 -->
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm demo_ruleForm"
      >
        <el-form-item label="标签名称" prop="tags">
          <el-input
            label-width="100px"
            v-model="ruleForm.tags"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <!-- ====================== -->
        <el-form-item label="城市" prop="province">
          <el-select
            @change="changeFn"
            v-model="ruleForm.province"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="(item, index) in provincesList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- *************** -->
        <el-form-item label="地区" prop="city">
          <el-select
            style="width: 48%"
            v-model="ruleForm.city"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in citysList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业简称" prop="shortName">
          <el-input v-model="ruleForm.shortName"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <el-select v-model="ruleForm.state" placeholder="请选择">
            <el-option label="启用" :value="1 === 1 ? 1 : 0"></el-option>
            <el-option label="禁用" :value="1 === 2 ? 1 : 0"></el-option>
          </el-select>
        </el-form-item>
        <el-button
          class="clear-box"
          style="margin-left: 10px"
          @click="clearClick"
          >清空</el-button
        >
        <el-button
          type="primary"
          @click="
            searchKey({
              page: 1,
              pagesize: 10,
              shortName: ruleForm.shortName,
              tags: ruleForm.tags,
              province: ruleForm.province,
              city: ruleForm.city,

              state: ruleForm.state,
            })
          "
          >搜索</el-button
        >
        <div class="right">
          <el-button type="success" class="right-btn" @click="addUser">
            <i class="el-icon-edit"></i>
            新增用户</el-button
          >
        </div>
      </el-form>

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
        <el-table-column
          prop="number"
          label="企业编号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="shortName" label="企业简称" align="center">
        </el-table-column>
        <el-table-column prop="tags" label="标签" align="center">
        </el-table-column>
        <el-table-column prop="creatorID" label="创建者" align="center">
        </el-table-column>
        <el-table-column
          prop="addDate"
          :formatter="formOfDateFormatter"
          label="创建日期"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="remarks" label="备注" align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          :formatter="formOfStateFormatter"
          label="状态"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="{ row }">
            <!-- 编辑按钮 -->

            <div class="editBtn">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                class="primary-btn"
                @click="onEdit(row.id)"
              ></el-button>
              <!-- 要判断的！！！ -->
              <!-- {{ row.state }} -->
              <!-- {{ row.id }} -->
              <!-- 0 禁用 1 开启 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="启用"
                placement="bottom-end"
              >
                <el-button
                  circle
                  type="success"
                  class="primary-btn"
                  icon="el-icon-check"
                  @click="changeStatus(row, row.id, row.state)"
                  v-if="row.state != 1"
                ></el-button>
              </el-tooltip>

              <!--     display: none; -->
              <el-tooltip
                class="item"
                effect="dark"
                content="禁用"
                placement="bottom-end"
              >
                <el-button
                  type="danger"
                  circle
                  class="primary-btn"
                  icon="el-icon-close"
                  @click="changeStatus(row, row.id, row.state)"
                  v-if="row.state != 0"
                ></el-button>
              </el-tooltip>

              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="onDelete(row.id)"
              ></el-button>
            </div>
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
        @onSuccess="getCompanyListAPI()"
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
import {
  getCompanyList,
  getCompanyDetail,
  setCompanysState,
  delCompanysDetail,
} from "@/api/companys";
import { provincesFun, citys } from "@/api/citysData";

import addUserDialog from "@/views/companys/addUserDialog.vue";
export default {
  components: {
    addUserDialog,
  },
  data() {
    return {
      btnStatus: 0,
      input: "",
      tableData: [],
      query: {
        page: 1,
        pagesize: 10,
        // tags: "",
        // province: "",
        // city: "",
        // shortName: "",
        // state: null,
      },
      // searchName: "",
      counts: 0,
      addUserDialogVisible: false,
      isAdd: true,
      selId: null,
      delId: null,
      ruleForm: {
        tags: "",
        province: "",
        city: "",
        state: null,
        shortName: "",
      },
      provincesList: provincesFun(), // 城市
      citysList: [], // 地区
      tog_1: true,
      tog_2: false,
    };
  },
  methods: {
    async getCompanyListAPI() {
      const { items, counts } = await getCompanyList(this.query);

      this.tableData = items;
      console.log(this.tableData);

      this.counts = counts;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.pagesize = val;
      this.getCompanyListAPI();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.query.page = val;
      this.getCompanyListAPI();
    },

    formOfDateFormatter(row, column, cellValue, index) {
      const date = new Date(cellValue);

      return ` ${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
      return;
    },
    /**
     * 搜索
     */
    searchKey(obj) {
      console.log(obj);
      this.query = obj;
      console.log(this.query);
      this.getCompanyListAPI();
    },
    /**
     * 清空
     */
    clearClick() {
      (this.query = {
        page: 1,
        pagesize: 10,
        // tags: "",
        // province: "",
        // city: "",
        // shortName: "",
        // state: null,
      }),
        (this.ruleForm = {
          tags: "",
          province: "",
          city: "",
          state: null,
          shortName: "",
        });
      this.getCompanyListAPI();
      // console.log(this.ruleForm);
    },
    formOfStateFormatter(row, column, cellValue, index) {
      return cellValue === 1 ? "启用" : "禁用";
    },
    /**
     * 地区赋值给本地
     */
    changeFn() {
      // 获取地区赋值给本地
      this.citysList = citys(this.ruleForm.province);
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
      // this.getCompanyListAPI();
    },
    /**
     * 切换 禁用 启用
     */
    changeStatus(row, id, state) {
      // this.btnStatus = this.btnStatus === 0 ? 1 : 0;
      this.$confirm(`已成功${state === 1 ? "启用" : "禁用"}, 是否继续?`)
        .then(async () => {
          console.log(row.state); //  0   1的时候  两个图标都出现  0的时候正常
          row.state = state === 1 ? 0 : 1;

          // this.btnStatus = !this.btnStatus;
          await setCompanysState(id, state === 1 ? 0 : 1);

          this.$message.success("修改状态成功");
          this.getCompanyListAPI();
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    toggle(id, state) {
      this.$confirm(`已成功${state === 1 ? "启用" : "禁用"}, 是否继续?`)
        .then(async () => {
          this.tog_1 = !this.tog_1;
          this.tog_2 = !this.tog_2;
          console.log(state);

          // console.log(typeof state_t);
          // console.log(typeof id);
          const res = await setCompanysState(id, state === 1 ? 0 : 1);

          this.getCompanyListAPI();
          this.$message.success("修改状态成功");

          // this.getCompanyListAPI()
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    async getCompanyDetailAPI() {
      const res = await getCompanyDetail(this.selId);

      this.ruleForm = res;
    },
    async onDelete(id) {
      // this.delId = id;

      this.$confirm("此操作将永久删除用户 , 是否继续?").then(async () => {
        await delCompanysDetail(id);
        this.$message.success("成功删除了用户!!!");
        this.getCompanyListAPI();
      });
    },
  },
  created() {
    this.getCompanyListAPI();
    // this.set();
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
.demo-ruleForm {
  display: flex;
  flex-wrap: wrap;
}
.demo_ruleForm {
  ::v-deep .el-input__inner {
    width: 190px;
    height: 32px;
    line-height: 32px;
  }
}

::v-deep .el-button {
  margin-left: 55px !important;
  width: 56px;
  height: 32px;
  line-height: 4px;
  text-align: center;
  padding-left: 14px;
}
.right-btn {
  width: 150px;
  height: 36px;
  right: 126px;
  position: absolute;
}

.editBtn {
  width: 150px;

  display: flex;
  .el-button {
    margin-left: 14px !important;
    height: 38px;
  }
}

::v-deep .el-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}
</style>
