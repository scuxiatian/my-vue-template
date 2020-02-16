import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout' /* Layout */
import { getToken } from '@/utils/auth'

Vue.use(Router)

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
      children: [
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
    },
    {
      path: '/login',
      component: () => import('@/views/login'),
      meta: { title: '登录' }
    },
    {
      path: '/*',
      component: () => import('@/views/errors/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 设置网站title
  document.title = `${to.meta.title} | Vue.js 开发模板`

  const token = getToken()
  // 已登录
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
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
