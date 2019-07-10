<template>
  <div class="spm-order-mgm order-mgm">
    <order-type :orderTypes="orderTypes" @chooseOrderType="onChooseOrderType"></order-type>
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
        v-for="order in orders"
        :key="order.id"
        class="order"
        @click="goToCarOrderStatusChange(order)"
      >
        <div>
          <div class="inline">
            <span>订单编号</span>
          </div>
          <div class="inline">{{order.orderNumber}}</div>
        </div>
        <div>
          <div class="inline">
            <span>创建时间</span>
          </div>
          <div class="inline">{{order.createDate | timeStamp}}</div>
        </div>
        <div>
          <div class="inline">
            <span>订单内容</span>
          </div>
          <div class="inline text-over-flow">{{order.products }}</div>
        </div>
        <div>
          <div class="inline">
            <span>订单状态</span>
          </div>
          <div class="inline">{{order.statusName }}</div>
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
      <span>暂无</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
import OrderType from "@/components/spm_order_list/OrderType";
let pageSize = 5;
let pageCurrent = 1;
export default {
  data() {
    return {
      orderTypes: [
        { key: 1, label: "已付款" },
        { key: 0, label: "未付款" },
        { key: 2, label: "已完成" }
      ],
      currentKey: 0,
      orders: [],
      isFinished: false
    };
  },
  methods: {
    onChooseOrderType(orderType) {
      this.currentKey = orderType.key;
      pageCurrent = 1;
      this.isFinished = false;
      this.orders = [];
      this.getOrders();
    },
    getData() {
      const status = this.currentKey;
      return {
        content: JSON.stringify({
          status,
          type: 1
        }),
        pageSize,
        pageCurrent
      };
    },
    getOrders(fn) {
      const data = this.getData();
      this.$http.spm.getOrders(data).then(res => {
        const { code, data, message } = res.data;
        const { list, hasNextPage } = data;

        list.forEach(item => {
          item.products = item.commodityList.join("+");
          // if (item.orderDetail && item.orderDetail.length) {
          //   item.products = item.orderDetail
          //     .map(item2 => {
          //       return item2.commName;
          //     })
          //     .join("+");
          // } else {
          //   item.products = "";
          // }
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
      if (this.isFinished) {
        return;
      }
      pageCurrent++;
      this.getOrders(() => {
        if (this.$refs.scrollView) {
          this.$refs.scrollView.finishLoadMore();
        }
      });
    },
    goToCarOrderStatusChange(order) {
      this.$router.push({
        name: "spm_order_status_change",
        params: {
          order
        }
      });
    }
  },
  components: {
    OrderType
  },
  mounted() {
    const { roles } = this.$ls.get("user");
    if (roles.indexOf("supermarketAdmin") == -1) {
      this.$router.replace("/no_permission");
      return;
    }
    pageCurrent = 1;
    this.getOrders();
  }
};
</script>

<style lang="scss" scoped>
.order-mgm {
  padding-top: 15px;
  background-color: #ededed;
  .tip {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .scroll-view {
    padding: 10px 20px;
    box-sizing: border-box;
    height: calc(100vh - 15px - 32px);
    .order {
      border-radius: 5px;
      margin: 10px auto;
      > div {
        font-size: 0;
        background-color: #fff;
        .inline {
          width: 50%;
          font-size: 12px;
          padding: 10px 0;
          box-sizing: border-box;
          padding-left: 10px;
          text-align: left;
          &:nth-child(2) {
            text-align: right;
            padding-right: 15px;
          }
        }
      }
    }
    .md-scroll-view-more {
      padding: 5px 0;
      font-size: 12px;
    }
  }
}
</style>