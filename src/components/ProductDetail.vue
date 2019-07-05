<template>
  <div class="product" @click="goToProductDetail()">
    <div class="inline">
      <img :src="product.imgUrl">
    </div>
    <div class="inline">
      <div class="detail">
        <span class="name inline">{{product.name}}</span>
        <span class="num inline">
          剩余&nbsp;
          <span>{{product.count-product.hasAddNumber>=0?product.count-product.hasAddNumber:0}}</span>
          &nbsp;份
        </span>
      </div>
      <div class="detail text-over-flow">
        <span>{{product.commodityDescription}}</span>
      </div>
      <div class="detail">
        <span class="price inline">
          <span>
            ￥
            {{product.price/100}}
          </span>
        </span>
        <span class="inline" @click="stop($event)">
          <transition name="rotate-in">
            <i
              class="iconfont iconMinuswithcircle"
              v-if="product.hasAddNumber"
              @click="minus($event)>0"
            ></i>
          </transition>
          <i
            class="iconfont iconadd"
            ref="ballContainer"
            :class="product.count==product.hasAddNumber?'sold':''"
            @click="add($event)"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Bus from "@/plugins/Bus";
export default {
  props: ["product"],
  methods: {
    stop(e) {
      e.stopPropagation();
    },
    add(e) {
      const { count, hasAddNumber } = this.product;
      if (hasAddNumber == count) {
        return;
      }
      this.addToSupermarketCart(this.product);
      Bus.$emit("startBallAnimation", this.$refs.ballContainer);
    },
    minus(e) {
      const { hasAddNumber } = this.product;
      if (hasAddNumber == 0) {
        return;
      }
      this.product.hasAddNumber--;
    },
    goToProductDetail() {
      this.$ls.set("product", this.product);
      this.$router.push("/supermarketproductdetail");
    },
    ...mapMutations(["addToSupermarketCart"])
  }
};
</script>

<style lang="scss">
rotate-in-enter {
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
.product-list {
  .product {
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ededed;
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
            font-size: 14px;
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