<template>
  <div class="router-link-tab">
    <router-link
      v-for="(routerLink,index) in routerLinks"
      :key="index"
      :to="routerLink.to"
    >{{ routerLink.name}}</router-link>
  </div>
</template>

<script>
export default {
  props: ["routerLinks"]
};
</script>

<style lang="scss">
.router-link-tab {
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
</style>