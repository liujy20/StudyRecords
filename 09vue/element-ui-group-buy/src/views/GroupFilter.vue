<template>
  <div id="main">
    <el-form label-position="left" label-width="80px" :model="search">
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
      <!-- <el-form-item label="拼团状态">
        <el-select v-model="search.searchStatus" placeholder="请选择">
          <el-option label="全部" value="all"></el-option>
          <el-option label="开启中" :value="false"></el-option>
          <el-option label="已结束" :value="true"></el-option>
        </el-select>
      </el-form-item> -->
      
      <el-form-item label="搜索条件">
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
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="products | filterProducts(search)"
      border
      style="width: 100%"
    >
      <el-table-column fixed prop="id" label="编号" width="150">
      </el-table-column>
      <el-table-column prop="img" label="头像" width="120">
        <template slot-scope="scope">
          <img width="30" :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="开团团长" width="120">
      </el-table-column>
      <el-table-column prop="product.name" label="开团商品" width="320">
      </el-table-column>
      <el-table-column prop="spellPeople" label="几人团" width="100">
      </el-table-column>
      <el-table-column prop="joinPeople" label="几人参加" width="120">
      </el-table-column>
      <el-table-column prop="beginTime" label="开始时间" width="120">
      </el-table-column>
      <el-table-column prop="status" label="拼团状态" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.status ? "已结束" : "进行中" }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="delGood(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateChoose: true, //默认日期选择器被禁用
      pageSizes: [1, 5, 10, 20],
      pageNum: 1,
      pageSize: 1,
      radio1: "上海",
      search: {
        searchArrTime: "全部",
        //保存要判断的开始时间戳
        searchStartTime: "",
        //保存要判断的结束时间戳
        searchEndTime: "",
        /*用于存放指定时间的开始时间和结束时间数组，
        绑定了elementui的日期选择器，获取的是一个包含了开始和结束时间日期对象的数组 */
        searchDate: [],
        //搜索状态
        // searchStatus: "all",
        //搜索类别和文本
        type: "name",
        searchText: "",
      },
      products: [
        {
          id: 1, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "jack", //开团团长
          beginTime: "2023-07-31 12:12:23", //
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
            price: 59, //原价
          },
          spellPeople: 3, //拼团人数
          joinPeople: 2, //参与人数
          status: true, //状态
          endTime: "2023-8-23 00:00:00", //结束时间
          isChoose: false, //表示是否被勾选
        },
        {
          id: 2, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tom", //开团团长
          beginTime: "2023-07-30 12:12:23", //原价
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: "香氛无火香薰精油卧室助眠除臭plus", //拼团商品名字
            price: 59, //原价
          },
          spellPeople: 3, //拼团人数
          joinPeople: 1, //参与人数
          status: true, //状态
          endTime: "2023-8-23 00:00:00", //结束时间
          isChoose: false, //表示是否被勾选
        },
        {
          id: 3, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tiffne", //开团团长
          beginTime: "2023-07-24 12:12:23", //原价
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
            price: 59, //原价
          },
          spellPeople: 3, //拼团人数
          joinPeople: 9, //参与人数
          status: true, //状态
          endTime: "2022-12-23 00:00:00", //结束时间
          isChoose: false, //表示是否被勾选
        },
        {
          id: 4, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tiffne", //开团团长
          beginTime: "2023-07-10 12:12:23", //原价
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
            price: 59, //原价
          },
          spellPeople: 3, //拼团人数
          joinPeople: 7, //参与人数
          status: false, //状态
          endTime: "2022-12-23 00:00:00", //结束时间
          isChoose: false, //表示是否被勾选
        },
        {
          id: 5, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tiffne", //开团团长
          beginTime: "2023-06-28 12:12:23", //原价
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
            price: 59, //原价
          },
          spellPeople: 3, //拼团人数
          joinPeople: 13, //参与人数
          status: false, //状态
          endTime: "2022-12-23 00:00:00", //结束时间
          isChoose: false, //表示是否被勾选
        },
        {
          id: 6, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tiffne", //开团团长
          beginTime: "2022-07-12 12:12:23", //原价
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
            price: 59, //原价
          },
          spellPeople: 3, //拼团人数
          joinPeople: 3, //参与人数
          status: true, //状态
          endTime: "2022-12-23 00:00:00", //结束时间
          isChoose: false, //表示是否被勾选
        },
      ],
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
    };
  },
  watch: {
    //监听Search的searchDate属性
    "search.searchDate": {
      handler(newValue) {
        if (this.search.searchArrTime == "指定时间") {
          //改变的是指定时间或重新选择了开始和结束时间
          this.search.searchStartTime = this.search.searchDate[0].getTime();
          this.search.searchEndTime = this.search.searchDate[1].getTime();
        } else {
          //如果不是指定时间，则去掉结束时间
          this.search.searchEndTime = "";
        }
      },
      deep: true,
    },
  },
  computed: {
    total() {
      return this.searchGoods.length;
    },
    paginGoods() {
      return this.searchGoods.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },
    searchGoods() {
      // console.log(this.search.searchStartTime,this.search.searchEndTime);
      let result = this.products;
      //拼团状态搜索
      if (this.search.searchStatus == "all") {
      } else if (this.search.searchStatus === true) {
        result = result.filter((g) => g.status);
      } else {
        result = result.filter((g) => g.status == false);
      }

      //通过时间来筛选
      switch (this.search.searchArrTime) {
        case "全部":
          this.search.searchStartTime = "";
          break;
        case "今天":
          let today = new Date(); //当前时间
          today.setHours(0);
          today.setMinutes(0);
          today.setSeconds(0);
          today.setMilliseconds(0);
          let todayTime = today.getTime();
          this.search.searchStartTime = todayTime;
          break;
        case "昨天":
          break;
        case "指定时间":
          //开启日期选择器
          this.dateChoose = false;
      }

      //通过搜索时间的时间戳进行过滤
      if (this.search.searchStartTime != "") {
        if (this.search.searchEndTime != "") {
          result = result.filter((g) => {
            let time = new Date(g.beginTime).getTime();
            return (
              time >= this.search.searchStartTime &&
              time <= this.search.searchEndTime
            );
          });
        } else {
          result = result.filter((g) => {
            let time = new Date(g.beginTime).getTime();
            return time >= this.search.searchStartTime;
          });
        }
      }

      console.log("result", result);
      //返回筛选之后的数据
      return result;
    },
  },
  methods: {
    delGood(row) {
      this.products = this.products.filter((g) => g.id != row.id);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
    },
  },
  filters: {
    filterProducts(goods, data) {
      console.log("过滤器", data);
      let { type, searchText: value } = data;
      if (type == "name") {
        //开团团长
        return goods.filter((good) => good.name.includes(value));
      } else if (type == "status") {
        if (value === "") {
          return goods;
        } else {
          return goods.filter((good) => good.status == value);
        }
      } else if (type == "productName") {
        return goods.filter((good) => good.product.name.includes(value));
      } else {
        //未知条件
        return goods;
      }
    },
  },
};
</script>

<style>
#main {
  overflow: auto;
  height: calc(100vh - 100px);
}
.search-input {
  width: 200px !important;
}

.el-input {
  width: 100px;
}
.el-input .el-input__inner {
  width: 150px;
}
</style>
