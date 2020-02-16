import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

// UI
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 图表
import ECharts from 'vue-echarts'
import 'echarts'

import './icons' // 图标

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // element-ui 默认尺寸
})

Vue.component('v-chart', ECharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
