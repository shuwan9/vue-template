<template>
  <div class="confirm">
    <confirm-info :order-detail="order"></confirm-info>
    <div class="button-container width-100">
      <span class="inline width-50">
        共计:&nbsp;
        <span class="price">￥{{order.price}}</span>
      </span>
      <span class="inline width-50" @click="toOrder()">确认订单</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
import ConfirmInfo from "./ConfirmInfo";
export default {
  data() {
    return {
      order: {}
    };
  },
  methods: {
    toOrder() {
      const data = {
        content: JSON.stringify({
          id: this.order.id
        })
      };
      this.$http.car.confirmOrder(data).then(res => {
        console.log(res);
        const { code, data, message } = res.data;
        Toast.succeed(message, 1500);
        setTimeout(() => {
          this.$router.push("/car/complete");
        }, 1500);
      });
    }
  },
  mounted() {
    const { order } = this.$route.params;
    if (!order) {
      this.$router.push("/car/wash");
      return;
    }
    this.order = order;
  },
  components: {
    ConfirmInfo
  }
};
</script>

<style lang="scss" scoped>
.confirm {
  position: relative;
  background-color: #ededed;
  .button-container {
    position: absolute;
    left: 0;
    bottom: 0;
    .inline {
      text-align: center;
      font-size: 14px;
      padding: 15px 0;
      &:nth-child(1) {
        background-color: #fff;
        color: #333;
        .price {
          color: #e12525;
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