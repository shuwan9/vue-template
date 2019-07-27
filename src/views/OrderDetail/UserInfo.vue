<template>
  <div class="user-info">
    <div>
      <span class="inline">{{order.userName}}</span>
      <span class="inline status-name">{{order.statusName}}</span>
    </div>
    <div>
      <span class="inline">{{order.userPhone}}</span>
      <span class="inline" v-if="order.dishType==1">取餐时间:&nbsp;{{order.mealTakingTime | timeStamp}}</span>
      <span class="inline" v-else>取餐时间:&nbsp;{{order.takeMealsDate}}</span>
      <!-- <span class="inline farm" v-if="order.dishType==2">取餐时间:当日{{checkTime||'17:30--21:00'}}</span>
      <span class="inline farm" v-if="order.dishType==3">取餐时间:&nbsp;下周{{checkTime||'一'}}</span>
      <span class="inline farm" v-if="order.dishType==4">取餐时间:&nbsp;下单{{checkTime||'三'}}天后</span>
      <span class="inline" v-if="order.dishType==1">取餐时间:&nbsp;{{order.mealTakingTime | timeStamp}}</span>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: ""
    };
  },
  props: ["order"],
  computed: {
    checkTime() {
      const { dishType } = this.order;
      if (dishType == 2) {
        return this.time;
      } else if (dishType == 3) {
        let week = ["一", "二", "三", "四", "五", "六", "日"];
        return week[parseInt(this.time)];
      } else if (dishType == 4) {
        return this.time;
      } else {
        return "";
      }
    }
  },
  methods: {
    getCheckKey() {
      let key;
      const { dishType } = this.order;
      if (dishType == 2) {
        key = "cleanVegetableTakeMealsTime";
      } else if (dishType == 3) {
        key = "farmDeliveryTime";
      } else if (dishType == 4) {
        key = "cakeDelivery";
      } else {
        return;
      }
      this.getCheckTime(key);
    },
    getCheckTime(key) {
      this.$http.cmn.getCheckTime(key).then(res => {
        const { code, data, message } = res.data;
        this.time = data;
      });
    }
  },
  watch: {
    order(newVal) {
      return;
      if (newVal.dishType) {
        this.getCheckKey();
      }
    }
  }
};
</script>

<style lang="scss">
.order-detail {
  background-color: #ededed;
  .user-info {
    margin: 5px 15px;
    padding: 5px 8px;
    background-color: #fff;
    border-radius: 2px;
    > div {
      padding: 5px 2px;
      font-size: 14px;
      font-weight: 400;
      .inline {
        &:nth-child(1) {
          text-align: left;
          width: 30%;
          font-size: 12px;
        }
        &:nth-child(2) {
          text-align: right;
          color: #4373ec;
          font-size: 12px;
          width: 70%;
          &.status-name {
            color: #fe821e;
          }
          &.farm {
            color: #333;
          }
        }
      }
    }
  }
}
</style>