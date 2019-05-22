<template>
  <div class="login">
    this is login
    <q-btn color="primary" v-ripple label="primary"></q-btn>
  </div>
</template>

<script>
// @ is an alias to /src

import instance from "../axios/instance";
instance({
  url: "/get",
  method: "get",
  params: {
    username: "shuwang"
  }
}).then(res => console.log(res));
instance({
  url: "/post",
  method: "post",
  data: {
    username: "shuwang"
  }
}).then(res => console.log(res));
export default {
  name: "login",
  components: {},
  mounted() {
    this.$ls.set("age", 18);
    console.log(this.$ls.get("age"));
    this.$ls.set("user", { name: "shuwang" });
    console.log(this.$ls.get("user"));
  }
};
</script>
