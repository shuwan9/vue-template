<template>
  <div class="form s-c">
    <div class="title s-c">登&nbsp;&nbsp;录</div>
    <div class="input">
      <md-input-item placeholder="请输入姓名" v-model="login.username">
        <i slot="left" class="iconfont iconxingming"></i>
      </md-input-item>
    </div>
    <div class="input">
      <md-input-item placeholder="请输入手机号" v-model="login.mobile">
        <i slot="left" class="iconfont iconziyuan"></i>
        <!-- <span slot="right" class="captcha" :class="timer?'sended':''" @click="getCaptcha()">{{tip}}</span> -->
      </md-input-item>
    </div>
    <div class="input">
      <md-input-item placeholder="请输入验证码" v-model="login.captcha">
        <i slot="left" class="iconfont iconyanzhengma"></i>
      </md-input-item>
    </div>
    <Submit></Submit>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mand-mobile";
import Submit from "./Submit.vue";
export default {
  data() {
    return {
      tip: "获取验证码",
      timer: null
    };
  },
  components: {
    Submit
  },
  computed: {
    ...mapState(["login"])
  },
  methods: {
    getSendCodeData() {
      return {
        content: JSON.stringify({
          name: this.login.username,
          phone: this.login.mobile
        })
      };
    },
    getCaptcha() {
      if (this.timer) {
        return;
      }
      if (!this.login.username) {
        Toast.failed("请输入用户名", 1500);
        return;
      }
      if (!this.login.mobile) {
        Toast.failed("请输入手机号", 1500);
        return;
      }
      const data = this.getSendCodeData();
      this.$http.sendCode(data).then(res => {
        const { code, message } = res.data;
        Toast.info(message, 1500);
      });

      let total = 60;
      this.tip = `(${total})秒后重新发送`;
      this.timer = setInterval(() => {
        total--;
        if (total == -1) {
          clearInterval(this.timer);
          this.timer = null;
          this.tip = "获取验证码";
        } else {
          this.tip = `(${("0" + total).slice(-2)})秒后重新发送`;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.login {
  .form {
    position: absolute;
    top: 18vh;
    width: 80%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 10px 19px 1px rgba(67, 115, 236, 0.18);
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    .title {
      position: absolute;
      top: -40px;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
    }
    .input {
      padding: 20px 0;
      .iconfont {
        font-size: 25px;
      }
      .captcha {
        font-size: 14px;
        color: #4373ec;
        &.sended {
          color: #888;
        }
      }
      .md-field-item-content {
        min-height: auto;
      }
      .md-input-item-input {
        // padding-left: 30px;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
      }
    }
  }
}
</style>