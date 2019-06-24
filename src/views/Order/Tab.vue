<template>
  <div class="tab">
    <router-link to="/order/dish">菜品列表</router-link>
    <router-link to="/order/list">我的订单</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.order {
  .tab {
    height: 5vh;
    line-height: 5vh;
    text-align: center;
    font-size: 0;
    padding: 0 10%;
    a {
      display: inline-block;
      vertical-align: middle;
      width: 40%;
      text-align: center;
      font-size: 14px;
      color: #333;
      text-decoration: none;
      position: relative;
      &.router-link-exact-active {
        color: rgba(67, 115, 236, 1);
        &:after {
          content: "";
          display: block;
          width: 35px;
          height: 3px;
          background-color: rgba(67, 115, 236, 1);
          position: absolute;
          left: 50%;
          bottom: 1px;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>