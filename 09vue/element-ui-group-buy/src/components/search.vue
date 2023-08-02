<template>
  <el-form label-position="left" label-width="120px" :model="search">
    <el-form-item label="时间选择">
      <el-radio-group v-model="search.searchArrTime">
        <!-- <el-radio-button label="全部"></el-radio-button> -->
        <el-radio-button
          v-for="item in timeArr"
          :key="item"
          :label="item"
          :value="item"
        ></el-radio-button>
      </el-radio-group>
      <el-date-picker
        :disabled="dateChoose"
        v-model="search.searchDate"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-divider content-position="left">搜索单条件</el-divider>
    <el-form-item label="搜索单条件:">
      <el-select v-model="search.type" placeholder="请选择">
        <el-option label="开团团长" value="name"></el-option>
        <el-option label="拼团状态" value="status"></el-option>
        <el-option label="商品名称" value="productName"></el-option>
      </el-select>
      <el-input
        v-if="search.type != 'status'"
        class="search-input"
        v-model="search.searchText"
        placeholder="请输入搜索内容"
      ></el-input>
      <el-select v-else v-model="search.searchText" placeholder="请选择">
        <el-option label="全部" value=""></el-option>
        <el-option label="进行中" :value="false"></el-option>
        <el-option label="已结束" :value="true"></el-option>
      </el-select>
    </el-form-item>
    <!-- 搜索多条件联动 -->
    <el-divider content-position="left">搜索多条件联动</el-divider>
    <el-form-item label="开团人数要求:">
      <el-radio-group v-model="search.spellPeople">
        <el-radio-button label="4"></el-radio-button>
        <el-radio-button label="3"></el-radio-button>
        <el-radio-button label="2"></el-radio-button>
        <el-radio-button label="1"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="拼团状态:">
      <el-radio-group v-model="search.searchStatus">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button :label="false">进行中</el-radio-button>
        <el-radio-button :label="true">已结束</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="价格区间:">
      <el-input
        class="priceinput"
        placeholder="最低"
        v-model.number="search.minPrice"
      ></el-input>
      -
      <el-input
        class="priceinput"
        placeholder="最多"
        v-model.number="search.maxPrice"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["search", "dateChoose"],
  data(){
    return{
      timeArr: [
        "全部",
        "今天",
        "昨天",
        "最近7天",
        "最近30天",
        "本月",
        "本年",
        "指定时间",
      ],
    }
  }
};
</script>

<style>
</style>