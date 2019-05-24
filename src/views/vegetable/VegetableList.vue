<template>
  <div class="vegetable-list">
    <div class="search" ref="search">
      <input type="text" />
      <q-btn label="搜索"></q-btn>
    </div>
    <div class="type" ref="type">
      <div class="container" v-for="(type, index) in types" :key="index">
        <div class="img-container">
          <img :src="type.imgUrl" alt="" />
        </div>
        <div>
          <span>{{ type.name }}</span>
        </div>
      </div>
    </div>
    <infinite-list
      class="meals"
      :style="{ height: height + 'px' }"
      :loading="loading"
      :load-more="loadMore"
    >
      <div class="meal" v-for="(meal, index) in meals" :key="index">
        <div class="left">
          <img :src="meal.imgUrl" alt="" />
        </div>
        <div class="right">
          <div>
            <span>10</span>
            <span>西红柿炒蛋</span>
          </div>
          <div>
            <span>剩余</span>
            <span>30份</span>
          </div>
          <div>
            <p>不会骄傲是广东省</p>
          </div>
          <div>
            <q-icon
              name="mdi-plus-circle-outline"
              @click.native="addToCart($event, meal)"
            ></q-icon>
          </div>
        </div>
      </div>
    </infinite-list>
    <div class="cart">
      <div class="operator" @click="showCartDetail = !showCartDetail">
        <q-icon ref="cart" name="mdi-cart-plus" /><span class="num">{{
          num
        }}</span>
      </div>
      <div class="operator" v-ripple><span>确认订单</span></div>
      <transition name="cmn-slide-up">
        <div class="orders" v-show="showCartDetail">
          <p>123</p>
          <p>123</p>
          <p>123</p>
          <p>123</p>
          <p>123</p>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import a from "../../assets/1.jpg";
import b from "../../assets/2.jpg";
import c from "../../assets/5.jpg";
import InfiniteList from "../../components/InfiniteList.vue";
export default {
  data() {
    return {
      types: [],
      height: null,
      loading: false,
      hasNextPage: true,
      meals: [],
      num: 0,
      showCartDetail: false
    };
  },
  components: {
    InfiniteList
  },
  methods: {
    loadMore() {
      console.log(this.meals.length);
      if (!this.hasNextPage) {
        this.loading = false;
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.meals = this.meals.concat(this.meals);
        this.loading = false;
        if (this.meals.length >= 10) {
          this.hasNextPage = false;
        }
      }, 1500);
    },
    addToCart(e, meal) {
      const target = $(e.target);
      const parent = target
        .parent()
        .parent()
        .parent();
      const img = parent.find("img");
      const clone = img.clone();
      const cart = $(this.$refs.cart.$el);
      clone.css({
        position: "absolute",
        opacity: 1,
        zIndex: 120,
        width: img.width(),
        height: img.height()
      });
      clone.offset({ top: img.offset().top, left: img.offset().left });
      clone.appendTo($("body"));
      clone.animate(
        {
          top: cart.offset().top - 5,
          left: cart.offset().left + 10,
          opacity: 0.3,
          width: 20,
          height: 20
        },
        800,
        "easeInOutExpo",
        () => {
          this.num++;
          clone.remove();
        }
      );
    }
  },
  mounted() {
    this.types = [
      { name: "熟食", imgUrl: a },
      { name: "净菜", imgUrl: b },
      { name: "农产品", imgUrl: c },
      { name: "蛋糕", imgUrl: a }
    ];
    this.meals = [{ imgUrl: a }];
    this.$nextTick(() => {
      this.height =
        window.innerHeight -
        window.innerHeight * 0.4 -
        this.$refs.search.offsetHeight -
        this.$refs.type.offsetHeight -
        45;
    });
  }
};
</script>

<style lang="scss">
@import url("./slide-up.scss");
.vegetable-list {
  .search {
    padding: 2px 0 10px 0;
    text-align: center;
    input {
      vertical-align: middle;
      padding: 0 10px;
      padding-left: 30px;
      width: 80%;
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 34px;
      line-height: 34px;
      margin-right: 2px;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 2px 16px;
      min-height: 30px;
    }
  }
  .type {
    position: relative;
    z-index: 200;
    padding-bottom: 10px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    .container {
      display: inline-block;
      vertical-align: middle;
      width: 25%;
      font-size: 0;
      div {
        font-size: 16px;
        text-align: center;
      }
      .img-container {
        position: relative;
        text-align: center;
        margin-bottom: 10px;
        img {
          max-width: 100%;
          height: 45px;
          vertical-align: middle;
          border-radius: 5px;
        }
      }
    }
  }
  .meals {
    .meal {
      font-size: 0;
      border-bottom: 1px solid #ccc;
      padding: 2px 0px;
      .left,
      .right {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
      }
      .left {
        width: 40%;
        img {
          vertical-align: middle;
          width: 90%;
          text-align: center;
          border-radius: 0px;
        }
      }
      .right {
        width: 60%;
        div {
          padding: 2px 5px;
          &:nth-child(1) {
            display: flex;
            justify-content: space-between;
          }
          &:nth-child(2) {
            text-align: right;
          }
          &:nth-child(4) {
            text-align: right;
            font-size: 25px;
            color: #027be3;
          }
        }
      }
    }
  }
  .cart {
    position: fixed;
    z-index: 110;
    bottom: 0;
    width: 100%;
    background-color: #027be3;
    color: #fff;
    // padding: 15px 10px;
    font-size: 0;
    .orders {
      width: 100%;
      position: absolute;
      bottom: 42px;
      padding: 5px;
      z-index: 99;
      background-color: #027be3;
      color: #fff;
      font-size: 16px;
    }
    > div.operator {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      position: relative;
      z-index: 200;
      background-color: #027be3;
      .num {
        position: absolute;
        top: 2px;
        left: 30px;
        color: #fff;
        font-size: 12px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        border-radius: 50%;
        text-align: center;
        background-color: #f00;
      }
      .q-icon {
        font-size: 30px;
      }
      &:nth-child(1) {
        width: 70%;
        padding-left: 20px;
        border-right: 1px solid #ccc;
      }
      &:nth-child(2) {
        width: 30%;
        text-align: center;
      }
    }
  }
}
</style>

