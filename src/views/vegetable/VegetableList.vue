<template>
  <div class="vegetable-list">
    <div class="search">
      <input type="text" />
      <q-btn label="搜索"></q-btn>
    </div>
    <div class="type">
      <div class="container" v-for="(type, index) in types" :key="index">
        <div class="img-container">
          <img :src="type.imgUrl" alt="" />
        </div>
        <div>
          <span>{{ type.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import a from "../../assets/1.jpg";
import b from "../../assets/2.jpg";
import c from "../../assets/5.jpg";
export default {
  data() {
    return {
      types: []
    };
  },
  methods: {},
  mounted() {
    this.types = [
      { name: "熟食", imgUrl: a },
      { name: "净菜", imgUrl: b },
      { name: "农产品", imgUrl: c },
      { name: "蛋糕", imgUrl: a }
    ];
  }
};
</script>

<style lang="scss">
.vegetable-list {
  .search {
    padding: 0.5vh 0 2vh 0;
    text-align: center;
    input {
      vertical-align: middle;
      padding: 0 10px;
      padding-left: 30px;
      width: 80%;
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 5.5vh;
      line-height: 5.5vh;
      margin-right: 2px;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 2px 16px;
      min-height: 30px;
    }
  }
  .type {
    .container {
      display: inline-block;
      vertical-align: middle;
      width: 25%;
      font-size: 0;
      div {
        font-size: 16px;
        text-align: center;
      }
      .img-container {
        position: relative;
        text-align: center;
        img {
          max-width: 80%;
          height: 5vh;
          vertical-align: middle;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>

