<template>
  <div class="order-list">
    <Sort :order-type="orderType" @chooseOrderType="onChooseOrderType"/>
    <div class="list">
      <div class="tip" v-if="orders.length==0">暂无</div>
      <md-scroll-view
        class="scroll-view"
        ref="scrollView"
        :immediate-check-end-reaching="true"
        :bouncing="true"
        :manual-init="true"
        :scrolling-x="false"
        :auto-reflow="true"
        @endReached="$_onEndReached"
        v-if="orders.length>0"
      >
        <div
          class="order"
          v-for="(order,index) in orders"
          :key="index"
          @click="showOrderDetail(order)"
        >
          <div class="inline">
            <img :src="order.imgUrl" alt>
          </div>
          <div class="inline">
            <div>
              <span>下单时间:&nbsp;</span>
              <span>{{order.createDate | timeStamp}}</span>
            </div>
            <div>
              <div class="inline">
                <span>商品总价:&nbsp;</span>
                <span class="price">￥{{order.price/100}}</span>
              </div>
              <div class="inline">
                <span>{{order.statusName}}</span>
              </div>
            </div>
          </div>
        </div>
        <md-scroll-view-more
          slot="more"
          :is-finished="isFinished"
          loading-text="加载中..."
          finished-text="没有更多啦"
        ></md-scroll-view-more>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
import Sort from "./Sort";
let pageSize = 5;
let pageCurrent = 1;
export default {
  data() {
    return {
      orderType: this.$ls.get("orderType") || 1,
      orders: [],
      isFinished: false
    };
  },
  components: {
    Sort
  },
  methods: {
    onChooseOrderType(orderType) {
      this.$ls.set("orderType", orderType);
      this.orderType = orderType;
      pageCurrent = 1;
      this.isFinished = false;
      this.orders = [];
      this.getOrders();
    },
    getOrders(fn) {
      const { id } = this.$ls.get("user");
      const data = {
        content: JSON.stringify({
          userId: id,
          status: this.orderType // 0 全部 1 未完成 2 已完成
        }),
        pageCurrent,
        pageSize
      };
      this.$http.order.list(data).then(res => {
        const { list, hasNextPage } = res.data.data;
        this.orders = this.orders.concat(list);
        this.isFinished = !hasNextPage;
        this.$nextTick(() => {
          if (this.$refs.scrollView) {
            this.$refs.scrollView.init();
            fn && fn(hasNextPage);
          }
        });
      });
    },
    $_onEndReached() {
      if (this.isFinished) {
        return;
      }
      pageCurrent++;
      this.getOrders(() => {
        this.$refs.scrollView.finishLoadMore();
      });
    },
    showOrderDetail(order) {
      this.$ls.set("order", order);
      this.$router.push("/orderdetail");
    }
  },
  mounted() {
    pageCurrent = 1;
    this.getOrders();
  }
};
</script>

<style lang="scss">
.order-list {
  .list {
    height: calc(75vh - 46px);
    .tip {
      height: 200p;
      line-height: 200px;
      text-align: center;
      color: #333;
      font-size: 14px;
    }
    .scroll-view {
      .order {
        padding: 10px 5px;
        border-bottom: 1px solid #ededed;
        .inline {
          &:nth-child(1) {
            width: 30%;
            max-height: 100px;
            overflow: hidden;
          }
          &:nth-child(2) {
            width: 70%;
            text-align: left;
            > div {
              padding: 14px 0;
              padding-left: 5px;
              .price {
                color: #e12525;
              }
            }
            .inline {
              width: 50%;
              text-align: left;
              box-sizing: border-box;
              // &:nth-child(1) {
              // }
              &:nth-child(2) {
                padding-right: 20px;
                text-align: right;
                color: #fe821e;
              }
            }
          }
          font-size: 14px;
          img {
            width: 90%;
            border-radius: 5px;
          }
        }
      }
      .md-scroll-view-more {
        padding: 5px 0;
        font-size: 12px;
      }
    }
  }
}
</style>