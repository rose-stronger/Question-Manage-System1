import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import menus from './modules/menus'
import jumpGetData from './modules/jumpGetData'
import ceshi from './modules/ceshi'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    menus,
    jumpGetData,
    ceshi,
    permission,
    tagsView
  },
  getters
})

export default store
