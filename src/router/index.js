import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout' /* Layout */
import { getToken } from '@/utils/auth'
import store from '@/store'

Vue.use(Router)

// 侧边栏中的路由
const sidebarRouter = [
  {
    path: 'dashboard',
    component: () => import('@/views/dashboard'),
    meta: { title: '系统首页' }
  },
  {
    path: 'charts',
    component: () => import('@/views/baseCharts'),
    meta: { title: 'Echarts图表' }
  },
  {
    path: 'icon',
    component: () => import('@/views/icon'),
    meta: { title: '图标' }
  },
  {
    path: 'markdown',
    component: () => import('@/views/markdown'),
    meta: { title: 'Markdown编辑器' }
  },
  {
    path: 'permission',
    component: () => import('@/views/permission'),
    meta: { title: '权限测试', admin: true }
  },
  {
    path: 'excelDownload',
    component: () => import('@/views/excel/download'),
    meta: { title: 'Excel导出' }
  },
  {
    path: 'excelUpload',
    component: () => import('@/views/excel/upload'),
    meta: { title: 'Excel导入' }
  },
  {
    path: '404',
    component: () => import('@/views/errors/404.vue'),
    meta: { title: '404' }
  },
  {
    path: '401',
    component: () => import('@/views/errors/401.vue'),
    meta: { title: '401' }
  },
  {
    path: 'donate',
    component: () => import('@/views/donate'),
    meta: { title: '支持作者' }
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
      children: sidebarRouter
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
