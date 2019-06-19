<template>
  <div class="dish">
    <Search></Search>
    <Menu></Menu>
    <meal-list></meal-list>
  </div>
</template>

<script>
import Search from "./Search";
import Menu from "./Menu";
import MealList from "./MealList";
export default {
  components: {
    Search,
    Menu,
    MealList
  }
};
</script>

<style lang="scss">
</style>