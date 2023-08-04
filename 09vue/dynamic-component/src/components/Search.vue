<template>
  <div id="search">
    <div class="search-item">
        <span>拼团状态:</span>
        <select name="" id="">
            <option value="true" selected>开启</option>
            <option value="false">关闭</option>
        </select>
    </div>
    <div class="search-item">
        <span>商品搜索:</span>
        <input type="text">
        <button>搜索</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#search{
    display: flex;
    flex-wrap: nowrap;
    margin-bottom:20px;
}
</style>