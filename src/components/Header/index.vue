<template>
  <div class="Header">
    <div class="Header-img">
      <img src="./image/touxiang.jpg" alt />
      <div class="Header-text">活在当下，不问朝夕</div>
    </div>
    <div class="type-nav">
      <el-button type="info" round><span>信息按钮</span></el-button>
      <el-button type="info" round><span>信息按钮</span></el-button>
      <el-button type="info" round><span>信息按钮</span></el-button>
      <el-button type="info" round><span>信息按钮</span></el-button>
    </div>
    
  </div>
</template>



<script type="text/ecmascript-6">
export default {};
</script>



<style  lang ="less" scoped>
@font-face {
    font-family: sweet1;
    src: url(./font/ZCOOLKuaiLe-Regular.ttf);
}
@font-face {
    font-family: sweet2;
    src: url(./font/ZCOOLXiaoWei-Regular.ttf);
}
@font-face {
    font-family: sweet3;
    src: url(./font/ZCOOLQingKeHuangYou-Regular.ttf);
}
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
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    }
    .Header-text {
      margin-top: 20px;
      text-align: center;
      font-size: 20px;
      font-family: sweet2;
      color: #999;
    }
  }
  .type-nav{
    position: absolute;
    width: 429px;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
    span{
      font-family: sweet1;
    }
    
    
  }

}
</style>