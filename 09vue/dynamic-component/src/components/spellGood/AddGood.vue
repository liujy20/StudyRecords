<template>
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
</template>

<script>
import {getTimeString} from '../../util/time.js';
export default {
  data() {
    return {
      img: "", //保存上传图片的返回地址
      showAddModal: false, //控制新增对话框显示和隐藏
      //新增拼团商品
      addGood: {
        product: {},
      },
    };
  },
  methods:{
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
      }
  }
};
</script>

<style></style>
