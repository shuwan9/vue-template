<template>
  <div class="car-order-status-change order-status-change">
    <div>
      <div class="info">
        <div class="inline">订单编号</div>
        <div class="inline">{{order.orderNumber}}</div>
      </div>
      <div class="info">
        <div class="inline">姓名</div>
        <div class="inline">{{order.userName}}</div>
      </div>
      <div class="info">
        <div class="inline">手机号</div>
        <div class="inline">{{order.userPhone}}</div>
      </div>
      <div class="info">
        <div class="inline">车辆</div>
        <div class="inline">{{order.licensePlate}}</div>
      </div>
      <div class="info">
        <div class="inline">序号</div>
        <div class="inline">{{order.number}}</div>
      </div>
      <!-- <div class="info">
        <div class="inline">停放位置</div>
        <div class="inline">{{order.locationName}}</div>
      </div>-->
      <div class="info">
        <div class="inline">服务类容</div>
        <div class="inline">{{order.serviceContent}}</div>
      </div>
      <div class="info">
        <div class="inline">预约时间</div>
        <div class="inline">{{order.makeAnAppointmentTime | timeStamp2}}</div>
      </div>
      <div class="info">
        <div class="inline">订单状态</div>
        <div class="inline">{{order.statusName}}</div>
      </div>
      <div class="button-container">
        <div>
          <md-button inline size="small" @click="back()">我的订单</md-button>
          <md-button inline size="small" v-if="order.tips == 1" @click="confirmPay()">确认已付款</md-button>
          <md-button inline size="small" v-if="order.tips == 2" @click="completeWash()">确认洗车完成</md-button>
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
    getOrder(id) {
      const data = {
        content: JSON.stringify({ id })
      };
      this.$http.car.getDetail(data).then(res => {
        const { code, message, data } = res.data;
        data.serviceContent = data.serviceName
          ? data.serviceName.join("+")
          : "";
        this.order = data;
      });
    },
    back() {
      this.$router.go(-1);
    },
    completeOrder() {
      const data = {
        content: JSON.stringify({
          id: this.order.id
        })
      };
      this.$http.car.completeOrder(data).then(res => {
        const { code, message } = res.data;
        Toast.info(message, 1500);
        setTimeout(() => {
          this.getOrder(this.order.id);
        }, 1500);
      });
    },
    completeWash() {
      const data = {
        content: JSON.stringify({
          id: this.order.id
        })
      };
      this.$http.car.completeWash(data).then(res => {
        const { code, message } = res.data;
        Toast.info(message, 1500);
        setTimeout(() => {
          this.getOrder(this.order.id);
        }, 1500);
      });
    },
    confirmPay() {
      const data = {
        content: JSON.stringify({
          id: this.order.id
        })
      };
      this.$http.car.confirmPay(data).then(res => {
        const { code, message } = res.data;
        Toast.info(message, 1500);
        setTimeout(() => {
          this.getOrder(this.order.id);
        }, 1500);
      });
    },
    confirmCancel() {
      const data = {
        content: JSON.stringify({
          id: this.order.id,
          userId: this.$ls.get("user").id
        })
      };
      this.$http.car.cancelOrder(data).then(res => {
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
      this.$router.push("/car_order_mgm");
      return;
    }
    const { id } = order;
    this.getOrder(id);
  }
};
</script>

<style lang="scss">
.order-status-change {
  background-color: #ededed;
  > div {
    width: 85vw;
    border-radius: 5px;
    margin: 15px auto;
    > div.info {
      font-size: 0;
      background-color: #fff;
      .inline {
        width: 50%;
        box-sizing: border-box;
        font-size: 14px;
        padding: 10px 0;
        text-align: left;
        &:nth-child(1) {
          padding-left: 10px;
        }
        &:nth-child(2) {
          text-align: right;
          padding-right: 10px;
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