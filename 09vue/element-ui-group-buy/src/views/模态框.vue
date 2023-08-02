<template>
  <div id="main">
    
    <search-vue :search="search" :dateChoose="dateChoose"></search-vue>
    <!-- 新增商品 -->
    <el-button type="primary" @click="addGood">新增拼团</el-button>
    <!-- 表格 -->
    <el-table
      :data="products | filterProductsMore(search)"
      border
      style="width: 100%"
    >
      <el-table-column fixed prop="id" label="编号" width="150">
      </el-table-column>
      <el-table-column prop="img" label="头像" width="120">
        <template v-slot="scope">
          <img width="30" :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="开团团长" width="120">
      </el-table-column>
      <el-table-column prop="product.name" label="开团商品" width="320">
      </el-table-column>
      <el-table-column prop="product.price" label="商品价格" width="50">
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
          <el-button type="text" size="small" @click="editGoodInfo(scope.row)"
            >编辑</el-button
          >
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
    <!-- 编辑对话框 -->
    <el-dialog title="编辑拼团" :visible.sync="showEditModal">
      <el-upload
        class="avatar-uploader"
        action="http://124.70.54.24:3001/upload"
        name="file"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form label-width="120px" :model="editGood">
        <el-form-item label="开团团长">
          <el-input v-model="editGood.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拼团商品名称">
          <el-input v-model="editGood.product.name"></el-input>
        </el-form-item>
        <el-form-item label="拼团商品价格">
          <el-input v-model="editGood.product.price"></el-input>
        </el-form-item>
        <el-form-item label="拼团人数">
          <el-input v-model="editGood.spellPeople"></el-input>
        </el-form-item>
        <el-form-item label="拼团时间">
          <el-date-picker
            v-model="editGood.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开启状态" label-width="80px">
          <el-switch
            v-model="editGood.status"
            active-text="已结束"
            inactive-text="未结束"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditModal = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import searchVue from '../components/search.vue';
import getTimeString from "../util/time";
export default {
  components:{
    searchVue
  },
  data() {
    return {
      showEditModal: false, //控制对话框显示和隐藏
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
        maxPrice: 100,
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
      
      //编辑拼团商品
      editGood: {
        product: {},
      },
      // 图片
      imageUrl: "",
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

      // console.log("result", result);
      //返回筛选之后的数据
      return result;
    },
  },
  methods: {
    // 删除数据
    delGood(row) {
      this.products = this.products.filter((g) => g.id != row.id);
      this.$message({
        message: "删除成功",
        // type主要控制样式主题 success error  info
        type: "success",
      });
    },
    // 打开修改数据
    editGoodInfo(row) {
      let s = new Date(row.beginTime);
      s = s.toISOString();
      let e = new Date(row.endTime);
      e = e.toISOString();
      row.time = [s, e];
      console.log("row", row);
      this.showEditModal = true;
      this.editGood = JSON.parse(JSON.stringify(row));
      this.imageUrl = this.editGood.img;
    },
    // 修改数据
    changeInfo() {
      this.editGood.beginTime = getTimeString(
        "YYYY-MM-DD hh:mm:ss",
        new Date(this.editGood.time[0])
      );
      this.editGood.endTime = getTimeString(
        "YYYY-MM-DD hh:mm:ss",
        new Date(this.editGood.time[1])
      );
      // console.log( this.editGood.id);
      if (
        !this.products.find((item) => {
          return item.id == this.editGood.id;
        })
      ) {
        this.editGood = {
          id: this.editGood.id,
          img: this.editGood.img, //图片
          name: this.editGood.name, //开团团长
          beginTime: getTimeString(
            "YYYY-MM-DD hh:mm:ss",
            new Date(this.editGood.time[0])
          ), //
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: this.editGood.product.name, //拼团商品名字
            price: this.editGood.product.price, //原价
          },
          spellPeople: this.editGood.spellPeople, //拼团人数
          joinPeople: 2, //参与人数
          status: this.editGood.status, //状态
          endTime: getTimeString(
            "YYYY-MM-DD hh:mm:ss",
            new Date(this.editGood.time[1])
          ), //结束时间
          isChoose: false, //表示是否被勾选
          time: this.editGood.time,
        };
        this.products.push(this.editGood);
        console.log(this.products);
        this.showEditModal = false;
        this.$message({
          message: "添加成功",
          // type主要控制样式主题 success error  info
          type: "success",
        });
        return;
      }
      this.products = this.products.map((item) => {
        if (this.editGood.id == item.id) {
          return this.editGood;
        }
        return item;
      });
      console.log(this.products);
      this.showEditModal = false;
      this.$message({
        message: "修改成功",
        // type主要控制样式主题 success error  info
        type: "success",
      });
    },
    // 添加数据
    addGood() {
      this.showEditModal = true;
      this.imageUrl = "";
      this.editGood = {
        id: this.products[this.products.length - 1].id + 1,
        product: {},
      };
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data;
      this.editGood.img = res.data;
    },
    // 上传之前预处理
    beforeAvatarUpload(file) {
      const reg=/(jpg|jpeg|png|gif)$/
      const isJPG = reg.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
    //搜索：多条件联动
    filterProductsMore(goods, data) {
      console.log(data);
      let result = goods;
      //筛选第一个条件：几人团
      result = result.filter((g) => g.spellPeople == data.spellPeople);
      //筛选第二个条件；状态
      if (data.searchStatus !== "") {
        //已结束
        result = result.filter((g) => g.status === data.searchStatus);
      }
      //筛选第三个条件：价格
      result = result.filter(
        (g) =>
          g.product.price >= data.minPrice && g.product.price <= data.maxPrice
      );
      return result;
    },
  },
};
</script>

<style lang="scss">
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
  .el-dialog {
    .el-input {
      // width: 400px ;
      input {
        width: 400px;
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
}
</style>
