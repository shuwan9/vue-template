<template>
  <div class="car-order">
    <div class="type">
      <div class="inline" :class="currentType==1?'active':''" @click="chooseType(1)">
        <span>全部</span>
      </div>
      <div class="inline" :class="currentType==2?'active':''" @click="chooseType(2)">
        <span>未完成</span>
      </div>
      <div class="inline" :class="currentType==3?'active':''" @click="chooseType(3)">
        <span>已完成</span>
      </div>
    </div>
    <div class="order-list">
      <md-scroll-view
        class="scroll-view"
        ref="scrollView"
        :immediate-check-end-reaching="true"
        :bouncing="true"
        :manual-init="true"
        :scrolling-x="false"
        :auto-reflow="true"
        @endReached="onEndReached"
        v-if="orders.length>0"
      >
        <div
          class="order"
          v-for="(order,index) in orders"
          :key="index"
          @click="goToCarOrderDetail(order)"
        >
          <div class="line"></div>
          <div>
            <span class="inline">车辆</span>
            <span class="inline">{{order.licensePlate}}</span>
          </div>
          <div>
            <span class="inline">时间</span>
            <span class="inline time">{{order.makeAnAppointmentTime | timeStamp}}</span>
          </div>
          <div>
            <span class="inline">服务内容</span>
            <span class="inline">{{order.serviceContent}}</span>
          </div>
          <div>
            <span class="inline">订单状态</span>
            <span class="inline status" :class="order.status == 4?'unpay':''">{{order.statusName}}</span>
          </div>
        </div>
        <md-scroll-view-more
          slot="more"
          :is-finished="isFinished"
          loading-text="加载中..."
          finished-text="没有更多啦"
        ></md-scroll-view-more>
      </md-scroll-view>
      <div class="tip" v-else>
        <span>暂无订单</span>
      </div>
    </div>
  </div>
</template>

<script>
let pageSize = 5;
let pageCurrent = 1;
export default {
  data() {
    return {
      currentType: 2,
      orders: [],
      isFinished: false
    };
  },
  methods: {
    chooseType(type) {
      this.currentType = type;
      pageCurrent = 1;
      this.isFinished = false;
      this.orders = [];
      this.getOrders();
    },
    getData() {
      const userId = this.$ls.get("user").id;
      const status = this.currentType - 1;
      return {
        content: JSON.stringify({
          userId,
          status
        }),
        pageSize,
        pageCurrent
      };
    },
    getOrders(fn) {
      if (this.isFinished) {
        return;
      }
      const data = this.getData();
      this.$http.car.getOrders(data).then(res => {
        const { code, data, message } = res.data;
        const { list, hasNextPage } = data;
        list.forEach(item => {
          item.serviceContent = item.serviceName
            ? item.serviceName.join("+")
            : "";
        });
        this.isFinished = !hasNextPage;
        this.orders = this.orders.concat(list);
        this.$nextTick(() => {
          if (this.$refs.scrollView) {
            this.$refs.scrollView.init();
          }
          fn && fn();
        });
      });
    },
    onEndReached() {
      pageCurrent++;
      this.getOrders(() => {
        if (this.$refs.scrollView) {
          this.$refs.scrollView.finishLoadMore();
        }
      });
    },
    goToCarOrderDetail(order) {
      this.$router.push({ name: "car_order_detail", params: { order } });
    }
  },
  mounted() {
    pageCurrent = 1;
    this.getOrders();
  }
};
</script>

<style lang="scss" scoped>
.car-order {
  background-color: #ededed;
  padding: 15px 20px 0 20px;
  box-sizing: border-box;
  .type {
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 3px;
    margin-bottom: 10px;
    .inline {
      width: 33.333%;
      text-align: center;
      padding: 5px 0;
      font-size: 14px;
      box-sizing: border-box;
      &.active {
        background-color: #333;
        color: #fff;
      }
      // &:nth-child(2) {
      // border-left: 1px solid #333;
      // border-right: 1px solid #333;
      // }
    }
  }
  .order-list {
    margin-top: 0px;
    height: calc(100vh - 0px - 15px - 38px);
    .tip {
      text-align: center;
      padding: 20px 0;
    }
    .scroll-view {
      height: 100%;
      .md-scroll-view-more {
        padding: 5px 0;
        font-size: 12px;
      }
    }
    .order {
      background-color: #fff;
      border-radius: 5px;
      div.line {
        padding: 0;
        height: 10px;
        background-color: #ededed;
      }
      > div {
        padding: 8px 15px;
        .inline {
          font-size: 14px;
          width: 50%;
          text-align: left;
          &.status {
            color: #fe821e;
            &.unpay {
              color: #e12525;
            }
          }
          &:nth-child(2) {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>