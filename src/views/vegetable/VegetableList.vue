<template>
  <div class="vegetable-list">
    <div class="search" ref="search">
      <input type="text" class="cmn-inline-block cmn-width-80" />
      <q-btn label="搜索"></q-btn>
    </div>
    <div ref="mealType">
      <meal-type :meal-types="mealTypes"></meal-type>
    </div>
    <infinite-list
      class="meals"
      :style="{ height: height + 'px' }"
      :loading="loading"
      :load-more="loadMore"
    >
      <meal-item
        v-for="(meal, index) in meals"
        :index="index"
        :key="index"
        :meal="meal"
      ></meal-item>
    </infinite-list>
    <shop-cart></shop-cart>
  </div>
</template>
<script>
import a from "../../assets/1.jpg";
import b from "../../assets/2.jpg";
import c from "../../assets/5.jpg";
import InfiniteList from "../../components/InfiniteList.vue";
import MealItem from "../../components/vegetable-list/MealItem.vue";
import ShopCart from "../../components/vegetable-list/ShopCart.vue";
import MealType from "../../components/vegetable-list/MealType.vue";
export default {
  data() {
    return {
      mealTypes: [],
      height: null,
      loading: false,
      hasNextPage: true,
      meals: []
    };
  },
  components: {
    MealType,
    InfiniteList,
    MealItem,
    ShopCart
  },
  methods: {
    loadMore() {
      console.log(this.meals.length);
      if (!this.hasNextPage) {
        this.loading = false;
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.meals = this.meals.concat(this.meals);
        this.loading = false;
        if (this.meals.length >= 10) {
          this.hasNextPage = false;
        }
      }, 1500);
    }
  },
  mounted() {
    this.mealTypes = [
      { name: "熟食", imgUrl: a },
      { name: "净菜", imgUrl: b },
      { name: "农产品", imgUrl: c },
      { name: "蛋糕", imgUrl: a }
    ];
    this.meals = [{ imgUrl: a }];
    this.$nextTick(() => {
      this.height =
        window.innerHeight -
        window.innerHeight * 0.4 -
        this.$refs.search.offsetHeight -
        this.$refs.mealType.offsetHeight -
        45;
    });
  }
};
</script>

<style lang="scss">
.vegetable-list {
  .search {
    padding: 2px 0 10px 0;
    text-align: center;
    input {
      padding: 0 10px;
      padding-left: 30px;
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 34px;
      line-height: 34px;
      margin-right: 2px;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 2px 16px;
      min-height: 30px;
    }
  }
}
</style>

