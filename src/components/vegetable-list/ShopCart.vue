<template>
  <div class="shop-cart cmn-width-100">
    <div class="cmn-inline-block cmn-width-70" @click="openCart">
      <q-icon ref="cart" name="mdi-cart-plus" class="icon-cart" />
      <span class="cmn-text-align-center num">{{ num || '100' }}</span>
    </div>
    <div class="cmn-inline-block cmn-width-30 cmn-text-align-center">
      <span class="cmn-text-align-center">确认下单</span>
    </div>
    <transition name="cmn-slide-up">
      <div class="orders cmn-width-100" v-if="open">
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
import BackDrop from './BackDrop.vue'
export default {
  data() {
    return {
      open: false,
      backDrop: null
    }
  },
  methods: {
    openCart() {
      const self = this
      this.open = !this.open
      if (!this.backDrop) {
        let node = document.createElement('div')
        let body = document.querySelector('body')
        body.appendChild(node)
        const BD = Vue.extend(BackDrop)
        this.backDrop = new BD({
          methods: {
            close() {
              this.show = false
              self.open = false
            }
          }
        }).$mount(node)
      }
      this.backDrop.show = this.open
    }
  },
  mounted() {
    console.log('mounted')
  },
  destroyed() {
    this.backDrop = null
  }
}
</script>

<style lang="scss">
.shop-cart {
  position: fixed;
  z-index: 400;
  bottom: 0;
  .cmn-inline-block {
    position: relative;
    z-index: 30;
    height: 40px;
    line-height: 40px;
    background-color: #027be3;
    color: #fff;
    &:nth-child(1) {
      border-right: 1px solid #ccc;
      padding-left: 30px;
      .q-icon {
        font-size: 30px;
      }
    }
    .num {
      position: absolute;
      top: 2px;
      left: 40px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border-radius: 50%;
      background-color: #f00;
      color: #fff;
      font-size: 12px;
    }
  }
  .orders {
    position: absolute;
    bottom: 42px;
    z-index: 20;
    padding: 5px;
    background-color: #027be3;
    color: #fff;
  }
}
</style>
