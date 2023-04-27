import { createRouter, createWebHistory } from "vue-router";

import Layout from "@/layout";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/planup"),
        meta: {
          title: "上报管理",
          icon: "monitor",
        },
      },
    ],
  },
  {
    path: "/plan",
    component: Layout,
    redirect: "/plan/manage",
    children: [
      {
        path: "/plan/manage",
        component: () => import("@/views/plan"),
        meta: {
          title: "计划管理",
          icon: "files",
        },
      },
    ],
  },
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/manage",
    children: [
      {
        path: "/goods/manage",
        component: () => import("@/views/goods"),
        meta: {
          title: "产品管理",
          icon: "goods",
        },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/manage",
    children: [
      {
        path: "/user/manage",
        component: () => import("@/views/shiftuser"),
        meta: {
          title: "用户管理",
          icon: "user",
        },
      },
    ],
  },
  {
    path: "/config",
    component: Layout,
    redirect: "/config/manage",
    children: [
      {
        path: "/config/manage",
        component: () => import("@/views/config"),
        meta: {
          title: "配置管理",
          icon: "setting",
        },
      },
    ],
  },
  {
    path: "/planup",
    component: Layout,
    children:[
      {
        path: "/planup/user",
        component: () => import("@/views/planup/user"),
        hidden: true,
        meta: {
          title: "人员图表",
        },
      },
      {
        path: "/planup/money",
        component: () => import("@/views/planup/money"),
        hidden: true,
        meta: {
          title: "模拟工资",
        },
      },
    ],
    hidden: true,
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
