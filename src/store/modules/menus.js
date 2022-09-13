// import { resetRouter } from '@/router'

import { getMenusList, delMenusDetail } from "@/api/menus";

const getDefaultState = () => {
  return {
    /**
     * 菜单列表数据
     */
    menusListInfo: [],
  };
};

const state = getDefaultState();

const mutations = {
  SET_MENUSINFO: (state, newMenusInfo) => {
    state.menusListInfo = newMenusInfo;
  },
};

const actions = {
  async getMenusListInfo(context) {
    const res = await getMenusList();

    context.commit("SET_MENUSINFO", res);
  },

  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     removeToken() // must remove  token  first
  //     commit('RESET_STATE')
  //     resolve()
  //   })
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
