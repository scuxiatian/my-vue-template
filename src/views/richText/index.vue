<template>
  <div class="container">
    <div class="plugins-tips">
      quillEditor：基于Vue的富文本编辑器。
      访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">quillEditor</a>
    </div>
    <quill-editor v-model="content"></quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'RichTextDemo',
  components: {
    quillEditor
  },
  data () {
    return {
      content: ''
    }
  }
}
</script>
