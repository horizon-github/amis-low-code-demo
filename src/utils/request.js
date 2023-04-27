import axios from "axios";
import store from '@/store'
import router from "@/router"
import { ElNotification } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
});

service.interceptors.request.use((config) => {
    if ( store.state.user.jwtExp < (new Date().getTime()/1000)) {
      store.dispatch("user/signOut");
      router.push({ path: "/login" });
    } else {
      config.headers["Authorization"] = store.state.user.jwt
    }
    return config;
  }, (error) => {
    ElNotification({message: error.message, type: 'error'})
    return Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
    const res = response.data;
    if (res.code != 0) {
      ElNotification({message: res.msg, type: 'error'})
      return Promise.reject(error);
    }
    return res
  }, (error) => {
    ElNotification({message: error.message, type: 'error'})
    return Promise.reject(error);
  }
);

export default service;
