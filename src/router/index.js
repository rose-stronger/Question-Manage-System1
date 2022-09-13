import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { title } from '@/settings'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  /**
   * 数据概览
   */
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: '数据概览',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '数据概览', icon: 'dashboard' }
      }
    ]
  },
  /**
   * 后台管理
   */
  {
    path: '/base',
    component: Layout,
    redirect: '/base/users',
    name: 'Base',
    meta: { title: '后台管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'users',
        name: '用户',
        component: () => import('@/views/users/index'),
        meta: { title: '用户', icon: 'table' }
      },
      {
        path: 'menus',
        name: '菜单',
        component: () => import('@/views/menus/index'),
        meta: { title: '菜单', icon: 'tree' }
      },
      {
        path: 'permissions',
        name: '权限',
        component: () => import('@/views/permissions/index'),
        meta: { title: '权限', icon: 'tree' }
      },
      {
        path: 'logs',
        name: '日志',
        component: () => import('@/views/logs/index'),
        meta: { title: '日志', icon: 'tree' }
      }
    ]
  },
  /**
   * companys   企业管理
   */
  {
    path: '/companys',
    component: Layout,
    children: [
      {
        path: '/companys/list',
        name: '企业管理',
        component: () => import('@/views/companys/index'),
        meta: { title: '企业管理', icon: 'form' }
      }
    ]
  },
  /**
   * 题库管理
   */
  {
    path: '/questions',
    component: Layout,
    redirect: '/questions/list',
    name: '题库管理',
    meta: {
      title: '题库管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/questions/list/index'), // Parent router-view
        name: '基础题库',
        meta: { title: '基础题库', icon: 'table' }
        // children:[
        //   {
        //     path:'newlyAdded',
        //     component:() => import("@/views/questions/list/component/newlyAdded.vue"),
        //     name:'newlyAdded',
        //     meta:{title:"试题录入"},
        //     hidden:true
        //   }
        // ]
      },
      // {
      //   path:'newlyAdded',
      //   component:() => import("@/views/questions/list/component/newlyAdded.vue"),
      //   name:'newlyAdded',
      //   meta:{title:"试题录入"},
      //   hidden:true
      // },

      {
        path: 'choice',
        component: () => import('@/views/questions/choice/index'),
        name: '精选题库',
        meta: { title: '精选题库', icon: 'table' }
      },
      {
        path: 'new',
        component: () => import('@/views/questions/new/index'),
        name: '试题录入',
        meta: { title: '试题录入', icon: 'table' }
      },
      {
        path: 'randoms',
        component: () => import('@/views/questions/randoms/index'),
        name: '组题列表',
        meta: { title: '组题列表', icon: 'table' }
      }
    ]
  },
  /**
   * 学科管理
   */
  {
    path: '/subjects',
    component: Layout,
    redirect: '/subjects/list',
    name: '学科管理',
    meta: {
      title: '学科管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/subjects/list/index'), // Parent router-view
        name: '学科',
        meta: { title: '学科', icon: 'table' }
      },
      {
        path: 'directorys',
        component: () => import('@/views/subjects/directorys/index'),
        name: '目录',
        meta: { title: '目录', icon: 'table' }
      },
      // {
      //   path: "directorys/:id/:username",
      //   component: () => import("@/views/subjects/directorys/index"),
      //   name: "Directorys",
      //   meta: { title: "目录", icon: "table" },
      //   hidden:true

      // },
      {
        path: 'tags',
        component: () => import('@/views/subjects/tags/index'),
        name: '标签',
        meta: { title: '标签', icon: 'table' }
      }
    ]
  },

  {
    path: '/articles',
    component: Layout,
    children: [
      {
        path: 'list',
        name: '面试技巧',
        component: () => import('@/views/articles/list/index'),
        meta: { title: '面试技巧 ', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
