<template>
  <div class="meal-type">
    <div
      class="cmn-inline-block cmn-width-25"
      v-for="(mealType, index) in mealTypes"
      :key="index"
    >
      <div class="img-container">
        <img :src="mealType.imgUrl" alt="" />
      </div>
      <div>
        <span>{{ mealType.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["mealTypes"]
};
</script>
<style lang="scss">
.meal-type {
  position: relative;
  z-index: 200;
  padding-bottom: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  .cmn-inline-block {
    font-size: 0;
    div {
      font-size: 16px;
      text-align: center;
    }
    .img-container {
      position: relative;
      text-align: center;
      margin-bottom: 10px;
      img {
        max-width: 100%;
        height: 45px;
        vertical-align: middle;
        border-radius: 5px;
      }
    }
  }
}
</style>


