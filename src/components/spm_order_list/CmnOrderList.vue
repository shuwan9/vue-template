<template>
  <div class="cmn-order-list" :style="cssStyle">
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
      <cmn-order v-for="order in orders" :key="order.id" :order="order"></cmn-order>
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
import CmnOrder from "./CmnOrder";
let pageCurrent = 1;
let pageSize = 5;
export default {
  props: ["cssStyle", "currentKey"],
  data() {
    return {
      isFinished: false,
      orders: []
    };
  },
  methods: {
    getData() {
      const userId = this.$ls.get("user").id;
      const status = this.currentKey - 1;
      return {
        content: JSON.stringify({
          userId,
          status
        }),
        pageCurrent,
        pageSize
      };
    },
    getOrders(fn) {
      if (this.isFinished) {
        return;
      }
      const data = this.getData();
      this.$http.spm.getOrders(data).then(res => {
        const { code, message, data } = res.data;
        const { list, hasNextPage } = data;
        this.orders = this.orders.concat(list);
        this.isFinished = !hasNextPage;
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
    }
  },
  watch: {
    currentKey() {
      pageCurrent = 1;
      this.isFinished = false;
      this.orders = [];
      this.getOrders();
    }
  },
  mounted() {
    pageCurrent = 1;
    this.getOrders();
  },
  components: {
    CmnOrder
  }
};
</script>

<style lang="scss" >
.cmn-order-list {
  .tip {
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
  .scroll-view {
    height: 100%;
    .md-scroll-view-more {
      padding: 5px 0;
      font-size: 12px;
    }
  }
}
</style>