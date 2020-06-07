<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"
      :collapse="sidebarCollapse" :default-active="onRoutes()" unique-opened>
      <sidebar-item v-for="item in routes" :key="item.path" :item="item"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  name: 'SideBar',
  components: {
    SidebarItem
  },
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
