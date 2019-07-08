<template>
  <div class="car-order-status-change order-status-change">
    <div>
      <div class="user-info info">
        <div>
          <div class="inline name">{{order.userName}}</div>
          <div class="inline status" :class="statusClass">{{order.statusName}}</div>
        </div>
        <div>
          <div class="inline color-888">{{order.userPhone}}</div>
          <div class="inline">取餐时间:{{order.mealTakingTime | timeStamp}}</div>
        </div>
      </div>
      <div class="meal-info info">
        <div v-for="dish in order.dishArray" :key="dish.id">
          <div class="inline">
            <img :src="dish.imgUrl" alt />
          </div>
          <div class="inline">
            <div>
              <div class="inline">{{dish.dishName}}</div>
              <div class="inline">x{{dish.count}}</div>
            </div>
            <div class="price">
              <span>￥{{order.price/100}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="button-container">
        <!-- 农产品 -->
        <div v-if="order.dishType==3">
          <md-button inline size="small" @click="back()">返回</md-button>
          <!-- <md-button inline size="small" v-if="order.tips == 1" @click="prepareComplete()">确认配货完成</md-button>
          <md-button inline size="small" v-if="order.tips == 2" @click="confirmPay()">确认已付款</md-button>
          <md-button inline size="small" v-if="order.tips == 3" @click="completeOrder()">确认已完成</md-button>-->
        </div>
        <!-- 非农产品 -->
        <div v-else>
          <md-button inline size="small" @click="back()">返回</md-button>
          <md-button inline size="small" v-if="order.tips == 1" @click="prepareComplete()">确认配货完成</md-button>
          <md-button inline size="small" v-if="order.tips == 2" @click="confirmPay()">确认已付款</md-button>
          <md-button inline size="small" v-if="order.tips == 3" @click="completeOrder()">确认已完成</md-button>
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
  computed: {
    statusClass() {
      if (this.order.status == 4) {
        return "color-e12525";
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getOrder(id) {
      this.$http.order.detail(id).then(res => {
        const { code, message, data } = res.data;
        this.order = data;
        console.log(this.order.imgUrl);
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
      this.$http.order.prepareComplete(data).then(res => {
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
      this.$http.order.confirmPay(data).then(res => {
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
      this.$http.order.completeOrder(data).then(res => {
        const { code, message, data } = res.data;
        Toast.info(message, 1500);
        if (code == 0) {
          setTimeout(() => {
            this.getOrder(this.order.id);
          }, 1500);
        }
      });
    }
  },
  mounted() {
    const { order } = this.$route.params;
    if (!order) {
      this.$router.push("/meal_order_mgm");
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
        font-size: 12px;
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
      font-size: 12px;
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