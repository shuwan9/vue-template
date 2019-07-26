<template>
  <div class="meal-order-summary">
    <div>
      <md-field>
        <md-field-item title="选择类别" :content="selectorText" @click="showSelector" arrow solid />
      </md-field>
      <md-selector
        v-model="isSelectorShow"
        :default-value="defaultValue"
        :data="transformDishTypes"
        max-height="150px"
        title="选择类别"
        @choose="onSelectorChoose"
      ></md-selector>
    </div>
    <div>
      <md-field>
        <md-field-item
          name="name"
          title="开始时间"
          arrow="arrow-right"
          align="right"
          :content="datePickerValue"
          @click.native="isDatePickerShow = true"
        ></md-field-item>
      </md-field>
      <md-date-picker
        ref="datePicker"
        v-model="isDatePickerShow"
        type="custom"
        title="选择开始时间"
        :custom-types="['yyyy', 'MM','dd']"
        :default-date="currentDate"
        @confirm="onDatePickerConfirm"
      ></md-date-picker>
    </div>
    <div>
      <md-field>
        <md-field-item
          name="name"
          title="结束时间"
          arrow="arrow-right"
          align="right"
          :content="datePickerValue2"
          @click.native="isDatePickerShow2 = true"
        ></md-field-item>
      </md-field>
      <md-date-picker
        ref="datePicker2"
        v-model="isDatePickerShow2"
        type="custom"
        title="选择结束时间"
        :custom-types="['yyyy', 'MM','dd']"
        :default-date="currentDate"
        @confirm="onDatePickerConfirm2"
      ></md-date-picker>
    </div>
    <div class="button-container">
      <div>
        <md-button inline size="small" @click="back()">返回</md-button>
        <md-button inline size="small" @click="search()">查询</md-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Selector, Field, FieldItem, Toast } from "mand-mobile";
const TYPEMISS = "请选择类别";
const STARTTIMEMISS = "请选择开始时间";
const ENDTIMEMISS = "请选择结束时间";
const STARTOVEREND = "结束时间不能早于开始时间";
const getDate2 = value => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};
export default {
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem
  },
  data() {
    return {
      defaultValue: "1",
      selectorValue: "1",
      selectorText: "熟食",
      isSelectorShow: false,
      currentDate: new Date(),
      isDatePickerShow: false,
      isDatePickerShow2: false,
      datePickerValue: getDate2(new Date().getTime()),
      datePickerValue2: getDate2(new Date().getTime())
    };
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true;
    },
    onSelectorChoose({ text, value }) {
      this.selectorValue = value;
      this.selectorText = text;
    },
    // check() {
    //   console.log(this.selectorValue, this.selectorText);
    // },
    onDatePickerConfirm(columnsValue) {
      this.datePickerValue = this.$refs.datePicker.getFormatDate("yyyy-MM-dd");
    },
    onDatePickerConfirm2(columnsValue) {
      this.datePickerValue2 = this.$refs.datePicker2.getFormatDate(
        "yyyy-MM-dd"
      );
    },
    back() {
      this.$router.replace({ path: "/meal_order_mgm" });
    },
    search() {
      if (!this.selectorValue) {
        Toast.failed(TYPEMISS, 1500);
        return;
      }
      if (!this.datePickerValue) {
        Toast.failed(STARTTIMEMISS, 1500);
        return;
      }
      if (!this.datePickerValue2) {
        Toast.failed(ENDTIMEMISS, 1500);
        return;
      }
      const startTime = new Date(this.datePickerValue).getTime();
      const endTime = new Date(this.datePickerValue2).getTime();
      if (endTime < startTime) {
        Toast.failed(STARTOVEREND, 1500);
        return;
      }
    }
  },
  computed: {
    ...mapState(["dishTypes"]),
    transformDishTypes() {
      return this.dishTypes.map(dishType => {
        const { key, label } = dishType;
        return {
          value: key,
          text: label
        };
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.meal-order-summary {
  padding: 0px 5px;
  padding-top: 15px;
  .button-container {
    text-align: right;
    padding: 10px 15px;
    button {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      padding: 0 5px;
      &:nth-child(1) {
        // background: linear-gradient(
        //   -40deg,
        //   rgb(100, 106, 122),
        //   rgba(100, 106, 122, 1)
        // );
        border: 1px solid #ccc;
      }
      &:nth-child(2) {
        background: linear-gradient(
          -40deg,
          rgba(67, 115, 236, 1),
          rgba(63, 157, 244, 1)
        );
        color: #fff;
        margin-left: 15px;
      }
    }
  }
  .md-field {
    padding: 0;
    .md-field-item-content {
      padding: 5px 10px;
      min-height: auto;
      .md-field-item-title {
        font-size: 14px;
      }
      .md-field-item-control {
        font-size: 14px;
        color: #4373ec;
        text-align: right;
      }
      .md-icon.icon-font.md {
        font-size: 16px;
      }
    }
  }
  .md-popup-title-bar {
    height: 40px;
    .md-icon.icon-font.lg {
      font-size: 16px;
    }
  }
  .md-cell-item-body {
    padding: 5px 0;
    min-height: auto;
  }
  .md-cell-item-title {
    padding: 5px 0;
    margin: 2px 0;
    font-size: 14px;
  }
  .md-popup-title-bar .title-bar-title p.title {
    font-size: 14px;
  }
}
</style>


