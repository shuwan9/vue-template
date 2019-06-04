<template>
  <div class="order-middle">
    <div>
      <div class="cmn-inline-block cmn-width-30"><img :src="src" alt="" /></div>
      <div class="cmn-inline-block cmn-width-70">
        <div><span>菜名</span><span>×10</span></div>
        <div>×2</div>
      </div>
    </div>
    <div>
      <div class="cmn-inline-block cmn-width-30"><img :src="src" alt="" /></div>
      <div class="cmn-inline-block cmn-width-70">
        <div><span>菜名</span><span>×10</span></div>
        <div>×2</div>
      </div>
    </div>
  </div>
</template>

<script>
import a from '../../assets/1.jpg'
export default {
  data() {
    return {
      src: a
    }
  }
}
</script>

<style lang="scss" scoped>
.order-middle {
  border-bottom: 2px solid #ccc;
  > div {
    font-size: 0;
    padding: 10px 0;
    > .cmn-inline-block {
      font-size: 16px;
      text-align: center;
      img {
        width: 80%;
        border-radius: 2px;
      }
      > div {
        padding: 5px 15px;
        &:nth-child(1) {
          display: flex;
          justify-content: space-between;
        }
        &:nth-child(2) {
          text-align: left;
        }
      }
    }
  }
}
</style>
