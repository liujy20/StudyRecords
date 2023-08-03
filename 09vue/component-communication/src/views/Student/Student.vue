<template>
  <div>
    <h1>学生信息管理系统</h1>
    <div id="box">
      <div class="list" id="list">
        <p @click="chooseTab('list')">学生列表</p>
        <list-vue
          :students="students"
          @del="delUser"
          @edit="editUser"
          v-if="currentTab == 'list'"
        ></list-vue>
      </div>
      <div class="add" id="add">
        <p @click="chooseTab('add')">添加学生</p>
        <add-vue
          title="添加学生"
          :student="nullStudent"
          v-if="currentTab == 'add'"
          @addStudent="addStudent"
        ></add-vue>
      </div>
      <div class="add" id="update">
        <p @click="chooseTab('update')">修改学生</p>
        <update-vue
          title="修改学生"
          :student="student"
          v-if="currentTab == 'update'"
          @editStudent="editStudent"
        ></update-vue>
      </div>
    </div>
  </div>

  <!-- <List v-if="now=='列表'"></List>
  <Add v-else-if="now=='添加'"></Add>
  <Update v-else></Update> -->
</template>

<script>
import bus from "../../util/bus";
import AddVue from "./components/Add.vue";
import ListVue from "./components/List.vue";
import UpdateVue from "./components/Update.vue";
/**
 * 
 *  app.vue中引入Student.vue  
    Student.vue 包含了 List 、Add、Update三个子组件 ，其中Add.vue 和Update.vue 使用了公共的子组件-Form.vue
    利用已学组件通信手段完成学生管理练习
 */
export default {
  components: {
    ListVue,
    AddVue,
    UpdateVue,
  },
  data() {
    return {
      students: [
        { name: "周星星", age: 23, sex: "男", snum: "001" },
        { name: "9527", age: 34, sex: "男", snum: "002" },
        { name: "秋香", age: 23, sex: "女", snum: "003" },
        { name: "石榴姐", age: 45, sex: "女", snum: "004" },
        { name: "华安", age: 25, sex: "男", snum: "005" },
        { name: "唐伯虎", age: 28, sex: "男", snum: "006" },
      ],
      currentTab: "list",
      student:'',
      nullStudent: {
        name: "",
        age: "",
        sex: "",
        snum: "",
      },
    };
  },
  methods: {
    chooseTab(value) {
      console.log(value);
      this.currentTab = value;
    },
    delUser(value) {
      this.students = this.students.filter((item) => {
        return item.snum != value.snum;
      });
    },
    editUser() {},
    addStudent(value) {
      this.students.push(value);
      this.$message({
        message: "添加成功",
        type: "success",
      });
    },
    editStudent(value) {
      this.students = this.students.map((item) => {
        if (item.snum == value.snum) {
          return value;
        } else {
          return item;
        }
      });
      this.$message({
        message: "修改成功",
        type: "success",
      });
    },
  },
  mounted(){
    bus.$on('info',value=>{
      this.student=value
      this.chooseTab('update');
    })
    
  }
};
</script>

<style>
#box {
  width: 600px;
  height: fit-content;
}
h1,
p {
  margin: 0;
}
.list,
.search,
.add {
  float: left;
  width: 100px;
  height: 50px;
  line-height: 50px;
  border: 1px solid gray;
  text-align: center;
  position: relative;
}
.list table {
  width: 600px;
  border-spacing: 0px;
}
.list table td,
.list th {
  border: 1px solid gray;
  height: 50px;
}
.list table tr:nth-child(2n) {
  background-color: #cccccc;
}
.tab {
  width: 600px;
  height: fit-content;
  position: absolute;
  /* display: none; */
  top: 50px;
  left: -1px;
  border: 1px solid gray;
}
.search .tab {
  left: -205px;
}
.add .tab {
  left: -103px;
}
</style>
