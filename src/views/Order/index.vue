<template>
  <div class="order">
    <Carousel></Carousel>
    <Tab></Tab>
    <router-view id="order"></router-view>
    <!-- <Cart></Cart> -->
  </div>
</template>

<script>
import Cart from "@/views/Cart";
import Carousel from "./Carousel";
import Tab from "./Tab";
export default {
  components: {
    Carousel,
    Tab,
    Cart
  }
};
</script>

<style lang="scss">
.order {
  #order {
    height: 75vh;
    position: relative;
  }
}
</style>