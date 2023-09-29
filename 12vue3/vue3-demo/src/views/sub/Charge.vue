<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>主页</el-breadcrumb-item>
    <el-breadcrumb-item>商铺管理</el-breadcrumb-item>
    <el-breadcrumb-item>电站审核</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :inline="true" :model="form" class="demo-form-inline" style="margin: 20px 0;">
    <el-form-item label="名称">
      <el-input v-model="form.shopName" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="form.tel" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="负责人">
      <el-input v-model="form.managerName" placeholder="Approved by" clearable />
    </el-form-item>
    <template v-if="isExpand">
      <el-form-item label="身份证号">
        <el-input v-model="form.idCard" clearable></el-input>
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
    <el-button type="primary" size="default" plain @click="">新增</el-button>
    <el-button size="default" plain @click="">删除</el-button>
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
          <el-dropdown-item>导出Excel</el-dropdown-item>
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
        <el-link type="primary" :underline="false" @click="expand">展开</el-link>
      </el-form-item>
    </template>
  </el-space>
  <el-table :data="tableData" style="width: 100%;margin-top: 20px;">
    <el-table-column type="selection" width="55" />
    <el-table-column property="shopName" label="充电站名称" width="120"></el-table-column>
    <el-table-column property="tel" label="电话" width="120"></el-table-column>
    <el-table-column property="address" label="地址" width="120"></el-table-column>
    <el-table-column property="idCard" label="身份证号" width="120"></el-table-column>
    <el-table-column property="managerName" label="负责人" width="120"></el-table-column>
    <el-table-column property="licenceNo" label="执照号" width="120"></el-table-column>
    <el-table-column property="status" label="状态" width="120">
    </el-table-column>
    <el-table-column property="" label="图片" width="120">
      <!-- <template #default="scope"><img :src="scope.row.idCardImg" alt=""></template> -->
    </el-table-column>
    <el-table-column property="" label="操作" width="120">
      <template #default="scope">
        <el-space direction="vertical">
          <el-button size="default" v-if="scope.row.status==='审核中'" @click="changeStatus(scope.row, '通过')">通过</el-button>
          <el-button size="default" v-if="scope.row.status==='审核中'" @click="changeStatus(scope.row, '拒绝')">驳回</el-button>
        </el-space>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagin">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
      :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script lang='ts' setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { getCharge } from '@/apis/applyApi'
import {changeChargeStatus} from '@/apis/applyApi'
import { IFormCharge } from '@/interfaces/apply'
// 表单
const form = ref<IFormCharge>({
  shopName: "",
  tel: "",
  managerName: "",
  idCard: "",
})
const tableData = ref<any>([])
// 状态
const isExpand = ref<boolean>(false)
// 分页
const total = ref<number>(10)
const currentPage = ref<number>(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = async (val: number) => {
  // console.log(`${val} items per page`)
  pageSize.value = val
  let res = await getCharge(query.value)
  // console.log(res);
  tableData.value = res.data.rows
}
const handleCurrentChange = async (val: number) => {
  // console.log(`current page: ${val}`)
  currentPage.value = val
  let res = await getCharge(query.value)
  // console.log(res);
  tableData.value = res.data.rows
}

const changeStatus= async(row:any, status:string)=>{
  row.status=status
  row={...row}
  Object.keys(row).forEach(item=>{
    row[item]=String(row[item])
  })
  console.log(row);
  let res=await changeChargeStatus(new URLSearchParams(row).toString())
  console.log(res);
  
}

const expand = () => {
  isExpand.value = !isExpand.value
}

const query = computed(() => {
  return { ...form.value, pageNum: String(currentPage.value), pageSize: String(pageSize.value) }
})

const submit = async () => {
  console.log(query.value);
  let res = await getCharge(query.value)
  console.log(res);
  tableData.value = res.data.rows
  total.value = res.data.total
}

const clear = () => {
  form.value = {
    shopName: "",
    tel: "",
    managerName: "",
    idCard: "",
  }
}

onMounted(async () => {
  let res = await getCharge(query.value)
  console.log(res);
  tableData.value = res.data.rows
  total.value = res.data.total
})

</script>

<style lang='scss' scoped>
.pagin {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>