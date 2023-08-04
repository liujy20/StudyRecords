<template>
  <div id="main">
    <!-- 搜索 -->
    <Search :search="search" :dateChoose="dateChoose"></Search>
    <!-- 新增商品 -->
    <el-button type="primary" @click="showAddModal=true">新增拼团</el-button>
    <!-- 列表组件 -->
    <List :products="products" :search="search" @toEdit="toEdit"></List>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
      :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 新增对话框 -->
    <AddModal></AddModal>
    <!-- 编辑对话框 -->
    <EditModal :editGood="editGood" :showEditModal="showEditModal"></EditModal>
  </div>
</template>

<script>
import Search from "../components/spellGood/Search.vue";
import List from "../components/spellGood/List.vue";
import AddModal from "../components/spellGood/AddGood.vue";
import EditModal from "../components/spellGood/EditGood.vue";
export default {
  components:{
    Search,
    List,
    AddModal,
    EditModal
  },
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
        searchStatus: "",
        //搜索类别和文本
        type: "name",
        searchText: "",

        //拼团人数要求
        spellPeople: 4,
        //价格
        minPrice: 0,
        maxPrice: 100
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
            price: 95, //原价
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
            price: 30, //原价
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
      showEditModal: false, //控制编辑对话框显示和隐藏
    //编辑拼团商品
    editGood: {
        product: {},
      },
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
    toEdit(data){
      this.showEditModal = true;//开启弹窗
      // console.log('日期对象数组',[new Date(),new Date()]);
      //处理待编辑数据的日期，转为日期对象数组，方便在弹窗中回显
      let time  = [new Date(data.beginTime),new Date(data.endTime)]
      
      // 进行一次深克隆
      // this.editGood = data
      this.editGood = JSON.parse(JSON.stringify(data));
      this.editGood.time = time;
      //就是把数据自己的img赋给修改弹窗头像
      this.editImg = this.editGood.img;
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
.search-input {
  width: 200px !important;
}

.priceinput {
  width: 130px !important;
  margin: 0 30px;
}

.priceinput:first-child {
  margin-left: 0;
}

/* .el-input {
  width: 100px;
} */
/* .el-input .el-input__inner {
  width: 300px;
} */
#main {
  overflow-y: auto;
}


/* 上传样式 */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
