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
        <div class="inline">停放位置</div>
        <div class="inline">{{order.locationName}}</div>
      </div>
      <div class="info">
        <div class="inline">服务类容</div>
        <div class="inline">{{order.serviceContent}}</div>
      </div>
      <div class="info">
        <div class="inline">预约时间</div>
        <div class="inline">{{order.makeAnAppointmentTime | timeStamp}}</div>
      </div>
      <div class="info">
        <div class="inline">订单状态</div>
        <div class="inline">{{order.statusName}}</div>
      </div>
      <div class="button-container">
        <div>
          <md-button inline size="small" @click="back()">我的订单</md-button>
          <md-button inline size="small" v-if="order.status == 4" @click="confirmOrder()">确认已付款</md-button>
          <md-button inline size="small" v-if="order.status == 5" @click="completeOrder()">确认已完成</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
export default {
  data() {
    return {
      order: {}
    };
  },
  methods: {
    getOrder(id) {},
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
          this.back();
        }, 1500);
      });
    },
    confirmOrder() {
      const data = {
        content: JSON.stringify({
          id: this.order.id
        })
      };
      this.$http.car.confirmOrder(data).then(res => {
        const { code, message } = res.data;
        Toast.info(message, 1500);
        setTimeout(() => {
          this.back();
        }, 1500);
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
    order.serviceContent = order.serviceName ? order.serviceName.join("+") : "";
    this.order = order;
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
}
</style>