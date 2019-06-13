<template>
  <div class="login">
    <login-bg></login-bg>
    <login-content></login-content>
  </div>
</template>

<script>
import LoginBg from "./LoginBg";
import LoginContent from "./LoginContent";
export default {
  data() {
    return {};
  },
  components: {
    LoginBg,
    LoginContent
  }
};
</script>
<style lang="scss">
.login {
  background-color: #fff;
}
</style>
