<template>
  <div class="car-order-detail">
    <div class="status">
      <img src="@/assets/bg-1.png" alt />
      <div class="info">
        <span>{{order.statusName}}</span>
      </div>
      <div class="info">
        <span>{{order.tipsContent}}</span>
      </div>
      <div class="info">
        <span>订单金额：￥{{order.price?order.price:0}}</span>
      </div>
    </div>
    <div class="mobile">
      <span class="inline">
        <i class="iconfont icondianhua"></i>
      </span>
      <span class="inline">{{order.userName}}</span>
      <span class="inline">{{order.userPhone}}</span>
    </div>
    <div class="order-info">
      <div class="title">
        <span>预约信息</span>
      </div>
      <div class="info">
        <span class="inline">车辆</span>
        <span class="inline">{{order.licensePlate}}</span>
      </div>
      <div class="info">
        <span class="inline">停放位置</span>
        <span class="inline">{{order.locationName}}</span>
      </div>
      <div class="info">
        <span class="inline">服务内容</span>
        <span class="inline">{{order.serviceContent}}</span>
      </div>
      <div class="info">
        <span class="inline">预约时间</span>
        <span class="inline">{{order.makeAnAppointmentTime | timeStamp}}</span>
      </div>
    </div>
    <div class="order-number">
      <span class="inline">订单编号：</span>
      <span class="inline">{{order.orderNumber}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {}
    };
  },
  mounted() {
    const { order } = this.$route.params;
    if (!order) {
      this.$router.push("/car/order");
      return;
    }
    this.order = order;
  }
};
</script>

<style lang="scss" scoped>
.car-order-detail {
  background-color: #ededed;
  overflow: hidden;
  .status {
    position: relative;
    height: 25vh;
    overflow: hidden;
    .info {
      position: relative;
      z-index: 20;
      color: #fff;
      font-size: 14px;
      padding: 12px 20px;
    }
    img {
      position: absolute;
      width: 100%;
      min-height: 100%;
      vertical-align: middle;
      z-index: 10;
    }
  }
  .mobile {
    background-color: #fff;
    padding: 15px 20px;
    .inline {
      margin-right: 15px;
      font-size: 14px;
      &:nth-child(1) {
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: #4373ec;
        border-radius: 50%;
        .iconfont {
          color: #fff;
        }
      }
    }
  }
  .order-info {
    margin: 4px 0 8px 0;
    background-color: #fff;
    .title {
      padding: 10px 10px;
      font-size: 14px;
      font-weight: bold;
    }
    .info {
      padding: 8px 15px;
      .inline {
        font-size: 12px;
        width: 50%;
        text-align: left;
        &:nth-child(2) {
          text-align: right;
        }
      }
    }
  }
  .order-number {
    height: 100vh;
    background-color: #fff;
    padding: 20px 15px 0 15px;
    .inline {
      font-size: 14px;
      width: 50%;
      text-align: left;
      &:nth-child(2) {
        text-align: right;
      }
    }
  }
}
</style>