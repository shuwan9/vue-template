<template>
  <div class="product-list">
    <md-scroll-view
      class="scroll-view"
      ref="scrollView"
      :immediate-check-end-reaching="true"
      :bouncing="true"
      :manual-init="true"
      :scrolling-x="false"
      :auto-reflow="true"
      @endReached="onEndReached"
    >
      <product-detail v-for="(product) in products" :key="product.id" :product="product"></product-detail>
      <md-scroll-view-more
        slot="more"
        :is-finished="isFinished"
        loading-text="加载中..."
        finished-text="没有更多啦"
      ></md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Bus from "@/plugins/Bus";
import ProductDetail from "./ProductDetail";
let pageSize = 5;
let pageCurrent = 1;
export default {
  data() {
    return {
      isFinished: false,
      products: []
    };
  },
  methods: {
    getProducts(fn) {
      const data = {
        content: JSON.stringify({
          userId: this.$ls.get("user").id,
          name: this.search.name1
        }),
        pageSize,
        pageCurrent
      };
      this.$http.supermarket.getProducts(data).then(res => {
        const { code, message, data } = res.data;
        const { hasNextPage, list } = data;
        list.forEach(item => {
          item.hasAddNumber = 0;
        });
        this.products = this.products.concat(list);
        this.updateProducts(this.products);
        this.$nextTick(() => {
          if (this.$refs.scrollView) {
            this.$refs.scrollView.init();
          }
          this.isFinished = !hasNextPage;
          fn && fn();
        });
      });
    },
    onEndReached() {
      if (this.isFinished) {
        return;
      }
      pageCurrent++;
      this.getProducts(() => {
        if (this.$refs.scrollView) {
          this.$refs.scrollView.finishLoadMore();
        }
      });
    },
    ...mapMutations(["updateProducts"])
  },
  computed: {
    ...mapState(["search"])
  },
  mounted() {
    pageCurrent = 1;
    this.getProducts();
    Bus.$on("startSearch1", () => {
      pageCurrent = 1;
      this.isFinished = false;
      this.products = [];
      this.getProducts();
    });
  },
  components: {
    ProductDetail
  }
};
</script>

<style lang="scss">
.product-list {
  height: calc(100vh - 25vh - 43px - 40px);
  .scroll-view {
    height: 100%;
    .md-scroll-view-more {
      font-size: 14px;
      padding: 5px;
    }
  }
}
</style>