<template>
  <div class="meal-list">
    <md-scroll-view
      class="scroll-view"
      ref="scrollView"
      :scrolling-x="false"
      @endReached="$_onEndReached"
    >
      <Meal v-for="(meal,index) in meals" :key="index" :meal="meal"></Meal>
      <md-scroll-view-more slot="more" :is-finished="isFinished" v-show="!isFinished"></md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>

<script>
import imgUrl from "@/assets/meal.png";
import Meal from "./Meal";
export default {
  data() {
    return {
      meals: [
        {
          imgUrl,
          name: "糖醋里脊",
          num: 2,
          desc: "以猪里脊肉为主材，配以面粉、淀dfshjkdfhgjkdfghjdfhgjdfhgdhgdf",
          price: 22
        },
        {
          imgUrl,
          name: "糖醋里脊",
          num: 30,
          desc: "以猪里脊肉为主材，配以面粉、淀dfshjkdfhgjkdfghjdfhgjdfhgdhgdf",
          price: 22
        },
        {
          imgUrl,
          name: "糖醋里脊",
          num: 30,
          desc: "以猪里脊肉为主材，配以面粉、淀dfshjkdfhgjkdfghjdfhgjdfhgdhgdf",
          price: 22
        },
        {
          imgUrl,
          name: "糖醋里脊",
          num: 30,
          desc: "以猪里脊肉为主材，配以面粉、淀dfshjkdfhgjkdfghjdfhgjdfhgdhgdf",
          price: 22
        }
      ],
      list: 10,
      isFinished: false
    };
  },
  methods: {
    $_onEndReached() {
      if (this.isFinished) {
        return;
      }
      // async data
      setTimeout(() => {
        this.meals = this.meals.concat(this.meals);
        if (this.meals.length >= 20) {
          this.isFinished = true;
        }
        this.$refs.scrollView.finishLoadMore();
      }, 1000);
    }
  },
  components: {
    Meal
  }
};
</script>

<style lang="scss">
.order {
  .meal-list {
    height: calc(68vh - 52px - 105px - 55px);
    overflow: auto;
    .scroll-view {
      height: 100%;
      .md-scroll-view-more {
        padding: 0;
        font-size: 16px;
      }
    }
  }
}
</style>