<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>主页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :inline="true" :model="form" class="demo-form-inline" style="margin: 20px 0;">
    <el-form-item label="用户名">
      <el-input v-model="form.username" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="部门">
      <el-select v-model="form.deptId">
        <el-option v-for="item in dept" :label="item.title" :value="item.id" />
      </el-select>
    </el-form-item>
    <template v-if="isExpand">
      <el-form-item label="创建时间">
        <el-date-picker v-model="date" type="daterange" range-separator="To" start-placeholder="Start date"
          end-placeholder="End date" />
      </el-form-item>
    </template>
    <template v-if="!isExpand">
      <el-form-item label="">
        <el-button type="primary" size="default" @click="submit">查询</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-button size="default" @click="clear">重置</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-link type="primary" :underline="false" @click="expand">展开</el-link>
      </el-form-item>
    </template>


  </el-form>
  <el-space>
    <el-button type="primary" size="default" plain @click="addClick">新增</el-button>
    <el-button size="default" plain @click="delClick">删除</el-button>
    <el-dropdown @command="handleCommand">
      <span>
        <el-button size="default" @click="">
          更多操作
          <el-icon>
            <arrow-down />
          </el-icon>
        </el-button>

      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>密码重置</el-dropdown-item>
          <el-dropdown-item command="out">导出Excel</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-space>
  <el-space>
    <template v-if="isExpand">
      <el-form-item label="">
        <el-button type="primary" size="default" @click="submit">查询</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-button size="default" @click="clear">重置</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-link type="primary" :underline="false" @click="expand">收起</el-link>
      </el-form-item>
    </template>
  </el-space>
  <el-table :data="tableData" style="width: 100%;margin-top: 20px;" ref="multipleTableRef"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column property="username" label="用户名"></el-table-column>
    <el-table-column property="tel" label="性别">
      <template #default="scope">
        <span v-if="scope.row.ssex == 0">男</span>
        <span v-if="scope.row.ssex == 1">女</span>
        <span v-if="scope.row.ssex == 2">保密</span>
      </template>
    </el-table-column>
    <el-table-column property="email" label="邮箱"></el-table-column>
    <el-table-column property="deptName" label="部门"></el-table-column>
    <el-table-column property="mobile" label="电话"></el-table-column>
    <el-table-column property="status" label="状态">
      <template #default="scope">
        <el-space direction="vertical">
          <el-tag v-if="scope.row.status == 1">有效</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 0">锁定</el-tag>

        </el-space>
      </template>
    </el-table-column>
    <el-table-column property="createTime" label="创建时间">
    </el-table-column>
    <el-table-column property="" label="操作" width="120">
      <template #default="scope">
        <el-space>
          <el-icon color="#409EFF" @click="modifyClick(scope.row)">
            <Setting />
          </el-icon>
          <el-icon color="#67C23A" @click="userInfo(scope.row)">
            <View />
          </el-icon>
        </el-space>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagin">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
      :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
  <el-drawer v-model="drawerAdd" title="添加用户">
    <el-form ref="ruleFormRefAdd" :model="ruleFormAdd" :rules="rulesAdd" label-width="70px" class="demo-ruleForm"
      status-icon>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleFormAdd.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleFormAdd.password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleFormAdd.email" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="ruleFormAdd.mobile" />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="ruleFormAdd.roleId" multiple>
          <el-option v-for="item in role" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-select v-model="ruleFormAdd.deptId">
          <el-option v-for="item in dept" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleFormAdd.status">
          <el-radio label="0">锁定</el-radio>
          <el-radio label="1">有效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="性别" prop="ssex">
        <el-radio-group v-model="ruleFormAdd.ssex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
          <el-radio label="2">保密</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-popconfirm :hide-after="0" title="确认放弃编辑吗?" confirm-button-text="确认" cancel-button-text="取消"
          @confirm="cancelClickAdd">
          <template #reference>
            <el-button>取消</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="addSubmit(ruleFormRefAdd)">提交</el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer" title="修改用户">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="70px" class="demo-ruleForm" status-icon>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="ruleForm.mobile" />
      </el-form-item>
      <el-form-item label="角色" prop="roleIdToArr">
        <el-select v-model="ruleForm.roleIdToArr" multiple>
          <el-option v-for="item in role" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-select v-model="ruleForm.deptId">
          <el-option v-for="item in dept" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="0">锁定</el-radio>
          <el-radio label="1">有效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="性别" prop="ssex">
        <el-radio-group v-model="ruleForm.ssex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
          <el-radio label="2">保密</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-popconfirm :hide-after="0" title="确认放弃编辑吗?" confirm-button-text="确认" cancel-button-text="取消"
          @confirm="cancelClick">
          <template #reference>
            <el-button>取消</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="confirmClick(ruleFormRef)">提交</el-button>
      </div>
    </template>
  </el-drawer>
  <el-dialog v-model="dialogTableVisible" title="用户信息">
    <el-row>
      <el-col :span="4">
        <el-image :src="`http://xawn.x3322.net:8002/distremote/static/avatar/${info.avatar}`" fit="fill"
          :lazy="true"></el-image>

      </el-col>
      <el-col :span="18" :offset="2">
        <div class="info">
          <el-row>
            <el-col :span="12">
              <el-space>
                <el-icon>
                  <User />
                </el-icon>
                账号:{{ info.username }}
              </el-space>
            </el-col>
            <el-col :span="12">
              <el-icon>
                <House />
              </el-icon>
              部门:{{ info.deptName }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-space>
                <el-icon>
                  <User />
                </el-icon>
                角色:{{ info.roleName }}
              </el-space>
            </el-col>
            <el-col :span="12">
              <el-icon>
                <House />
              </el-icon>
              状态:<el-tag v-if="info.status == '1'">有效</el-tag>
              <el-tag type="danger" v-if="info.status == '0'">锁定</el-tag>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-space>
                <el-icon>
                  <User />
                </el-icon>
                性别:
                <span v-if="info.ssex == '0'">男</span>
                <span v-if="info.ssex == '1'">女</span>
                <span v-if="info.ssex == '2'">保密</span>
              </el-space>
            </el-col>
            <el-col :span="12">
              <el-icon>
                <House />
              </el-icon>
              创建时间:{{ info.createTime }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-space>
                <el-icon>
                  <User />
                </el-icon>
                电话:{{ info.mobile }}
              </el-space>
            </el-col>
            <el-col :span="12">
              <el-icon>
                <House />
              </el-icon>
              最近登录:{{ info.lastLoginTime }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-space>
                <el-icon>
                  <User />
                </el-icon>
                邮箱:{{ info.email }}
              </el-space>
            </el-col>
            <el-col :span="12">
              <el-icon>
                <House />
              </el-icon>
              描述:{{ info.description }}
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang='ts' setup>
import { ArrowDown, Setting, View, User, House } from '@element-plus/icons-vue'
import { getRole } from '@/apis/roleApi'
import { getDept } from '@/apis/deptApi'
import { IUserItem, IUserSearch } from '@/interfaces/user'
import { getUser, changeUser, addUser, delUser } from '@/apis/userApi';
import type { FormInstance, FormRules, ElTable } from 'element-plus'
import { RuleForm, RuleFormAdd } from '@/interfaces/user'
import { exportToExcel } from '@/utils/excel'
// add用户表单
const ruleFormRefAdd = ref<FormInstance>()
const ruleFormAdd = reactive<RuleFormAdd>({
  username: "",
  password: '1234qwer',
  roleId: "",
  status: "",
  ssex: "",
  email: "",
  mobile: "",
  deptId: "",
})
const rulesAdd = reactive<FormRules<RuleFormAdd>>({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 4, message: 'Length should be over 4', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input Activity password', trigger: 'blur' },
  ],
  roleId: [
    { required: true, message: 'Please input Activity role', trigger: 'blur' },
  ],
  status: [
    { required: true, message: 'Please input Activity status', trigger: 'blur' },
  ],
  ssex: [
    { required: true, message: 'Please input Activity ssex', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please input Activity email', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: 'Please input Activity mobile', trigger: 'blur' },
    {
      pattern: /^13\d{9}$/,
      message: '手机号码格式不正确',
      trigger: 'blur',
    }
  ],
  deptId: [
    { required: true, message: 'Please input Activity deptId', trigger: 'blur' },
  ],
})
// 用户表单
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: "",
  email: "",
  mobile: "",
  roleId: "",
  roleIdToArr: [],
  userId: "",
  deptId: "",
  ssex: "",
  status: "",
})
const info = reactive({
  username: "",
  deptName: "",
  email: "",
  mobile: "",
  createTime: "",
  lastLoginTime: "",
  ssex: "",
  description: "",
  avatar: "",
  roleName: "",
  status: ""
})
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  roleIdToArr: [
    { required: true, message: 'Please input Activity role', trigger: 'blur' },
  ],
  userId: [
    { required: true, message: 'Please input Activity userId', trigger: 'blur' },
  ],
  deptId: [
    { required: true, message: 'Please input Activity deptId', trigger: 'blur' },
  ],
  ssex: [
    { required: true, message: 'Please input Activity ssex', trigger: 'blur' },
  ],
  status: [
    { required: true, message: 'Please input Activity status', trigger: 'blur' },
  ],
})

