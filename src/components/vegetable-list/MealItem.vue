<template>
  <div class="meal">
    <div class="cmn-inline-block cmn-width-40">
      <img class="meal-img" :src="meal.imgUrl" />
    </div>
    <div class="cmn-inline-block cmn-width-60">
      <div>
        <span>10</span>
        <span>西红柿炒蛋</span>
      </div>
      <div>
        <span>剩余</span>
        <span>30份</span>
      </div>
      <div>
        <p>不会骄傲是广东省</p>
      </div>
      <div>
        <q-icon
          @click.native="addToCart($event)"
          name="mdi-plus-circle-outline"
        ></q-icon>
      </div>
    </div>
  </div>
</template>
<script>
const clone = mealImg => {
  return mealImg
    .clone()
    .css({
      position: "absolute",
      opacity: 1,
      zIndex: 120,
      width: mealImg.width(),
      height: mealImg.height()
    })
    .offset({ top: mealImg.offset().top, left: mealImg.offset().left });
};
const addToCart = (target, mealImg, cart, cb) => {
  const cloneMealImg = clone(mealImg);
  cloneMealImg.appendTo($("body"));
  cloneMealImg.animate(
    {
      top: cart.offset().top - 5,
      left: cart.offset().left + 10,
      opacity: 0.3,
      width: 20,
      height: 20
    },
    800,
    "easeInOutExpo",
    () => {
      cloneMealImg.remove();
      cb && cb();
    }
  );
};
export default {
  props: ["meal", "index"],
  methods: {
    addToCart(e) {
      const { index } = this;
      const target = $(e.target);
      const mealImg = $(".meal-img").eq(index);
      const clone = mealImg.clone();
      const cart = $(".icon-cart");
      addToCart(target, mealImg, cart, () => {
        this.num++;
      });
    }
  }
};
</script>
<style lang="scss">
.meal {
  font-size: 0;
  border-bottom: 1px solid #ccc;
  padding: 2px 0px;
  font-size: 0;
  .cmn-inline-block {
    font-size: 12px;
    text-align: center;
    &:nth-child(1) {
      img {
        vertical-align: middle;
        width: 90%;
      }
    }
    &:nth-child(2) {
      div {
        padding: 2px 5px;
        &:nth-child(1) {
          display: flex;
          justify-content: space-between;
        }
        &:nth-child(2) {
          text-align: right;
        }
        &:nth-child(3) {
          text-align: left;
        }
        &:nth-child(4) {
          text-align: right;
          font-size: 25px;
          color: #027be3;
        }
      }
    }
  }
}
</style>


