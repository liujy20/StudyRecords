<script lang='ts' setup>
import { TabsPaneContext } from 'element-plus';
import { Search, User, Lock, Plus } from '@element-plus/icons-vue'
import { login } from '@/apis/userApi'
import { getMenu } from '@/apis/menuApi'
import { findName, findTel, register } from '@/apis/registerApi'
import { menuStore } from '@/store/menuStore'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { RuleForm } from '@/interfaces/settle.ts'
const menu = menuStore()
const router = useRouter()

const activeName = ref('first')
const input1 = ref('')
const input2 = ref('')
const account = ref<string>('')
const password = ref<string>('')

const isLogin = ref<boolean>(true)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// 登录
const submit = async () => {
  let res = await login(JSON.stringify({ account, password }))
  console.log(res);
  const { user, token } = res.data.data
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  res = await getMenu(user.username)
  console.log(res);
  const array = res.data[0].children
  // localStorage.setItem("menu", JSON.stringify(array))
  menu.setMenu(array)

  router.push('/home')
}

const changeIsLogin = () => {
  isLogin.value = !isLogin.value
}

// 表单
const ruleFormRef = ref<FormInstance>()
// 表单数据
const ruleForm = reactive<RuleForm>({
  shopName: '',
  tel: '',
  address: '',
  idCard: '',
  managerName: '',
  licenceNo: '',
  type: '',
  licenceImg: '',
  idCardImg: '',
})

// 自定义规则
const validateName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the name'))
  }
  findNameFN(value, callback)
}
const findNameFN = async (value: string, callback: any) => {
  let res = await findName(value)
  console.log(res.data);
  if (!res.data.boo) {
    callback(new Error('Please change the name'))
  } else {
    callback()
  }
}

const validateTel = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the tel'))
  }
  findTelFN(value, callback)
}
const findTelFN = async (value: string, callback: any) => {
  let res = await findTel(value)
  console.log(res.data);
  if (!res.data.boo) {
    callback(new Error('Please input the correct tel'))
  } else {
    callback()
  }
}


// 规则
const rules = reactive<FormRules<RuleForm>>({
  shopName: [{ required: true }, { validator: validateName, trigger: 'blur' }],
  tel: [{ required: true }, {
    pattern: /^13\d{9}$/,
    message: '手机号码格式不正确',
    trigger: 'blur',
  }, { validator: validateTel, trigger: 'blur' }],
  address: [{ required: true }],
  idCard: [{ required: true }, {
    pattern: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
    message: '身份证格式错误',
    trigger: 'blur'
  }],
  managerName: [{ required: true }],
  licenceNo: [{ required: true }],
  type: [{ required: true }],
  licenceImg: [{ required: false }],
  idCardImg: [{ required: false }],
})

// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      let res = await register(new URLSearchParams({ ...ruleForm }).toString())
      console.log(res);
      if (res.data.result) {
        changeIsLogin()
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '添加失败',
          type: 'error',
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
  console.log(ruleForm);
}

// 图片上传
const idCardImgUrl = ref('')
const licenceImgUrl = ref('')
// 上传成功
const idCardImgSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log(response);
  ruleForm.idCardImg = response.data[0]

  idCardImgUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const licenceImgSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log(response);
  ruleForm.licenceImg = response.data[0]

  licenceImgUrl.value = URL.createObjectURL(uploadFile.raw!)
}
// 检查
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<template>
  <div class="bg">
    <div class="wrap">
      <div class="main" v-show="isLogin">
        <div class="tit">
          <el-image src="http://xawn.x3322.net:8002/distremote/static/img/logo.png" class="logo"></el-image>
          <div class="name">赤兔养车</div>
        </div>
        <el-tabs :stretch="true" v-model="activeName" class="demo-tabs tab" @tab-click="handleClick">
          <el-tab-pane label="账户密码登录" name="first">
            <el-input v-model="account" placeholder="Please input account" class="item" :prefix-icon="User" />
            <el-input v-model="password" placeholder="Please input password" class="item" :prefix-icon="Lock"  type="password"/>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="second">
            <el-input v-model="input1" placeholder="Please input" class="item" :prefix-icon="Search" />
            <div class="code">
              <el-input v-model="input2" placeholder="Please input" class="item inp" :prefix-icon="Search" />
              <el-button size="default">获取验证码</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" size="default" class="login" @click="submit">登录</el-button>
        <el-row justify="space-between" class="more">
          <el-col :span="6">
            <el-link type="primary" :underline="false">注册账户</el-link>
          </el-col>
          <el-col :span="6" class="span">
            <el-link type="primary" :underline="false" @click="changeIsLogin">商家入住</el-link>
          </el-col>
        </el-row>
      </div>
      <div class="join" v-show="!isLogin">
        <div class="tit">
          <el-image src="http://xawn.x3322.net:8002/distremote/static/img/logo.png" class="logo"></el-image>
          <div class="name">赤兔养车</div>
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
          <el-form-item label="商铺类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="0">充电站</el-radio>
              <el-radio label="1">其他</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="店铺名" prop="shopName">
            <el-input v-model="ruleForm.shopName" />
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="ruleForm.tel" />
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address" />
          </el-form-item>
          <el-form-item label="注册人" prop="managerName">
            <el-input v-model="ruleForm.managerName" />
          </el-form-item>
          <el-form-item label="身份证号码" prop="idCard">
            <el-input v-model="ruleForm.idCard" />
          </el-form-item>
          <el-form-item label="身份证照片" prop="idCardImg">
            <el-upload class="avatar-uploader" action="http://47.98.128.191:3000/images/uploadImages" name="file"
              :show-file-list="false" :on-success="idCardImgSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="idCardImgUrl" :src="idCardImgUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="营业执照" prop="licenceNo">
            <el-input v-model="ruleForm.licenceNo" />
          </el-form-item>
          <el-form-item label="营业执照照片" prop="licenceImg">
            <el-upload class="avatar-uploader" action="http://47.98.128.191:3000/images/uploadImages" name="file"
              :show-file-list="false" :on-success="licenceImgSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="licenceImgUrl" :src="licenceImgUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              立即申请
            </el-button>
            <el-button @click="changeIsLogin">使用已有账户登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      Copyright @ 2023 <el-link type="primary" :underline="false">admin</el-link>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.bg {
  height: 100vh;
  width: 100%;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .wrap {
    padding: 116px 0 10px;

    .main {
      margin: auto;
      width: 400px;
      // background-color: antiquewhite;

      .tit {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;

        .logo {
          margin-right: 20px;
          width: 40px;
          height: 20px;
        }

        .name {
          font-size: 28px;
          font-weight: bold;
        }
      }

      .tab {
        .el-tabs__nav {
          width: 100% !important;
        }

        .item {
          margin: 0 0 20px 0;

        }

        .code {
          display: flex;
          justify-content: space-between;

          .inp {
            margin-right: 20px;
          }
        }
      }

      .login {
        width: 100%;
      }

      .more {
        margin-top: 20px;

        .span {
          text-align: right;
        }
      }
    }

    .join {
      margin: auto;
      width: 400px;
      // background-color: antiquewhite;

      .tit {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;

        .logo {
          margin-right: 20px;
          width: 40px;
          height: 20px;
        }

        .name {
          font-size: 28px;
          font-weight: bold;
        }
      }

      .avatar-uploader .avatar {
        width: 80px;
        height: 80px;
        display: block;
      }

      .avatar-uploader {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }

      .avatar-uploader:hover {
        border-color: #40a9ff;
      }

      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        text-align: center;
      }
    }
  }

  .footer {
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #000073;
  }
}
</style>