// 角色表单
const role = ref<any>([])
// 部门表单
const dept = ref<any>([])
// 搜索表单
const form = ref<IUserSearch>({
  createTimeFrom: '',
  createTimeTo: '',
  username: '',
  deptId: '',
})
const date = ref('')
const tableData = ref<any>([])
// 状态
const isExpand = ref<boolean>(false)
const drawerAdd = ref<boolean>(false)
const drawer = ref<boolean>(false)
const dialogTableVisible = ref<boolean>(false)
// 分页
const total = ref<number>(10)
const currentPage = ref<number>(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 多选
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<IUserItem[]>([])

// 页码
const handleSizeChange = async (val: number) => {
  // console.log(`${val} items per page`)
  pageSize.value = val
  let res = await getUser(query.value)
  // console.log(res);
  tableData.value = res.data.rows
}
const handleCurrentChange = async (val: number) => {
  // console.log(`current page: ${val}`)
  currentPage.value = val
  let res = await getUser(query.value)
  // console.log(res);
  tableData.value = res.data.rows
}


// 搜索
const expand = () => {
  isExpand.value = !isExpand.value
}

const query = computed(() => {
  return { ...form.value, pageNum: String(currentPage.value), pageSize: String(pageSize.value) }
})

const submit = async () => {
  if (date.value !== '') {
    form.value.createTimeFrom = new Date(date.value[0]).toLocaleDateString().replace(/\//g, '-')
    form.value.createTimeTo = new Date(date.value[1]).toLocaleDateString().replace(/\//g, '-')
  }

  console.log(query.value);
  // return
  let res = await getUser(query.value)
  console.log(res);
  tableData.value = res.data.rows
  total.value = res.data.total
}

const clear = () => {
  form.value = {
    createTimeFrom: '',
    createTimeTo: '',
    username: '',
    deptId: '',
  }
  date.value = ''
}

// 新增用户
const addClick = async () => {
  drawerAdd.value = true

  resetForm(ruleFormRefAdd.value)


  let roles = await getRole({})
  console.log(roles.data.rows);
  role.value = roles.data.rows

  let depts = await getDept()
  console.log(depts.data.rows);
  let arr: any = []
  platDept(depts.data.rows.children, arr)
  dept.value = arr


}
// 关闭添加
function cancelClickAdd() {
  drawerAdd.value = false
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 提交添加
const addSubmit = async (formEl: FormInstance | undefined) => {
  console.log(1111);

  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      ruleFormAdd.roleId = typeof ruleFormAdd.roleId == "object" ? ruleFormAdd.roleId.join(',') : ruleFormAdd.roleId
      console.log('submit!', ruleFormAdd)

      let obj: any = { ...ruleFormAdd }
      let res1 = await addUser(new URLSearchParams(obj).toString())
      console.log(res1);
      if (res1.status === 200) {
        drawerAdd.value = false
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '添加失败',
          type: 'error',
        })
        return
      }
      let res2 = await getUser(query.value)
      console.log(res2);
      tableData.value = res2.data.rows
      total.value = res2.data.total

    } else {
      ElMessage({
        message: '添加失败',
        type: 'error',
      })
      console.log('error submit!', fields)
    }
  })
}

