<template>
  <div class="login">
    <Bg></Bg>
    <Form></Form>
  </div>
</template>

<script>
// @ is an alias to /src
import Bg from "./Bg";
import Form from "./Form";
export default {
  components: {
    Bg,
    Form
  }
};
</script>
<style lang="scss">
.login {
  position: relative;
}
</style>

