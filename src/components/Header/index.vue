<template>
  <div class="Header">
    <div class="Header-img">
      <img src="./image/touxiang.jpg" alt />
      <div class="Header-text">活在当下，不问朝夕</div>
    </div>
    <div class="type-nav">
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
    </div>
    
  </div>
</template>



<script type="text/ecmascript-6">
export default {};
</script>



<style  lang ="less" scoped>
.Header {
  height: 600px;
  position: relative;
  .Header-img {
    height: 300px;
    width: 300px;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    img {
      width: 100%;
      border-radius: 50%;
    }
    .Header-text {
      margin-top: 20px;
      text-align: center;
      font-size: 20px;
    }
  }
  .type-nav{
    position: absolute;
    width: 450px;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
  }

}
</style>