// 表格设置
const modifyClick = async (val: IUserItem) => {
  drawer.value = true
  console.log(val);

  let roles = await getRole({})
  console.log(roles.data.rows);
  role.value = roles.data.rows

  let depts = await getDept()
  console.log(depts.data.rows);
  let arr: any = []
  platDept(depts.data.rows.children, arr)
  dept.value = arr

  ruleForm.username = val.username
  ruleForm.email = val.email
  ruleForm.mobile = val.mobile
  ruleForm.roleIdToArr = val.roleId?.split(',').map(Number)
  ruleForm.userId = String(val.userId)
  ruleForm.deptId = val.deptId ? String(val.deptId) : undefined
  ruleForm.ssex = val.ssex
  ruleForm.status = val.status

  console.log(ruleForm);


}
// 查看详情
const userInfo = (val: IUserItem) => {
  dialogTableVisible.value = true
  info.username = val.username;
  info.deptName = val.deptName;
  info.email = val.email;
  info.mobile = val.mobile;
  info.createTime = val.createTime;
  info.lastLoginTime = val.lastLoginTime;
  info.ssex = val.ssex;
  info.description = val.description;
  info.avatar = val.avatar;
  info.roleName = val.roleName;
  info.status = val.status;
}
// 关闭修改
function cancelClick() {
  drawer.value = false
}
// 提交修改
const confirmClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      ruleForm.roleId = ruleForm.roleIdToArr.join(',')
      console.log('submit!', ruleForm)

      let obj: any = { ...ruleForm }
      let res1 = await changeUser(new URLSearchParams(obj).toString())
      console.log(res1);
      if (res1.status === 200) {
        drawer.value = false
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '修改失败',
          type: 'error',
        })
        return
      }
      let res2 = await getUser(query.value)
      console.log(res2);
      tableData.value = res2.data.rows
      total.value = res2.data.total

    } else {
      ElMessage({
        message: '修改失败',
        type: 'error',
      })
      console.log('error submit!', fields)
    }
  })
}
// 获取选中
const handleSelectionChange = (val: IUserItem[]) => {
  multipleSelection.value = val
  // console.log(multipleSelection.value);
}
// 删除用户
const delClick = async () => {
  multipleSelection.value.forEach(async item => {
    console.log(item.userId);
    let res = await delUser(String(item.userId))
    console.log(res);
  })

  let res = await getUser(query.value)
  console.log(res);
  tableData.value = res.data.rows
  total.value = res.data.total
}

const handleCommand =async (command: string | number | object) => {
  if (command === "out") {
    let res = await getUser({...query.value,pageNum: '1', pageSize:'1000'})
    console.log(res.data.rows);

    exportToExcel(res.data.rows)
    console.log(111);

  }
}

onMounted(async () => {
  let res = await getUser(query.value)
  console.log(res);
  tableData.value = res.data.rows
  total.value = res.data.total

  let depts = await getDept()
  console.log(depts.data.rows);
  let arr: any = []
  platDept(depts.data.rows.children, arr)
  dept.value = arr
})

const platDept = (obj: any, arr: any) => {
  Object.keys(obj).forEach(item => {
    arr.push({ id: obj[item].id, title: obj[item].title })
    if (obj[item].children) {
      platDept(obj[item].children, arr)
    }
  })
}

</script>

<style lang='scss' scoped>
.pagin {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(:focus-visible) {
  outline: none;

}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
}
</style>