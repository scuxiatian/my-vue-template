<template>
  <div>
    <el-form
      id="viewForm"
      :label-position="formConfig.labelPosition"
      :label-width="`${formConfig.labelWidth}px`"
      :size="formConfig.size">
      <el-row :gutter="10">
        <draggable
          class="form-draggable"
          :list="fields"
          v-bind="dragOptions"
          @add="handleFieldAdd">
          <template v-for="(field, index) of fields">
            <el-col
              v-if="field.id"
              :key="field.id"
              :span="field.span ? field.span : formConfig.span"
              :style="colStyle(formConfig, field)">
              <view-form-item
                :fields="fields"
                :field="field"
                :select.sync="selectField"
                :index="index"></view-form-item>
            </el-col>
          </template>
        </draggable>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ViewFormItem from './ViewFormItem'
import { guid } from '@/utils'
import { formConfig } from '../config'
import _ from 'lodash'

export default {
  name: 'ViewForm',
  components: {
    Draggable,
    ViewFormItem
  },
  props: {
    select: Object,
    fields: Array
  },
  data () {
    return {
      formConfig,
      selectField: this.select,
      dragOptions: {
        group: 'formDesign',
        ghostClass: 'ghost',
        handle: '.drag-icon'
      }
    }
  },
  methods: {
    // 列样式
    colStyle (formConfig, field) {
      return {
        height: `${formConfig.fieldHeight}px`
      }
    },
    // 组件被拖拽到表单域
    handleFieldAdd (e) {
      const index = e.newIndex
      const id = guid()
      this.fields.splice(index, 1, {
        ..._.cloneDeep(this.fields[index]),
        id,
        key: `${this.fields[index].type}_${id}`
      })
      this.selectField = this.fields[index]
    }
  },
  watch: {
    select (val) {
      this.selectField = val
    },
    selectField: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.form-draggable {
  min-height: 480px;
  border: 1px dashed gray;
  overflow: auto;
}
</style>
