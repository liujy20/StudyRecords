<template>
  <div class="search">
    <div class="item">
      <div class="name">订单类型：</div>
      <el-radio-group v-model="mySearch.type" size="small">
        <el-radio-button
          v-for="item in types"
          :key="item"
          :label="item"
        ></el-radio-button>
      </el-radio-group>
    </div>
    <div class="item">
      <div class="name">订单状态：</div>
      <el-radio-group v-model="mySearch.status" size="small">
        <el-radio-button
          v-for="item in status"
          :key="item"
          :label="item"
        ></el-radio-button>
      </el-radio-group>
    </div>
    <div class="item">
      <div class="name">时间选择：</div>
      <div>
        <el-radio-group v-model="time" size="small">
          <el-radio-button
            v-for="(item, index) in times"
            :key="item"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div>
        <el-date-picker
          :disabled="dateIsDisabled"
          v-model="searchDate"
          type="daterange"
          size="small"
          unlink-panels
        >
        </el-date-picker>
      </div>
    </div>
    <div class="item">
      <div class="name">订单号：</div>
      <el-input
        placeholder="请输入内容"
        v-model="tempInput"
        class="input-with-select"
        size="small"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchInput"
        ></el-button>
      </el-input>
    </div>
    <div class="item">
      <div class="btn"><el-button size="small">导出</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["search"],
  data() {
    return {
      mySearch: this.search,
      time: "0",
      // 临时输入
      tempInput: "",
      types: ["全部", "商城订单", "视频号订单"],
      status: [
        "全部",
        "未支付",
        "未发货",
        "待收货",
        "待评价",
        "交易完成",
        "待核销",
        "申请退款",
        "已退款",
        "已删除",
      ],
      times: [
        "全部",
        "今天",
        "昨天",
        "最近7天",
        "最近30天",
        "本月",
        "本年",
        "指定时间",
      ],
      // 时间是否可选择
      dateIsDisabled: true,
      // 日历日期
      searchDate: [],
    };
  },
  methods: {
    searchInput() {
      this.mySearch.input = this.tempInput;
    },
  },
  watch: {
    mySearch: {
      handler() {
        this.$emit("getSearch", this.mySearch);
      },
      deep: true,
    },
    // 确定时间
    time(num) {
      this.dateIsDisabled = true;
      let today = new Date(); //当前时间
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      today.setDate(today.getDate() + 1);
      switch (num) {
        case 0:
          // 全部
          this.mySearch.startTime = "";
          this.mySearch.endTime = "";
          break;
        case 1:
          // 今天
          this.mySearch.endTime = today.getTime();
          today.setDate(today.getDate() - 1);
          this.mySearch.startTime = today.getTime();
          break;
        case 2:
          // 昨天
          today.setDate(today.getDate() - 1);
          this.mySearch.endTime = today.getTime();
          today.setDate(today.getDate() - 1);
          this.mySearch.startTime = today.getTime();
          break;
        case 3:
          // 最近7天
          this.mySearch.endTime = today.getTime();
          today.setDate(today.getDate() - 7);
          this.mySearch.startTime = today.getTime();
          break;
        case 4:
          // 最近30天
          this.mySearch.endTime = today.getTime();
          today.setDate(today.getDate() - 30);
          this.mySearch.startTime = today.getTime();
          break;
        case 5:
          // 本月
          this.mySearch.endTime = today.getTime();
          let endData = today.getDate();
          if (endData == 1) {
            today.setMonth(today.getMonth() - 1);
          }
          today.setDate(1);
          console.log(today.toLocaleString());
          this.mySearch.startTime = today.getTime();
          break;
        case 6:
          // 本年
          this.mySearch.endTime = today.getTime();
          today.setMonth(0);
          today.setDate(1);
          this.mySearch.startTime = today.getTime();
          // console.log(today.toLocaleString());
          break;
        case 7:
          this.mySearch.startTime = "";
          this.mySearch.endTime = "";
          this.dateIsDisabled = false;
          break;
      }
    },
    // 选择时间范围
    searchDate(value) {
      console.log(value);
      if (!value) {
        this.mySearch.startTime = "";
        this.mySearch.endTime = "";
        return;
      }
      let day1 = new Date(value[0]);
      let day2 = new Date(value[1]);
      this.mySearch.startTime = day1.getTime();
      day2.setDate(day2.getDate() + 1);
      this.mySearch.endTime = day2.getTime();
    },
  },
};
</script>

<style lang="scss">
.search {
  background-color: #fff;
  padding: 20px;
  .item {
    display: flex;
    height: 32px;
    margin-bottom: 20px;
    .name {
      flex-basis: 80px;
      text-align: right;
      font-size: 14px;
      color: #606266;
      font-weight: bold;
      padding-right: 12px;
      line-height: 32px;
    }
    .btn {
      margin-left: 92px;
    }
    .el-input {
      width: 300px;
    }
    div {
      margin-right: 10px;
    }
  }
}
</style>