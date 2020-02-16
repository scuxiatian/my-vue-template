<template>
  <div class="tags" v-if="showTags">
    <!-- 标签列表 -->
    <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
        <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
        <span class="tags-li-icon" @click="closeTags(item.path, index)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
    <!-- 标签控制下拉菜单 -->
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">标签选项 <i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其它</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TagsView',
  computed: {
    ...mapGetters([
      'tagsList'
    ]),
    showTags () {
      return this.tagsList.length > 0
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.fullPath
    },
    // 设置标签
    setTags (route) {
      this.$store.commit('app/UPDATE_TAGS', { route })
    },
    // 关闭单个标签
    closeTags (path, index) {
      this.$store.commit('app/REMOVE_TAGS', { mode: 0, index })
      // 如果关闭的标签为当前标签
      if (path === this.$route.fullPath) {
        if (this.tagsList.length > 0) {
          this.$router.push(this.tagsList[0].path)
        } else if (path !== '/dashboard') {
          this.$router.push('/dashboard')
        }
      }
    },
    handleTags (cmd) {
      if (cmd === 'other') { // 关闭其他标签
        const index = this.tagsList.findIndex(item => item.path === this.$route.fullPath)
        this.$store.commit('app/REMOVE_TAGS', { mode: 1, index })
      } else { // 关闭全部标签
        this.$store.commit('app/REMOVE_TAGS', { mode: 2 })
        if (this.$route.fullPath !== '/dashboard') {
          this.$router.push('/dashboard')
        }
      }
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  created () {
    this.setTags(this.$route)
  }
}
</script>

<style>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all .3s ease-in;
  -moz-transition: all .3s ease-in;
  transition: all .3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
  z-index: 10;
}

</style>
