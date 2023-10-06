<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>主页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :inline="true" :model="form" class="demo-form-inline" style="margin: 20px 0;">
    <el-form-item label="用户名">
      <el-input v-model="form.roleName" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker v-model="date" type="daterange" range-separator="To" start-placeholder="Start date"
        end-placeholder="End date" />
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" size="default" @click="submit">查询</el-button>
    </el-form-item>
    <el-form-item label="">
      <el-button size="default" @click="clear">重置</el-button>
    </el-form-item>
  </el-form>
  <el-space>
    <el-button type="primary" size="default" plain @click="addClick">新增</el-button>
    <el-button size="default" plain @click="delClick">删除</el-button>
    <el-dropdown>
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
          <el-dropdown-item>导出Excel</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-space>
  <el-table :data="tableData" style="width: 100%;margin-top: 20px;" ref="multipleTableRef"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column property="roleName" label="角色"></el-table-column>
    <el-table-column property="remark" label="描述"></el-table-column>
    <el-table-column property="createTime" label="创建时间"></el-table-column>
    <el-table-column property="modifyTime" label="修改时间"></el-table-column>
    <el-table-column property="" label="操作" width="120">
      <template #default="scope">
        <el-space>
          <el-icon color="#409EFF" @click="modifyClick(scope.row)">
            <Setting />
          </el-icon>
          <el-icon color="#67C23A" @click="infoClick(scope.row)">
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
  <el-drawer v-model="drawer" :title='title' @closed="clearRole">
    <el-row :gutter="20">
      <el-col :span="6">角色名称</el-col>
      <el-col :span="18">
        <el-input v-model="role.roleName" :disabled="title === '角色信息'"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">角色描述</el-col>
      <el-col :span="18">
        <el-input v-model="role.remark" :rows="2" type="textarea" :disabled="title === '角色信息'" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">权限选择</el-col>
      <el-col :span="18">
        <el-tree ref="myTree" :data="menus" :props="menuProps" node-key="id" :default-checked-keys="role.menuId"
          :disabled="title === '角色信息'" show-checkbox />
      </el-col>
    </el-row>

    <template #footer>
      <div style="flex: auto" v-if="title !== '角色信息'">
        <el-popconfirm :hide-after="0" title="确认放弃编辑吗?" confirm-button-text="确认" cancel-button-text="取消"
          @confirm="cancelClick">
          <template #reference>
            <el-button>取消</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="submitClick">提交</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- <el-drawer v-model="drawerAdd" title="添加用户">
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
  </el-drawer> -->
</template>

<script lang='ts' setup>
import { ArrowDown, Setting, View } from '@element-plus/icons-vue'
import type { ElTree, ElTable } from 'element-plus'
import { IGetRole, ISetRole, IRoleItem } from '@/interfaces/role'
import { getRole, addRole, setRole,delRole } from '@/apis/roleApi'
import { getAllMenu, getMenuByRole } from '@/apis/menuApi'
// 搜索表单
const form = ref<IGetRole>({
  createTimeFrom: '',
  createTimeTo: '',
  roleName: '',
})

