<template>
  <el-card class="box-card">
    <div>
      <el-alert
        :title="left"
        v-if="left"
        type="info"
        show-icon
        class="title"
        :closable="false"
      >
      </el-alert>
    </div>

    <!-- <div>
      <slot></slot>
    </div> -->
  </el-card>
</template>

<script>
export default {
  name: "pageToolsVue",
  props: {
    left: String,
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  background: #f4f4f4;
  // height: 40px;
  ::v-deep .el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    background-color: #e6f7ff;
    border: 1px solid #92d5ff;
    // line-height: 40px;
    color: #333;
    font-size: 16px;
    ::v-deep .el-icon-info {
      color: #409eff;
    }
  }
}
</style>
