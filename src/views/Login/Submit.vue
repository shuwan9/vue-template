<template>
  <div class="submit s-a-c">
    <div>
      <md-button type="primary" inline size="small" @click="startLogin">
        <span v-show="!loading">立&nbsp;即&nbsp;登&nbsp;录</span>
        <md-activity-indicator
          type="spinner"
          color="light"
          text-color="light"
          :size="30"
          :text-size="16"
          v-show="loading"
        >登录中...</md-activity-indicator>
      </md-button>
    </div>
    <div class="tip s-a-l">
      <span class>*&nbsp;</span>
      <span class>如提示未匹配到信息，请确认手机号和姓名是否正确或前往物业进行信息登记！</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mand-mobile";
import { checkUsername, checkMobile, checkCaptcha } from "@/util/check";
const checkLogin = (username, mobile, captcha, loading) => {
  if (!checkUsername(username)) {
    Toast.failed("请填写用户名", 1500);
    return false;
  }
  if (!checkMobile(mobile)) {
    Toast.failed("请填写格式正确的手机号", 1500);
    return false;
  }
  if (!checkCaptcha(captcha)) {
    Toast.failed("请填写验证码", 1500);
    return false;
  }
  if (loading) {
    return false;
  }
  return true;
};
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    startLogin() {
      const { loading } = this;
      const { username, mobile, captcha } = this.login;
      if (!checkLogin(username, mobile, captcha, loading)) {
        return;
      }
      this.loading = true;
      const data = {
        content: JSON.stringify({
          phone: mobile,
          verificationCode: captcha
        })
      };
      this.$http.login(data).then(res => {
        this.loading = false;
        this.$ls.set("user", res.data.data);
        const toPath = this.$ls.get("toPath");
        this.$router.push(toPath ? toPath : "/order/dish");
      });
    }
  },
  computed: {
    ...mapState(["login"])
  }
};
</script>

<style lang="scss">
.login {
  .submit {
    margin-top: 20px;
    .md-activity-indicator-text {
      color: #fff;
    }
    .md-button {
      font-size: 16px;
      height: 48px;
      line-height: 48px;
      width: 80%;
      border-radius: 10px;
      overflow: hidden;
      background: linear-gradient(
        90deg,
        rgba(67, 115, 236, 1),
        rgba(63, 157, 244, 1)
      );
    }
    .tip {
      margin: 20px auto;
      margin-top: 30px;
      font-size: 14px;
      width: 90%;
      color: #c2c2c2;
      span {
        &:nth-child(1) {
          color: #e43b3b;
        }
      }
    }
  }
}
</style>