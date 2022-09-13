import { constantRoutes } from '@/router/index'
// import routes from '@/router/index'
const state = {
  // 所有人拥有默认静态路由
  sidebarArr: constantRoutes
  // sidebarArr: []
}
const mutations = {
  /**
   * 目标：该数据表示左侧菜单的数据 他就是一个数组
   * 1.我们要筛选出来这个数组 以来三个数据
   * a.用户权限标识
   * b.公开路由表
   * c.私有路由表
   * 权限是一个字符串数据 每个字符串代表了一个菜单标识 所以我们需要给私有路由表加上这个权限标识key 然后对应的筛选即可
   */
  // 设置添加路由 将此方法 调用在 index下
  // setSidebarArr(state) {
  //   // findItems是私有路由表
  //   const findItems = this.getters.menus
  //     .map((key) => {
  //       return privateRoutes.find((item) => {
  //         return item.key === key
  //       })
  //     })
  //     .filter((item) => item)
  //   // console.log(findItems)
  //   state.sidebarArr = [...publishRoutes, ...findItems]
  // state.sidebarArr.push(...findItems)
  // 由于上一个用户的数据未删除 所以当跳转某个页面时
  // console.log(state.sidebarArr)
  // 在左侧菜单数据完成之后 接下来我们期望路由表添加到router
  // console.log(routes)
  // findItems.forEach((route) => {
  //   routes.addRoute(route)
  // })
  // routes.addRoute({ path: '*', redirect: '/404', hidden: true })
  // return findItems
  // console.log(this.getters.menus)
  // }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
