<template>
  <div class="carousel">
    <md-swiper ref="swiper" :is-prevent="false" :useNative-driver="false">
      <md-swiper-item :key="$index" v-for="(image, $index) in images">
        <img :src="image.imgUrl" alt />
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
// import image from "@/assets/carousel.png";
export default {
  data() {
    return {
      images: []
    };
  },
  mounted() {
    this.$http.carousel.canteen().then(res => {
      const { code, message, data } = res.data;
      this.images = data;
    });
  }
};
</script>

<style lang="scss">
.order {
  .md-swiper {
    height: 20vh;
    .md-swiper-item {
      text-align: center;
      img {
        width: 100%;
        max-height: 100%;
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