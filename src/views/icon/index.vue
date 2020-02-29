<template>
  <div class="container-tips">
    <div class="plugins-tips">Icons 图标</div>
    <el-tabs type="border-card">
      <el-tab-pane label="SVG Icons">
        <div v-for="item of iconsMap" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
          <el-tooltip placement="top">
            <div slot="content">{{ generateIconCode(item) }}</div>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
          <el-tooltip placement="top">
            <div slot="content">{{ generateElementIconCode(item) }}</div>
            <div class="icon-item">
              <i :class="'el-icon-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Awesome Icons">
        <div v-for="item of awesomeIcons" :key="item" @click="handleClipboard(generateAwesomeIconCode(item),$event)">
          <el-tooltip placement="top">
            <div slot="content">{{ generateAwesomeIconCode(item) }}</div>
            <div class="icon-item">
              <i :class="'fa fa-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import icons from './require-icons'
import elementIcons from './element-icon.json'
import awesomeIcons from './awesome-icon.json'
import clipboard from '@/utils/clipboard'

export default {
  name: 'Icon',
  data () {
    return {
      iconsMap: icons,
      elementIcons: elementIcons,
      awesomeIcons: awesomeIcons
    }
  },
  methods: {
    generateIconCode (symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode (symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    generateAwesomeIconCode (symbol) {
      return `<i class="fa fa-${symbol}" />`
    },
    handleClipboard (text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style scoped>
.icon-item {
  margin: 20px;
  height: 85px;
  text-align: center;
  width: 100px;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}

span {
  display: block;
  font-size: 16px;
  margin-top: 10px;
}

.disabled {
  pointer-events: none;
}
</style>
