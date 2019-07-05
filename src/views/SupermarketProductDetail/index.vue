<template>
  <div class="supermarket-product-detail">
    <div class="img-container">
      <img :src="product.imgUrl">
    </div>
    <div class="name">
      <span>{{product.name}}</span>
    </div>
    <div class="desc">
      <span>{{product.commodityDescription}}</span>
    </div>
    <div class="price">
      <span class="inline">
        ￥
        <span>{{product.price/100}}</span>
      </span>
      <span class="inline">
        剩余&nbsp;
        <span>{{product.count-product.hasAddNumber}}</span>
        &nbsp;份
      </span>
    </div>
    <div class="button-container">
      <md-button inline size="small" @click="back()">返回</md-button>
      <md-button inline size="small" @click="add()">加入购物车</md-button>
    </div>
    <supermarket-cart></supermarket-cart>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import SupermarketCart from "@/components/SupermarketCart";
export default {
  data() {
    return {
      product: {}
    };
  },
  methods: {
    back() {
      this.$router.push("/supermarket/products");
    },
    add() {
      if (this.product.hasAddNumber == this.product.count) {
        return;
      }
      this.addToSupermarketCart(this.product);
    },
    ...mapMutations(["updateProducts", "addToSupermarketCart"])
  },
  mounted() {
    this.product = this.$ls.get("product");
    this.updateProducts([this.product]);
  },
  components: {
    SupermarketCart
  }
};
</script>

<style lang="scss">
.supermarket-product-detail {
  position: relative;
  background-color: #fff;
  .img-container {
    max-height: 60vh;
    overflow: hidden;
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .name,
  .price,
  .desc {
    padding: 15px;
  }
  .name {
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
  .desc {
    font-size: 14px;
    color: #888888;
    padding-top: 5px;
  }
  .price {
    font-size: 0;
    .inline {
      width: 50%;
      font-size: 14px;
      &:nth-child(1) {
        text-align: left;
        color: #e12525;
        > span {
          font-size: 16px;
          font-weight: 400;
        }
      }
      &:nth-child(2) {
        text-align: right;
        > span {
          color: #4373ec;
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
  .button-container {
    text-align: right;
    padding-right: 10px;
    button {
      padding: 5px 15px;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      &:nth-child(1) {
        margin-right: 5px;
        background: rgba(237, 237, 237, 1);
      }
      &:nth-child(2) {
        background: linear-gradient(
          -40deg,
          rgba(67, 115, 236, 1),
          rgba(63, 157, 244, 1)
        );
        color: #fff;
        border-radius: 2px;
      }
    }
  }
}
</style>