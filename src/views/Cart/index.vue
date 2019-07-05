<template>
  <div class="cart">
    <span>
      <i class="iconfont icongouwuche" @click="checkCart()" :class="mealsTotal==0?'grey':''">
        <button>{{mealsTotal}}</button>
      </i>
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </span>
    <span @click="goToOrder()" :class="mealsTotal==0?'grey':''">确认下单</span>
    <cart-detail></cart-detail>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Bus from "@/plugins/Bus";
import CartDetail from "./CartDetail";
function createBalls() {
  let balls = [];
  for (let i = 0; i < 5; i++) {
    balls.push({ show: false });
  }
  return balls;
}
export default {
  data() {
    return {
      balls: createBalls()
    };
  },
  computed: {
    ...mapGetters(["mealsTotal"]),
    ...mapState(["show"])
  },
  methods: {
    checkCart() {
      if (this.mealsTotal == 0) {
        return;
      }
      this.setShowCartDetail(!this.show.showCartDetail);
    },
    goToOrder() {
      if (this.mealsTotal == 0) {
        return;
      }
      this.$ls.set("orderBackPath", this.$route.path);
      this.$router.push("/toOrder");
    },
    ...mapMutations(["setShowCartDetail"]),
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1];
      const rect = ball.el.getBoundingClientRect();
      const x = rect.left - 65;
      const y = -(window.innerHeight - rect.top - 40);
      el.style.display = "";
      // el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      const inner = el.getElementsByClassName("inner-hook")[0];
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,${y}px,0)`;
    },
    dropping(el, done) {
      this._reflow = document.body.offsetHeight;
      setTimeout(() => {
        // el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`;
        const inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`;
        el.addEventListener("transitionend", done);
      }, 100);
    },
    afterDrop(el) {
      const ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  },
  components: {
    CartDetail
  },
  created() {
    this.dropBalls = [];
  },
  mounted() {
    Bus.$on("startBallAnimation", el => {
      for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].show == false) {
          this.balls[i].show = true;
          this.balls[i].el = el;
          this.dropBalls.push(this.balls[i]);
          return;
        }
      }
    });
  }
};
</script>

<style lang="scss">
.order,
.dish-detail {
  .cart {
    position: absolute;
    left: 0;
    bottom: -0px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    border-top: 1px solid #ececec;
    font-size: 0;
    > span {
      position: relative;
      z-index: 1001;
      display: inline-block;
      vertical-align: middle;
      width: 50%;
      font-size: 14px;
      text-align: center;
      transition: all 0.1s ease-in-out;
      &:nth-child(1) {
        text-align: left;
        background-color: #fff;
        .iconfont {
          font-size: 30px;
          display: inline-block;
          vertical-align: top;
          margin-left: 40px;
          position: relative;
          &.grey {
            color: #ccc;
            button {
              background-color: #ccc;
            }
          }
          button {
            position: absolute;
            top: 2px;
            right: -15px;
            width: 22px;
            height: 22px;
            text-align: center;
            padding: 0;
            border-radius: 50%;
            outline: none;
            border: none;
            font-size: 12px;
            background-color: #e12525;
            color: #fff;
          }
        }
        .ball-container {
          // position: absolute;
          // top: 0;
          // left: 50px;
          > div {
            .ball {
              position: fixed;
              left: 68px;
              bottom: 20px;
              // transition: all 2s cubic-bezier(0.49, -0.29, 0.75, 0.41);
              .inner {
                // position: absolute;
                // left: 20px;
                // top: 5px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #4373ec;
                transition: all 0.6s cubic-bezier(0.38, -0.4, 0.83, 0.67);
                // transition: all 0.6s cubic-bezier(0, 0, 0.83, 0.67);
              }
            }
          }
        }
      }
      &:nth-child(2) {
        background-color: #4373ec;
        color: #fff;
        &.grey {
          background-color: #888;
        }
      }
    }
  }
}
</style>