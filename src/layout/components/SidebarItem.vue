<template>
  <!-- 多级菜单 -->
  <el-submenu v-if="item.children" :index="item.path">
    <template slot="title">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{ item.meta.title }}</span>
    </template>
    <!-- 子菜单 -->
    <sidebar-item v-for="subItem in item.children" :key="subItem.path" :item="subItem"></sidebar-item>
  </el-submenu>
  <!-- 单级菜单 -->
  <router-link v-else :to="item.path">
    <el-menu-item :index="item.path">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
  </router-link>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: Object
  }
}
</script>
