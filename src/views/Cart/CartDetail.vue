<template>
  <md-popup v-model="show.showCartDetail" position="bottom" class="cart-detail-popup">
    <div class="cart-detail">
      <div class="title">
        <span class="inline" @click="close()">关闭</span>
        <span class="inline" @click="removeAll()">
          <i class="iconfont iconqingkong"></i>&nbsp;清空
        </span>
      </div>
      <div class="detail-meal-list">
        <div
          v-for="(meal,index) in meals"
          :key="index"
          class="meal-container"
          v-show="meal.hasAddNumber>0"
        >
          <div class="inline">
            <img :src="meal.layoutOfDishes" alt>
          </div>
          <div class="inline">
            <div>{{meal.nameOfDish}}</div>
            <div>￥{{meal.price*meal.hasAddNumber/100}}</div>
          </div>
          <div class="inline">
            <div>
              <i class="iconfont iconMinuswithcircle" @click="minus(meal)"></i>
              <span>{{meal.hasAddNumber}}</span>
              <i class="iconfont iconadd" @click="add(meal)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </md-popup>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { Dialog } from "mand-mobile";
export default {
  computed: {
    ...mapState(["show", "dishType"]),
    ...mapGetters(["meals", "mealsTotal"])
  },
  methods: {
    add(meal) {
      if (meal.hasAddNumber < meal.number) {
        meal.hasAddNumber++;
      }
    },
    minus(meal) {
      if (meal.hasAddNumber > 0) {
        meal.hasAddNumber--;
      }
      if (this.mealsTotal == 0) {
        this.setShowCartDetail(false);
      }
    },
    close() {
      this.setShowCartDetail(false);
    },
    removeAll() {
      const { label } = this.dishType;
      Dialog.confirm({
        content: `清空${label}购物车？`,
        confirmText: "清空",
        onConfirm: () => {
          this.clearCarts();
          this.setShowCartDetail(false);
        }
      });
    },
    ...mapMutations(["setShowCartDetail", "clearCarts"])
  }
};
</script>

<style lang="scss">
.md-popup.cart-detail-popup {
  font-size: 14px;
  .md-popup-box {
    bottom: 42px;
    .cart-detail {
      background-color: #fff;
      .title {
        font-size: 0;
        .inline {
          font-size: 14px;
          width: 50%;
          box-sizing: border-box;
          &:nth-child(1) {
            text-align: left;
            padding-left: 5%;
            color: #333333;
          }
          &:nth-child(2) {
            text-align: right;
            padding-right: 5%;
            color: #9b9b9b;
          }
        }
      }
      .detail-meal-list {
        background-color: #fff;
        max-height: 400px;
        overflow: auto;
        .meal-container {
          font-size: 0;
          padding: 2px;
          > .inline {
            font-size: 14px;
            padding: 2px;
            // outline: 1px solid;
            line-height: initial;
            box-sizing: border-box;
            &:nth-child(1) {
              width: 20%;
              text-align: center;
              img {
                width: 80%;
                vertical-align: middle;
                border-radius: 2px;
              }
            }
            &:nth-child(2) {
              width: 40%;
              div {
                text-align: left;
                box-sizing: border-box;
                padding: 5px;
                &:nth-child(2) {
                  color: #e12525;
                }
              }
            }
            &:nth-child(3) {
              width: 40%;
              .iconfont {
                color: #4273ec;
                vertical-align: middle;
                font-size: 20px;
              }
              span {
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                padding: 0 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>