<template>
  <el-container>
    <!-- 组件区域 -->
    <el-aside width="250px">
      <el-row class="component-list" :gutter="20">
        <draggable :list="components"
          v-bind="dragOptions">
          <el-col v-for="component of components" :key="component.type" :span="12">
            <div class="component-wrap">
              {{ component.name }}
            </div>
          </el-col>
        </draggable>
      </el-row>
    </el-aside>
    <!-- 表单设计区域 -->
    <el-container>
      <el-header height="45px">
        <el-button type="primary" icon="el-icon-delete" size="small" @click="handleClear">清空</el-button>
        <el-button type="primary" icon="el-icon-view" size="small" @click="preViewDialogShow">预览</el-button>
        <el-button type="primary" icon="el-icon-document" size="small" @click="jsonDialogShow">JSON</el-button>
      </el-header>
      <el-main>
        <view-form :select.sync="selectField" :fields="fields"></view-form>
      </el-main>
    </el-container>
    <!-- 配置区域 -->
    <el-aside>
      <el-tabs v-model="selectConfig">
        <el-tab-pane label="组件配置" name="field">
          <field-config :data="selectField"></field-config>
        </el-tab-pane>
        <el-tab-pane label="表单配置" name="form">
          <form-config :data="formConfig"></form-config>
        </el-tab-pane>
      </el-tabs>
    </el-aside>
    <!-- 预览 -->
    <el-dialog :visible.sync="preViewDialogVisible" fullscreen>
      <!-- 每次打开对话框重新渲染 -->
      <div v-if="preViewDialogVisible">
        <dynamic-form ref="dynamic-form" :data="data" :formConfig="formConfig" :fields="fields" @submit="handleFormSubmit"></dynamic-form>
        <div class="dialog-btn-wrap">
          <el-button type="primary" size="small" icon="el-icon-document" @click="showFormData">提交表单数据</el-button>
        </div>
        <!-- 表单数据 -->
        <el-dialog :visible.sync="formDataDialogVisible" append-to-body>
          <json-editor class="json-preview" v-model="jsonClone"></json-editor>
          <div class="dialog-btn-wrap">
            <el-button type="primary" size="small" icon="el-icon-document" @click="handleCloneJson">复制</el-button>
          </div>
        </el-dialog>
      </div>
    </el-dialog>
    <!-- JSON查看 -->
    <el-dialog :visible.sync="jsonDialogVisible">
      <json-editor class="json-preview" v-model="jsonClone"></json-editor>
      <div class="dialog-btn-wrap">
        <el-button type="primary" size="small" icon="el-icon-document" @click="handleCloneJson">复制</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { components, formConfig } from './config'
import Draggable from 'vuedraggable'
import DynamicForm from '@/components/DynamicForm'
import JsonEditor from '@/components/JsonEditor'
import ViewForm from './components/ViewForm'
import FieldConfig from './components/FieldConfig'
import FormConfig from './components/FormConfig'
import clipboard from '@/utils/clipboard'
import _ from 'lodash'

export default {
  name: 'FormDesign',
  components: {
    Draggable,
    DynamicForm,
    JsonEditor,
    ViewForm,
    FieldConfig,
    FormConfig
  },
  data () {
    return {
      components,
      dragOptions: {
        group: { name: 'formDesign', pull: 'clone', put: false },
        sort: false,
        ghostClass: 'ghost'
      },
      selectConfig: 'field',
      selectField: null,
      formConfig,
      fields: [],
      data: {},
      preViewDialogVisible: false,
      formDataDialogVisible: false,
      jsonClone: {},
      jsonDialogVisible: false
    }
  },
  methods: {
    preViewDialogShow () {
      this.preViewDialogVisible = true
    },
    showFormData () {
      this.$refs['dynamic-form'].submitForm()
    },
    handleFormSubmit (data) {
      this.jsonClone = {
        ..._.cloneDeep(data)
      }
      this.formDataDialogVisible = true
    },
    jsonDialogShow () {
      this.jsonClone = {
        formConfig: { ..._.cloneDeep(this.formConfig) },
        fields: [..._.cloneDeep(this.fields)]
      }
      this.jsonDialogVisible = true
    },
    handleCloneJson (event) {
      clipboard(JSON.stringify({
        formConfig: this.formConfig,
        fields: this.fields
      }), event)
    },
    handleClear () {
      this.selectField = null
      this.fields = []
    }
  }
}
</script>

<style scoped>
.component-list {
  width: 100%;
}
.component-wrap {
  background: #E6A23C;
  color: white;
  border-radius: 20px;
  padding: 5px;
  font-size: 13px;
  text-align: center;
  cursor: move;
}
.el-col {
  margin: 5px 0;
}
.dialog-btn-wrap {
  margin-top: 10px;
  text-align: center;
}
</style>
