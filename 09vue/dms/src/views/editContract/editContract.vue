<template>
  <div class="bg">
    <div class="wrap">
      <div class="tit"><span class="icon"></span>编辑签约信息</div>
      <el-divider></el-divider>
      <div class="resident-info">
        <div class="name">姓名</div>
        <div class="form">
          <div class="item">
            <div class="tag">选择居民<span>*</span></div>
            <el-input
              placeholder="请输入内容"
              v-model="name"
              :disabled="true"
              class="inhabitant"
            >
            </el-input>
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
            <div class="tag">出生年月<span>*</span></div>
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

            <div class="family">
              <div class="member">
                <div class="left">
                  <img src="../../assets/u1575.jpg" alt="" />
                </div>
                <div class="right">
                  <div class="top">
                    <span class="name">李清</span>
                    <span class="age">58岁</span>
                    <img src="../../assets/u1576.png" alt="" />
                  </div>
                  <div class="bottom">
                    <span>关系: 父母</span>
                  </div>
                </div>
              </div>
              <div class="member">
                <div class="left">
                  <img src="../../assets/u1575.jpg" alt="" />
                </div>
                <div class="right">
                  <div class="top">
                    <span class="name">李清</span>
                    <span class="age">58岁</span>
                    <img src="../../assets/u1576.png" alt="" />
                  </div>
                  <div class="bottom">
                    <span>关系: 父母</span>
                  </div>
                </div>
              </div>
            </div>

            <span class="people"
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
        <div class="name">签约信息</div>
        <div class="form">
          <div class="item service-id">
            <div class="tag">签约编号<span>*</span></div>
            <span>20123818283</span>
          </div>
          <div class="item service-id">
            <div class="tag">签约状态</div>
            <span>待审核</span>
          </div>
          <div class="item">
            <div class="tag">签约机构<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">签约团队<span>*</span></div>
            <el-select v-model="resident.gender" placeholder="请选择">
              <el-option value="张三"> </el-option>
            </el-select>
          </div>
          <div class="item">
            <div class="tag">签约医生<span>*</span></div>
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
          <div class="item service-id">
            <div class="tag">签约类型</div>
            <span>首次签约</span>
          </div>
          <div class="item service-id">
            <div class="tag">签约周期</div>
            <span>1年</span>
          </div>
          <div class="item service-id">
            <div class="tag">费用</div>
            <span>¥120</span>
          </div>
          <div class="item service-id">
            <div class="tag">申请时间</div>
            <span> 2020/10/09 10:09:09 </span>
          </div>
          <div class="item">
            <div class="tag">生效日期<span>*</span></div>
            <el-date-picker
              v-model="resident.time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="item textarea">
            <div class="tag">签约备注</div>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入签约备注"
              v-model="resident.textarea"
              resize="none"
            >
            </el-input>
          </div>
        </div>
      </div>

      <el-divider></el-divider>
      <el-button type="primary" size="default">保存</el-button>
      <el-button size="default">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "李小明",
      resident: {
        name: "",
        id: "",
        gender: "",
        time: "",
        phone: "",
        address: "",
        tag: [],
        textarea: "",
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
          width: 33%;
          margin-bottom: 20px;
          .inhabitant {
            width: 220px;
          }
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
          width: 100%;

          margin-bottom: 20px;
          .people {
            margin-left: 0px;
          }
          .family {
            display: flex;
            span {
              font-size: 13px;
              color: #999;
              display: inline-block;
              margin: 0;
            }
            .member {
              width: 200px;
              height: 84px;
              margin-right: 20px;
              border: 1px solid rgb(242, 242, 242);
              border-radius: 5px;
              display: flex;
              align-items: center;
              padding: 0 24px;
              box-sizing: border-box;
              .left {
                margin-right: 20px;
                img {
                  width: 40px;
                  height: 40px;
                }
              }
              .right {
                .top {
                  margin-bottom: 15px !important;
                  margin: 0;
                  .name {
                    color: #333;
                    font-size: 16px;
                  }
                  .age {
                    margin: 0 8px;
                  }
                  img {
                    width: 10.5px;
                    height: 12.5px;
                    transform: rotate(-45deg);
                  }
                }
              }
            }
          }
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
          width: 33%;
          margin-bottom: 20px;
          span {
            font-size: 13px;
            color: black;
            display: inline-block;
            margin-left: 10px;
          }
          .tag {
            width: 60px;
            margin-right: 5px;
            text-align: right;
            color: #999;
            font-size: 13px;
            span {
              color: red;
              margin: 0;
            }
          }
        }
        .service-id {
          color: #999;
        }
        .textarea {
          width: 690px;
          align-items: flex-start;
          .tag {
            flex-shrink: 0;
            margin-right: 10px;
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