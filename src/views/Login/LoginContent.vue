<template>
  <div class="form">
    <div class="title s-a-c">登&nbsp;&nbsp;录</div>
    <div class="content">
      <login-form></login-form>
      <div class="btn s-a-c">
        <mu-button @click="startLogin" v-loading="loging">立&nbsp;&nbsp;即&nbsp;&nbsp;登&nbsp;&nbsp;录</mu-button>
      </div>
      <div class="tip s-a-l">
        <div>
          <span>*&nbsp;&nbsp;</span>
          <span>如提示未匹配到信息，请确认手机号和姓名是否正确或前往物业进行信息登记！</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm";
export default {
  data() {
    return {
      loging: true,
      test: 2 >= 4
    };
  },
  methods: {
    startLogin() {
      console.log(1);
    }
  },
  components: {
    LoginForm
  }
};
</script>

<style lang="scss" scoped>
.form {
  position: absolute;
  top: 20vh;
  width: 100vw;
  .title {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .content {
    border-radius: 5px;
    background-color: #fff;
    width: 85vw;
    margin: 0 auto;
    padding: 40px 15px 60px 15px;
    font-size: 12px;
    box-shadow: 0px 10px 19px 1px rgba(67, 115, 236, 0.18);
    .btn {
      button {
        padding: 20px 0;
        background: linear-gradient(
          90deg,
          rgba(67, 115, 236, 1),
          rgba(63, 157, 244, 1)
        );
        border-radius: 10px;
        color: #fff;
        width: 90%;
      }
    }
    .tip {
      padding: 30px 0 0 0;
      width: 90%;
      margin: 0 auto;
      font-size: 12px;
      div {
        span:nth-child(1) {
          color: #e43b3b;
        }
      }
    }
  }
}
</style>