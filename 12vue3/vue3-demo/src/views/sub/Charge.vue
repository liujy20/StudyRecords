<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>主页</el-breadcrumb-item>
    <el-breadcrumb-item>商铺管理</el-breadcrumb-item>
    <el-breadcrumb-item>电站审核</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form :inline="true" :model="form" class="demo-form-inline" style="margin: 20px 0;">
    <el-form-item label="名称">
      <el-input v-model="name" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="phone" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="负责人">
      <el-input v-model="persen" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" size="default" @click="">查询</el-button>
    </el-form-item>
    <el-form-item label="">
      <el-button size="default" @click="">重置</el-button>
    </el-form-item>
    <el-form-item label="">
      <el-link type="primary" :underline="false">展开</el-link>
    </el-form-item>


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
  <el-table :data="tableData" style="width: 100%;margin-top: 20px;">
    <el-table-column type="selection" width="55" />
    <el-table-column property="shopName" label="充电站名称" width="120"></el-table-column>
    <el-table-column property="tel" label="电话" width="120"></el-table-column>
    <el-table-column property="address" label="地址" width="120"></el-table-column>
    <el-table-column property="idCard" label="身份证号" width="120"></el-table-column>
    <el-table-column property="managerName" label="负责人" width="120"></el-table-column>
    <el-table-column property="licenceNo" label="执照号" width="120"></el-table-column>
    <el-table-column property="" label="状态" width="120">
      <template #default="scope">{{ scope.row.type?'未通过':'通过' }}</template>
    </el-table-column>
    <el-table-column property="" label="图片" width="120">
      <template #default="scope"><img :src="scope.row.idCardImg" alt=""></template>
    </el-table-column>
    <el-table-column property="" label="操作" width="120"></el-table-column>
  </el-table>
  <div class="pagin">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang='ts' setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { getCharge } from '@/apis/applyApi'
const form = ref<object>({})
const name = ref<string>('')
const phone = ref<string>('')
const persen = ref<string>('')
const tableData = ref<any>([])


const currentPage = ref(4)
const pageSize = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

onMounted(async () => {
  let res = await getCharge({
    pageSize: '10',
    pageNum: '1',
    shopName: '',
    tel: '',
    managerName: '',
    idCard: '',
  })
  console.log(res);
  tableData.value=res.data.rows
})

</script>

<style lang='scss' scoped>
.pagin{
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}</style>