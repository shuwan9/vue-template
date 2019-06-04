<template>
  <div class="order-top">
    <div>
      <div class="cmn-inline-block cmn-width-30 cmn-text-align">
        <span>路人甲</span>
      </div>
      <div class="cmn-inline-block cmn-width-70 cmn-text-align">
        <span>订单状态：</span><span>已完成</span>
      </div>
    </div>
    <div>
      <div class="cmn-inline-block cmn-width-30 cmn-text-align">
        <span>18762750392</span>
      </div>
      <div class="cmn-inline-block cmn-width-70 cmn-text-align">
        <span>取餐时间：</span>
        <span>2019-05-27 11:00</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.order-top {
  border-bottom: 2px solid #ccc;
  > div {
    font-size: 0;
    padding: 10px;
    .cmn-inline-block {
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
