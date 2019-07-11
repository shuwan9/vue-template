<template>
  <div class="product-search">
    <md-input-item placeholder="请输入关键词" v-model="search.name1">
      <i slot="left" class="iconfont iconsousuo"></i>
      <i slot="right" class="iconfont iconclear" @click="clearSearchName1"></i>
    </md-input-item>
    <button @click="startSearch()">搜&nbsp;索</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Bus from "@/plugins/Bus";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["search"])
  },
  methods: {
    startSearch() {
      Bus.$emit("startSearch1");
    },
    ...mapMutations(["clearSearchName1"])
  }
};
</script>

<style lang="scss">
.product-search {
  padding: 5px 5px;
  text-align: center;
  .md-field-item {
    width: 65vw;
    padding: 0 5px;
    border-radius: 4px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    border: 1px solid #ccc;
    .md-field-item-content {
      min-height: auto;
      .iconfont {
        color: #ccc;
      }
      .md-input-item-input {
        vertical-align: middle;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
      }
    }
    .md-field-item-content:before {
      border: none;
    }
  }
  button {
    background: rgba(67, 115, 236, 1);
    border-radius: 10px;
    color: #fff;
    padding: 10px 15px;
    outline: none;
    border: none;
    font-size: 14px;
  }
}
</style>