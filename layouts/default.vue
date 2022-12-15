<template>
  <div class="default-layout">
    <header-navbar />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'default'
}
</script>

<style scoped>
.default-layout {
  display: block;
  height: 100vh;
  width: 100vw;
}
</style>
