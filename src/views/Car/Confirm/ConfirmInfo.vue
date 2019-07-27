<template>
  <div class="confirm-info">
    <div>
      <span class="inline">订单编号</span>
      <span class="inline">{{orderDetail.orderNumber}}</span>
    </div>
    <div>
      <span class="inline">联系人</span>
      <span class="inline">{{orderDetail.userName}}</span>
    </div>
    <div>
      <span class="inline">联系方式</span>
      <span class="inline">{{orderDetail.userPhone}}</span>
    </div>
    <div>
      <span class="inline">车辆</span>
      <span class="inline">{{orderDetail.licensePlate}}</span>
    </div>
    <div>
      <span class="inline">停放位置</span>
      <span class="inline">{{orderDetail.locationName}}</span>
    </div>
    <div>
      <span class="inline">服务类容</span>
      <span class="inline">{{serviceName}}</span>
    </div>
    <div>
      <span class="inline">预约时间</span>
      <span class="inline">{{orderDetail.makeAnAppointmentTime | timeStamp2}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["orderDetail"],
  computed: {
    serviceName() {
      if (!this.orderDetail.detailList) {
        return;
      }
      return this.orderDetail.detailList
        .map(service => service.serviceName)
        .join("+");
    }
  }
};
</script>

<style lang="scss">
.confirm-info {
  background-color: #fff;
  div {
    padding: 14px 15px;
    font-size: 14px;
    border-bottom: 1px solid #ededed;
    .inline {
      width: 50%;
      text-align: left;
      &:nth-child(2) {
        color: #888;
        text-align: right;
      }
    }
  }
}
</style>