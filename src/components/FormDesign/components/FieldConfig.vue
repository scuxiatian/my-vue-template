<template>
  <el-form v-if="data && Object.keys(data).length > 0" size="mini">
    <!-- 通用配置 -->
    <el-form-item label="字段名称">
      <el-input v-model="data.key"></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="data.name"></el-input>
    </el-form-item>
    <el-form-item label="列宽">
      <el-input-number v-model="data.span"></el-input-number>
      <div class="config-tip">列宽留空表示用表单配置中的列宽</div>
    </el-form-item>
    <!-- 默认值配置 -->
    <el-form-item label="默认值" v-if="hasOption('defaultValue') && data.type !== 'radio' && data.type !== 'checkbox' && data.type !== 'select'">
      <el-input v-if="typeof data.options.defaultValue === 'string'" v-model="data.options.defaultValue"></el-input>
      <el-input-number v-else-if="typeof data.options.defaultValue === 'number'" v-model="data.options.defaultValue"></el-input-number>
      <el-switch v-else-if="typeof data.options.defaultValue === 'boolean'" v-model="data.options.defaultValue"></el-switch>
      <el-time-picker v-else-if="data.type === 'timePicker'" v-model="data.options.defaultValue"></el-time-picker>
      <el-date-picker v-else-if="data.type === 'datePicker'" v-model="data.options.defaultValue"></el-date-picker>
    </el-form-item>
    <!-- 计数器配置 -->
    <el-form-item label="控制按钮" v-if="data.type === 'inputNumber'">
      <el-select v-model="data.options.controls">
        <el-option label="无" value="none"></el-option>
        <el-option label="两侧" value="default"></el-option>
        <el-option label="右侧" value="right"></el-option>
      </el-select>
    </el-form-item>
    <!-- 选项配置（单选框，多选框，下拉框） -->
    <el-form-item label="选项" v-if="data.type === 'radio' || data.type === 'checkbox' || data.type === 'select'">
      <el-radio-group v-model="data.options.remote">
        <el-radio-button :label="false">静态数据</el-radio-button>
        <el-radio-button :label="true">远程数据</el-radio-button>
      </el-radio-group>
      <!-- 远程获取选项配置 -->
      <div class="remote-option-config" v-if="data.options.remote">
        <el-input v-model="data.options.remoteUrl">
          <span slot="prepend">远程数据地址</span>
        </el-input>
        <el-input v-model="data.options.responsePath">
          <span slot="prepend">回复数据路径</span>
        </el-input>
        <el-input v-model="data.options.props.label">
          <span slot="prepend">选项显示键名</span>
        </el-input>
        <el-input v-model="data.options.props.value">
          <span slot="prepend">选项的值键名</span>
        </el-input>
        <div class="table-title">请求参数</div>
        <el-table :data="data.options.requestParams" size="mini">
          <el-table-column label="键" prop="key">
            <template slot-scope="{ row }">
              <el-input v-model="row.key"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="值" prop="value">
            <template slot-scope="{ row }">
              <el-input v-model="row.value"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ $index }">
              <i class="remove-icon el-icon-remove" @click="data.options.requestParams.splice($index, 1)"></i>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="text" size="mini" icon="el-icon-plus" @click="data.options.requestParams.push({})">添加参数</el-button><br>
        <el-button type="primary" size="mini" icon="el-icon-s-promotion" :loading="apiTestLoading" @click="apiTest">接口测试</el-button>
      </div>
      <!-- 静态选项配置 -->
      <div class="static-option-config" v-else>
        <el-checkbox v-model="data.options.numberValue">选项值为数字</el-checkbox>
        <el-checkbox-group v-if="data.type === 'checkbox'" class="option-list" v-model="data.options.defaultValue">
          <draggable :list="data.options.options" v-bind="dragOptions">
            <el-checkbox
              v-for="(option, index) of data.options.options"
              :key="index"
              class="option-item"
              :label="option.value">
              <el-input v-model="option.label" class="inline-input"></el-input>
              <el-input-number v-if="data.options.numberValue" v-model="option.value" class="inline-input" controls-position="right"></el-input-number>
              <el-input v-else v-model="option.value" class="inline-input"></el-input>
              <i class="drag-option el-icon-rank"></i>
              <i class="remove-icon el-icon-remove" @click="data.options.options.splice(index, 1)"></i>
            </el-checkbox>
          </draggable>
        </el-checkbox-group>
        <el-radio-group v-else class="option-list" v-model="data.options.defaultValue">
          <draggable :list="data.options.options" v-bind="dragOptions">
            <el-radio
              v-for="(option, index) of data.options.options"
              :key="index"
              class="option-item"
              :label="option.value">
              <el-input v-model="option.label" class="inline-input"></el-input>
              <el-input-number v-if="data.options.numberValue" v-model="option.value" class="inline-input" controls-position="right"></el-input-number>
              <el-input v-else v-model="option.value" class="inline-input"></el-input>
              <i class="drag-option el-icon-rank"></i>
              <i class="remove-icon el-icon-remove" @click="data.options.options.splice(index, 1)"></i>
            </el-radio>
          </draggable>
        </el-radio-group>
        <el-button type="text" size="mini" icon="el-icon-plus" @click="addOption">添加选项</el-button>
      </div>
    </el-form-item>
    <!-- JSON查看 -->
    <el-dialog :visible.sync="jsonDialogVisible">
      <json-editor class="json-preview" v-model="jsonClone"></json-editor>
    </el-dialog>
  </el-form>
</template>

<script>
import Draggable from 'vuedraggable'
import JsonEditor from '@/components/JsonEditor'
import request from '@/utils/request'

export default {
  name: 'FieldConfig',
  components: {
    Draggable,
    JsonEditor
  },
  props: {
    data: Object
  },
  data () {
    return {
      dragOptions: {
        group: 'options',
        handle: '.drag-option'
      },
      apiTestLoading: false,
      jsonClone: {},
      jsonDialogVisible: false
    }
  },
  methods: {
    // 是否显示配置项
    hasOption (optionName) {
      return Object.keys(this.data.options).indexOf(optionName) >= 0
    },
    // 单选框/多选框/下拉框 新增选项
    addOption () {
      this.data.options.options.push({
        label: '新选项',
        value: this.data.options.numberValue ? 0 : '新选项'
      })
    },
    // 远程选项接口测试
    apiTest () {
      this.apiTestLoading = true
      const options = this.data.options
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
        this.apiTestLoading = false
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
        this.jsonClone = data
        this.jsonDialogVisible = true
      })
    }
  }
}
</script>

<style scoped>
.el-form {
  height: 500px;
  overflow: auto;
}
.config-tip {
  color: #F56C6C;
  font-size: 12px;
}
.static-option-config, .remote-option-config {
  margin-top: 20px;
}
.option-list {
  display: block;
}
.option-item {
  display: block;
  margin-top: 10px;
  margin-right: 0;
}
.inline-input {
  width: 35%;
  margin-right: 5px;
}
.drag-option {
  font-size: 15px;
  color: black;
  cursor: move;
}
.remove-icon {
  margin-left: 8px;
  font-size: 15px;
  color: #F56C6C;
  cursor: pointer;
}
.table-title {
  color: #606266;
  margin: 5px 0;
}
</style>
