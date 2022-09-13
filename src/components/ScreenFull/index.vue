<template>
  <div>
    <div class="el-icon-full-screen" @click="enlarge"></div>
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'screenfullVue',
  methods: {
    enlarge() {
      ScreenFull.toggle()
    }
  }
}
</script>

<style></style>
