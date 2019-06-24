<template>
  <div class="menu">
    <span @click="chooseDishType(1)" :class="dishType.key==1?'active':''">
      <button>
        <i class="iconfont iconrou"></i>
        <p>熟食</p>
      </button>
    </span>
    <span @click="chooseDishType(2)" :class="dishType.key==2?'active':''">
      <button>
        <i class="iconfont iconkongqizhiliang"></i>
        <p>净菜</p>
      </button>
    </span>
    <span @click="chooseDishType(3)" :class="dishType.key==3?'active':''">
      <button>
        <i class="iconfont iconshuiguo"></i>
        <p>农产品</p>
      </button>
    </span>
    <span @click="chooseDishType(4)" :class="dishType.key==4?'active':''">
      <button>
        <i class="iconfont icondingdangao"></i>
        <p>蛋糕</p>
      </button>
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    chooseDishType(key) {
      const dishType = this.dishTypes.filter(dishType => {
        return dishType.key == key;
      })[0];
      this.setDishType(dishType);
    },
    ...mapMutations(["setDishType"])
  },
  computed: {
    ...mapState(["dishType", "dishTypes"])
  },
  mounted() {}
};
</script>

<style lang="scss">
.order {
  .menu {
    font-size: 0;
    padding: 5px 0;
    padding-bottom: 25px;
    span {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      width: 25%;
      font-size: 16px;
      &.active {
        button {
          opacity: 1;
          p {
            color: #4373ec;
            font-weight: bold;
          }
        }
      }
      button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        outline: none;
        border: none;
        text-align: center;
        vertical-align: middle;
        position: relative;
        opacity: 0.5;
        .iconfont {
          color: #fff;
          font-size: 20px;
        }
        p {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -30px;
          width: 100%;
          font-size: 12px;
          text-align: center;
        }
      }
      &:nth-child(1) {
        button {
          background-color: #fa5527;
        }
      }
      &:nth-child(2) {
        button {
          background-color: #4fa450;
        }
      }
      &:nth-child(3) {
        button {
          background-color: #fbb326;
        }
      }
      &:nth-child(4) {
        button {
          background-color: #fa89c4;
        }
      }
    }
  }
}
</style>