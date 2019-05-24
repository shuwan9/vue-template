<template>
  <div class="vegetable">
    <div class="carousel">
      <q-carousel
        class="text-white os-carousel"
        :arrows="false"
        :autoplay="1500"
        :quick-nav="true"
        :infinite="true"
        :height="carouselHeight"
      >
        <q-carousel-slide
          v-for="(value, index) in list"
          :key="index"
          :img-src="value.imgUrl"
        >
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="nav" :style="navStyle">
      <router-link to="/vegetable/list">
        <q-btn>菜品列表</q-btn>
      </router-link>
      <router-link to="/vegetable/order">
        <q-btn>我的订单</q-btn>
      </router-link>
    </div>
    <router-view> </router-view>
  </div>
</template>
<script>
import a from "../../assets/1.jpg";
import b from "../../assets/2.jpg";
import c from "../../assets/5.jpg";
export default {
  data() {
    return {
      list: [],
      carouselHeight: "",
      navStyle: ""
    };
  },
  methods: {},
  mounted() {
    this.carouselHeight = window.innerHeight * 0.3 + "px";
    this.navStyle = `height:${window.innerHeight *
      0.1}px;line-height:${window.innerHeight * 0.1}px`;
    this.list = [
      {
        imgUrl: a
      },
      {
        imgUrl: b
      },
      {
        imgUrl: c
      }
    ];
  }
};
</script>

<style lang="scss">
.vegetable {
  .nav {
    height: 10vh;
    line-height: 10vh;
    text-align: center;
    transition: opacity 0.5s ease;
    &.show {
      opacity: 0;
    }
    a {
      color: #333;
      &.router-link-exact-active {
        button {
          background-color: #027be3;
          color: #fff;
        }
      }
      &:nth-child(1) {
        button {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
      &:nth-child(2) {
        button {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      button {
        vertical-align: middle;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        width: 45%;
        min-height: auto;
      }
    }
  }
}
</style>

