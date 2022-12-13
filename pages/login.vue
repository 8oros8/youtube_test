<template>
  <div class="login-page">
    <auth-form>

    </auth-form>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Логин'
  },
  layout: 'auth',
  name: 'login'
}
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
