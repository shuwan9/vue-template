<template>
  <transition name="cmn-fade-in">
    <div class="back-drop" v-if="show" @click="close"></div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      show: true
    }
  },
  destroyed() {}
}
</script>

<style lang="scss">
.back-drop {
  position: fixed;
  z-index: 300;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
}
</style>
