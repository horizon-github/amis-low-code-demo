<template>
  <div class="nav-bar">
    <el-icon><burger /></el-icon>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];
      if (!this.isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "系统首页" } }].concat(
          matched
        );
      }
      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "dashboard";
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-icon {
    margin-left: 20px;
    height: 50px;
    line-height: 50px;
    float: left;
    font-size: 20px;
  }
  .app-breadcrumb {
    font-size: 14px;
    margin-left: 8px;
    height: 50px;
    line-height: 50px;
    float: left;
    a {
      font-weight: 400;
      color: rgb(153, 153, 153);
    }
    .no-redirect {
      color: #666666;
      cursor: text;
    }
  }
}
</style>
