<template>
  <md-popup v-model="show.showSupermarketCartDetail" position="bottom" class="cart-detail-popup">
    <div class="cart-detail">
      <div class="title">
        <span class="inline" @click="close()">关闭</span>
        <span class="inline" @click="removeAll()">
          <i class="iconfont iconqingkong"></i>&nbsp;清空
        </span>
      </div>
      <div class="detail-product-list">
        <div
          v-for="(product,index) in supermarketCart"
          :key="index"
          class="product-container"
          v-show="product.hasAddNumber>0"
        >
          <div class="inline">
            <img :src="product.imgUrl" alt>
          </div>
          <div class="inline">
            <div>{{product.name}}</div>
            <div>￥{{product.price*product.hasAddNumber/100}}</div>
          </div>
          <div class="inline">
            <div>
              <i class="iconfont iconMinuswithcircle" @click="minus(product)"></i>
              <span>{{product.hasAddNumber}}</span>
              <i class="iconfont iconadd" @click="add(product)"></i>
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
    ...mapState(["supermarketCart", "show"]),
    ...mapGetters(["supermarketCartTotal"])
  },
  methods: {
    add(product) {
      if (product.hasAddNumber < product.count) {
        product.hasAddNumber++;
      }
    },
    minus(product) {
      if (product.hasAddNumber > 0) {
        product.hasAddNumber--;
      }
      if (this.supermarketCartTotal == 0) {
        this.setShowSupermarketCartDetail(false);
      }
    },
    close() {
      this.setShowSupermarketCartDetail(false);
    },
    removeAll() {
      Dialog.confirm({
        content: `清空购物车？`,
        confirmText: "清空",
        onConfirm: () => {
          this.clearSupermarketCart();
          this.setShowSupermarketCartDetail(false);
        }
      });
    },
    ...mapMutations(["setShowSupermarketCartDetail", "clearSupermarketCart"])
  },
  mounted() {}
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
      .detail-product-list {
        background-color: #fff;
        max-height: 400px;
        overflow: auto;
        .product-container {
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