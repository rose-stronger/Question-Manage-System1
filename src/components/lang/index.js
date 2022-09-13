import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enMsg from './en'
import zhMsg from './zh'

Vue.use(VueI18n)

/**
 * 国际化，需要使用框架 vue-i18n：
 * 1. locale： 语言环境
 * 2. message：字典  语言包 。。。
 * 3. $t 方法：文本的展示需要使用 $t 方法进行，而不能写死
 */

const messages = {
  en: {
    message: {
      hello: 'log in'
    },
    ...enMsg
  },
  zh: {
    message: {
      hello: '登录'
    },
    ...zhMsg
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'en', // 设置地区
  messages // 设置地区信息
})

export default i18n
