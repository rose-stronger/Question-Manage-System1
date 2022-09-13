<template>
  <div class="title">
    <span :title="leftTitle">{{ leftTitle }}</span>
    <i class="el-icon-warning"></i>
  </div>
</template>

<script>
export default {
  name: "echartsTitle",
  props: {
    leftTitle: {
      type: String,
    },
  },
};
</script>

<style>
.title {
  display: flex;
  justify-content: space-between;
  color: #97a8be;
}
</style>