const date = ref('')
const tableData = ref<any>([])
// 分页
const total = ref<number>(10)
const currentPage = ref<number>(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

// 状态
const drawer = ref<boolean>(false)
const title = ref<string>('')

// 角色表单
const role = ref<ISetRole>({
  roleName: "",
  remark: "",
  menuId: [],
  roleId: ""
})

// 菜单
const menus = ref()
const menuProps = {
  children: 'children',
  label: 'title',
}
const myTree = ref<InstanceType<typeof ElTree>>()

// 多选
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<IRoleItem[]>([])

const query = computed(() => {
  return { ...form.value, pageNum: String(currentPage.value), pageSize: String(pageSize.value) }
})
// 搜索提交
const submit = async () => {
  if (date.value !== '') {
    form.value.createTimeFrom = new Date(date.value[0]).toLocaleDateString().replace(/\//g, '-')
    form.value.createTimeTo = new Date(date.value[1]).toLocaleDateString().replace(/\//g, '-')
  }

  console.log(query.value);
  // return
  let res = await getRole(query.value)
  console.log(res);
  tableData.value = res.data.rows
  total.value = res.data.total
}
// 搜索清空
const clear = () => {
  form.value = {
    createTimeFrom: '',
    createTimeTo: '',
    roleName: '',
  }
  date.value = ''
}

// 页码
const handleSizeChange = async (val: number) => {
  // console.log(`${val} items per page`)
  pageSize.value = val
  let res = await getRole(query.value)
  // console.log(res);
  tableData.value = res.data.rows
}
const handleCurrentChange = async (val: number) => {
  // console.log(`current page: ${val}`)
  currentPage.value = val
  let res = await getRole(query.value)
  // console.log(res);
  tableData.value = res.data.rows
}

// 清空数据
const clearRole = () => {
  role.value = {
    roleName: "",
    remark: "",
    menuId: [],
    roleId: ""
  }
  myTree.value!.setCheckedKeys([], false)
}
// 新增用户
const addClick = () => {
  drawer.value = true
  title.value = '添加用户'
}
// 节点修改
const getCheckedKeys = () => {
  role.value.menuId = myTree.value!.getCheckedKeys(false) as string[]
  // console.log(myTree.value!.getCheckedKeys(false))
}
// 修改用户
const modifyClick = async (val: IRoleItem, str = '修改用户') => {
  drawer.value = true
  title.value = str
  console.log('modifyClick', val);
  role.value.roleName = val.roleName
  role.value.remark = val.remark
  role.value.roleId = String(val.roleId)
  let res = await getMenuByRole(String(val.roleId))
  console.log(res.data);
  role.value.menuId = res.data
}
// 查看详情
const infoClick = (val: IRoleItem) => {
  title.value = '角色信息'
  modifyClick(val, '角色信息')
}
// 提交用户
const submitClick = async () => {
  getCheckedKeys()
  if (title.value === '添加用户') {
    if (role.value.roleName !== "" && role.value.menuId.length !== 0) {
      console.log(role.value);
      let obj: any = { ...role.value }
      let res = await addRole(new URLSearchParams(obj).toString())
      console.log(res);
      if (res.status === 200) {
        drawer.value = false
        let res = await getRole(query.value)
        // console.log(res);
        tableData.value = res.data.rows
        total.value = res.data.total
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
      }
    } else {
      ElMessage({
        message: '请填写完整信息',
        type: 'error'
      })
    }
  } else {
    if (role.value.roleName !== "" && role.value.menuId.length !== 0 && role.value.roleId !== '') {
      console.log(role.value);
      let obj: any = { ...role.value }
      let res = await setRole(new URLSearchParams(obj).toString())
      console.log(res);
      if (res.status === 200) {
        drawer.value = false
        let res = await getRole(query.value)
        // console.log(res);
        tableData.value = res.data.rows
        total.value = res.data.total
        ElMessage({
          message: '修改成功',
          type: 'success'
        })
      }
    } else {
      ElMessage({
        message: '请填写完整信息',
        type: 'error'
      })
    }
  }
  // console.log(role.value.menuId);
}
// 关闭修改
function cancelClick() {
  drawer.value = false
}
// 获取选中
const handleSelectionChange = (val: IRoleItem[]) => {
  multipleSelection.value = val
  // console.log(multipleSelection.value);
}
// 删除角色
const delClick = async () => {
  multipleSelection.value.forEach(async item => {
    console.log(item.roleId);
    let res = await delRole(String(item.roleId))
    console.log(res);
    if (res.status === 200) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      }
  })

  let res = await getRole(query.value)
  // console.log(res);
  tableData.value = res.data.rows
  total.value = res.data.total
}

onMounted(async () => {
  let res = await getRole(query.value)
  console.log(res);
  tableData.value = res.data.rows
  total.value = res.data.total

  let resmenu = await getAllMenu({})
  console.log('menu', resmenu.data.rows.children);
  menus.value = resmenu.data.rows.children
})
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

.el-row {
  margin-bottom: 20px;
}
</style>