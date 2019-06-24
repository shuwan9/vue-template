<template>
  <div class="dish">
    <Search></Search>
    <Menu></Menu>
    <meal-list></meal-list>
    <Cart/>
  </div>
</template>

<script>
import Cart from "@/views/Cart";
import Search from "./Search";
import Menu from "./Menu";
import MealList from "./MealList";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Cart,
    Search,
    Menu,
    MealList
  }
};
</script>

<style lang="scss">
</style>