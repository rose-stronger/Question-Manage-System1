// 控制访问权限
import router from '@/router'
import store from '@/store'

/**
 * 白名单：表示所有不需要登录就可以访问的页面
 */
const whiteList = ['/login', '/404']

/**
 * 前置守卫
 * @param {*} to 要进入的路由
 * @param {*} from 从哪个路由来
 * @param {*} next 是否允许进入
 */

router.beforeEach((to, from, next) => {
  /**
   * 期望：用户不登录不允许进入首页 -> 用户不登录只能进入【登录、404】
   */
  // console.log(to)
  //  判断用户是否登陆了，如果用户登录了
  if (store.getters.token) {
    // 获取用户信息，让用户信息变成实时的
    store.dispatch('user/getProfile')

    // next 过
    return next()
  }

  // 用户没有登录，但是访问的页面是 【登录、404】，也允许访问
  if (whiteList.includes(to.path)) {
    // next 过
    return next()
  }

  // 用户既没有登录，访问的页面也不是 【登录、404】，此时返回登录页
  next('/login')
})

/**
 * 路由的后置守卫
 */
router.afterEach(() => {})
