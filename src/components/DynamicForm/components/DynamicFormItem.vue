<script>
import request from '@/utils/request'
import _ from 'lodash'

export default {
  name: 'DynamicFormItem',
  render (h) {
    return (
      <el-form-item
        vLoading={ this.isLoading }
        class={{
          'dynamic-form-item': true
        }}
        label={ this.field.name }>
        { this.renderComponent(h) }
      </el-form-item>
    )
  },
  props: {
    data: Object,
    field: Object
  },
  data () {
    return {
      dataModel: this.data[this.field.key],
      isLoading: false,
      options: []
    }
  },
  computed: {},
  watch: {
    dataModel: {
      handler (val) {
        this.data[this.field.key] = val
        this.$emit('update:data', {
          ...this.data,
          [this.field.key]: val
        })
      },
      deep: true
    },
    data: {
      handler (val) {
        this.dataModel = val[this.field.key]
      },
      deep: true
    }
  },
  methods: {
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
        <el-input
          vModel={ this.dataModel }></el-input>
      )
    },
    renderTextArea (h) {
      return (
        <el-input
          vModel={ this.dataModel }
          type="textarea"></el-input>
      )
    },
    renderInputNumber (h) {
      return (
        <el-input-number
          vModel={ this.dataModel }
          controls={ this.field.options.controls !== 'none' }
          controls-position= { this.field.options.controls }></el-input-number>
      )
    },
    renderSwitch (h) {
      return (
        <el-switch
          vModel={ this.dataModel }></el-switch>
      )
    },
    renderRadio (h) {
      return (
        <el-radio-group
          vModel={ this.dataModel }>
          {
            this.options.map(option => {
              return <el-radio label={ option.value }>{ option.label }</el-radio>
            })
          }
        </el-radio-group>
      )
    },
    renderCheckbox (h) {
      return (
        <el-checkbox-group
          vModel={ this.dataModel }>
          {
            this.options.map(option => {
              return <el-checkbox label={ option.value }>{ option.label }</el-checkbox>
            })
          }
        </el-checkbox-group>
      )
    },
    renderSelect (h) {
      return (
        <el-select
          vModel={ this.dataModel }>
          {
            this.options.map(option => {
              return <el-option value={ option.value } label={ option.label }></el-option>
            })
          }
        </el-select>
      )
    },
    renderTimePicker (h) {
      return (
        <el-time-picker
          vModel={ this.dataModel }></el-time-picker>
      )
    },
    renderDatePicker (h) {
      return (
        <el-date-picker
          vModel={ this.dataModel }></el-date-picker>
      )
    }
  },
  created () {
    if (this.field.type === 'radio' || this.field.type === 'checkbox' || this.field.type === 'select') {
      // 远程获取选项数据
      if (this.field.options.remote) {
        const options = this.field.options
        const params = {}
        options.requestParams.forEach(item => {
        // 提出键值为空的参数
          if (item.key && (item.value !== null || item.value !== undefined)) {
            params[item.key] = item.value
          }
        })
        request({
          url: options.remoteUrl,
          methods: 'get',
          params
        }).then(res => {
          this.isLoading = false
          const paths = options.responsePath.split('.')
          let data = res
          paths.forEach(path => {
            data && (data = data[path])
          })
          data = data.map(item => {
            return {
              label: item[options.props.label],
              value: item[options.props.value]
            }
          })
          this.options = data
        })
      } else {
        this.options = _.cloneDeep(this.field.options.options)
      }
    }
  }
}
</script>

<style scoped>
</style>
