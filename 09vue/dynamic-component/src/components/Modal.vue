<template>
  <div>
    <p>第1个p标签</p>
    <p>第2个p标签</p>
    <p>第3个p标签</p>
    <p>第4个p标签</p>
    <p>第5个p标签</p>
    <p>第6个p标签</p>
    <p>第7个p标签</p>
    <p>第8个p标签</p>
    <p>第9个p标签</p>
    <p>第10个p标签</p>
    <p>第11个p标签</p>
    <p>第12个p标签</p>
    <p>第13个p标签</p>
    <p>第14个p标签</p>
    <p>第15个p标签</p>
    <p>第16个p标签</p>
    <p>第17个p标签</p>
    <p>第18个p标签</p>
    <p>第19个p标签</p>
    <p>第20个p标签</p>
    <p>第21个p标签</p>
    <p>第22个p标签</p>
    <p>第23个p标签</p>
    <p>第24个p标签</p>
    <p>第25个p标签</p>
    <p>第26个p标签</p>
    <p>第27个p标签</p>
    <p>第28个p标签</p>
    <p>第29个p标签</p>
    <p>第30个p标签</p>
    <p>第31个p标签</p>
    <p>第32个p标签</p>
    <p>第33个p标签</p>
    <p>第34个p标签</p>
    <p>第35个p标签</p>
    <p>第36个p标签</p>
    <p>第37个p标签</p>
    <p>第38个p标签</p>
    <p>第39个p标签</p>
    <p>第40个p标签</p>
    <p>第41个p标签</p>
    <p>第42个p标签</p>
    <p>第43个p标签</p>
    <p>第44个p标签</p>
    <p>第45个p标签</p>
    <p>第46个p标签</p>
    <p>第47个p标签</p>
    <p>第48个p标签</p>
    <p>第49个p标签</p>
    <p>第50个p标签</p>
<!-- 弹窗 -->
    <div id="modal">
    <div id="modal-body">
        <h3>商品详情</h3>
        <hr>

        <div class="close">X</div>
    </div>
   
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

#modal{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    #modal-body{
        width: 400px;
        padding:10px;
        height: auto;
        position: relative;
        background-color: #fff;
        border-radius: 10px;
        .close{
        position: absolute;
        right: 10px;
        top: 10px;
        width:30px;
        height: 30px;
        }
    }
   
}
</style>