<template>
    <div class="logo">
        <el-icon><fries /></el-icon>
    </div>
</template>

<script>
export default {
    data() {
        return {
            "show": false
        }
    }
}
</script>
<style lang="scss" scoped>
    .logo {
        width: 100%;
        height: 60px;
        text-align: center;
        .el-icon {
          margin-top: 10px;
          font-size: 42px;
          color: #ffffff;
      }
    }
</style>