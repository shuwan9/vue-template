<template>
  <div class="supermarket">
    <Carousel :images="images"></Carousel>
    <router-link-tab :routerLinks="routerLinks"></router-link-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import RouterLinkTab from "@/components/RouterLinkTab";
import image from "@/assets/carousel.png";
export default {
  data() {
    return {
      images: [image, image],
      routerLinks: [
        {
          to: "/supermarket/products",
          name: "商品列表"
        },
        {
          to: "/supermarket/orders",
          name: "我的订单"
        }
      ]
    };
  },
  components: {
    Carousel,
    RouterLinkTab
  }
};
</script>

<style lang="scss" >
</style>