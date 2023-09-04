<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-main>
          <EditContract></EditContract>
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Login from "@/views/login/login.vue";
import Signing from "./views/signing/signing.vue";
import Unaudited from "@/views/unaudited/unaudited.vue";
import Nopayment from "@/views/nopayment/nopayment.vue";
import Reject from "./views/reject/reject.vue";
import Effect from "@/views/effect/effect.vue";
import Ineffect from "@/views/ineffect/ineffect.vue";
import Aside from "@/components/aside.vue";
import Footer from "@/components/footer.vue";
import EditContract from "./views/editContract/editContract.vue";
import SigningRecord from "./views/signingRecord/signingRecord.vue";
// 服务
import AddService from "@/views/addService/AddService.vue";
import EditService from "@/views/editService/EditService.vue";
import ServiceLog from "@/views/service-log/service-log.vue";
import servicePending from "@/views/service-pending/service-pending.vue";
import serviceUnaudited from "@/views/service-unaudited/service-unaudited.vue";
import serviceTodo from "@/views/service-todo/service-todo.vue";
import serviceReject from "@/views/service-reject/service-reject.vue";
import serviceFinished from "./views/service-finished/service-finished.vue";
import serviceCancelled from "./views/service-cancelled/service-cancelled.vue";
export default {
  name: "app",
  components: {
    Login,
    Signing,
    Unaudited,
    Nopayment,
    Reject,
    Effect,
    Ineffect,
    Aside,
    Footer,
    EditContract,
    SigningRecord,
    AddService,
    EditService,
    ServiceLog,
    servicePending,
    serviceUnaudited,
    serviceTodo,
    serviceReject,
    serviceFinished,
    serviceCancelled,
  },
};
</script>

<style lang="scss" scoped>
.el-footer {
  background-color: rgb(242, 247, 251);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(245, 245, 245);
  color: #333;
  text-align: center;
  height: 100vh;
}

.el-main {
  background-color: white;
  color: #333;
  // text-align: center;
  // line-height: 160px;
  padding: 0;
  overflow: auto;
  height: calc(100vh - 150px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
