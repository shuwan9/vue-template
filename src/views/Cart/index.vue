<template>
  <div class="cart">
    <span>
      <i class="iconfont icongouwuche">
        <button>{{cartsTotal}}</button>
      </i>
    </span>
    <span>确认下单</span>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["cartsTotal"])
  },
  mounted() {
    // console.log(this.cartsTotal);
  }
};
</script>

<style lang="scss">
.order {
  .cart {
    position: absolute;
    left: 0;
    bottom: -0px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    font-size: 0;
    span {
      display: inline-block;
      vertical-align: middle;
      width: 50%;
      font-size: 16px;
      text-align: center;
      &:nth-child(1) {
        text-align: left;
        .iconfont {
          font-size: 30px;
          display: inline-block;
          vertical-align: top;
          margin-left: 40px;
          position: relative;
          button {
            position: absolute;
            top: 2px;
            right: -15px;
            width: 22px;
            height: 22px;
            text-align: center;
            padding: 0;
            border-radius: 50%;
            outline: none;
            border: none;
            font-size: 12px;
            background-color: #e12525;
            color: #fff;
          }
        }
      }
      &:nth-child(2) {
        background-color: #4373ec;
        color: #fff;
      }
    }
  }
}
</style>