<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 搜索 框-->

      <!-- <i
        class="el-icon-search"
        style="color: #fff; margin-right: 50px"
        @click="searchKey"
      ></i> -->
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
        style="margin-right: 80px"
      ></el-autocomplete>
      <!-- <el-select
        v-if="isShow === true"
        style="margin-right: 100px"
        v-model="value"
        filterable
        placeholder="请选择"
      >
        <el-option
          @change="changeFn($event)"
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->

      <!-- 全屏 -->
      <sreenFullVue class="screenfull"></sreenFullVue>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ $store.state.user.Profile.name }}</span>
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import sreenFullVue from '@/components/ScreenFull'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    sreenFullVue
  },
  data() {
    return {
      isShow: false,

      restaurants: [],
      state: '',
      timeout: null
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    /**
     * 关键词搜索
     */
    changeFn(val) {
      console.log()
    },
    searchKey() {
      this.isShow = true
    },
    loadAll() {
      return [
        { value: '数据概览', address: '/dashboard' },
        { value: '用户', address: '/base/users' },
        { value: '菜单', address: '/base/menus' },
        { value: '权限', address: '/base/permissions' },
        { value: '基础题库', address: '/questions/list' },
        { value: '精选题库', address: '/questions/choice' },
        { value: '试题录入', address: '/questions/new' },
        { value: '组题列表', address: '/questions/randoms' },
        { value: '日志', address: '/base/logs' },
        { value: '学科', address: '/subjects/list' },
        { value: '目录', address: '/subjects/directorys' },
        { value: '标签', address: '/subjects/tags' },
        { value: '面试技巧', address: '/articles/list' },

        {
          value: '企业管理',
          address: '/companys/list'
        }
      ]
    },
    // 筛选
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
      console.log(item.address)

      this.$router.push({
        path: item.address
      })
    },

    /**
     * +++++++++++++++++++++++++++++++++++++
     */
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('是否退出登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('user/logout')
          this.$message({
            type: 'success',
            message: '退出成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.screenfull {
  position: absolute;
  top: 5px;
  right: 100px;
  width: 26px;
  height: 26px;
  color: white;
  // color: red !important;
  margin-right: 20px;
  cursor: pointer;
}
</style>
