<template>
  <div class="dish-info">
    <div class="tip">
      <span>您的订单已准备好，请在取餐时间内凭取餐码领取</span>
    </div>
    <div class="dish-list">
      <div v-for="dish in dishs" :key="dish.id" class="dish">
        <div class="inline">
          <img :src="dish.imgUrl" alt>
        </div>
        <div class="inline">
          <div>
            <span class="inline">{{dish.dishName}}</span>
            <span class="inline">x&nbsp;{{dish.count}}</span>
          </div>
          <div>
            <span>￥&nbsp;{{dish.countPrice/100}}</span>
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
// const status = [
//   {
//     label: "未接单",
//     key: "1"
//   },
//   {
//     label: "已接单",
//     key: "2"
//   },
//   {
//     label: "未付款",
//     key: "4"
//   },
//   {
//     label: "已付款",
//     key: "5"
//   },
//   {
//     label: "完成",
//     key: "99"
//   }
// ];

export default {
  props: ["dishs", "totalPrice"]
};
</script>

<style lang="scss">
.order-detail {
  .tip {
    padding: 10px 5px;
    color: #888888;
    font-size: 14px;
  }
  .dish-info {
    background-color: #fff;
    margin: 5px 15px;
    padding: 2px 10px;
    .dish-list {
      max-height: 40vh;
      overflow: auto;
      .dish {
        padding: 2px 0;
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