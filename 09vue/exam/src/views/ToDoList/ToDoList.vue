<template>
  <div>
    <!-- header -->
    <div id="header">
      <label class="text">TodoList</label>
      <input
        v-model="input"
        id="todo"
        class="head"
        type="text"
        placeholder="请输入代办事项"
      />
      <button @click="add" id="add" class="add">添加</button>
    </div>
    <!-- 列表 -->
    <div id="container">
      <!-- todo -->
      <list-vue
        :flag="true"
        :title="titles[0]"
        :data="todo"
        @editInfo="editInfo"
        @changeInfo="changeInfo"
        @delInfo="delInfo"
      ></list-vue>
      <!-- Done -->
      <list-vue
        :flag="false"
        :title="titles[1]"
        :data="done"
        @editInfo="editInfo"
        @changeInfo="changeInfo"
        @delInfo="delInfo"
      ></list-vue>
    </div>
  </div>
</template>
<script>
import ListVue from "./components/List.vue";
export default {
  components: {
    ListVue,
  },
  data() {
    return {
      titles: ["未完成", "已完成"],
      todo: ["初始未完成"],
      done: ["初始已完成"],
      input: "",
    };
  },
  methods: {
    add() {
      if (this.input == "") {
        this.$message({
          message: "输入不能为空",
          type: "warning",
        });
        return
      }
      this.todo.push(this.input);
      this.input = "";
    },
    editInfo(val, flag) {
      let temp = prompt("输入修改值");
      if(temp==''){
        this.$message({
            message:'输入不能为空',
            type:'warning'
        })
        return
      }
      if (flag) {
        this.todo = this.todo.map((item) => {
          if (val == item) {
            return temp;
          }
          return item;
        });
      } else {
        this.done = this.done.map((item) => {
          if (val == item) {
            return temp;
          }
          return item;
        });
      }
    },
    changeInfo(val, flag) {
      // console.log(val);
      if (flag) {
        this.todo = this.todo.filter((item) => {
          return item != val;
        });
        this.done.push(val);
      } else {
        this.done = this.done.filter((item) => {
          return item != val;
        });
        this.todo.push(val);
      }
    },
    delInfo(val, flag) {
      if (flag) {
        this.todo = this.todo.filter((item) => {
          return item != val;
        });
      } else {
        this.done = this.done.filter((item) => {
          return item != val;
        });
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #b8c9ff;
}
#header {
  margin: 0 auto;
  font-size: 50px;
  width: 700px;
  text-align: center;
  height: 150px;
}
.title {
  display: inline-flex;
}
.head {
  -webkit-appearance: none;
  border-radius: 25px;
  width: 500px;
  height: 60px;
  box-shadow: 5px 5px 10px #556677;
  border: 1px solid #556677;
  font-size: 30px;
  padding-left: 25px;
  outline: 0;
  margin: 0 auto;
  display: inline-flex;
}
.add {
  width: 80px;
  height: 50px;
  border-radius: 25px;
  outline: 0;
  border: 1 solid #556677;
  float: right;
  margin: 20px 0 0;
  font-size: 20px;
}
#container {
  margin: 0 auto;
  width: 700px;
  height: 150px;
}
.del {
  width: 120px;
  height: 70px;
  border-radius: 25px;
  outline: 0;
  border: 1 solid #556677;
  font-size: 20px;
  display: flex;
  margin: 0 auto;
}
ol {
  margin-top: 20px;
  margin-bottom: 20px;
}
ol li {
  width: 600px;
  height: 30px;
  background-color: #fff;
  list-style: none;
  text-align: center;
  font-size: 20px;
  border-radius: 25px;
  margin-top: 10px;
  padding: 10px;
  box-shadow: 5px 5px 10px #556677;
}
ol li span {
  float: left;
}
ol li button {
  float: right;
  width: 70px;
  height: 30px;
  margin-top: 0px;
  margin-left: 10px;
  border-radius: 25px;
  box-shadow: 5px 5px 10px #556677;
  outline: 0;
}
.del1 {
  background-color: #f40;
  border-radius: 25px;
  width: 50px;
  height: 30px;
  box-shadow: 5px 5px 10px #556677;
  outline: 0;
}
.edit {
  background-color: royalblue;
  border-radius: 25px;
  width: 50px;
  height: 30px;
  box-shadow: 5px 5px 10px #556677;
  outline: 0;
  color: #ffffff;
}
#todocount {
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  display: inline-block;
  border-radius: 50%;
  float: right;
  font-size: 1em;
  margin-top: 10px;
  text-align: center;
  line-height: 30px;
}
#donecount {
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  display: inline-block;
  border-radius: 50%;
  float: right;
  font-size: 1em;
  margin-top: 10px;
  text-align: center;
  line-height: 30px;
}
#todolist input,
#donelist input {
  border: none;
  padding: 0;
  line-height: 40px;
  width: 300px;
  height: 30px;
  /* background-color: red; */
  font-size: 24px;
}
ol li {
  text-align: left;
}
</style>