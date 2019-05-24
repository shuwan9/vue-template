<template>
  <div class="page-infinite-wrapper">
    <div
      class="page-infinite-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <slot></slot>
    </div>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      required: true
    },
    loadMore: {
      required: true
    }
  }
};
</script>
<style lang="scss">
.page-infinite-wrapper {
  margin-top: -1px;
  overflow: scroll;
  padding: 5px 5px;
  .page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
    div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>

