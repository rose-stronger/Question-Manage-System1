import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getTimeStart } from '@/utils/auth'

/**
 *  允许时间段
 */
const TOKEN_LOGOUT_TIME = 60 * 60 * 1000
// create an axios instance
const service = axios.create({
  baseURL: 'http://hmmm-api.itheima.net', // url = base url + request url

  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// console.log(baseURL),
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = `Bearer ${store.getters.token}`
      /**
       * 获取 介入时间
       */
      // debugger
      const loginTime = getTimeStart()
      const currentTime = Date.now()
      if (currentTime > loginTime + TOKEN_LOGOUT_TIME) {
        /**
         * 超时就退出
         *
         */
        store.dispatch('user/logout')
      }
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
/**
 * 响应拦截器 在此 处理token值失效的问题  当token值 被修改时 页面刷新 被迫退出
 */
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data

    // console.log(response.data) //token值

    return res
    // if (!res.success) {
    //   Message({
    //     message: res.message,
    //     type: 'error'
    //   })
    //   // reject 表示当前请求错误
    //   return Promise.reject(new Error(res.message))
    // }
    // return res
  },
  (error) => {
    console.log('err' + error) // for debug
    /**
     * 判断
     */
    if (
      error.response &&
      error.response.data.code === 40001 &&
      error.response.status === 401
    ) {
      // 被动处理退出
      store.dispatch('user/logout')

      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
