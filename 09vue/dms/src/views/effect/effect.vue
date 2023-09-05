<template>
  <div id="unaudited">
    <div class="content">
      <div class="title">
        <span></span>签约详细
        <img src="../../assets/已过期.png" alt="" />
      </div>
      <div class="inhabitant">
        <div class="top">居民信息</div>
        <div class="item">
          <div class="name">姓名 <span>王安然</span></div>
          <div class="id">身份证号 <span>371456198908090543</span></div>
          <div class="gender">性别 <span>女</span></div>
          <div class="age">年龄 <span>26</span></div>
        </div>
        <div class="item">
          <div class="phone">联系电话 <span>18864308600</span></div>
          <div class="address">
            现居地 <span>怀柔区洛西县建设路青莲小区6-601</span>
          </div>
          <div class="tag">
            居民标签 <span>高血压</span> <span>冠心病</span>
          </div>
        </div>
        <div class="family">
          <span>家庭成员</span>
          <div class="member">
            <div class="left"><img src="../../assets/u1575.jpg" alt="" /></div>
            <div class="right">
              <div class="top">
                <span>李清</span>
                <span>58岁</span>
                <img src="../../assets/u1576.png" alt="" />
              </div>
              <div class="bottom">
                <span>关系: 父母</span>
              </div>
            </div>
          </div>
          <div class="member">
            <div class="left"><img src="../../assets/u1575.jpg" alt="" /></div>
            <div class="right">
              <div class="top">
                <span>李清</span>
                <span>58岁</span>
                <img src="../../assets/u1576.png" alt="" />
              </div>
              <div class="bottom">
                <span>关系: 父母</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="signing">
        <div class="top">签约信息</div>
        <div class="item">
          <div><span>签约编号</span> <span>20190009091</span></div>
          <div><span>签约状态</span> <span>已驳回，等待居民修改</span></div>
          <div><span>签约机构</span> <span>洛西社区卫生服务站</span></div>
          <div><span>签约团队</span> <span>李明明团队</span></div>
        </div>
        <div class="item">
          <div><span>签约医生</span> <span>老人服务包</span></div>
          <div><span>服务包</span> <span>老人服务包</span></div>
          <div><span>签约周期</span> <span>1年</span></div>
          <div><span>费用</span> <span>¥120</span></div>
        </div>
        <div class="item">
          <div><span>签约类型</span> <span>首次签约</span></div>
          <div><span>申请时间</span> <span>2020/10/09 10:09:09 </span></div>
          <div><span>生效日期</span> <span>2020/10/09</span></div>
          <div><span> 到期日期</span> <span>2020/10/09</span></div>
        </div>
        <div class="item">
          <div><span>审核人</span> <span>王彬</span></div>
          <div><span>审核时间</span> <span>2020/10/09 10:09:09</span></div>
          <div><span>支付时间</span> <span>2020/10/09 10:09:09</span></div>
          <div><span>支付方式</span> <span>微信支付</span></div>
        </div>
        <div class="item">
          <div><span>签约备注</span> <span>无</span></div>
        </div>
      </div>
      <div class="bottom">
        <el-button type="primary">续约</el-button>
        <el-button>返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#unaudited {
  width: calc(100vw - 200px);
  height: calc(100vh - 60px);
  background-color: rgb(242, 247, 251);
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  .top {
    text-align: left;
  }
  .content {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    .title {
      font-size: 18px;
      color: #333;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      border-bottom: 1px solid rgb(242, 247, 251);
      height: 70px;
      display: flex;
      align-content: center;
      position: relative;
      span {
        background-color: #1877f2;
        display: inline-block;
        width: 6px;
        height: 20px;
        border-radius: 3px;
        margin-right: 10px;
      }
      img {
        position: absolute;
        width: 71px;
        height: 60px;
        bottom: -20px;
        left: 110px;
      }
    }
    .inhabitant {
      border-bottom: 1px solid rgb(242, 247, 251);
      padding-bottom: 20px;
      .top {
        margin-bottom: 30px;
      }
      .item {
        display: flex;
        margin-bottom: 30px;

        .name,
        .id,
        .gender,
        .age,
        .phone,
        .tag,
        .address {
          width: 25%;
          color: #999;
          font-size: 13px;
          display: flex;
          align-items: center;
          span {
            color: #333;
            display: inline-block;
            margin-left: 20px;
          }
        }
        .name {
          span {
            color: #1877f2;
          }
        }
        .tag {
          span {
            width: 60px;
            height: 32px;
            background-color: rgb(255, 241, 240);
            color: #fa746b;
            line-height: 32px;
            text-align: center;
          }
        }
      }
      .family {
        display: flex;
        span {
          font-size: 13px;
          color: #999;
          display: inline-block;
        }
        .member {
          width: 200px;
          height: 84px;
          margin: 0 20px;
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
              margin-bottom: 15px;
              span {
                &:nth-child(1) {
                  color: #333;
                  font-size: 16px;
                }
                &:nth-child(2) {
                  margin: 0 8px;
                }
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
    }
    .signing {
      border-bottom: 1px solid rgb(242, 247, 251);
      padding-bottom: 20px;
      .top {
        margin: 30px 0;
      }
      .item {
        display: flex;
        margin-bottom: 30px;
        &:last-child {
          margin: 0;
        }

        div {
          width: 25%;
          color: #999;
          font-size: 13px;
          display: flex;
          align-items: center;
          text-align: right;

          span {
            color: #333;
            display: inline-block;
            margin-left: 20px;
            &:nth-child(1) {
              color: #999;
              font-size: 13px;
              text-align: right;
              width: 52px;
              margin-left: 0;
            }
          }
        }
      }
    }
    .bottom {
      padding-top: 20px;
      text-align: left;
    }
  }
}
</style>