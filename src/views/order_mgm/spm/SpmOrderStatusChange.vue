<template>
  <div class="spm-order-status-change order-status-change">
    <div>
      <div class="user-info info">
        <div>
          <div class="inline name">{{order.userName}}</div>
          <div class="inline status" :class="statusClass">{{order.statusName}}</div>
        </div>
        <div>
          <div class="inline color-888">{{order.userPhone}}</div>
          <div class="inline">取餐时间:{{order.pickUpTime | timeStamp}}</div>
        </div>
      </div>
      <div class="meal-info info">
        <div v-for="dish in order.orderDetail" :key="dish.id">
          <div class="inline">
            <img :src="dish.imgUrl" alt />
          </div>
          <div class="inline">
            <div>
              <div class="inline">{{dish.commName}}</div>
              <div class="inline">x{{dish.count}}</div>
            </div>
            <div class="price">
              <span>￥{{order.price/100}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="button-container">
        <div>
          <md-button inline size="small" @click="back()">返回</md-button>
          <md-button inline size="small" v-if="order.tips == 1" @click="prepareComplete()">确认配货完成</md-button>
          <md-button inline size="small" v-if="order.tips == 2" @click="confirmPay()">确认已付款</md-button>
          <md-button inline size="small" v-if="order.tips == 3" @click="completeOrder()">确认已完成</md-button>
          <md-button
            inline
            size="small"
            class="cancel"
            :class="this.canCancel?'':'can-not-cancel'"
            @click="cancel()"
          >取消订单</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "mand-mobile";
export default {
  data() {
    return {
      order: {}
    };
  },
  computed: {
    statusClass() {
      if (this.order.status == 4) {
        return "color-e12525";
      }
    },
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
    back() {
      this.$router.go(-1);
    },
    getOrder(id) {
      this.$http.spm.getOrderDetail(id).then(res => {
        const { code, message, data } = res.data;
        this.order = data;
      });
    },
    getData() {
      const { id } = this.order;
      return {
        content: JSON.stringify({
          id
        })
      };
    },
    prepareComplete() {
      const data = this.getData();
      this.$http.spm.prepareComplete(data).then(res => {
        const { code, message, data } = res.data;
        Toast.info(message, 1500);
        if (code == 0) {
          setTimeout(() => {
            this.getOrder(this.order.id);
          }, 1500);
        }
      });
    },
    confirmPay() {
      const data = this.getData();
      this.$http.spm.confirmPay(data).then(res => {
        const { code, message, data } = res.data;
        Toast.info(message, 1500);
        if (code == 0) {
          setTimeout(() => {
            this.getOrder(this.order.id);
          }, 1500);
        }
      });
    },
    completeOrder() {
      const data = this.getData();
      this.$http.spm.completeOrder(data).then(res => {
        const { code, message, data } = res.data;
        Toast.info(message, 1500);
        if (code == 0) {
          setTimeout(() => {
            this.getOrder(this.order.id);
          }, 1500);
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
      this.$router.push("/spm_order_mgm");
      return;
    }
    const { id } = order;
    this.getOrder(id);
  }
};
</script>

<style lang="scss">
.color-888 {
  color: #888;
}
.color-e12525 {
  color: #e12525 !important;
}
.order-status-change {
  background-color: #ededed;
  > div {
    width: 85vw;
    border-radius: 5px;
    margin: 15px auto;
    .info {
      font-size: 0;
      background-color: #fff;
      padding: 5px 15px;
      border-radius: 5px;
      > div {
        padding: 8px 0;
      }
      .inline {
        font-size: 14px;
        width: 30%;
        text-align: center;
        img {
          width: 80%;
          vertical-align: middle;
          border-radius: 2px;
        }
        &:nth-child(1) {
          text-align: left;
        }
        &:nth-child(2) {
          text-align: right;
          width: 70%;
          font-size: 12px;
        }
        &.name {
          font-weight: bold;
        }
        &.status {
          color: #25de07;
        }
      }
    }
    .meal-info {
      font-size: 14px;
      max-height: 300px;
      overflow: auto;
      .inline {
        padding: 5px 0;
        .price {
          color: #e12525;
          text-align: left;
        }
        .inline {
          width: 50%;
          padding: 10px 0;
        }
      }
    }
    > .button-container {
      text-align: right;
      padding: 20px 0px;
      button {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
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
        &.cancel {
          background: linear-gradient(
            -40deg,
            rgba(67, 115, 236, 1),
            rgba(63, 157, 244, 1)
          );
          color: #fff;
        }
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