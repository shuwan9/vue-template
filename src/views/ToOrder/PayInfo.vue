<template>
  <div class="pay-info">
    <div>
      <span class="inline">付款方式</span>
      <!-- <span class="inline">请选择付款方式</span> -->
      <span class="inline">线下支付</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.to-order {
  .pay-info {
    margin: 10px 15px;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 2px;
    > div {
      padding: 5px 2px;
      font-size: 14px;
      font-weight: 400;
      .inline {
        width: 48%;
        &:nth-child(1) {
          text-align: left;
          font-size: 12px;
        }
        &:nth-child(2) {
          text-align: right;
          // color: #4373ec;
          color: #888;
          font-size: 12px;
        }
      }
    }
  }
}
</style>