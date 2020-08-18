<script>
import _ from 'lodash'
import { guid } from '@/utils'

export default {
  name: 'ViewFormItem',
  render (h) {
    return (
      <el-form-item
        class={{
          'view-form-item': true,
          'is-active': this.isActive
        }}
        label={ this.field.name }
        nativeOnClick={ this.handleFieldSelect }>
        { this.renderComponent(h) }
        { this.isActive ? this.renderActiveIcon(h) : '' }
      </el-form-item>
    )
  },
  props: {
    fields: Array,
    field: Object,
    select: Object,
    index: Number
  },
  data () {
    return {
      selectField: this.select
    }
  },
  computed: {
    isActive () {
      return this.field.id === this.selectField.id
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
  },
  methods: {
    // 选中组件
    handleFieldSelect () {
      this.selectField = this.field
      this.$emit('update:select', this.field)
    },
    // 克隆组件
    handleFieldClone (e) {
      e.stopPropagation() // 阻止事件冒泡防止触发组件选中事件
      const cloneId = guid()
      const cloneField = {
        ..._.cloneDeep(this.field),
        id: cloneId,
        key: `${this.field.type}_${cloneId}`
      }
      this.$nextTick(() => {
        this.fields.splice(this.index + 1, 0, cloneField)
        this.selectField = this.fields[this.index + 1]
      })
    },
    // 删除组件
    handleFieldDelete (e) {
      e.stopPropagation() // 阻止事件冒泡防止触发组件选中事件
      this.selectField = {}
      this.$nextTick(() => {
        this.fields.splice(this.index, 1)
      })
    },
    // 选中组件时渲染的图标按钮
    renderActiveIcon (h) {
      return (
        <div>
          <div class="drag-icon-wrap">
            <i class="drag-icon el-icon-rank"></i>
          </div>
          <div class="field-action-wrap">
            <i class="action-icon el-icon-document-copy" onClick={ this.handleFieldClone}></i>
            <i class="action-icon el-icon-delete" onClick={ this.handleFieldDelete }></i>
          </div>
        </div>
      )
    },
    renderComponent (h) {
      switch (this.field.type) {
        case 'input':
          return this.renderInput(h)
        case 'textarea':
          return this.renderTextArea(h)
        case 'inputNumber':
          return this.renderInputNumber(h)
        case 'switch':
          return this.renderSwitch(h)
        case 'radio':
          return this.renderRadio(h)
        case 'checkbox':
          return this.renderCheckbox(h)
        case 'select':
          return this.renderSelect(h)
        case 'timePicker':
          return this.renderTimePicker(h)
        case 'datePicker':
          return this.renderDatePicker(h)
      }
    },
    renderInput (h) {
      return (
        <el-input></el-input>
      )
    },
    renderTextArea (h) {
      return (
        <el-input
          type="textarea"></el-input>
      )
    },
    renderInputNumber (h) {
      return (
        <el-input-number
          controls={ this.field.options.controls !== 'none' }
          controls-position= { this.field.options.controls }></el-input-number>
      )
    },
    renderSwitch (h) {
      return (
        <el-switch></el-switch>
      )
    },
    renderRadio (h) {
      return (
        <el-radio-group>
          {
            this.field.options.options.map(option => {
              return <el-radio label={ option.value }>{ option.label }</el-radio>
            })
          }
        </el-radio-group>
      )
    },
    renderCheckbox (h) {
      return (
        <el-checkbox-group
          vModel={ this.field.options.defaultValue }>
          {
            this.field.options.options.map(option => {
              return <el-checkbox label={ option.value }>{ option.label }</el-checkbox>
            })
          }
        </el-checkbox-group>
      )
    },
    renderSelect (h) {
      return (
        <el-select
          vModel={ this.field.options.defaultValue }>
          {
            this.field.options.options.map(option => {
              return <el-option value={ option.value } label={ option.label }></el-option>
            })
          }
        </el-select>
      )
    },
    renderTimePicker (h) {
      return (
        <el-time-picker></el-time-picker>
      )
    },
    renderDatePicker (h) {
      return (
        <el-date-picker></el-date-picker>
      )
    }
  }
}
</script>

<style scoped>
.view-form-item {
  border: 1px dashed gray;
}
.drag-icon-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 28px;
    line-height: 28px;
    background: #409EFF;
    z-index: 2;
    text-align: center;
    cursor: move;
}
.drag-icon {
    color: white;
}
.field-action-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 28px;
    text-align: right;
}
.action-icon {
    background: #409EFF;
    color: white;
    margin-left: 5px;
    padding: 5px;
    cursor: pointer;
}
</style>
