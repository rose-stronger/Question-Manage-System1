<template>
  <div class="box hideSidebar">
    <!-- <img src="~@/assets/gallery/下载 (2).png" alt="" /> -->

    <img
      src="~@/assets/gallery/下载 (2).png"
      v-if="$store.state.app.sidebar.opened"
    />

    <img src="~@/assets/gallery/mini-pic.png" v-else />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.box {
  height: 50px;
  background-color: #1398fa;
  img {
    width: 100%;
  }
}
</style>
