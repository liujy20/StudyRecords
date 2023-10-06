<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>主页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :inline="true" :model="form" class="demo-form-inline" style="margin: 20px 0;">
    <el-form-item label="名称">
      <el-input v-model="form.menuName" placeholder="Approved by" clearable />
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
    <el-popconfirm width="220" confirm-button-text="按钮" cancel-button-text="菜单" :icon="InfoFilled" icon-color="#626AEF"
      title="请选择创建类型" @confirm="addClick('1')" @cancel="addClick('0')">
      <template #reference>
        <el-button type="primary" size="default">新增</el-button>
      </template>
    </el-popconfirm>
    <el-button size="default" plain @click="delClick">删除</el-button>
    <el-dropdown  @command="handleCommand">
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
  <el-table :data="tableData" style="width: 100%; margin-top: 20px;" ref="multipleTableRef" :tree-props="treeProps"
    row-key="id" lazy :load="load" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column fixed property="title" label="名称" width="120"></el-table-column>
    <el-table-column property="" label="图表" width="140"></el-table-column>
    <el-table-column property="type" label="类型" width="140">
      <template #default="scope">
        <el-tag v-if="scope.row.type == '0'">菜单</el-tag>
        <el-tag type="danger" v-if="scope.row.type == '1'">按钮</el-tag>
      </template>
    </el-table-column>
    <el-table-column property="path" label="地址" width="140"></el-table-column>
    <el-table-column property="component" label="Vue组件" width="140"></el-table-column>
    <el-table-column property="permission" label="权限" width="140"></el-table-column>
    <el-table-column property="order" label="排序" width="140"></el-table-column>
    <el-table-column property="createTime" label="创建时间" width="140"></el-table-column>
    <el-table-column property="modifyTime" label="修改时间" width="140"></el-table-column>
    <el-table-column property="" label="操作" width="120" fixed="right">
      <template #default="scope">
        <el-space>
          <el-icon color="#409EFF" @click="modifyClick(scope.row)">
            <Setting />
          </el-icon>
        </el-space>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="drawer" :title='title' @closed="clearMenu">

    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" status-icon>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="ruleForm.menuName" />
      </el-form-item>
      <el-form-item label="菜单URL" prop="path">
        <el-input v-model="ruleForm.path" />
      </el-form-item>
      <el-form-item label="组件地址" prop="component">
        <el-input v-model="ruleForm.component" />
      </el-form-item>
      <el-form-item label="相关权限" prop="perms">
        <el-input v-model="ruleForm.perms" />
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="ruleForm.icon" />
      </el-form-item>
      <el-form-item label="菜单排序" prop="orderNum">
        <el-input v-model="ruleForm.orderNum" />
      </el-form-item>
      <el-form-item label="上级菜单" prop="orderNum">
        <el-tree ref="myTree" :data="tableData" :props="menuProps" node-key="id" show-checkbox :check-strictly="true" />
      </el-form-item>

    </el-form>
    <template #footer>
      <div style="flex: auto" v-if="title !== '角色信息'">
        <el-popconfirm :hide-after="0" title="确认放弃编辑吗?" confirm-button-text="确认" cancel-button-text="取消"
          @confirm="cancelClick">
          <template #reference>
            <el-button>取消</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="submitClick(ruleFormRef)">提交</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang='ts' setup>
import type { FormInstance, FormRules, ElTable, ElTree } from 'element-plus'
import { ArrowDown, Setting, InfoFilled } from '@element-plus/icons-vue'
import { IGetMenu } from '@/interfaces/menu'
import { getAllMenu, addMenu, setMenu, delMenu } from '@/apis/menuApi'
import { IAddMenu, IMenuItem } from '@/interfaces/menu'
import { exportToExcel } from '@/utils/excel'
// 搜索表单
const form = ref<IGetMenu>({
  createTimeFrom: '',
  createTimeTo: '',
  menuName: '',
})
// 数据
const date = ref('')
const tableData = ref<any>([])
const treeProps = {
  children: 'children',
  hasChildren: 'hasChildren'
}
const load = (
  row: any,
  _: unknown,
  resolve: (date: any) => void
) => {
  resolve(row.children)
}

// 状态
const drawer = ref<boolean>(false)
const title = ref<string>('')

