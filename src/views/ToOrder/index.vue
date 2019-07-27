<template>
  <div class="to-order">
    <user-info @chooseDate="onChooseDate"></user-info>
    <meal-info :meals="meals"></meal-info>
    <pay-info></pay-info>
    <div class="button-container">
      <md-button inline size="small" @click="back()">返回</md-button>
      <md-button inline size="small" @click="createOrder()">确认订单</md-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { Toast } from "mand-mobile";
import UserInfo from "./UserInfo";
import MealInfo from "./MealInfo";
import PayInfo from "./PayInfo";
const checkPickMealDate = (pickMealDate, dishType) => {
  // if (dishType.key == 2) {
  //   return true;
  // }
  if (dishType.key == 3) {
    return true;
  }
  if (dishType.key == 4) {
    return true;
  }
  if (
    pickMealDate === undefined ||
    pickMealDate === null ||
    pickMealDate === ""
  ) {
    Toast.failed("请选择取餐时间", 1500);
    return false;
  }
  return true;
};
export default {
  data() {
    return {
      pickMealDate: ""
    };
  },
  computed: {
    ...mapGetters(["meals"]),
    ...mapState(["dishType"])
  },
  methods: {
    onChooseDate(datePickerValue) {
      this.pickMealDate = datePickerValue;
    },
    back() {
      const orderBackPath = this.$ls.get("orderBackPath");
      this.$router.push(orderBackPath);
    },
    getOrderContent() {
      const { id, phone } = this.$ls.get("user");
      const { key } = this.dishType;
      const dishArray = this.meals
        .filter(meal => meal.hasAddNumber > 0)
        .map(meal => {
          return {
            dishId: meal.id,
            count: meal.hasAddNumber
          };
        });
      const price = this.meals.reduce((total, meal) => {
        return total + (meal.hasAddNumber * meal.price) / 100;
      }, 0);
      const count = this.meals.reduce((total, meal) => {
        return total + meal.hasAddNumber;
      }, 0);
      const data = {
        userId: id,
        dishType: key,
        userPhone: phone,
        dishArray,
        price,
        count
      };
      if (this.dishType.key == 1 || this.dishType.key == 2) {
        data.mealTakingTime = new Date(this.pickMealDate).getTime();
      }
      return {
        content: JSON.stringify(data)
      };
    },
    createOrder() {
      const { pickMealDate } = this;
      if (checkPickMealDate(pickMealDate, this.dishType)) {
        const content = this.getOrderContent();
        this.$http.order.createOrder(content).then(res => {
          const { code, message, data } = res.data;
          if (code == 0) {
            Toast.succeed(message, 1500);
            setTimeout(() => {
              this.clearCarts();
              // this.$router.push("/order/dish");
              this.$router.replace("/order/dish");
            }, 1500);
          } else {
            Toast.info(message, 1500);
          }
        });
      }
    },
    ...mapMutations(["clearCarts"])
  },
  components: {
    UserInfo,
    MealInfo,
    PayInfo
  }
};
</script>

<style lang="scss">
.to-order {
  background: rgba(237, 237, 237, 1);
  .button-container {
    text-align: right;
    padding: 2px 15px;
    button {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      &:nth-child(1) {
        margin-right: 10px;
        color: #888;
      }
      &:nth-child(2) {
        background: linear-gradient(
          -40deg,
          rgba(67, 115, 236, 1),
          rgba(63, 157, 244, 1)
        );
        color: #fff;
      }
    }
  }
}
</style>