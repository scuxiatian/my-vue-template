<template>
  <el-form label-position="top" size="small">
    <el-form-item label="标签对齐方式">
      <el-radio-group v-model="data.labelPosition">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="表单控件列宽">
      <el-input-number v-model="data.span" :min="1" :max="24" :step="1"></el-input-number>
    </el-form-item>

    <el-form-item label="表单控件高度">
      <el-input-number v-model="data.fieldHeight" :min="0" :max="100" :step="2"></el-input-number>
    </el-form-item>

    <el-form-item label="表单标签宽度">
      <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="5"></el-input-number>
    </el-form-item>

    <el-form-item label="组件尺寸">
      <el-radio-group v-model="data.size">
        <el-radio-button label="medium">medium</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
        <el-radio-button label="mini">mini</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FormConfig',
  props: {
    data: Object
  }
}
</script>
