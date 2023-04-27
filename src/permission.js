import router from "@/router";
import { ElLoading } from 'element-plus'

import { getAuth } from "@/utils/auth";
import { getPageTitle } from "@/utils/tools";

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  document.title = getPageTitle();
  const auth = getAuth();
  if (auth) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
});
