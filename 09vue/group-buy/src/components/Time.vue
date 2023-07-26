<template>
  <div class="time">
    <div class="choiceTime item">
      <div class="name">时间选择：</div>
      <div class="choice">
        <button
          class="start"
          :class="currentBtn == 1 ? 'active' : ''"
          @click="changeCurrent(1)"
        >
          今天
        </button>
        <button
          :class="currentBtn == 2 ? 'active' : ''"
          @click="changeCurrent(2)"
        >
          今天
        </button>
        <button
          :class="currentBtn == 3 ? 'active' : ''"
          @click="changeCurrent(3)"
        >
          今天
        </button>
        <button
          :class="currentBtn == 4 ? 'active' : ''"
          @click="changeCurrent(4)"
        >
          今天
        </button>
        <button
          :class="currentBtn == 5 ? 'active' : ''"
          @click="changeCurrent(5)"
        >
          今天
        </button>
        <button
          :class="currentBtn == 6 ? 'active' : ''"
          @click="changeCurrent(6)"
        >
          今天
        </button>
        <button
          class="end"
          :class="currentBtn == 7 ? 'active' : ''"
          @click="changeCurrent(7)"
        >
          今天
        </button>
      </div>
      <input type="date" />
    </div>
    <div class="status item">
      <div class="name">拼团状态：</div>
      <select name="" id="">
        <option value="">进行中</option>
        <option value="">进行中</option>
        <option value="">进行中</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Time",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      currentBtn: 1,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    changeCurrent: function (num) {
      this.currentBtn = num;
    },
  },
};
</script>

<style scoped lang="scss">
.time {
  padding: 20px 20px 0;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .name {
      padding: 0 12px;
      font-size: 14px;
      color: #606266;
      font-weight: bold;
      line-height: 32px;
    }
  }
  .choiceTime {
    .choice {
      display: flex;
      margin-right: 20px;
      button {
        padding: 9px 15px;
        font-size: 12px;
        color: #606266;
        border-radius: 0;
        border: 1px solid #dcdfe6;
        line-height: 1;
        background-color: #fff;
      }
      .start {
        border-radius: 3px 0 0 3px;
      }
      .end {
        border-radius: 0 3px 3px 0;
      }
      .active {
        background-color: #1890ff;
        color: #fff;
      }
    }
    input {
      width: 250px;
      height: 32px;
    }
  }
  .status {
    select {
      width: 300px;
      height: 30px;
    }
  }
}
</style>