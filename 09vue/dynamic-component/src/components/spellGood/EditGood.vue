<template>
  <!-- 编辑对话框 -->
  <el-dialog title="编辑拼团" :visible.sync="showEditModal">
    <el-upload
      class="avatar-uploader"
      action="http://124.70.54.24:3001/upload"
      name="file"
      :show-file-list="false"
      :on-success="edithandleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="editImg" :src="editImg" class="avatar" />
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
          :default-time="['00:00:00']"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开启状态" label-width="80px">
        <el-switch
          v-model="editGood.status"
          active-text="关闭"
          inactive-text="开启"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showEditModal = false">取 消</el-button>
      <el-button type="primary" @click="editDone">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getTimeString} from '../../util/time.js';
export default {
    props:['editGood','showEditModal'],
  data() {
    return {
      editImg: "", //编辑图片展示地址
    };
  },
  methods:{
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
    edithandleAvatarSuccess(res, file) {
      console.log('上传图片返回数据',res);
      this.editImg = res.data;//回显在页面上
      this.editGood.img = res.data;//放在新增对象中
      console.log('修改数据',this.editGood);
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
