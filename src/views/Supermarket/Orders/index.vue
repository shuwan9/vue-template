<template>
  <div class="supermarket-orders">
    <order-type :orderTypes="orderTypes" @chooseOrderType="onChooseOrderType"></order-type>
    <cmn-order-list :currentKey="currentKey" :cssStyle="style"></cmn-order-list>
  </div>
</template>

<script>
import OrderType from "@/components/spm_order_list/OrderType";
import CmnOrderList from "@/components/spm_order_list/CmnOrderList";
const orderTypes = [
  { label: "全部", key: 1 },
  { label: "未完成", key: 2 },
  { label: "已完成", key: 3 }
];
export default {
  data() {
    return {
      orderTypes,
      currentKey: orderTypes[1].key,
      style: {
        height: "calc(100vh - 20vh - 5vh - 32px)"
      }
    };
  },
  methods: {
    onChooseOrderType(orderType) {
      // console.log(orderType);
      this.currentKey = orderType.key;
    }
  },
  components: {
    OrderType,
    CmnOrderList
  }
};
</script>

<style lang="scss">
</style>