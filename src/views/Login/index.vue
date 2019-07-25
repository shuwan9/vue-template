<template>
  <div class="login">
    <Bg></Bg>
    <login-form v-show="showLogin" :toggle="toggle"></login-form>
    <bind-form v-show="!showLogin" :toggle="toggle"></bind-form>
  </div>
</template>

<script>
// @ is an alias to /src
import Bg from "./Bg";
import LoginForm from "./LoginForm";
import BindForm from "./BindForm";
export default {
  data() {
    return {
      showLogin: false
    };
  },
  components: {
    Bg,
    LoginForm,
    BindForm
  },
  methods: {
    toggle() {
      this.showLogin = !this.showLogin;
    }
  },
  mounted() {
    this.showLogin = !!this.$ls.get("user");
  }
};
</script>
<style lang="scss">
.login {
  position: relative;
}
</style>

