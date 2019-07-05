<template>
  <div class="order-detail">
    <user-info :order="order"></user-info>
    <dish-info :dishs="order.orderDetail" :totalPrice="order.price"></dish-info>
    <div class="order-number">
      <div>
        <span>您的取货码:</span>
      </div>
      <div>
        <span>{{order.orderNumber}}</span>
      </div>
    </div>
    <div class="button-container">
      <div>
        <md-button inline size="small" @click="back()" :class="order.status==99?'complete':''">我的订单</md-button>
        <md-button inline size="small" @click="orderComplete()" v-show="order.status!=99">我已付款并取货</md-button>
      </div>
    </div>
  </div>
</template>

<script>
// const status = [
//   {
//     label: "未接单",
//     key: "1"
//   },
//   {
//     label: "已接单",
//     key: "2"
//   },
//   {
//     label: "未付款",
//     key: "4"
//   },
//   {
//     label: "已付款",
//     key: "5"
//   },
//   {
//     label: "完成",
//     key: "99"
//   }
// ];
import { Toast } from "mand-mobile";
import UserInfo from "./UserInfo";
import DishInfo from "./DishInfo";
export default {
  data() {
    return {
      order: {}
    };
  },
  methods: {
    getOrderDetail(id) {
      this.$http.spm.getOrderDetail(id).then(res => {
        const { code, data, message } = res.data;
        this.order = data;
      });
    },
    back() {
      this.$router.push("/supermarket/orders");
    },
    orderComplete() {
      if (this.order.status != 5) {
        Toast.info("抱歉，订单未付款暂时不能进行此操作", 1500);
        return;
      }
      const data = {
        content: JSON.stringify({
          id: this.order.id
        })
      };
      this.$http.spm.completeOrder(data).then(res => {
        const { code, message } = res.data;
        if (code == 0) {
          Toast.succeed(message, 1500);
          this.getOrderDetail(this.order.id);
        } else {
          Toast.failed(message, 1500);
        }
      });
    }
  },
  mounted() {
    const { order } = this.$route.params;
    if (!order) {
      this.$router.push("/supermarket/orders");
      return;
    }
    const { id } = order;
    this.getOrderDetail(id);
  },
  components: {
    UserInfo,
    DishInfo
  }
};
</script>

<style lang="scss">
.order-detail {
  .order-number {
    padding: 0px 15px;
    > div {
      background-color: #fff;
      padding: 15px 10px;
      &:nth-child(2) {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .button-container {
    text-align: right;
    padding: 10px 15px;
    button {
      font-size: 14px;
      height: 38px;
      line-height: 38px;
      &:nth-child(1) {
        margin-right: 10px;
        color: #888;
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