<template>
  <!-- 搜索 -->
  <div id="userSearch">
    <div class="tabs">
      <el-tabs v-model="sonUserClassify" >
        <el-tab-pane
          v-for="item in userArr"
          :key="item"
          :label="item"
          :name="item"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <el-form ref="form" label-width="90px">
      <el-form-item label="用户搜索：">
        <el-input
          v-model="sonSearchText"
          placeholder="请输入手机号或姓名"
        ></el-input>
      </el-form-item>
      <div class="btns">
        <el-button size="small" type="primary" @click="demo">搜索</el-button>
        <el-button size="small" style="margin-left: 30px">重置</el-button>
        <el-dropdown>
          <span class="el-dropdown-link">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["value", "userClassify"],
  data() {
    return {
      sonSearchText:this.value,
      sonUserClassify:this.userClassify,
      userArr: ["全部用户", "精品会员", "普通会员"],
    };
  },
  watch:{
    sonUserClassify(newValue){
        this.$emit('changeUserClassify',newValue)
    }
  },
  methods: {
    demo(){
        console.log('demo');
        this.$emit('input',this.sonSearchText)
    }
  },
};
</script>

<style lang="scss">
#userSearch {
  padding: 20px;
  .el-tabs {
    .el-tab-pane {
      font-size: 14px;
    }
  }
  .el-form {
    display: flex;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 20px;
    .el-form-item {
      flex-grow: 1;
      font-weight: 700;
      .el-input {
        width: 200px;
      }
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .btns {
      .el-dropdown {
        margin-left: 10px;
        .el-dropdown-link {
          color: #1890ff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
