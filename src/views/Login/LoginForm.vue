<template>
  <mu-form :model="form" class="login-form">
    <mu-form-item prop="username">
      <mu-text-field v-model="form.username" placeholder="请输入姓名">
        <slot>
          <div class="s-m">
            <span class="iconfont iconxingming"></span>
          </div>
        </slot>
      </mu-text-field>
    </mu-form-item>
    <mu-form-item prop="mobile">
      <mu-text-field v-model="form.mobile" placeholder="请输入手机号码">
        <slot>
          <div class="s-m">
            <span class="iconfont iconziyuan"></span>
          </div>
        </slot>
      </mu-text-field>
    </mu-form-item>
  </mu-form>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  }
};
</script>

<style lang="scss">
.login-form {
  .mu-form-item-content {
    padding: 5px 0;
    .mu-text-field-input {
      padding-left: 30px;
    }
  }
}
</style>