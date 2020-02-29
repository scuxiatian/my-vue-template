<template>
  <div class="wrapper">
    <Header />
    <sidebar />
    <div class="content-box" :class="{'content-collapse':sidebarCollapse}">
      <tags-view />
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Sidebar, Header, TagsView } from './components'

export default {
  name: 'Layout',
  computed: {
    ...mapGetters([
      'sidebarCollapse'
    ])
  },
  components: {
    Sidebar,
    Header,
    TagsView
  }
}
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
}
</style>
