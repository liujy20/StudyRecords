<template>
  <div id="userControl">
    <!-- 搜索 -->
    <Search 
    v-model="searchText" 
    :userClassify="userClassify"
    @changeUserClassify="changeUserClassify"
    
    ></Search>
    <!-- 列表 -->
    <el-button
        type="warning"
        size="small"
        style="background-color: #ff4949"
        @click="delMany"
        >批量删除</el-button
      >
      <el-button size="small">批量设置分组</el-button>
    <div id="userList">
      <el-table :data="paginUsers" style="width: 100%">
        <el-table-column prop="id" label="" width="50">
          <i class="el-icon-arrow-right"></i>
        </el-table-column>
        <el-table-column prop="id" label="" width="50">
          <template v-slot:header>
            <el-checkbox v-model="allChecked" @change="allChange"></el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="uid" label="ID" width="80"> </el-table-column>
        <el-table-column prop="avatar" label="头像" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" class="pic" />
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="姓名" width="160">
        </el-table-column>
        <el-table-column prop="level" label="用户等级" width="100">
          <template slot-scope="scope">
            {{ scope.row.level == 1 ? "精品会员" : "普通用户" }}
          </template>
        </el-table-column>
        <el-table-column prop="groupId" label="分组" width="100">
        </el-table-column>
        <el-table-column prop="partnerId" label="推荐人" width="120">
          <template slot-scope="scope">
            {{ scope.row.partnerId == null ? "" : scope.row.partnerId }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="nowMoney" label="余额" width="100">
        </el-table-column>
        <el-table-column prop="integral" label="积分" width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="el-icon--right"
          width="100"
          style="text-align: center"
        >
          <template v-slot:header>
            操作<i class="el-icon-setting"></i>
          </template>
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              style="color: #1890ff"
              >编辑</el-button
            >
            <el-dropdown style="margin-left: 5px">
              <span
                class="el-dropdown-link"
                style="color: #1890ff; font-size: 12px"
              >
                展开<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="delClick(scope.row.uid)"
                    >删除</span
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div id="pagin">
      <div class="left"></div>
      <div class="right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginData.currentPage"
          :page-sizes="paginData.pageSizes"
          :page-size="paginData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchUsers.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "./components/Search.vue"
export default {
  components:{
    Search
  },
  data() {
    return {
      users: [
        {
          uid: 11761, //id
          partnerId: 111, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "龙傲天", //用户名称
          avatar:
            "https://api.java.crmeb.net/crmebimage/store/2020/08/15/adae23e354114cd5bd8f3cae740741c23opxeh8kw2.jpg", //用户头像
          sex: 1, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349205", //手机号
          nowMoney: "10.00", //余额
          integral: 5, //积分
          level: 0, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11782, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "到此一游", //用户名称
          avatar:
            "https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/dengnaiwen/20230616001249.png", //用户头像
          sex: 0, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349206", //手机号
          nowMoney: "0.00", //余额
          integral: 12, //积分
          level: 0, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11763, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "永恒之柱", //用户名称
          avatar: "", //用户头像
          sex: 0, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349207", //手机号
          nowMoney: "5.00", //余额
          integral: 12, //积分
          level: 1, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11764, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "如果有来生", //用户名称
          avatar:
            "https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/dengnaiwen/20230709231053.png", //用户头像
          sex: 1, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349208", //手机号
          nowMoney: "50.00", //余额
          integral: 8, //积分
          level: 0, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11765, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "微信某用户", //用户名称
          avatar:
            "https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/dengnaiwen/20230616001249.png", //用户头像
          sex: 1, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349209", //手机号
          nowMoney: "100.00", //余额
          integral: 10, //积分
          level: 1, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11766, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "新津男", //用户名称
          avatar: "", //用户头像
          sex: 0, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349211", //手机号
          nowMoney: "20.00", //余额
          integral: 23, //积分
          level: 0, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11767, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "武天候", //用户名称
          avatar:
            "https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/dengnaiwen/20230616001249.png", //用户头像
          sex: 1, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349212", //手机号
          nowMoney: "0.00", //余额
          integral: 30, //积分
          level: 0, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11768, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "青白江", //用户名称
          avatar:
            "https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/dengnaiwen/20230709231053.png", //用户头像
          sex: 0, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349213", //手机号
          nowMoney: "120.00", //余额
          integral: 80, //积分
          level: 1, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11769, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "高新田", //用户名称
          avatar:
            "https://api.java.crmeb.net/crmebimage/store/2020/08/15/adae23e354114cd5bd8f3cae740741c23opxeh8kw2.jpg", //用户头像
          sex: 0, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349214", //手机号
          nowMoney: "40.00", //余额
          integral: 7, //积分
          level: 1, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
        {
          uid: 11770, //id
          partnerId: null, //推荐人  null 就显示为""
          groupId: "", //分组
          nickname: "泉治龙", //用户名称
          avatar:
            "https://api.java.crmeb.net/crmebimage/store/2020/08/15/adae23e354114cd5bd8f3cae740741c23opxeh8kw2.jpg", //用户头像
          sex: 1, //性别 0 为男 1为女
          country: "CN", //国家
          phone: "18286349215", //手机号
          nowMoney: "0.00", //余额
          integral: 10, //积分
          level: 0, //用户等级 0 为普通会员   1 为精品会员
          updateTime: "2023-07-30 23:03:32", //最近一次更新时间
          createTime: "2023-07-30 23:03:32", //创建用户的时间
          checked: false,
        },
      ],
      allChecked: false,
      userClassify: "全部用户",
      searchText: "",
      Text: "",
      paginData: {
        pageSizes: [2, 5, 8, 10],
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  methods: {
    delMany() {},
    searchU() {
      this.Text = this.searchText;
      this.currentPage = 1;
    },
    delClick(id) {},
    handleSizeChange(val) {
      this.paginData.pageSize = val;
    },
    handleCurrentChange(val) {
      this.paginData.currentPage = val;
    },
    handleClick(row) {
      console.log(row);
    },
    allChange() {
      this.searchUsers.forEach((val) => {
        val.checked = this.allChecked;
      });
    },
    changeSearchText(data){
      this.searchText = data;
    },
    changeUserClassify(data){
      this.userClassify = data;
    }
  },
  computed: {
    paginUsers() {
      if (this.searchUsers.length == 0) {
        this.allChecked = false;
      }
      return this.searchUsers.slice(
        (this.paginData.currentPage - 1) * this.paginData.pageSize,
        this.paginData.currentPage * this.paginData.pageSize
      );
    },
    classifyUsers() {
      let list = this.users;
      this.paginData.currentPage = 1;
      if (this.userClassify == "全部用户") {
        return list;
      } else if (this.userClassify == "精品会员") {
        return list.filter((u) => u.level == 1);
      } else if (this.userClassify == "普通会员") {
        return list.filter((u) => u.level == 0);
      }
    },
    searchUsers() {
      let list = this.classifyUsers;
      if (this.Text != "") {
        return list.filter(
          (u) => u.phone.includes(this.Text) || u.nickname.includes(this.Text)
        );
      } else {
        return list;
      }
    },
  },
  watch: {
    searchUsers: {
      handler(newValue, oldValue) {
        this.allChecked = newValue.every((v) => v.checked);
      },
      deep: true,
    },
    searchText(value){
      this.searchU()
    }
  },
};
</script>

<style lang="scss">
#userControl {
  margin: 50px 18px 20px 18px;
  background-color: #fff;
  border: 1px solid #e6ebf5;
  border-radius: 5px;
  
  #userList {
    border-top: 1px solid #e6ebf5;
    padding: 20px;
    .el-table {
      tr {
        th {
          height: 20px !important;
          padding: 8px 0;
          color: black;
          font-size: 12px;
          font-weight: normal;
        }
        td {
          height: 20px !important;
          padding: 7px 0;
          font-size: 12px;
        }
      }
      .cell {
        line-height: 20px;
      }
      .pic {
        width: 30px;
        height: 30px;
      }
    }
  }
  #pagin {
    display: flex;
    .left {
      flex-grow: 1;
    }
    padding-bottom: 50px;
  }
}
</style>
