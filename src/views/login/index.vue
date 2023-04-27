<template>
  <div id="login">
    <div class="bg"></div>
    <div class="panel">
      <div class="panel-left">
        <el-icon><fries /></el-icon>
        <h1>业务管理信息系统平台</h1>
        <h2>Information System Platform</h2>
      </div>
      <div class="panel-right">
        <div class="box">
          <div class="box-header">
            <h3>用户登录</h3>
            &nbsp;
            <span>USER LOGIN</span>
          </div>
          <div class="box-center">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="username">
                <el-input
                  ref="username"
                  size="large"
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                >
                  <template #prefix>
                    <el-icon class="el-input__icon"><avatar /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  ref="password"
                  size="large"
                  v-model="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <el-icon class="el-input__icon"><key /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="large" @click="sigin" type="primary"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(236, 239, 244, 1) url("@/assets/svgs/login_bg.svg")
      repeat center center;
  }
  .panel {
    position: relative;
    width: 800px;
    height: 540px;
    margin: 245px auto;
    overflow: hidden;
    .panel-left {
      float: left;
      width: 330px;
      height: 100%;
      background: #ffffff url("@/assets/svgs/login_plan_left.svg") no-repeat
        center center;
      text-align: center;
      .el-icon {
        margin-top: 40px;
        font-size: 92px;
        color: #ffffff;
      }
      h1 {
        font-weight: 700;
        font-size: 20px;
        color: #ffffff;
      }
      h2 {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
      }
    }
    .panel-right {
      float: left;
      background-color: #ffffff;
      width: 470px;
      height: 100%;
      .box {
        width: 380px;
        margin: 0 auto;
        height: 100%;
        overflow: hidden;
        .box-header {
          padding: 80px 0 30px 0;
          h3 {
            font-size: 18px;
            display: inline;
            color: #666666;
          }
          span {
            font-size: 14px;
            display: inline;
            color: #999999;
          }
        }
        .box-center {
          .el-button {
            width: 100%;
            margin-top: 30px;
          }
          .el-input {
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>

<script>
import { ElLoading } from "element-plus";
import { validatePassword, validateUsername } from "@/utils/validate";

export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    sigin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const loading = ElLoading.service({ lock: true });
          this.$store.dispatch('user/signIn', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
             loading.close();
          }).catch(() => {
             loading.close();
          })
        }
      })
    }
  },
};
</script>
