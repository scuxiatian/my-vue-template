<template>
  <div class="container" v-loading="isLoading">
    <el-button v-loading="downloadLoading" icon="el-icon-document" type="success" size="small" @click="handleDownload">导出</el-button>
    <el-table :data="list" border>
      <el-table-column prop="id" label="Id" width="50"></el-table-column>
      <el-table-column prop="title" label="书名"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="price" label="价格" width="80">
        <template slot-scope="scope">{{ scope.row.price | money(scope.row.priceType) }}</template>
      </el-table-column>
      <el-table-column prop="pageCount" label="页数" width="70"></el-table-column>
      <el-table-column prop="publishTime" label="出版时间">
        <template slot-scope="scope">{{ scope.row.publishTime | date }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/book'
import { date } from '@/filters'

export default {
  name: 'Download',
  data () {
    return {
      list: [],
      isLoading: false,
      downloadLoading: false
    }
  },
  created () {
    this.isLoading = true
    fetchList().then(response => {
      this.list = response.data
      this.isLoading = false
    })
  },
  methods: {
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '书名', '作者', '价格', '页数', 'Date']
        const filterVal = ['id', 'title', 'author', 'price', 'pageCount', 'publishTime']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'publishTime') {
          return date(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
</style>
