<template>
  <el-scrollbar class="sidebar">
    <logo />
    <el-menu
      :collapse="true"
      :default-active="activeMenu"
      :unique-opened="false"
      :collapse-transition="false"
    >
      <item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <user-set class="user-set-container" />
  </el-scrollbar>
</template>

<script>
import Logo from "@/layout/components/Sidebar/Logo";
import UserSet from "@/layout/components/Sidebar/UserSet";
import Item from "@/layout/components/Sidebar/Item";

export default {
  components: {
    Logo,
    UserSet,
    Item,
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  overflow: visible;
  position: relative;
  background: rgba(24, 145, 255, 1) url("@/assets/svgs/nav_bg.svg") no-repeat center center;
  background-size: cover;
  .el-menu--collapse {
    width: 100%;
  }
  .el-menu {
    --el-menu-active-color: var(--el-text-color-primary);
    --el-menu-text-color: var(--el-text-color-primary);
    --el-menu-hover-text-color: var(--el-text-color-primary);
    --el-menu-bg-color: transparent;
    --el-menu-hover-bg-color: rgba(255, 255, 255, 0.3);
    --el-menu-item-height: 56px;
    --el-menu-item-font-size: var(--el-font-size-base);
    --el-menu-item-hover-fill: var(--el-color-primary-light-9);
    --el-menu-border-color: #e6e6e6;
    border-right: none;
  }
  .user-set-container {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>