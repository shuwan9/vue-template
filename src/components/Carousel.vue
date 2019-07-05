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
export default {
  props: ["images"]
};
</script>

<style lang="scss">
.carousel {
  .md-swiper {
    height: 20vh;
    .md-swiper-item {
      text-align: center;
      img {
        width: 100%;
      }
    }
    .md-swiper-indicators {
      bottom: 5px;
    }
    .md-swiper-indicator {
      width: 5px;
      height: 5px;
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