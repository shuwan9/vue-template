<template>
  <div class="vegetable-order">
    <div class="filter">
      <div
        class="container"
        @click="startCheck(1)"
        :class="{ check: check == 1 }"
      >
        <div>
          <q-icon name="mdi-check-circle" size="5vh" />
        </div>
        <div class="span">已完成</div>
      </div>
      <div
        class="container"
        @click="startCheck(2)"
        :class="{ check: check == 2 }"
      >
        <div>
          <q-icon name="mdi-close-circle" size="5vh" />
        </div>
        <div class="span">未完成</div>
      </div>
    </div>
    <div class="page-infinite-wrapper">
      <ul
        class="page-infinite-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li v-for="item in list" class="page-infinite-listitem" :key="item">
          {{ item }}
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      check: 0,
      loading: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    };
  },
  methods: {
    startCheck(check) {
      if (this.check == check) {
        this.check = 0;
      } else {
        this.check = check;
      }
    },
    loadMore() {
      console.log(1);
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    }
  }
};
</script>
<style lang="scss">
.vegetable-order {
  .filter {
    font-size: 0;
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    .container {
      display: inline-block;
      vertical-align: middle;
      width: 50%;
      text-align: center;
      font-size: 14px;
      &.check {
        > div {
          opacity: 1;
        }
      }
      div {
        opacity: 0.3;
        color: #027be3;
      }
      > div:nth-child(1) {
        margin-bottom: 1vh;
      }
    }
  }
  .page-infinite-wrapper {
    margin-top: -1px;
    overflow: scroll;
    height: 200px;
    outline: 1px solid;
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
}
</style>


