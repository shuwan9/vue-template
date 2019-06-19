<template>
  <div class="meal">
    <div class="inline">
      <img :src="meal.imgUrl">
    </div>
    <div class="inline">
      <div class="detail">
        <span class="name inline">{{meal.name}}</span>
        <span class="num inline">
          剩余&nbsp;
          <span>{{meal.num}}</span>
          &nbsp;份
        </span>
      </div>
      <div class="detail text-over-flow">
        <span>{{meal.desc}}</span>
      </div>
      <div class="detail">
        <span class="price inline">
          <span>
            ￥
            {{meal.price}}
          </span>
        </span>
        <span class="inline">
          <i class="iconfont iconadd" @click="add(meal)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["meal"],
  methods: {
    add(meal) {
      if (meal.num == 0) {
        return;
      }
      meal.num--;
      this.addToCarts({
        menu: "shushi",
        meal
      });
    },
    ...mapMutations(["addToCarts"])
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
            font-size: 25px;
            vertical-align: top;
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