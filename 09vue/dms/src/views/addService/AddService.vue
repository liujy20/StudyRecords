<template>
  <div class="bg">
    <div class="wrap">
      <div class="tit"><span class="icon"></span>新增服务信息</div>
      <el-divider></el-divider>
      <div class="resident-info">
        <div class="name">居民信息</div>
        <div class="form">
          <div class="item">
            <div class="tag">选择居民<span>*</span></div>
            <el-select v-model="resident.name" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">身份证号<span>*</span></div>
            <el-input
              class="id"
              v-model="resident.id"
              placeholder=""
              size="normal"
              clearable
            ></el-input>
          </div>
          <div class="item">
            <div class="tag">性别<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">出生日期<span>*</span></div>
            <el-date-picker
              v-model="resident.time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="item">
            <div class="tag">联系电话<span>*</span></div>
            <el-input
              class="id"
              v-model="resident.phone"
              placeholder=""
              size="normal"
              clearable
            ></el-input>
          </div>
          <div class="item">
            <div class="tag">现居地<span>*</span></div>
            <el-input
              class="address"
              v-model="resident.address"
              placeholder=""
              size="normal"
              clearable
            ></el-input>
          </div>
          <div class="item">
            <div class="tag">居民标签<span>*</span></div>
            <el-select v-model="resident.tag" multiple placeholder="请选择">
              <el-option value="1"></el-option>
              <el-option value="2"></el-option>
            </el-select>
          </div>
          <div class="addFamily">
            <div class="tag">家庭成员</div>
            <span
              ><el-button type="text" @click="addBox = !addBox"
                >+关联家庭成员</el-button
              ></span
            >
          </div>
          <el-dialog title="关联家庭成员" width="30%" :visible.sync="addBox">
            <div class="item">
              <div class="tag">选择成员<span>*</span></div>
              <el-select v-model="resident.gender" placeholder="请选择">
                <el-option value="张三"> </el-option>
              </el-select>
            </div>
            <div class="item">
              <div class="tag">选择关系<span>*</span></div>
              <el-select v-model="resident.gender" placeholder="请选择">
                <el-option value="张三"> </el-option>
              </el-select>
            </div>
            <el-button size="default">取消</el-button>
            <el-button type="primary" size="default">确认</el-button>
          </el-dialog>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="service-info">
        <div class="name">服务信息</div>
        <div class="form">
          <div class="item service-id">
            <div class="tag">服务编号<span>*</span></div>
            <span>20123818283</span>
          </div>
          <div class="item">
            <div class="tag">服务机构<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">服务团队<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">服务医生<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">服务包<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">服务项目<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">服务地点<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">服务时间<span>*</span></div>
            <el-date-picker
              v-model="resident.time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="item textarea">
            <div class="tag">服务备注<span>*</span></div>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="resident.textarea"
              resize="none"
            >
            </el-input>
          </div>
        </div>
      </div>

      <el-divider></el-divider>
      <el-button type="primary" size="default">提交审核</el-button>
      <el-button size="default">返回</el-button>
    </div>
    <!-- <div class="foot">Copyright © DaisyAxure All Rights Reserved</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      resident: {
        name: "",
        id: "",
        gender: "",
        time: "",
        phone: "",
        address: "",
        tag: [],
        textarea:'',
      },
      addBox: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: calc(100vh - 60px);
  background-color: #f2f7fb;
  overflow: auto;
  padding: 30px 30px;
  box-sizing: border-box;
  .wrap {
    background-color: #fff;
    padding: 20px;
    .tit {
      display: flex;
      align-items: center;
      font-size: 18px;
      .icon {
        display: block;
        margin-right: 20px;
        background-color: #2984f8;
        width: 5px;
        height: 20px;
        border-radius: 3px;
      }
    }
    .resident-info {
      .name {
        margin: 20px 0;
      }
      .form {
        display: flex;
        flex-wrap: wrap;
        .item {
          display: flex;
          align-items: center;
          width: 400px;
          margin-bottom: 20px;
          .tag {
            width: 60px;
            margin-right: 5px;
            text-align: right;
            color: #999;
            font-size: 13px;
            span {
              color: red;
            }
          }
        }
        .id {
          width: 220px;
        }
        .address {
          width: 320px;
        }
        .addFamily {
          display: flex;
          align-items: center;

          margin-bottom: 20px;
          .tag {
            width: 60px;
            margin-right: 5px;
            text-align: right;
            color: #999;
            font-size: 13px;
          }
          span {
            margin-left: 40px;
          }
        }
      }
    }
    .service-info {
      .name {
        margin: 20px 0;
      }
      .form {
        display: flex;
        flex-wrap: wrap;
        .item {
          display: flex;
          align-items: center;
          width: 400px;
          margin-bottom: 20px;
          .tag {
            width: 60px;
            margin-right: 5px;
            text-align: right;
            color: #999;
            font-size: 13px;
            span {
              color: red;
            }
          }
        }
        .service-id {
          color: #999;
        }
        .textarea{
          width: 690px;
          .tag{
            flex-shrink: 0;
          }
          
        }
      }
    }
  }
  .foot {
    text-align: center;
    margin: 30px;
    font-size: 14px;
    color: #999;
  }
}
</style>