<template>
  <div class="meal">
    <div class="inline">
      <img :src="meal.layoutOfDishes">
    </div>
    <div class="inline">
      <div class="detail">
        <span class="name inline">{{meal.nameOfDish}}</span>
        <span class="num inline">
          剩余&nbsp;
          <span>{{meal.number-meal.hasAddNumber>=0?meal.number-meal.hasAddNumber:0}}</span>
          &nbsp;份
        </span>
      </div>
      <div class="detail text-over-flow">
        <span>{{meal.descriptionOfDishes}}</span>
      </div>
      <div class="detail">
        <span class="price inline">
          <span>
            ￥
            {{meal.price/100}}
          </span>
        </span>
        <span class="inline" @click="add($event,meal)">
          <i
            class="iconfont iconadd"
            ref="ballContainer"
            :class="meal.number==meal.hasAddNumber?'sold':''"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Bus from "@/plugins/Bus";
export default {
  props: ["meal"],
  methods: {
    add(event, meal) {
      event.stopPropagation();
      if (meal.number <= meal.hasAddNumber) {
        return;
      }
      this.addToCart(meal);
      Bus.$emit("startBallAnimation", this.$refs.ballContainer);
    },
    ...mapMutations(["addToCart"])
  },
  computed: {
    ...mapState(["dishType"])
  }
};
</script>

<style lang="scss">
.order {
  .meal {
    font-size: 0;
    padding: 5px;
    > .inline {
      font-size: 12px;
      &:nth-child(1) {
        width: 30%;
        img {
          width: 80%;
          border-radius: 3px;
        }
      }
      &:nth-child(2) {
        width: 70%;
      }
    }
    .inline {
      .detail {
        padding: 4px 2px;
        text-align: left;
        box-sizing: border-box;
        &:nth-child(2) {
          width: 100%;
          color: #888;
        }
        .inline {
          width: 50%;
          .iconfont {
            color: #4373ec;
            font-size: 20px;
            vertical-align: top;
            &.sold {
              color: #888;
            }
          }
          &.name {
            font-weight: 400;
            text-align: left;
          }
          &.num {
            font-size: 12px;
            span {
              color: #4373ec;
            }
          }
          &.desc {
            font-size: 12px;
          }
          &.price {
            text-align: left;
            color: #e12525;
            span {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>