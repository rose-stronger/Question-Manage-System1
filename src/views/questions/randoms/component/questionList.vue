<template>
  <div>
    <div class="m-10">
      <el-alert title="共有1条数据" type="info" show-icon> </el-alert>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="编号" width="200"> </el-table-column>
      <el-table-column prop="date" label="题型" width="150"> </el-table-column>
      <el-table-column prop="date" label="题目编号" width="180">
      </el-table-column>
      <el-table-column prop="date" label="录入时间" width="180">
      </el-table-column>
      <el-table-column prop="date" label="答题时间(s)" width="150">
      </el-table-column>
      <el-table-column prop="date" label="正确率(%)" width="150">
      </el-table-column>
      <el-table-column prop="date" label="录入人" width="150">
      </el-table-column>
      <el-table-column prop="date" label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findRandoms } from "@/api/questionBank";
export default {
  name: "questionListVue",
  data() {
    return {
      tableData: [],
      query: {
        page: 1,
        pagesize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await findRandoms(this.query);
      console.log(res);
    },
  },
};
</script>

<style></style>
