<template>
  <div class="container">
    <h1>管理员权限页面</h1>
    <p>只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到401页面，重新用管理员账号登录才有权限。</p>
    <p>想尝试一下，请<span @click="handleLogout" class="logout">退出登录</span>，随便输入个账号名，再进来试试看。</p>
  </div>
</template>

<script>
export default {
  name: 'Permission',
  methods: {
    async handleLogout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
  margin: 30px 0;
}
p{
  line-height: 30px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.logout{
  color: #409EFF;
  cursor: pointer;
}
</style>
