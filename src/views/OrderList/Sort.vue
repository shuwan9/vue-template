<template>
  <div class="sort">
    <div>
      <span class="inline" :class="orderType==0?'active':''" @click="choose(0)">全部</span>
      <span class="inline" :class="orderType==1?'active':''" @click="choose(1)">未完成</span>
      <span class="inline" :class="orderType==2?'active':''" @click="choose(2)">已完成</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["orderType"],
  methods: {
    choose(type) {
      this.$emit("chooseOrderType", type);
    }
  }
};
</script>

<style lang="scss">
.sort {
  text-align: center;
  padding: 10px 0;
  > div {
    margin: 0 auto;
    width: 85vw;
    font-size: 0;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(51, 51, 51, 1);
    border-radius: 5px;
    .inline {
      font-size: 14px;
      text-align: center;
      box-sizing: border-box;
      width: 33.33333%;
      padding: 4px 0;
      &.active {
        background-color: #333;
        color: #fff;
      }
      &:nth-child(2) {
        border-right: 1px solid #333;
        border-left: 1px solid #333;
      }
    }
  }
}
</style>