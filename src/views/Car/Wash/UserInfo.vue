<template>
  <div class="user-info">
    <div class="title">
      <span>联系人信息</span>
    </div>
    <div>
      <div class="info">
        <span class="inline width-55">联系人</span>
        <input class="width-45" type="text" placeholder="请输入联系人" v-model="user.name" disabled>
      </div>
      <div class="info">
        <span class="inline width-55">联系方式</span>
        <input class="width-45" type="text" placeholder="请输入您的联系方式" v-model="user.phone" disabled>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style lang="scss" scoped>
.user-info {
  background-color: #fff;
  padding: 10px 10px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  .title {
    font-size: 15px;
    font-weight: bold;
  }
  .info {
    padding: 5px 0;
    font-size: 0;
    &:nth-child(1) {
      border-bottom: 1px solid #ededed;
      margin-top: 5px;
    }
    .inline,
    input {
      font-size: 14px;
      box-sizing: border-box;
      vertical-align: middle;
      background-color: transparent;
    }
    .inline {
      text-align: left;
    }
    input {
      text-align: right;
      padding-right: 10px;
      height: 30px;
      line-height: 30px;
      border: none;
      outline: none;
    }
  }
}
</style>