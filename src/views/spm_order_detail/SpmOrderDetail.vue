<template>
  <div class="order-detail">
    <user-info :order="order"></user-info>
    <dish-info
      :dishs="order.orderDetail"
      :total-price="order.price"
      :tips-content="order.tipsContent"
    ></dish-info>
    <div class="order-number">
      <div>
        <span>您的取货码:</span>
      </div>
      <div>
        <span>{{order.pickUpCode}}</span>
      </div>
    </div>
    <div class="button-container">
      <div>
        <md-button inline size="small" @click="back()" :class="order.status==99?'complete':''">我的订单</md-button>
        <md-button inline size="small" @click="orderComplete()" v-show="order.status!=99">我已付款并取货</md-button>
        <md-button
          inline
          size="small"
          :class="this.canCancel?'':'can-not-cancel'"
          @click="cancel()"
        >取消订单</md-button>
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
import { Toast, Dialog } from "mand-mobile";
import UserInfo from "./UserInfo";
import DishInfo from "./DishInfo";
export default {
  data() {
    return {
      order: {}
    };
  },
  computed: {
    canCancel() {
      if (!this.order) {
        return false;
      }
      if (!this.order.cancelTime) {
        return false;
      }
      if (this.order.cancelTime < new Date().getTime()) {
        return false;
      } else {
        return true;
      }
    }
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
    },
    confirmCancel() {
      const data = {
        content: JSON.stringify({
          id: this.order.id,
          userId: this.$ls.get("user").id
        })
      };
      this.$http.spm.cancelOrder(data).then(res => {
        const { code, message } = res.data;
        if (code == 0) {
          Toast.succeed(message, 1500);
          setTimeout(() => {
            this.back();
          }, 1500);
        } else {
          Toast.failed(message, 1500);
        }
      });
    },
    cancel() {
      if (!this.canCancel) {
        Toast.failed("抱歉,取消订单时间已过", 1500);
        return;
      }
      Dialog.confirm({
        content: `确认取消？`,
        confirmText: "是",
        cancelText: "否",
        onConfirm: () => {
          this.confirmCancel();
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
      padding: 0 5px;
      &:nth-child(1) {
        margin-right: 5px;
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
        margin-right: 5px;
        background: linear-gradient(
          -40deg,
          rgba(67, 115, 236, 1),
          rgba(63, 157, 244, 1)
        );
        color: #fff;
      }
      &:nth-child(3) {
        background: linear-gradient(
          -40deg,
          rgba(67, 115, 236, 1),
          rgba(63, 157, 244, 1)
        );
        color: #fff;
        &.can-not-cancel {
          background: linear-gradient(
            -40deg,
            rgba(136, 136, 136, 1),
            rgba(136, 136, 136, 1)
          );
          color: #fff;
        }
      }
    }
  }
}
</style>