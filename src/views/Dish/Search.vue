<template>
  <div class="search">
    <md-input-item placeholder="请输入关键词">
      <i slot="left" class="iconfont iconsousuo"></i>
      <i slot="right" class="iconfont iconclear"></i>
    </md-input-item>
    <button>搜&nbsp;索</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.order {
  .search {
    padding: 5px 15px;
    text-align: center;
    .md-field-item {
      width: 60%;
      padding: 0 15px;
      border-radius: 10px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 15px;
      border: 1px solid #ccc;
      .md-field-item-content {
        min-height: auto;
        .md-input-item-input {
          vertical-align: middle;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
        }
      }
    }
    button {
      background: rgba(67, 115, 236, 1);
      border-radius: 10px;
      color: #fff;
      padding: 10px 15px;
      outline: none;
      border: none;
      font-size: 16px;
    }
  }
}
</style>