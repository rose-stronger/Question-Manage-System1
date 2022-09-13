<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="~@/assets/gallery/en-logo.png" alt="" />
          <span>用户登录</span>
          <lang class="right-menu-item"></lang>
        </h3>
        <!-- <lang1 class="lang1"></lang1> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >{{ getListMsg.login }}</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
// import lang from '@/components/lang/index.vue'
import lang from '@/components/lang/index.vue'

// import shajs from "";
// import shajs from "";
// const shajs = require("jssha");
// const pwd = new shajs("sha256").update("123456").digest("hex");
export default {
  name: 'Login',
  components: { lang },
  data() {
    return {
      loginIs: { login: 'login' },
      // loginIs: {
      //   title: '人力资源管理系统',
      //   login: '登录',
      //   username: '账号',
      //   password: '密码',
      //   any: '随便填',
      //   thirdparty: '第三方登录',
      //   thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
      // },
      loginForm: {
        username: 'root@admin.com',
        password: '123456'
        // password: "123456",
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          {
            validator: (rule, value, callback) => {
              if (value.length === 6) {
                callback()
              } else {
                callback(new Error('请输入正确的密码'))
              }
            },
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  computed: {
    getListMsg() {
      return this.$t(this.loginIs.login)
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // this.$refs.loginForm：获取到了 ref=“loginForm” 的组件实例
      const loginFormEle = this.$refs.loginForm
      // 利用它的 validate 方法,验证表单校验是否通过
      loginFormEle.validate((valid) => {
        // debugger;
        if (valid) {
          this.loading = true

          // console.log('TODO：登录')
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$message.success('登录成功')
              // 登录成功
              this.$router.push('/')
            })
            .catch(() => {})
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;

        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #1493fa;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  // position: relative;
  // height: 100%;
  // width: 100%;
  // // background-color: $bg;
  // background-image: url("~@/assets/gallery/loginbg.png");
  // background-repeat: no-repeat;
  // background-size: cover;
  // overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: $bg !important;
  background: url('~@/assets/gallery/loginbg.png') no-repeat 100% 100%;
  position: relative;

  .login-form {
    // position: relative;
    // width: 520px;
    // max-width: 100%;
    // padding: 160px 35px 0;
    // margin: 0 auto;
    // overflow: hidden;
    // background-color: #f5f5f5;
    position: absolute;
    left: 20%;
    top: 50%;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: -200px 0 0 0;
    background: #f5f5f5;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 22px;
      // color: $light_gray;
      color: #000000;
      margin: 0px auto 40px auto;
      text-align: left;
      // font-weight: bold;
      span {
        margin-left: 10px;
        font-weight: 400 !important;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.lang1 {
  position: absolute;
  top: 0;
  right: 50px;
  align-items: center;
  margin-right: 20px;
  color: pink;
  z-index: 99999;
  background-color: red;
}
.right-menu-item {
  vertical-align: middle;
}
</style>
