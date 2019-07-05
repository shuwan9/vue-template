<template>
  <div class="cmn-order-type">
    <div
      class="inline"
      :class="currentKey==orderType.key?'active':''"
      v-for="(orderType) in orderTypes"
      :key="orderType.key"
      @click="chooseOrderType(orderType)"
    >{{ orderType.label }}</div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      currentKey: null
    };
  },
  props: ["orderTypes"],
  methods: {
    chooseOrderType(orderType) {
      this.currentKey = orderType.key;
      this.$emit("chooseOrderType", orderType);
    }
  },
  mounted() {
    this.currentKey = this.orderTypes[1].key;
  }
};
</script>

<style lang="scss" scoped>
.cmn-order-type {
  border: 1px solid #333;
  margin: 5px auto;
  width: 85vw;
  border-radius: 5px;
  .inline {
    width: 33.333%;
    text-align: center;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    &.active {
      background-color: #333;
      color: #fff;
    }
  }
}
</style>