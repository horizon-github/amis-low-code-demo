<template>
  <div class="user-set">
    <el-avatar class="avatar" :size="30" :src="$store.state.user.headImg"></el-avatar>
    <div class="user-set-menu">
      <div class="user-set-menu-header">
        <el-avatar :size="36" :src="$store.state.user.headImg"></el-avatar>
        <h3>{{ $store.state.user.username }}</h3>
        <p>{{ $store.state.user.nickname }}</p>
      </div>
      <ul class="user-set-menu-nav">
        <li @click="dialog = true">
          <el-icon><edit /></el-icon><span>修改密码</span>
        </li>
        <li @click="signOut">
          <el-icon><switch-button /></el-icon><span>退出登录</span>
        </li>
      </ul>
    </div>
    <el-dialog v-model="dialog" title="修改密码">
      <el-form
        label-width="80px"
        ref="updatePwdForm"
        :model="updatePwdForm"
        :rules="updatePwdRules"
      >
        <el-form-item label="原密码" prop="oldPwd">
          <el-input
            v-model="updatePwdForm.oldPwd"
            type="password"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input
            v-model="updatePwdForm.newPwd"
            type="password"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="重新输入" prop="reNewPwd">
          <el-input
            v-model="updatePwdForm.reNewPwd"
            type="password"
            placeholder="重新请输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="updatePwd">提交</el-button>
      </span>
    </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElLoading, ElMessageBox } from "element-plus";
import { validatePassword } from "@/utils/validate";
import { updatePwd } from "@/api/user";

export default {
  data() {
    return {
      dialog: false,
      updatePwdForm: {
        oldPwd: "",
        newPwd: "",
        reNewPwd: "",
      },
      updatePwdRules: {
        oldPwd: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        newPwd: [
          { required: true, trigger: "blur", validator: (rule, value, callback) => {
             if (value.length < 5) {
                callback(new Error("密码不能少于5位"));
              } else if (value == this.updatePwdForm.oldPwd) {
                callback(new Error("和原密码一致"));
              } else {
                callback();
              }
          } },
        ],
        reNewPwd: [
          { required: true, trigger: "blur", validator: (rule, value, callback) => {
              if (value.length < 5) {
                callback(new Error("密码不能少于5位"));
              } else if (value !== this.updatePwdForm.newPwd) {
                callback(new Error("密码不一致"));
              } else {
                callback();
              }
          } },
        ],
      },
    };
  },
  methods: {
    updatePwd() {
      this.$refs.updatePwdForm.validate((valid) => {
        if (valid) {
            const loading = ElLoading.service({ lock: true });
            updatePwd(this.updatePwdForm).then((response) => {
              this.$store.dispatch("user/signOut");
              this.$router.push({ path: "/login" });
              loading.close();
            }).catch((_) => {
              loading.close();
            })
        }
      });
    },
    signOut() {
      ElMessageBox.confirm("确认退出吗？")
        .then((_) => {
          this.$store.dispatch("user/signOut");
          this.$router.push({ path: "/login" });
        })
        .catch((_) => {});
    },
    handleClose(done) {
      done();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-set {
  padding-top: 20px;
  cursor: pointer;
  width: 100%;
  height: 72px;
  &:hover {
    background-color: rgba(233, 233, 233, 0.3);
    .user-set-menu {
      display: block;
    }
  }
  .avatar {
    margin: 0 auto;
  }
  .user-set-menu {
    text-align: center;
    &:hover {
      display: block;
    }
    display: none;
    background-color: #fff;
    bottom: 0;
    left: 100%;
    width: 150px;
    position: absolute;
    .user-set-menu-header {
      text-align: left;
      cursor: auto;
      height: 65px;
      width: 100%;
      border-bottom: 1px solid #e9e9e9;
      padding-top: 14px;
      .el-avatar {
        float: left;
        margin: 0 10px;
      }
      h3 {
        font-size: 12px;
        color: #666;
        margin: 2px 0 0 0;
        line-height: 16px;
        text-align: left;
      }
      p {
        font-size: 12px;
        color: #999;
        text-align: left;
        margin: 5px 0;
      }
    }
    ul {
      height: 100%;
      width: 100%;
      padding: 0;
      li {
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }
        height: 40px;
        list-style: none;
        .el-icon {
          vertical-align: middle;
          margin-left: -14px;
          margin-right: 8px;
          color: #999;
        }
        span {
          line-height: 40px;
          font-size: 14px;
          color: #999;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>