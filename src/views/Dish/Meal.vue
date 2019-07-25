<template>
  <div class="meal">
    <div class="inline">
      <img :src="meal.layoutOfDishes" />
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
        <span class="inline" @click="stop($event)">
          <transition name="rotate-in">
            <i
              class="iconfont iconMinuswithcircle"
              v-if="meal.hasAddNumber"
              @click="minus($event,meal)>0"
            ></i>
          </transition>
          <span class="has-add-number" v-show="meal.hasAddNumber">{{meal.hasAddNumber}}</span>
          <i
            class="iconfont iconadd"
            ref="ballContainer"
            :class="meal.number==meal.hasAddNumber?'sold':''"
            @click="add($event,meal)"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Toast } from "mand-mobile";
import Bus from "@/plugins/Bus";
const OVERTIMETIP = "请于每日10:00之前预定";
export default {
  props: ["meal"],
  methods: {
    add(event, meal) {
      event.stopPropagation();
      const now = new Date();
      const hour = now.getHours();
      if (hour > 9) {
        if (this.dishType.key == 1 || this.dishType.key == 2) {
          Toast.failed(OVERTIMETIP, 1500);
          return;
        }
      }
      if (meal.number <= meal.hasAddNumber) {
        return;
      }
      this.addToCart(meal);
      Bus.$emit("startBallAnimation", this.$refs.ballContainer);
    },
    minus(event, meal) {
      event.stopPropagation();
      if (meal.hasAddNumber > 0) {
        meal.hasAddNumber--;
      }
    },
    stop(e) {
      e.stopPropagation();
    },
    ...mapMutations(["addToCart"])
  },
  computed: {
    ...mapState(["dishType"])
  }
};
</script>

<style lang="scss">
.rotate-in-enter {
  transform: translateY(-50%) rotate(360deg) !important;
  right: 20% !important;
}
.rotate-in-enter-active {
  transform: translateY(-50%) rotate(360deg) !important;
  right: 20% !important;
}
.rotate-in-enter-to {
  transform: translateY(-50%) rotate(0) !important;
  right: 60% !important;
}
.rotate-in-leave {
  right: 60% !important;
}
.rotate-in-leave-active {
  right: 60% !important;
}
.rotate-in-leave-to {
  right: 20% !important;
}
.order {
  .meal {
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ededed;
    .has-add-number {
      color: #4373ec;
      font-size: 14px;
    }
    > .inline {
      font-size: 14px;
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
          position: relative;
          min-height: 20px;
          .iconfont {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 20%;
          }
          .iconMinuswithcircle {
            right: 60%;
            transition: all 0.5s ease-out;
          }
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
            font-size: 14px;
            span {
              color: #4373ec;
            }
          }
          &.desc {
            font-size: 14px;
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