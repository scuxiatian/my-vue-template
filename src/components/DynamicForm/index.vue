<template>
  <div>
    <el-form
      ref="dynamic-form"
      :model="models"
      :label-position="formConfig.labelPosition"
      :label-width="`${formConfig.labelWidth}px`"
      :size="formConfig.size">
      <el-row :gutter="10">
        <el-col
          v-for="field of fields"
          :key="field.id"
          :span="field.span ? field.span : formConfig.span"
          :style="colStyle(formConfig, field)">
          <dynamic-form-item
            :field="field"
            :data.sync="models"></dynamic-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import DynamicFormItem from './components/DynamicFormItem'
import _ from 'lodash'

export default {
  name: 'DynamicForm',
  components: {
    DynamicFormItem
  },
  props: {
    data: Object,
    formConfig: Object,
    fields: Array
  },
  data () {
    return {
      models: {}
    }
  },
  methods: {
    // 列样式
    colStyle (formConfig, field) {
      return {
        height: `${formConfig.fieldHeight}px`
      }
    },
    // 生成表单模型
    generateModels () {
      for (const field of this.fields) {
        this.models[field.key] = _.cloneDeep(field.options.defaultValue)
      }
    },
    // 提交表单
    submitForm () {
      this.$refs['dynamic-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.$emit('submit', this.models)
      })
    }
  },
  created () {
    this.generateModels()
  }
}
</script>
