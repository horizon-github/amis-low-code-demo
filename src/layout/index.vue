<template>
  <el-container class="app-container">
    <el-aside class="sidebar-container">
      <sidebar/>
    </el-aside>
    <el-container class="main-container">
      <el-header class="nav-container">
        <navbar/>
      </el-header>
      <el-main class="app-main-container">
        <appMain/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppMain from "@/layout/components/AppMain";
import Navbar from "@/layout/components/Navbar";
import Sidebar from "@/layout/components/Sidebar";

export default {
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  height: 100%;
  .sidebar-container {
    width: 80px;
    box-shadow: 5px 0px 5px rgb(0 0 0 / 10%);
    background-color: #ffffff;
    overflow: visible;
    z-index: 50;
  }
  .main-container {
    z-index: 30;
    .nav-container {
      background-color: #ffffff;
      box-shadow: 0px 3px 5px rgb(0 0 0 / 5%);
      --el-header-height: 50px;
      --el-header-padding: 0
      z-index: 20;
    }
    .app-main-container {
      background-color: #f0f2f5;
      --el-main-padding: 0
      z-index: 10;
    }
  }
}
</style>
