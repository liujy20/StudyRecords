<template>
  <div class="tab">
    <p>{{ title }}</p>
    <form action="">
      <div>
        <label for="sname">学生姓名</label>
        <input type="text" id="sname" v-model="student.name" />
      </div>
      <div>
        <label for="number">学号</label>
        <input
          type="text"
          id="number"
          v-model="student.snum"
          :disabled="title == '修改学生'"
        />
      </div>

      <div>
        <label for="age">年龄</label>
        <input type="number" id="age" v-model="student.age" />
      </div>
      <div>
        <label for="sex">性别</label>
        <select name="" id="sex" v-model="student.sex">
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
    </form>
    <button id="addBtn" @click="postStudent">
      {{ title == "添加学生" ? "添加" : "修改" }}
    </button>
  </div>
</template>

<script>
import bus from "../../../util/bus";

export default {
  props: ["title", "student"],
  data() {
    return {
      
    };
  },
  methods: {
    postStudent() {
      if (this.title == "修改学生") {
        this.$emit("editStudent", this.student);
      } else {
        this.$emit("addStudent", this.student);
      }
    },
  },
};
</script>

<style>
</style>