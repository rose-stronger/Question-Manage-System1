// import { resetRouter } from '@/router'

import {
  questionBankList,
  deleteBankList,
  getBasicRandomsDetail
} from '@/api/questionBank'

import { getQuestions, setQuestions } from '@/utils/auth'

const getDefaultState = () => {
  return {
    /**
     * 基础题库 试题详情
     * 通过路由过去的
     */
    questionsInfo: getQuestions(),
    quesId: null,
    isNext: null
  }
}

const state = getDefaultState()

const mutations = {
  SET_QUESTIONSINFO: (state, newInfo) => {
    state.questionsInfo = newInfo
    setQuestions(newInfo)
  },
  SET_ID: (state, newId) => {
    state.quesId = newId
  }
}

const actions = {
  async getQuestionsDetail(context, { id, isNext }) {
    const res = await getBasicRandomsDetail(id, isNext)

    context.commit('SET_QUESTIONSINFO', res)
    context.commit('SET_ID', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
