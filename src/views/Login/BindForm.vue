<template>
  <div>
    <div class="form s-c">
      <div class="title s-c">
        <span>绑定手机号</span>
        <!-- <span class="tip">(已绑定，去登录)</span> -->
      </div>
      <div class="input">
        <md-input-item placeholder="请输入姓名" v-model="bindData.username">
          <i slot="left" class="iconfont iconxingming"></i>
        </md-input-item>
      </div>
      <div class="input">
        <md-input-item placeholder="请输入卡号" v-model="bindData.employeeCardNumber">
          <i slot="left" class="iconfont iconxingming"></i>
        </md-input-item>
      </div>
      <div class="input">
        <md-input-item placeholder="请输入手机号" v-model="bindData.mobile">
          <i slot="left" class="iconfont iconziyuan"></i>
          <span
            slot="right"
            class="captcha"
            :class="timer?'sended':''"
            @click="getCaptcha()"
          >{{tip}}</span>
        </md-input-item>
      </div>
      <div class="input">
        <md-input-item placeholder="请输入验证码" v-model="bindData.captcha">
          <i slot="left" class="iconfont iconyanzhengma"></i>
        </md-input-item>
      </div>
      <div class="submit">
        <md-button type="primary" inline size="small" @click="startBind">
          <span v-show="!loading">立&nbsp;即&nbsp;绑&nbsp;定</span>
          <md-activity-indicator
            type="spinner"
            color="light"
            text-color="light"
            :size="30"
            :text-size="16"
            v-show="loading"
          >绑定中...</md-activity-indicator>
        </md-button>
        <md-button type="default" inline size="small" @click="toggle">
          <span>已绑定,去登录</span>
        </md-button>
        <div class="tip s-a-l">
          <span class>*&nbsp;</span>
          <span class>如提示未匹配到信息，请确认手机号和姓名是否正确或前往物业进行信息登记！</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast } from "mand-mobile";
import { checkUsername, checkMobile, checkCaptcha } from "@/util/check";
export default {
  data() {
    return {
      // bindData: {},
      loading: false,
      tip: "获取验证码",
      timer: null
    };
  },
  props: ["toggle"],
  computed: {
    ...mapState(["bindData"])
  },
  methods: {
    getSendCodeData() {
      return {
        content: JSON.stringify({
          name: this.bindData.username,
          phone: this.bindData.mobile,
          employeeCardNumber: this.bindData.employeeCardNumber
        })
      };
    },
    getBindPhoneData() {
      return {
        content: JSON.stringify({
          name: this.bindData.username,
          phone: this.bindData.mobile,
          employeeCardNumber: this.bindData.employeeCardNumber,
          bindingVerificationCode: this.bindData.captcha
        })
      };
    },
    getCaptcha() {
      if (this.timer) {
        return;
      }
      if (!this.bindData.username) {
        Toast.failed("请输入姓名", 1500);
        return;
      }
      if (!this.bindData.employeeCardNumber) {
        Toast.failed("请输入卡号", 1500);
        return;
      }
      if (!this.bindData.mobile) {
        Toast.failed("请输入手机号", 1500);
        return;
      }
      if (!checkMobile(this.bindData.mobile)) {
        Toast.failed("请输入格式正确的手机号", 1500);
        return;
      }
      const data = this.getSendCodeData();
      this.$http.bind.sendCode(data).then(res => {
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
    },
    startBind() {
      if (!this.bindData.username) {
        Toast.failed("请输入姓名", 1500);
        return;
      }
      if (!this.bindData.employeeCardNumber) {
        Toast.failed("请输入卡号", 1500);
        return;
      }
      if (!this.bindData.mobile) {
        Toast.failed("请输入手机号", 1500);
        return;
      }
      if (!checkMobile(this.bindData.mobile)) {
        Toast.failed("请输入格式正确的手机号", 1500);
        return;
      }
      if (!checkCaptcha(this.bindData.captcha)) {
        Toast.failed("请输入验证码", 1500);
        return;
      }
      const data = this.getBindPhoneData();
      this.loading = true;
      this.$http.bind
        .phone(data, () => {
          this.loading = false;
        })
        .then(res => {
          this.loading = false;
          this.$ls.set("user", res.data.data);
          const toPath = this.$ls.get("toPath");
          this.$router.replace(toPath ? toPath : "/order/dish");
        });
    }
  }
};
</script>
<style lang="scss">
.login {
  .form {
    .title {
      width: 100%;
    }
    .submit {
      .md-button {
        width: 45%;
        font-size: 14px;
        padding: 0 0px;
        &:nth-child(2) {
          // background: #ccc;
          width: 35%;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>


