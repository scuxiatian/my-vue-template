<template>
  <div class="container">
    <div class="plugins-tips">
      mavonEditor：基于Vue的markdown编辑器。
      访问地址：<a href="https://github.com/hinesboy/mavonEditor" target="_blank">mavonEditor</a>
    </div>
    <mavon-editor v-model="content" style="min-height: 600px"/>
    <el-button class="editor-btn" type="primary">提交</el-button>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'Markdown',
  components: {
    mavonEditor
  },
  data () {
    return {
      content: `**Event 方法**
|name 方法名|params 参数|describe 描述|
|-|-|-|
|change|String: value , String: render|编辑区发生变化的回调事件(render: value 经过markdown解析后的结果)|
|save|String: value , String: render|ctrl + s 的回调事件(保存按键,同样触发该回调)|
|imgAdd|String: filename, File: imgfile|图片文件添加回调事件(filename: 写在md中的文件名, File: File Object)|
|imgDel|String: filename|图片文件删除回调事件(filename: 写在md中的文件名)|`
    }
  }
}
</script>

<style scoped>
.editor-btn{
    margin-top: 20px;
}
</style>
