<template>
  <div class="spm-confirm-order">
    <user-info @chooseDate="onChooseDate"></user-info>
    <product-info :products="supermarketCart"></product-info>
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
import ProductInfo from "./ProductInfo";
import PayInfo from "./PayInfo";
const checkPickMealDate = pickMealDate => {
  if (
    pickMealDate === undefined ||
    pickMealDate === null ||
    pickMealDate === ""
  ) {
    Toast.failed("请选择取货时间", 1500);
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
    ...mapState(["supermarketCart"])
  },
  methods: {
    onChooseDate(datePickerValue) {
      this.pickMealDate = datePickerValue;
    },
    back() {
      const orderBackPath = this.$ls.get("spmorderBackPath");
      this.$router.push(orderBackPath);
    },
    getOrderContent() {
      const { id, phone } = this.$ls.get("user");
      const price = this.supermarketCart.reduce((total, product) => {
        return total + (product.hasAddNumber * product.price) / 100;
      }, 0);
      const orderDetail = this.supermarketCart
        .filter(product => product.hasAddNumber > 0)
        .map(product => {
          return {
            commodityId: product.id,
            count: product.hasAddNumber
          };
        });
      const count = this.supermarketCart.reduce((total, product) => {
        return total + product.hasAddNumber;
      }, 0);
      const data = {
        userId: id,
        userPhone: phone,
        price,
        count,
        orderDetail,
        pickUpTime: new Date(this.pickMealDate).getTime()
      };

      return {
        content: JSON.stringify(data)
      };
    },
    createOrder() {
      const { pickMealDate } = this;
      if (checkPickMealDate(pickMealDate)) {
        const content = this.getOrderContent();
        this.$http.spm.createOrder(content).then(res => {
          const { code, message, data } = res.data;
          if (code == 0) {
            Toast.succeed(message, 1500);
            setTimeout(() => {
              this.clearSupermarketCart();
              this.$router.replace("/supermarket/products");
            }, 1500);
          } else {
            Toast.info(message, 1500);
          }
        });
      }
    },
    ...mapMutations(["clearSupermarketCart"])
  },
  components: {
    UserInfo,
    ProductInfo,
    PayInfo
  }
};
</script>

<style lang="scss" >
.spm-confirm-order {
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