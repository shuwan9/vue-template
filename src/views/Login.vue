<template>
  <div class="login">
    <div class="cmn-center-middle form">
      <div class="container">
        <q-input v-model="username" float-label="请输入姓名" />
      </div>
      <div class="container">
        <q-input
          v-model="mobile"
          float-label="请输入手机号"
          @keypress.enter.native="checkLogin"
        />
      </div>
      <div class="container">
        <q-btn
          push
          color="primary"
          label="登 录"
          :loading="loading"
          @click="checkLogin"
        >
          <span slot="loading">
            登录中
            <q-spinner-dots class="on-left" />
          </span>
        </q-btn>
      </div>
      <div class="container">
        <p>
          提示：如果提示未匹配到信息，请确认手机号和姓名是否正确或前往物业进行信息登记
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { plugins } from "quasar";
import { check } from "../util";
const config = {
  notifyPosition: "top",
  notifyTimeout: 100,
  usernameErrTip: "请输入姓名",
  mobileErrTip: "请输入格式正确的手机号"
};
const { checkUsername, checkMobile } = check;
const { Notify } = plugins;
const notify = message => {
  Notify.create({
    message,
    position: config.notifyPosition,
    timeout: config.notifyTimeout
  });
};
export default {
  name: "login",
  data() {
    return {
      username: "",
      mobile: "",
      loading: false
    };
  },
  methods: {
    checkLogin() {
      if (this.loading) {
        return;
      }
      if (!checkUsername(this.username)) {
        notify(config.usernameErrTip);
        return;
      }
      if (!checkMobile(this.mobile)) {
        notify(config.mobileErrTip);
        return;
      }
      this.login();
    },
    login() {
      this.loading = true;
      setTimeout(() => {
        this.$ls.set("signed", 1);
        const to = this.$ls.get("to");
        this.$router.push({
          path: to ? to.path : "/vegetable/list"
        });
      }, 1000);
    }
  },
  components: {},
  mounted() {}
};
</script>
<style lang="scss">
.login {
  position: relative;
  .form {
    width: 90%;
    padding: 0 20px;
    .container {
      padding: 15px 5px;
      button {
        width: 100%;
        margin: 10px 0 0 0;
        padding: 15px 0;
        font-size: 16px;
      }
      p {
        color: #ccc;
        padding: 10px 0;
      }
    }
  }
}
</style>

