<template>
  <div class="cmn-order" @click="goToSpmOrderDetail()">
    <div class="inline">
      <img :src="order.imgUrl" alt />
    </div>
    <div class="inline">
      <div>
        <span>下单时间:&nbsp;</span>
        <span>{{order.createDate | timeStamp}}</span>
      </div>
      <div>
        <div class="inline">
          <span>商品总价:&nbsp;</span>
          <span class="price">￥{{order.price/100}}</span>
        </div>
        <div class="inline">
          <span>{{order.statusName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  methods: {
    goToSpmOrderDetail() {
      this.$router.push({
        name: "spm_order_detail",
        params: { order: this.order }
      });
    }
  }
};
</script>

<style lang="scss">
.cmn-order {
  padding: 10px 5px;
  border-bottom: 1px solid #ededed;
  .inline {
    &:nth-child(1) {
      width: 30%;
      max-height: 100px;
      overflow: hidden;
    }
    &:nth-child(2) {
      width: 70%;
      text-align: left;
      > div {
        padding: 14px 0;
        padding-left: 5px;
        .price {
          color: #e12525;
        }
      }
      .inline {
        width: 60%;
        text-align: left;
        box-sizing: border-box;
        // &:nth-child(1) {
        // }
        &:nth-child(2) {
          width: 40%;
          padding-right: 10px;
          text-align: right;
          color: #fe821e;
        }
      }
    }
    font-size: 14px;
    img {
      width: 90%;
      border-radius: 5px;
    }
  }
}
</style>