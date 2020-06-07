<template>
  <div class="container">
    <div class="plugins-tips">
      vue-splitpane：
      访问地址：<a href="https://github.com/PanJiaChen/vue-split-pane#readme" target="_blank">vue-splitpane</a>
    </div>
    <split-pane split="vertical">
      <template slot="paneL">
        <div class="left-container" />
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import SplitPane from 'vue-splitpane'

export default {
  name: 'PaneLayout',
  components: {
    SplitPane
  }
}
</script>

<style  scoped>
  .container {
    position: relative;
    height: 100vh;
  }

  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
</style>
