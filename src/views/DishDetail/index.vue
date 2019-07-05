<template>
  <div class="dish-detail">
    <div class="img-container">
      <img :src="meal.layoutOfDishes">
    </div>
    <div class="name">
      <span>{{meal.name}}</span>
    </div>
    <div class="desc">
      <span>{{meal.descriptionOfDishes}}</span>
    </div>
    <div class="price">
      <span class="inline">
        ￥
        <span>{{meal.price/100}}</span>
      </span>
      <span class="inline">
        剩余&nbsp;
        <span>{{meal.number-meal.hasAddNumber}}</span>
        &nbsp;份
      </span>
    </div>
    <div class="button-container">
      <md-button inline size="small" @click="back()">返回</md-button>
      <md-button inline size="small" @click="add()">加入购物车</md-button>
    </div>
    <Cart/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Cart from "@/views/Cart";
export default {
  data() {
    return {
      meal: {}
    };
  },
  methods: {
    back() {
      this.$router.push("/order/dish");
    },
    add() {
      if (this.meal.hasAddNumber == this.meal.number) {
        return;
      }
      this.updateMeals([this.meal]);
      this.addToCart(this.meal);
    },
    ...mapMutations(["addToCart", "updateMeals"])
  },
  components: {
    Cart
  },
  mounted() {
    this.meal = this.$ls.get("meal");
  }
};
</script>

<style lang="scss">
.dish-detail {
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