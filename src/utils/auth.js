import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const getQuestionObj = '_getQuestionObj'

const SET_TIME_START = '_SET_TIME_START'

export function getToken() {
  return window.localStorage.getItem(TokenKey) || ''
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}
/**
 *
 *  存储 刚登陆时 的时间
 */
export function setTimeStart() {
  return window.localStorage.setItem(SET_TIME_START, Date.now())
}
/**
 *
 *  获取 刚登陆时 的时间
 */
export function getTimeStart() {
  return parseInt(window.localStorage.getItem(SET_TIME_START) || '0')
}

/**
 *
 * 存储questions数据
 */
export function setQuestions(questionsInfo) {
  return window.localStorage.setItem(getQuestionObj, questionsInfo)
}
/**
 *
 * 获取question数据
 */
export function getQuestions() {
  return window.localStorage.getItem(getQuestionObj) || {}
}

// export function setToken(token) {
//   return window.localStorage.setItem(TokenKey, token)
// }
