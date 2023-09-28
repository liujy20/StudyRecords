<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>主页</el-breadcrumb-item>
    <el-breadcrumb-item>商铺管理</el-breadcrumb-item>
    <el-breadcrumb-item>商铺审核</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :inline="true" :model="form" class="demo-form-inline" style="margin: 20px 0;">
    <el-form-item label="店铺名称">
      <el-input v-model="form.shopName" placeholder="Approved by" clearable style="width: 180px;" />
    </el-form-item>
    <el-form-item label="申请人姓名">
      <el-input v-model="form.managerName" placeholder="Approved by" clearable style="width: 180px;" />
    </el-form-item>
    <el-form-item label="申请人身份证">
      <el-input v-model="form.idCard" placeholder="Approved by" clearable style="width: 180px;" />
    </el-form-item>
    <template v-if="isExpand">
      <el-form-item label="审核状态">
        <el-select v-model="form.status" style="width: 180px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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
    <el-table-column property="id" label="id" width="50"></el-table-column>
    <el-table-column property="shopName" label="商铺名称"></el-table-column>
    <el-table-column property="tel" label="手机号"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
    <el-table-column property="managerName" label="申请人姓名"></el-table-column>
    <el-table-column property="idCard" label="身份证号"></el-table-column>
    <el-table-column property="status" label="审核状态">
      <!-- <template #default="scope">{{ scope.row.type?'未通过':'通过' }}</template> -->

    </el-table-column>
    <el-table-column property="licenceNo" label="营业执照编号"></el-table-column>
    <el-table-column property="" label="营业执照">
      <template #default="scope"><img :src="scope.row.licenceImg" alt=""></template>
    </el-table-column>
    <el-table-column property="" label="操作"></el-table-column>
  </el-table>
  <div class="pagin">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
      :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script lang='ts' setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { getShop } from '@/apis/applyApi'
import { IFormShop } from '@/interfaces/apply'
// 表单
const form = ref<IFormShop>({
  shopName: "",
  managerName: "",
  idCard: "",
  status: "",
})

const options = [
  {
    value: '同意',
    label: '同意',
  },
  {
    value: '拒绝',
    label: '拒绝',
  },
  {
    value: '审核中',
    label: '审核中',
  }
]
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
  let res = await getShop(query.value)
  // console.log(res);
  tableData.value = res.data.rows
}
const handleCurrentChange = async (val: number) => {
  // console.log(`current page: ${val}`)
  currentPage.value = val
  let res = await getShop(query.value)
  // console.log(res);
  tableData.value = res.data.rows
}

const expand = () => {
  isExpand.value = !isExpand.value
}

const query = computed(() => {
  return { ...form.value, pageNum: String(currentPage.value), pageSize: String(pageSize.value) }
})

const submit = async () => {
  console.log(query);
  let res = await getShop(query.value)
  console.log(res);
  tableData.value = res.data.rows
}

const clear = () => {
  form.value = {
    shopName: "",
    managerName: "",
    idCard: "",
    status: "",
  }
}

onMounted(async () => {
  let res = await getShop({})
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