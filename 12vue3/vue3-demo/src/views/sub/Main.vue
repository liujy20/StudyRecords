<template>
  <el-card class="box-card" shadow="never">
        <div class="con">
          <el-row :gutter="20">
            <el-col :span="16" class="info">
              <img src="http://xawn.x3322.net:8002/distremote/static/avatar/default.jpg" alt="">
              <div class="items">
                <div class="welcome">
                  晚上好，bobo，要不要和朋友打局LOL
                </div>
                <div class="role">
                  开发部 | 管理员
                </div>
                <div class="time">
                  上次登录时间：2023-09-26 18:39:56
                </div>
              </div>

            </el-col>
            <el-col :span="8">
              <div class="count">
                <div class="item">
                  <div class="tit">
                    今日IP
                  </div>
                  <div class="num">
                    2
                  </div>
                </div>
                <div class="item">
                  <div class="tit">
                    今日访问
                  </div>
                  <div class="num">
                    212
                  </div>
                </div>
                <div class="item">
                  <div class="tit">
                    总访问量

                  </div>
                  <div class="num">
                    21133
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-row :gutter="20" style="margin-top: 10px;" class="infomation">
        <el-col :span="12">
          <el-card shadow="never" :body-style="{ padding: '20px' }">
            <template #header>
              <span>近七日系统访问记录</span>
            </template>
            <!-- card body -->
            echarts
          </el-card>

        </el-col>
        <el-col :span="12">
          <el-card shadow="never" :body-style="{ padding: '0px' }">
            <template #header>
              <div class="top">
                <span>进行中的项目</span>
                <el-link type="primary" :underline="false">所有项目</el-link>
              </div>
            </template>
            <el-table :show-header="false" style="width: 100%">
              <el-table-column prop="date"  width="180" />
              <el-table-column prop="name"  width="180" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
</template>

<script lang='ts' setup>


</script>

<style lang='scss' scoped>
.box-card {
      .con {
        padding: 24px;

        .info {
          display: flex;

          img {
            width: 80px;
            height: 80px;
            margin-right: 20px;
          }

          .items {
            font-size: 13px;
            color: #00000073;

            .welcome {
              font-size: 16px;
              color: #000000a6;
            }

            .role {
              margin: 10px 0;
            }
          }
        }

        .count {
          display: flex;

          .item {
            margin-right: 50px;
            line-height: 2;

            .tit {
              color: #00000073;
            }

            .num {
              color: #1890ff;
              font-weight: bold;
            }
          }
        }
      }
    }

    .infomation {
      .top {
        display: flex;
        justify-content: space-between;
      }
    }
</style>