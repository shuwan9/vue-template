<template>
  <div class="meal-list">
    <div class="tip" v-if="meals.length==0">暂无菜品</div>
    <md-scroll-view
      class="scroll-view"
      ref="scrollView"
      :immediate-check-end-reaching="true"
      :bouncing="true"
      :manual-init="true"
      :scrolling-x="false"
      :auto-reflow="true"
      @endReached="$_onEndReached"
      v-if="meals.length>0"
    >
      <Meal
        v-for="(meal,index) in meals"
        :key="index"
        :meal="meal"
        @click.native="showDishDetail(meal)"
      ></Meal>
      <md-scroll-view-more
        slot="more"
        :is-finished="isFinished"
        loading-text="加载中..."
        finished-text="没有更多啦"
      ></md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Bus from "@/plugins/Bus";
import Meal from "./Meal";
let pageSize = 5;
let pageCurrent = 1;
export default {
  data() {
    return {
      meals: [],
      isFinished: false
    };
  },
  methods: {
    showDishDetail(meal) {
      this.$ls.set("meal", meal);
      this.$router.push("/dishdetail");
    },
    getMeals(fn) {
      const { key } = this.dishType;
      const data = {
        content: JSON.stringify({
          dishType: key,
          nameOfDish: this.search.name
        }),
        pageCurrent,
        pageSize
      };
      this.$http.getMeals(data).then(res => {
        const { list, hasNextPage } = res.data.data;
        list.forEach(meal => {
          meal.hasAddNumber = 0;
        });
        this.meals = this.meals.concat(list);
        this.isFinished = !hasNextPage;
        this.updateMeals(this.meals);
        this.$nextTick(() => {
          if (this.$refs.scrollView) {
            this.$refs.scrollView.init();
            fn && fn(hasNextPage);
          }
        });
      });
    },
    $_onEndReached() {
      if (this.isFinished) {
        return;
      }
      pageCurrent++;
      this.getMeals(() => {
        this.$refs.scrollView.finishLoadMore();
      });
    },
    startSearch() {
      this.meals = [];
      this.isFinished = false;
      pageCurrent = 1;
      this.getMeals();
    },
    ...mapMutations(["updateMeals"])
  },
  watch: {
    dishType(newVal) {
      this.meals = [];
      this.isFinished = false;
      pageCurrent = 1;
      this.getMeals();
    }
  },
  components: {
    Meal
  },
  computed: {
    ...mapState(["dishType", "search"])
  },
  mounted() {
    pageCurrent = 1;
    this.getMeals();
    Bus.$on("startSearch", () => {
      this.startSearch();
    });
  }
};
</script>

<style lang="scss">
.order {
  .meal-list {
    height: calc(75vh - 43px - 70px - 45px);
    overflow: auto;
    border-top: 1px solid #ededed;
    .tip {
      height: 200px;
      line-height: 200px;
      text-align: center;
      font-size: 14px;
      color: #333;
    }
    .scroll-view {
      height: calc(75vh - 43px - 70px - 45px);
      display: flex;
      flex-direction: column;
      .md-scroll-view-more {
        padding: 5px 0;
        font-size: 12px;
      }
    }
  }
}
</style>