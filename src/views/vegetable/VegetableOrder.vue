<template>
  <div class="vegetable-order">
    <div class="filter" ref="filter">
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
    <infinite-list
      :style="{ height: height }"
      :loading="loading"
      :load-more="loadMore"
    >
      <div
        class="order"
        v-for="(order, index) in orders"
        :key="index"
        @click="goToOrderDetail(order)"
      >
        <div class="left">
          <img :src="order.imgUrl" alt="" />
        </div>
        <div class="right">
          <div>
            <span>下单时间:</span>
            <span>2019-05-24 10:00:00</span>
          </div>
          <div>
            <span>总价:</span>
            <span>200</span>
          </div>
          <div>
            <span>已完成</span>
          </div>
        </div>
      </div>
    </infinite-list>
    <!-- <div class="page-infinite-wrapper" :style="{ height: height }">
      <div
        class="page-infinite-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <div
          v-for="(order, index) in orders"
          class="page-infinite-listitem order"
          :key="index"
        >
          <div class="left">
            <img :src="order.imgUrl" alt="" />
          </div>
          <div class="right">
            <div>
              <span>下单时间:</span>
              <span>2019-05-24 10:00:00</span>
            </div>
            <div>
              <span>总价:</span>
              <span>200</span>
            </div>
            <div>
              <span>已完成</span>
            </div>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div> -->
  </div>
</template>
<script>
import a from '../../assets/1.jpg'
import InfiniteList from '../../components/InfiniteList.vue'
export default {
  data() {
    return {
      check: 0,
      loading: false,
      orders: [
        { imgUrl: a, createDate: new Date(), des: 'xxxxxxxxxx', total: 200 }
      ],
      height: null,
      hasMoreOrder: true
    }
  },
  methods: {
    startCheck(check) {
      if (this.check == check) {
        this.check = 0
      } else {
        this.check = check
      }
    },
    loadMore() {
      if (!this.hasMoreOrder) {
        this.loading = false
        return
      }
      this.loading = true
      setTimeout(() => {
        this.orders = this.orders.concat(this.orders)
        if (this.orders.length >= 10) {
          this.hasMoreOrder = false
        }
        this.loading = false
      }, 2500)
    },
    goToOrderDetail(order) {
      this.$router.push({ path: '/vegetable/orderDetail' })
    }
  },
  mounted() {
    const { offsetHeight } = this.$refs.filter
    this.height =
      window.innerHeight - window.innerHeight * 0.4 - offsetHeight + 'px'
  },
  components: {
    InfiniteList
  }
}
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
          color: #027be3;
        }
      }
      div {
        color: rgba($color: #027be3, $alpha: 0.5);
      }
      > div:nth-child(1) {
        margin-bottom: 1vh;
      }
    }
  }
  .page-infinite-wrapper {
    margin-top: -1px;
    overflow: scroll;
    padding: 5px 5px;
    .order {
      font-size: 0;
      padding: 10px 10px 15px 10px;
      border-bottom: 1px solid #ccc;
      .left,
      .right {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
      }
      .left {
        width: 40%;
        img {
          vertical-align: middle;
          width: 90%;
          text-align: center;
          border-radius: 0px;
        }
      }
      .right {
        width: 60%;
        div {
          padding: 2px 5px;
          &:nth-child(3) {
            text-align: right;
          }
        }
      }
    }
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
