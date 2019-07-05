<template>
  <div class="complete">
    <div class="bg">
      <img src="@/assets/car_order_succeed.png" alt />
    </div>
    <div class="tip">
      <div class="title">
        <span>预约成功！</span>
      </div>
      <div class="content">
        <span>请在规定时间交付钥匙并付款</span>
      </div>
    </div>
    <div class="button-container">
      <div>
        <md-button inline size="small" @click="continueOrder()">继续预约</md-button>
        <md-button inline size="small" @click="goToOrders()">我的订单</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    continueOrder() {
      this.$router.replace("/car/wash");
    },
    goToOrders() {
      this.$router.replace("/car/order");
    }
  }
};
</script>

<style lang="scss" scoped>
.complete {
  background-color: #fff;
  .bg {
    text-align: center;
    height: 40vh;
    line-height: 40vh;
    padding: 0px 20px;
    img {
      vertical-align: middle;
      width: 60%;
    }
  }
  .tip {
    text-align: center;
    .title {
      color: #333;
      font-size: 16px;
      font-weight: bold;
      padding: 20px 0;
    }
    .content {
      color: #888;
    }
  }
  .button-container {
    text-align: right;
    padding: 10px 15px;
    margin-top: 50px;
    button {
      font-size: 14px;
      height: 38px;
      line-height: 38px;
      &:nth-child(1) {
        margin-right: 10px;
        color: #888;
        border: 1px solid #ddd;
        &.complete {
          background: linear-gradient(
            -40deg,
            rgba(67, 115, 236, 1),
            rgba(63, 157, 244, 1)
          );
          color: #fff;
        }
      }
      &:nth-child(2) {
        background: linear-gradient(
          -40deg,
          rgba(67, 115, 236, 1),
          rgba(63, 157, 244, 1)
        );
        color: #fff;
      }
    }
  }
}
</style>