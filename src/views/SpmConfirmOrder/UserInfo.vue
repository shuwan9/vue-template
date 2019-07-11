<template>
  <div class="user-info">
    <div>{{user.name}}</div>
    <div>
      <span class="inline">{{user.phone}}</span>
      <span
        class="inline"
        @click="chooseDate()"
      >{{pickMealTime?`取货时间:&nbsp;${pickMealTime}`:'请选择取货时间'}}</span>
    </div>
    <md-date-picker
      ref="datePicker"
      v-model="isDatePickerShow"
      type="custom"
      title="请选择取货时间"
      :custom-types="['yyyy', 'MM','dd', 'hh', 'mm']"
      :line-height="45"
      :default-date="currentDate"
      :min-date="currentDate"
      @change="onDatePickerChange"
      @confirm="onDatePickerConfirm"
    ></md-date-picker>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      user: {},
      isDatePickerShow: false,
      currentDate: new Date(),
      pickMealTime: ""
    };
  },
  methods: {
    chooseDate() {
      this.isDatePickerShow = true;
    },
    onDatePickerConfirm(columnsValue) {
      const datePickerValue = this.$refs.datePicker.getFormatDate(
        "yyyy/MM/dd hh:mm"
      );
      this.pickMealTime = datePickerValue;
      this.$emit("chooseDate", datePickerValue);
    }
  },
  mounted() {
    this.user = this.$ls.get("user");
  }
};
</script>

<style lang="scss">
.spm-confirm-order {
  .user-info {
    margin: 10px 15px;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 2px;
    > div {
      padding: 5px 2px;
      font-size: 14px;
      font-weight: 400;
      .inline {
        &:nth-child(1) {
          text-align: left;
          width: 40%;
        }
        &:nth-child(2) {
          text-align: right;
          color: #4373ec;
          font-size: 14px;
          width: 56%;
          &.farm {
            color: #333;
          }
        }
      }
    }
  }
}
</style>