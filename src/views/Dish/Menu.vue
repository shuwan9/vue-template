<template>
  <div class="menu">
    <span @click="chooseMenu(0)" :class="currentMenu=='shushi'?'active':''">
      <button>
        <i class="iconfont iconrou"></i>
        <p>熟食</p>
      </button>
    </span>
    <span @click="chooseMenu(1)" :class="currentMenu=='jingcai'?'active':''">
      <button>
        <i class="iconfont iconkongqizhiliang"></i>
        <p>净菜</p>
      </button>
    </span>
    <span @click="chooseMenu(2)" :class="currentMenu=='nongchanping'?'active':''">
      <button>
        <i class="iconfont iconshuiguo"></i>
        <p>农产品</p>
      </button>
    </span>
    <span @click="chooseMenu(3)" :class="currentMenu=='dangao'?'active':''">
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
    chooseMenu(menu) {
      const menus = ["shushi", "jingcai", "nongchanping", "dangao"];
      this.setCurrentMenu({ menu: menus[menu] });
    },
    ...mapMutations(["setCurrentMenu"])
  },
  computed: {
    ...mapState(["currentMenu"])
  },
  mounted() {
    this.chooseMenu(0);
  }
};
</script>

<style lang="scss">
.order {
  .menu {
    font-size: 0;
    padding: 10px 0;
    padding-bottom: 40px;
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
        width: 55px;
        height: 55px;
        border-radius: 50%;
        outline: none;
        border: none;
        text-align: center;
        vertical-align: middle;
        position: relative;
        opacity: 0.5;
        .iconfont {
          color: #fff;
          font-size: 32px;
        }
        p {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -42px;
          width: 100%;
          font-size: 14px;
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