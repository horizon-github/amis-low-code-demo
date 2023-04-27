<template>
  <template v-if="realPath(item.children, item)">
    <router-link :to="real.path">
      <el-menu-item class="item">
        <el-icon>
          <component :is="real.meta.icon" />
        </el-icon>
        <template #title>{{ real.meta.title }}</template>
      </el-menu-item>
    </router-link>
  </template>
</template>

<script>
import { isExternal } from "@/utils/tools";

export default {
  data() {
    this.real = null;
    return {};
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  methods: {
    realPath(childrens = [], parent) {
      const childrensFilter = childrens.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          return true;
        }
      });
      if (childrensFilter.length > 0) {
        this.real = childrensFilter[0]
      } else {
        this.real = {...parent}
      }
      return !this.real.hidden
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  text-align: center;
  .el-icon {
    font-size: 30px;
  }
}
</style>