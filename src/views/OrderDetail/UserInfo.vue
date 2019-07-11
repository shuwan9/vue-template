<template>
  <div class="user-info">
    <div>
      <span class="inline">{{order.userName}}</span>
      <span class="inline status-name">{{order.statusName}}</span>
    </div>
    <div>
      <span class="inline">{{order.userPhone}}</span>
      <span class="inline farm" v-if="order.dishType==3">取餐时间:&nbsp;下周一</span>
      <span class="inline" v-else>取餐时间:&nbsp;{{order.mealTakingTime | timeStamp}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"]
};
</script>

<style lang="scss">
.order-detail {
  background-color: #ededed;
  .user-info {
    margin: 5px 15px;
    padding: 5px 8px;
    background-color: #fff;
    border-radius: 2px;
    > div {
      padding: 5px 2px;
      font-size: 14px;
      font-weight: 400;
      .inline {
        &:nth-child(1) {
          text-align: left;
          width: 40%;
        }
        &:nth-child(2) {
          text-align: right;
          color: #4373ec;
          font-size: 14px;
          width: 56%;
          &.status-name {
            color: #fe821e;
          }
          &.farm {
            color: #333;
          }
        }
      }
    }
  }
}
</style>