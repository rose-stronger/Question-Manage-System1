<template>
  <div class="m-10">
    <div class="box">
      <el-form ref="form" :model="form" label-width="80px" class="formitem">
        <el-form-item label="关键字">
          <el-input
            v-model="form.name"
            style="width: 300px; height: 50px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button size="mini">清除</el-button>
        <el-button type="primary" size="mini">搜索</el-button>
      </div>
    </div>
    <questionListVue></questionListVue>
  </div>
</template>

<script>
import questionListVue from "./component/questionList.vue";
export default {
  name: "randomsVue",
  components: {
    questionListVue,
  },
  data() {
    return {
      form: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.m-10 {
  background-color: #fff;
  .box {
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
