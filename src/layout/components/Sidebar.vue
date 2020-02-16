<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"
      :collapse="sidebarCollapse" :default-active="onRoutes()" unique-opened router>
      <template v-for="item in items">
        <!-- 双级菜单 -->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <!-- 子菜单 -->
            <template v-for="subItem in item.subs">
              <el-menu-item :index="subItem.index" :key="subItem.index">
                <i :class="subItem.icon"></i>
                <span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 单级菜单 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideBar',
  computed: {
    ...mapGetters([
      'sidebarCollapse'
    ])
  },
  data () {
    return {
      // 侧边栏路由
      items: [
        {
          icon: 'el-icon-s-home',
          index: 'dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-s-data',
          index: 'charts',
          title: 'Echarts图表'
        },
        {
          icon: 'el-icon-edit',
          index: 'markdown',
          title: 'Markdown编辑器'
        },
        {
          icon: 'el-icon-eleme',
          index: 'icon',
          title: '图标'
        },
        {
          icon: 'el-icon-document',
          index: '1',
          title: 'Excel',
          subs: [
            {
              index: 'excelDownload',
              title: 'Excel导出'
            },
            {
              index: 'excelUpload',
              title: 'Excel导入'
            }
          ]
        },
        {
          icon: 'el-icon-lock',
          index: 'permission',
          title: '权限测试'
        },
        {
          icon: 'el-icon-warning',
          index: '2',
          title: '错误页面',
          subs: [
            {
              index: '401',
              title: '401'
            },
            {
              index: '404',
              title: '404'
            }
          ]
        },
        {
          icon: 'el-icon-coffee-cup',
          index: 'donate',
          title: '支持作者'
        }
      ]
    }
  },
  methods: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
