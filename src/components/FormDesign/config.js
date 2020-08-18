export const formConfig = {
  span: 24,
  fieldHeight: 60,
  labelPosition: 'right',
  labelWidth: 100,
  size: 'small'
}

export const components = [
  {
    type: 'input',
    name: '单行文本',
    options: {
      defaultValue: ''
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    options: {
      defaultValue: ''
    }
  },
  {
    type: 'inputNumber',
    name: '计数器',
    options: {
      defaultValue: 0,
      controls: 'right'
    }
  },
  {
    type: 'switch',
    name: '开关',
    options: {
      defaultValue: false
    }
  },
  {
    type: 'radio',
    name: '单选框',
    options: {
      defaultValue: null,
      remote: false, // 是否远程数据
      remoteUrl: '/api/options', // 远程数据地址
      requestParams: [
        { key: 'count', value: 5 }
      ], // 请求参数
      responsePath: 'data', // 回复数据路径
      // 回复数据格式
      props: {
        label: 'label',
        value: 'value'
      },
      numberValue: true, // 选项的值是否为数字
      options: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 }
      ]
    }
  },
  {
    type: 'checkbox',
    name: '复选框',
    options: {
      defaultValue: [],
      remote: false, // 是否远程数据
      remoteUrl: '/api/options', // 远程数据地址
      requestParams: [
        { key: 'count', value: 5 }
      ], // 请求参数
      responsePath: 'data', // 回复数据路径
      // 回复数据格式
      props: {
        label: 'label',
        value: 'value'
      },
      numberValue: true, // 选项的值是否为数字
      options: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 }
      ]
    }
  },
  {
    type: 'select',
    name: '下拉框',
    options: {
      defaultValue: null,
      remote: false, // 是否远程数据
      remoteUrl: '/api/options', // 远程数据地址
      requestParams: [
        { key: 'count', value: 5 }
      ], // 请求参数
      responsePath: 'data', // 回复数据路径
      // 回复数据格式
      props: {
        label: 'label',
        value: 'value'
      },
      numberValue: true, // 选项的值是否为数字
      options: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 }
      ]
    }
  },
  {
    type: 'timePicker',
    name: '时间选择器',
    options: {
      defaultValue: null
    }
  },
  {
    type: 'datePicker',
    name: '日期选择器',
    options: {
      defaultValue: null
    }
  }
]
