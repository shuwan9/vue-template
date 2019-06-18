<template>
  <div class="login">
    <login-bg></login-bg>
    <login-form></login-form>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginBg from "./LoginBg";
import LoginForm from "./LoginForm";
import LoginSubmit from "./LoginSubmit";
export default {
  components: {
    LoginBg,
    LoginForm,
    LoginSubmit
  }
};
</script>
<style lang="scss">
.login {
  position: relative;
}
</style>

