import { userlogin, userInformation, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setTimeStart } from '@/utils/auth'
import { resetRouter } from '@/router'
import router from '@/router'
// // import js-sha256 from 'jssha'
// const  = require("jssha");

const getDefaultState = () => {
  return {
    token: getToken(),
    Profile: {}
    // name: '',
    // avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  // RESET_STATE: (state) => {
  //   Object.assign(state, getDefaultState())
  // },
  /**
   * 登录
   */
  SET_TOKEN: (state, newtoken) => {
    state.token = newtoken
    setToken(newtoken)
  },
  /**
   * 用户资料
   */
  getInformation: (state, newProfile) => {
    state.Profile = newProfile
  }
}

const actions = {
  // 登录
  async login(context, { username, password }) {
    let sha256 = require('js-sha256').sha256 //这里用的是require方法
    password = sha256(password) //要加密的密码
    const { token } = await userlogin({
      username,
      password
    })
    //  console.log(token);

    context.commit('SET_TOKEN', token)
    /**
     * 存储token失效主动介入的时间 在请求拦截器中进行 求值计算
     *  */
    setTimeStart()
    setToken(token)
  },
  /**
   * 用户资料
   */
  async getProfile(context) {
    const res = await userInformation()
    //  console.log(res);
    //  console.log('****');
    context.commit('getInformation', res)
  },

  /**
   * 退出登录
   */
  logout(context) {
    context.commit('SET_TOKEN', '')
    context.commit('getInformation', {})
    router.push('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
