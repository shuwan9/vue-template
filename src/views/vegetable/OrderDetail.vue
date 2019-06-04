<template>
  <div class="vegetable-order-detail">
    <order-top> </order-top>
    <order-middle> </order-middle>
    <order-bottom> </order-bottom>
  </div>
</template>

<script>
import OrderTop from '../../components/vegetable-order/OrderTop'
import OrderMiddle from '../../components/vegetable-order/OrderMiddle'
import OrderBottom from '../../components/vegetable-order/OrderBottom'
export default {
  data() {
    return {
      id: null
    }
  },
  methods: {
    getId() {
      return this.id
    }
  },
  components: {
    OrderTop,
    OrderMiddle,
    OrderBottom
  }
}
</script>

<style lang="scss" scoped></style>
