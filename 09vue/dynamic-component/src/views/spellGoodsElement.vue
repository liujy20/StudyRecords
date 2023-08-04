<template>
  <div id="main">
    <el-form label-position="left" label-width="120px" :model="search">
      <el-form-item label="时间选择">
        <el-radio-group v-model="search.searchArrTime">
          <!-- <el-radio-button label="全部"></el-radio-button> -->
          <el-radio-button v-for="item in timeArr" :key="item" :label="item" :value="item"></el-radio-button>
        </el-radio-group>
        <el-date-picker :disabled="dateChoose" v-model="search.searchDate" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="拼团状态">
        <el-select v-model="search.searchStatus" placeholder="请选择">
          <el-option label="全部" value="all"></el-option>
          <el-option label="开启中" :value="false"></el-option>
          <el-option label="已结束" :value="true"></el-option>
        </el-select>
      </el-form-item> -->
      <el-divider content-position="left">搜索单条件</el-divider>
      <el-form-item label="搜索单条件:">
        <el-select v-model="search.type" placeholder="请选择">
          <el-option label="开团团长" value="name"></el-option>
          <el-option label="拼团状态" value="status"></el-option>
          <el-option label="商品名称" value="productName"></el-option>
        </el-select>
        <el-input v-if="search.type != 'status'" class="search-input" v-model="search.searchText"
          placeholder="请输入搜索内容"></el-input>
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
        <el-input class="priceinput" placeholder="最低" v-model.number="search.minPrice"></el-input> -
        <el-input class="priceinput" placeholder="最多" v-model.number="search.maxPrice"></el-input>
      </el-form-item>
    </el-form>

    <!-- 新增商品 -->
    <el-button type="primary" @click="showAddModal=true">新增拼团</el-button>
    <!-- 表格 -->
    <el-table :data="products | filterProductsMore(search)" border style="width: 100%">
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
          <el-button @click="delGood(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
      :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑拼团" :visible.sync="showEditModal">
      <el-upload
  class="avatar-uploader"
  action="http://124.70.54.24:3001/upload"
  name="file"
  :show-file-list="false"
  :on-success="edithandleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="editImg" :src="editImg" class="avatar">
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
          <el-date-picker v-model="editGood.time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
            :default-time="['00:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开启状态" label-width="80px">
          <el-switch v-model="editGood.status" active-text="关闭" inactive-text="开启">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditModal = false">取 消</el-button>
        <el-button type="primary" @click="editDone">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增对话框 -->
    <el-dialog title="新增拼团" :visible.sync="showAddModal">
      <!-- 上传头像 -->
      <el-upload
  class="avatar-uploader"
  action="http://124.70.54.24:3001/upload"
  name="file"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-show="img" :src="img" class="avatar">
  <i v-show="addGood.img==undefined" class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      <el-form label-width="120px" :model="addGood">
        <el-form-item label="开团团长">
          <el-input v-model="addGood.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="拼团商品名称">
          <el-input v-model="addGood.product.name"></el-input>
        </el-form-item>
        <el-form-item label="拼团商品价格">
          <el-input v-model="addGood.product.price"></el-input>
        </el-form-item>
        <el-form-item label="拼团人数">
          <el-input v-model="addGood.spellPeople"></el-input>
        </el-form-item>
        <el-form-item label="拼团时间">
          <el-date-picker v-model="addGood.time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
            :default-time="['00:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开启状态" label-width="80px">
          <el-switch v-model="addGood.status" active-text="关闭" inactive-text="开启">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDone">确定新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getTimeString} from '../util/time.js';
export default {
  data() {
    return {
      editImg:"",//编辑图片展示地址
      img:'',//保存上传图片的返回地址
      showEditModal: false,//控制编辑对话框显示和隐藏
      showAddModal: false,//控制新增对话框显示和隐藏
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
      //编辑拼团商品
      editGood: {
        product: {}
      },
      //新增拼团商品
      addGood:{
        product:{}
      }
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
    editDone(){
      console.log('time.js',getTimeString);
      console.log('确认修改',this.editGood);
      this.showEditModal = false;//关闭弹窗
      //处理 修改数据的日期
      // console.log('转换日期字符串',this.editGood.time[0].toLocaleString());
      this.editGood.beginTime = getTimeString("YYYY-MM-DD hh:mm:ss",this.editGood.time[0])
      this.editGood.endTime = getTimeString("YYYY-MM-DD hh:mm:ss",this.editGood.time[1])
      //完成修改操作
      //将需要修改的对象返回新数组，不需要改的原封不动的放入新数组。
      this.products = this.products.map(good=>{
        if(good.id==this.editGood.id){
          return this.editGood
        }else{
          return good;
        }
      });
      console.log('修改之后 products',this.products);
    },
    addDone(){
      // 处理日期
      this.addGood.beginTime = getTimeString("YYYY-MM-DD hh:mm:ss",this.addGood.time[0])
      this.addGood.endTime = getTimeString("YYYY-MM-DD hh:mm:ss",this.addGood.time[1]);
      // console.log('新增商品',this.addGood);
      //id为数组最后一个数据的id+1
      let newId  = this.products[this.products.length -1].id +1;
      this.addGood.id = newId;
      this.products.push(this.addGood);
      //关闭弹窗 和清空数据和头像
      this.showAddModal = false;
      this.addGood = {product:{}};
      this.img = "";

      //使用了element提供的全局js函数 实现消息的弹窗反馈
      this.$message({
        message:'新增成功',
        //type主要控制样式主题 success error  info
        type:'warning'
      })
    },
    handleAvatarSuccess(res, file) {
      console.log('上传图片返回数据',res);
      this.img = res.data;//回显在页面上
      this.addGood.img = res.data;//放在新增对象中
      console.log('新增数据',this.addGood);
      },
    beforeAvatarUpload(file) {
      console.log('上传之前的文件',file);
      //支持jpg jpeg  png gif
        let reg = /(jpg|jpeg|png|gif)$/;
        const isImg = reg.test(file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImg) {
          this.$message.error('上传头像图片只支持png、gif、jpg、jpeg 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isImg && isLt2M;
      },
      edithandleAvatarSuccess(res, file) {
      console.log('上传图片返回数据',res);
      this.editImg = res.data;//回显在页面上
      this.editGood.img = res.data;//放在新增对象中
      console.log('修改数据',this.editGood);
      }
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
      let result = goods;
      //筛选第一个条件：几人团
      result = result.filter(g => g.spellPeople == data.spellPeople)
      //筛选第二个条件；状态
      if (data.searchStatus !== "") {
        //已结束
        result = result.filter(g => g.status === data.searchStatus)
      }
      //筛选第三个条件：价格
      result = result.filter(g => g.product.price >= data.minPrice
        && g.product.price <= data.maxPrice)
      return result;
    }
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
