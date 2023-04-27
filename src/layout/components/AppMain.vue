<template>
  <el-scrollbar class="app-main">
     <router-view :key="key" />
  </el-scrollbar>
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>