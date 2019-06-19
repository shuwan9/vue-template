<template>
  <div class="carousel">
    <md-swiper ref="swiper" :is-prevent="false" :useNative-driver="false">
      <md-swiper-item :key="$index" v-for="(image, $index) in images">
        <img :src="image" alt>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import image from "@/assets/carousel.png";
export default {
  data() {
    return {
      images: [image, image, image, image]
    };
  }
};
</script>

<style lang="scss">
.order {
  .md-swiper {
    height: 25vh;
    .md-swiper-item {
      text-align: center;
      img {
        width: 100%;
      }
    }
    .md-swiper-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
      opacity: 0.4;
      &.md-swiper-indicator-active {
        opacity: 1;
      }
    }
  }
}
</style>