<template>
  <div class="wash">
    <user-info :user="user"></user-info>
    <car-info @chooseCar="chooseCar"></car-info>
    <order-info :services="services" @chooseDate="chooseDate" @chooseLocation="chooseLocation"></order-info>
    <div class="button-container width-100">
      <span class="inline width-50">
        共计:&nbsp;
        <span class="price">￥{{servicePrice}}</span>
      </span>
      <span class="inline width-50" @click="toOrder()">提交订单</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
import UserInfo from "./UserInfo";
import CarInfo from "./CarInfo";
import OrderInfo from "./OrderInfo";

const getDetailList = services => {
  return services
    .filter(service => service.choose || service.mandatory)
    .map(service => {
      return {
        serviceId: service.id
      };
    });
};

export default {
  data() {
    return {
      user: {},
      services: [],
      currentChooseCar: null,
      currentChooseLocation: null,
      makeAnAppointmentTime: null
    };
  },
  computed: {
    servicePrice() {
      return this.services.reduce((total, service) => {
        if (service.choose || service.mandatory) {
          return total + service.price / 100;
        } else {
          return total + 0;
        }
      }, 0);
    }
  },
  methods: {
    getServices() {
      this.$http.car.services().then(res => {
        const { code, message, data } = res.data;
        data.forEach(item => (item.choose = false));
        this.services = data;
      });
    },
    chooseCar(cars) {
      this.currentChooseCar = cars.filter(car => car.choose)[0];
    },
    chooseLocation(location) {
      this.currentChooseLocation = location;
    },
    chooseDate(date) {
      this.makeAnAppointmentTime = new Date(date).getTime();
    },
    check() {
      if (!this.currentChooseCar) {
        Toast.failed("请选择您的车辆", 1500);
        return false;
      }
      if (!this.makeAnAppointmentTime) {
        Toast.failed("请选择您的预约时间", 1500);
        return false;
      }
      if (!this.currentChooseLocation) {
        Toast.failed("请选择停车位置", 1500);
        return false;
      }
      const chooseServices = this.services.filter(service => {
        return service.choose || service.mandatory;
      });
      if (chooseServices.length == 0) {
        Toast.failed("请选择需求信息", 1500);
        return false;
      }
      return true;
    },
    getContent() {
      const content = {
        userId: this.user.id,
        userPhone: this.user.phone,
        licensePlate: this.currentChooseCar.licensePlate,
        makeAnAppointmentTime: this.makeAnAppointmentTime,
        price: this.servicePrice,
        detailList: getDetailList(this.services),
        locationId: this.currentChooseLocation.id
      };
      const data = {
        content: JSON.stringify(content)
      };
      return data;
    },
    toOrder() {
      if (this.check()) {
        const data = this.getContent();
        this.$http.car.createOrder(data).then(res => {
          const { code, data, message } = res.data;
          // this.$router.push({
          //   name: "confirm",
          //   params: {
          //     order: data
          //   }
          // });
          this.$router.push({
            name: "car_order_detail",
            params: {
              order: data
            }
          });
        });
      }
    }
  },
  components: {
    UserInfo,
    CarInfo,
    OrderInfo
  },
  mounted() {
    this.user = this.$ls.get("user");
    this.getServices();
  }
};
</script>

<style lang="scss">
.wash {
  position: relative;
  .button-container {
    position: absolute;
    left: 0;
    bottom: 0;
    .inline {
      text-align: center;
      font-size: 14px;
      padding: 15px 0;
      &:nth-child(1) {
        background-color: #fff;
        color: #333;
        .price {
          color: #e12525;
        }
      }
      &:nth-child(2) {
        background-color: #4373ec;
        color: #fff;
      }
    }
  }
}
</style>