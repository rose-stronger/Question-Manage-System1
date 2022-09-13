<template>
  <div>
    <el-dropdown trigger="click" @command="changeLanguage">
      <!-- 这里必须加一个div -->
      <div>
        <!-- <svg-icon
          style="color: #fff; font-size: 20px"
          class="el-icon-printer"
        /> -->
        <!-- <svg-icon style="color: #fff; font-size: 20px" icon-class="language" /> -->
        <svg-icon style="color: #fff; font-size: 20px" icon-class="password" />
        <!-- <i class="el-icon-grape"></i> -->
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="'zh' === $i18n.locale"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="'en' === $i18n.locale"
          >en</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'langVue',
  methods: {
    changeLanguage(lang) {
      Cookie.set('language', lang) // 切换多语言
      this.$i18n.locale = lang // 设置给本地的i18n插件
      this.$message.success('切换多语言成功')
    }
  }
}
</script>
