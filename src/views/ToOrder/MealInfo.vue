<template>
  <div class="meal-info">
    <div class="meal-list">
      <div v-for="meal in meals" :key="meal.id" class="meal">
        <div class="inline">
          <img :src="meal.layoutOfDishes" alt>
        </div>
        <div class="inline">
          <div>
            <span class="inline">{{meal.nameOfDish}}</span>
            <span class="inline">x&nbsp;{{meal.hasAddNumber}}</span>
          </div>
          <div>
            <span>￥&nbsp;{{meal.price*meal.hasAddNumber/100}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="total-price">
      <span class="inline">总价</span>
      <span class="inline">￥&nbsp;{{totalPrice/100}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["meals"],
  computed: {
    totalPrice() {
      return this.meals.reduce((total, meal) => {
        return total + meal.price * meal.hasAddNumber;
      }, 0);
    }
  }
};
</script>

<style lang="scss">
.to-order {
  .meal-info {
    background-color: #fff;
    margin: 5px 15px;
    padding: 5px 10px;
    .meal-list {
      max-height: 50vh;
      overflow: auto;
      .meal {
        padding: 5px 0;
        font-size: 0px;
        > .inline {
          font-size: 14px;
          box-sizing: border-box;
          max-height: 80px;
          overflow: hidden;
          &:nth-child(1) {
            width: 30%;
            text-align: center;
            img {
              width: 90%;
              border-radius: 3px;
            }
          }
          &:nth-child(2) {
            width: 70%;
            text-align: left;
            padding: 0 10px;
            position: relative;
            > div {
              padding: 8px 0;
              &:nth-child(1) {
                font-size: 0px;
                .inline {
                  font-size: 14px;
                  width: 50%;
                  text-align: left;
                  &:nth-child(2) {
                    text-align: right;
                  }
                }
              }
              &:nth-child(2) {
                color: #e12525;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .line {
      margin-top: 10px;
      border-bottom: 1px solid #cecece;
    }
    .total-price {
      padding: 10px 10px;
      font-size: 0;
      .inline {
        font-size: 14px;
        width: 50%;
        text-align: left;
        &:nth-child(2) {
          text-align: right;
          color: #e12525;
        }
      }
    }
  }
}
</style>