<template>
  <div class="car-info">
    <div class="title">
      <span>车辆信息</span>
      <span class="add" @click="addCar()">添加车辆</span>
    </div>
    <div>
      <div class="info">
        <span class="inline width-55">车辆</span>
        <!-- <input class="width-45" type="text" placeholder="请选择您的车辆" disabled @click="chooseCar()"> -->
        <span class="inline width-45" @click="chooseCar()">
          {{currentCar}}
          <i class="iconfont iconarrow-down"></i>
        </span>
      </div>
    </div>
    <md-dialog v-model="openAddCarDialog" :closable="false" :btns="btns" class="add-car-dialog">
      <div class="add-car-dialog-content">
        <div>
          <input ref="input" type="text" placeholder="请输入车牌号码" v-model="carInfo.carCard" />
        </div>
        <div>
          <input type="text" placeholder="请输入车型" v-model="carInfo.carType" />
        </div>
        <div>
          <textarea type="text" placeholder="备注信息" v-model="carInfo.carRemark"></textarea>
        </div>
      </div>
    </md-dialog>
    <md-dialog
      title="选择车辆"
      :closable="true"
      v-model="openChooseCarDialog"
      class="choose-car-dialog"
    >
      <div>
        <div
          class="inline"
          v-for="car in cars"
          :key="car.id"
          :class="car.choose?'active':''"
          @click="chooseThisCar(car)"
        >
          <span>{{car.licensePlate}}</span>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
const getCarInfo = () => {
  return {
    carCard: "",
    carType: "",
    carRemark: ""
  };
};
export default {
  data() {
    return {
      openAddCarDialog: false,
      openChooseCarDialog: false,
      carInfo: getCarInfo(),
      cars: [],
      btns: [
        {
          text: "取消"
        },
        {
          text: "保存",
          handler: this.saveCarInfo
        }
      ]
    };
  },
  computed: {
    currentCar() {
      if (this.cars.length == 0) {
        return "请先添加车辆";
      }
      if (this.cars.length == 1) {
        this.cars[0].choose = true;
        this.$emit("chooseCar", this.cars);
        return this.cars[0].licensePlate;
      }
      const chooseCars = this.cars.filter(car => car.choose)[0];
      return chooseCars ? chooseCars.licensePlate : "请选择您的车辆";
    }
  },
  methods: {
    addCar() {
      this.openAddCarDialog = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    saveCarInfo() {
      const { carCard, carType, carRemark } = this.carInfo;
      if (!carCard) {
        Toast.failed("请填写车牌号码", 1500);
        return;
      }
      const data = {
        content: JSON.stringify({
          userId: this.$ls.get("user").id,
          licensePlate: carCard,
          remarks: carRemark,
          type: carType
        })
      };
      this.$http.car.addUserCar(data).then(res => {
        const { code, message } = res.data;
        Toast.succeed(message, 1500);
        setTimeout(() => {
          this.openAddCarDialog = false;
          this.carInfo = getCarInfo();
        }, 1500);
      });
    },
    getCars(fn) {
      const { id } = this.$ls.get("user");
      this.$http.car.getUserCars(id).then(res => {
        const { code, message, data } = res.data;
        data.forEach(item => (item.choose = false));
        this.cars = data;
        fn && fn();
      });
    },
    chooseCar() {
      this.getCars(() => {
        if (this.cars.length == 0) {
          Toast.info("暂无车辆可供选择，请先添加车辆", 1500);
          return;
        }
        if (this.cars.length == 1) {
          return;
        }
        this.openChooseCarDialog = true;
      });
    },
    chooseThisCar(car) {
      this.cars.forEach(car => (car.choose = false));
      car.choose = true;
    }
  },
  mounted() {
    this.getCars();
  }
};
</script>

<style lang="scss">
.add-car-dialog {
  .md-dialog-content {
    .md-dialog-body {
      width: 80vw;
      text-align: center;
      padding: 15px 10px;
      input,
      textarea {
        width: 80%;
        border: 1px solid #ededed;
        border-radius: 5px;
        margin: 10px 0;
        outline: none;
        font-size: 14px;
        padding: 0 10px;
      }
      textarea {
        padding: 10px;
      }
    }
  }
  input {
    height: 34px;
    line-height: 34px;
  }
}
.choose-car-dialog {
  .md-dialog-content {
    .md-dialog-body {
      .md-dialog-close {
        top: 10px;
        right: 20px;
      }
      .md-icon.icon-font.md {
        font-size: 20px;
      }
      .md-dialog-title {
        font-size: 16px;
        margin: 0;
        margin-bottom: 10px;
      }
      width: 80vw;
      text-align: center;
      padding: 15px 10px;
      .inline {
        font-size: 12px;
        padding: 5px;
        margin: 2px;
        border-radius: 5px;
        border: 1px solid #ededed;
        &.active {
          border: 1px solid #4373ec;
          color: #4373ec;
        }
      }
    }
  }
}
.car-info {
  background-color: #fff;
  padding: 10px 10px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  .title {
    font-size: 15px;
    font-weight: bold;
    position: relative;
    .add {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
      font-size: 12px;
      color: #4373ec;
    }
  }

  .info {
    padding: 5px 0;
    font-size: 0;
    &:nth-child(1) {
      // border-bottom: 1px solid #ededed;
      margin-top: 5px;
    }
    .inline,
    input {
      font-size: 12px;
      box-sizing: border-box;
      vertical-align: middle;
    }
    .inline {
      text-align: left;
      &:nth-child(2) {
        text-align: right;
        color: #888;
      }
    }
    input {
      text-align: right;
      padding-right: 10px;
      height: 30px;
      line-height: 30px;
      border: none;
      outline: none;
    }
  }
}
</style>