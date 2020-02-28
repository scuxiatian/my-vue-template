import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout' /* Layout */
import { getToken } from '@/utils/auth'
import store from '@/store'

Vue.use(Router)

// 侧边栏中的路由
/* 路由配置meta说明：
    titlle：侧边栏与Tag标签中显示的标题
    icon：侧边栏图标
    index：单级菜单不配置，双级菜单配置为父菜单索引（在同一个父菜单下的子菜单需配置为同一值）
    parentIcon: 父菜单图标（仅第一个子菜单需配置）
    parentTitle: 父菜单标题（仅第一个子菜单需配置）
  注意：同一父菜单下的子菜单需处于连续位置
*/
export const sidebarRouters = [
  {
    path: 'dashboard',
    component: () => import('@/views/dashboard'),
    meta: { title: '系统首页', icon: 'el-icon-s-home' }
  },
  {
    path: 'charts',
    component: () => import('@/views/baseCharts'),
    meta: { title: 'Echarts图表', icon: 'el-icon-s-data' }
  },
  {
    path: 'icon',
    component: () => import('@/views/icon'),
    meta: { title: '图标', icon: 'el-icon-eleme' }
  },
  {
    path: 'markdown',
    component: () => import('@/views/markdown'),
    meta: { title: 'Markdown编辑器', icon: 'el-icon-edit' }
  },
  {
    path: 'permission',
    component: () => import('@/views/permission'),
    meta: { title: '权限测试', admin: true, icon: 'el-icon-lock' }
  },
  {
    path: 'excelDownload',
    component: () => import('@/views/excel/download'),
    meta: { title: 'Excel导出', index: '1', parentIcon: 'el-icon-document', parentTitle: 'Excel' }
  },
  {
    path: 'excelUpload',
    component: () => import('@/views/excel/upload'),
    meta: { title: 'Excel导入', index: '1' }
  },
  {
    path: '404',
    component: () => import('@/views/errors/404.vue'),
    meta: { title: '404', index: '2', parentIcon: 'el-icon-warning', parentTitle: '错误页面' }
  },
  {
    path: '401',
    component: () => import('@/views/errors/401.vue'),
    meta: { title: '401', index: '2' }
  },
  {
    path: 'donate',
    component: () => import('@/views/donate'),
    meta: { title: '支持作者', icon: 'el-icon-coffee-cup' }
  }
]

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: Layout,
      meta: { title: '自述文件' },
      children: sidebarRouters
    },
    {
      path: '/login',
      component: () => import('@/views/login'),
      meta: { title: '登录' }
    },
    {
      path: '/*',
      component: () => import('@/views/errors/404.vue')
    },
    {
      path: '/noPerimission',
      component: () => import('@/views/errors/401.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // 设置网站title
  document.title = `${to.meta.title} | Vue.js 开发模板`

  const token = getToken()
  // 已登录
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const { role } = await store.dispatch('user/getInfo')
      const routes = store.getters.routes
      if (!routes || routes.length === 0) {
        store.commit('app/SET_ROUTES')
      }
      // 判断用户权限
      if (to.meta.admin && role !== 0) {
        next('/noPerimission')
      } else {
        next()
      }
    }
  // 未登录
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
  next()
})

export default router
