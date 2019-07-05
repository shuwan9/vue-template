<template>
  <div class="order-info">
    <div class="title">
      <span>需求信息(可多选)</span>
    </div>
    <div class="order-type">
      <div
        class="inline"
        v-for="(service) in services"
        :key="service.id"
        :class="(service.mandatory || service.choose)?'active':''"
        @click="chooseService(service)"
      >
        <span>{{service.name}}</span>
        <span>￥{{service.price/100}}</span>
      </div>
    </div>
    <div class="info">
      <div class="time">
        <span class="inline width-50">预约时间</span>
        <span class="inline width-50" @click="chooseDate()">
          {{datePickerValue?datePickerValue:'请选择预约时间'}}
          <i class="iconfont iconarrow-down"></i>
        </span>
      </div>
      <div class="time" :class="datePickerValue?'':'no-border'">
        <span class="inline width-50">停放位置</span>
        <span class="inline width-50" @click="chooseLocation()">
          {{currentLocation.locationName?currentLocation.locationName:'请选择车辆停放位置'}}
          <i
            class="iconfont iconarrow-down"
          ></i>
        </span>
      </div>
      <div class="number" v-show="datePickerValue">
        <span class="inline width-50">{{datePickerValue | timeStamp2}}</span>
        <span class="inline width-50">剩余车位:&nbsp;{{locations.length}}</span>
      </div>
    </div>

    <md-date-picker
      ref="datePicker"
      v-model="isDatePickerShow"
      type="custom"
      title="请选择预约时间"
      :custom-types="['yyyy', 'MM','dd','hh','mm']"
      :line-height="45"
      :default-date="currentDate"
      :min-date="currentDate"
      :max-date="maxDate"
      @confirm="onDatePickerConfirm"
    ></md-date-picker>

    <md-dialog
      title="选择车位"
      :closable="true"
      v-model="openChooseCarLocationDialog"
      class="choose-car-dialog"
    >
      <div>
        <div
          class="inline"
          v-for="location in locations"
          :key="location.id"
          :class="location.choose?'active':''"
          @click="chooseThisLocation(location)"
        >
          <span>{{location.locationName}}</span>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
const getMaxDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = date.getDate();
  const currentTimeStamp = new Date(
    `${year}-${month}-${day} 00:00:00`
  ).getTime();
  return new Date(currentTimeStamp + 3 * 24 * 3600 * 1000);
};
export default {
  data() {
    return {
      isDatePickerShow: false,
      currentDate: new Date(),
      maxDate: getMaxDate(),
      locations: [],
      currentLocation: {},
      openChooseCarLocationDialog: false
    };
  },
  props: ["services"],
  methods: {
    chooseService(service) {
      if (service.mandatory) {
        return;
      }
      service.choose = !service.choose;
    },
    chooseDate() {
      this.isDatePickerShow = true;
    },
    onDatePickerConfirm() {
      const datePickerValue = this.$refs.datePicker.getFormatDate(
        "yyyy/MM/dd hh:mm"
      );
      this.datePickerValue = datePickerValue;
      this.getLocations();
      this.$emit("chooseDate", datePickerValue);
    },
    chooseLocation() {
      if (!this.datePickerValue) {
        Toast.failed("请先选择预约时间", 1500);
        return;
      }
      this.getLocations(() => {
        this.openChooseCarLocationDialog = true;
      });
    },
    chooseThisLocation(location) {
      this.locations.forEach(location => (location.choose = false));
      location.choose = true;
      this.currentLocation = location;
      this.openChooseCarLocationDialog = false;
      this.$emit("chooseLocation", location);
    },
    getLocations(fn) {
      const data = {
        content: JSON.stringify({
          dateOfUse: new Date(this.datePickerValue).getTime()
        })
      };
      this.$http.car.locationList(data).then(res => {
        const { code, data, message } = res.data;
        data.forEach(item => (item.choose = false));
        this.locations = data;
        fn && fn();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order-info {
  background-color: #fff;
  padding: 10px 10px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  .title {
    font-size: 15px;
    font-weight: bold;
  }
  .order-type {
    padding: 5px 0;
    padding-top: 10px;
    border-bottom: 1px solid #ededed;
    .inline {
      font-size: 12px;
      padding: 5px 10px;
      border: 1px solid #888;
      color: #888;
      border-radius: 3px;
      margin: 2px 10px;
      &.active {
        color: #4373ec;
        border: 1px solid #4373ec;
      }
    }
  }
  .info {
    padding: 10px 0;
    padding-bottom: 0;
    .time {
      border-bottom: 1px solid #ededed;
      &.no-border {
        border: none;
      }
      > .inline {
        &:nth-child(2) {
          color: #888;
        }
      }
    }
    > div {
      padding: 10px 10px;
      font-size: 0;
      > .inline {
        font-size: 12px;
        .iconfont {
          font-size: 12px;
        }
        &:nth-child(1) {
          text-align: left;
        }
        &:nth-child(2) {
          text-align: right;
        }
      }
    }
  }
}
</style>