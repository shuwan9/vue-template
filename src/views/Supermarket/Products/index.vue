<template>
  <div class="supermarket-products">
    <product-search></product-search>
    <product-list></product-list>
    <supermarket-cart></supermarket-cart>
  </div>
</template>

<script>
import ProductSearch from "@/components/ProductSearch";
import ProductList from "@/components/ProductList";
import SupermarketCart from "@/components/SupermarketCart";
export default {
  components: {
    ProductSearch,
    ProductList,
    SupermarketCart
  }
};
</script>

<style lang="scss">
</style>