// menu表单
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IAddMenu>({
  menuName: '',
  path: '',
  component: '',
  parentId: '',
  icon: '',
  orderNum: '',
  perms: '',
  type: '',
})
const menuId = ref<string>('')
const rules = reactive<FormRules<IAddMenu>>({
  menuName: [
    { required: true, message: 'Please input Activity menuName', trigger: 'blur' },
  ],
  path: [
    { required: true, message: 'Please input Activity menuName', trigger: 'blur' },
  ],
  component: [
    { required: true, message: 'Please input Activity menuName', trigger: 'blur' },
  ]
})
const myTree = ref<InstanceType<typeof ElTree>>()
const menuProps = {
  children: 'children',
  label: 'title',
}
// 多选
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<any[]>([])


// 搜索提交
const submit = async () => {
  if (date.value !== '') {
    form.value.createTimeFrom = new Date(date.value[0]).toLocaleDateString().replace(/\//g, '-')
    form.value.createTimeTo = new Date(date.value[1]).toLocaleDateString().replace(/\//g, '-')
  }
  // return
  let res = await getAllMenu(form.value)
  console.log(res);
  tableData.value = res.data.rows.children
}
// 搜索清空
const clear = () => {
  form.value = {
    createTimeFrom: '',
    createTimeTo: '',
    menuName: '',
  }
  date.value = ''
}


// 清空数据
const clearMenu = () => {
  menuId.value = ""
  myTree.value!.setCheckedKeys([], false)
  resetForm(ruleFormRef.value)
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 新增用户
const addClick = (num: string) => {
  ruleForm.type = num
  if (num == '0') {
    drawer.value = true
    title.value = '添加菜单'
  }
}
// 修改用户
const modifyClick = async (val: IMenuItem) => {
  drawer.value = true
  title.value = '修改菜单'
  console.log(val);
  menuId.value = val.id || '';
  ruleForm.menuName = val.title || '';
  ruleForm.path = val.path || '';
  ruleForm.component = val.component || '';
  ruleForm.parentId = val.parentId || '';
  ruleForm.icon = val.icon || '';
  ruleForm.orderNum = val.order ? String(val.order) : '';
  ruleForm.perms = val.permission || '';
  ruleForm.type = val.type || '';
  let arr = [ruleForm.parentId]
  myTree.value!.setCheckedKeys(arr, false)
  console.log(ruleForm);
}
// 提交用户
const submitClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (menuId.value != "") {
      if (valid) {
        console.log(ruleForm);
        let obj: any = { ...ruleForm, menuId: menuId.value }
        let res = await setMenu(new URLSearchParams(obj).toString())
        console.log(res);
        if (res.status === 200) {
          drawer.value = false
          let res = await getAllMenu(form.value)
          // console.log(res.data.rows.children);
          tableData.value = markRaw(res.data.rows.children)
          ElMessage({
            message: '修改成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '修改失败',
            type: 'error'
          })
        }
      } else {
        ElMessage({
          message: '填写数据错误',
          type: 'error',
        })
        console.log('error submit!', fields)
      }
      return
    }
    if (valid) {
      ruleForm.parentId = myTree.value!.getCheckedKeys(false)[0] as string || ""
      console.log('submit!', ruleForm)
      let obj: any = { ...ruleForm }
      let res = await addMenu(new URLSearchParams(obj).toString())
      console.log(res);
      if (res.status === 200) {
        drawer.value = false
        let res = await getAllMenu(form.value)
        console.log(res.data.rows.children);
        tableData.value = markRaw(res.data.rows.children)
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '添加失败',
          type: 'error'
        })
      }
    } else {
      ElMessage({
        message: '填写数据错误',
        type: 'error',
      })
      console.log('error submit!', fields)
    }
  })
}
// 关闭修改
function cancelClick() {
  drawer.value = false
}
// 获取选中
const handleSelectionChange = (val: IMenuItem[]) => {
  multipleSelection.value = val
  // console.log(multipleSelection.value);
}
// 删除角色
const delClick = async () => {
  multipleSelection.value.forEach(async item => {
    console.log(item.id);
    let res = await delMenu(String(item.id))
    console.log(res);
    if (res.status === 200) {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
    }
  })

  let res = await getAllMenu(form.value)
  // console.log(res);
  tableData.value = res.data.rows.children
}

const handleCommand = (command: string | number | object) => {
  if (command === "out") {
    let arr=tableData.value
    console.log(arr);
    
    exportToExcel(arr)
    console.log(111);
    
  }
}
onMounted(async () => {
  let res = await getAllMenu({})
  console.log(res);
  tableData.value = res.data.rows.children
  // console.log(tableData.value);

})

</script>

<style lang='scss' scoped>
:deep(:focus-visible) {
  outline: none;

}
</style>