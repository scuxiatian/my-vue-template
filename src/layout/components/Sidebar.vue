<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"
      :collapse="sidebarCollapse" :default-active="onRoutes()" unique-opened router>
      <template v-for="item in routes">
        <!-- 双级菜单 -->
        <template v-if="item.children">
          <el-submenu :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <!-- 子菜单 -->
            <template v-for="subItem in item.children">
              <el-menu-item :index="subItem.path" :key="subItem.path">
                <i :class="subItem.meta.icon"></i>
                <span slot="title">{{ subItem.meta.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 单级菜单 -->
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
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
      'sidebarCollapse',
      'routes'
    ])
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
