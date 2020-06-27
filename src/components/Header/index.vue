<template>
  <div class="Header">
    <div class="Header-img">
      <img :src="userInfo.imgUrl" alt />
      <div class="Header-text">{{userInfo.motto}}</div>
    </div>
    <div class="type-nav">
      <el-button type="info" round><router-link tag="span" to="/blogs">主页信息</router-link></el-button>
      <el-button type="info" round><router-link tag="span" to="/favorite">个人爱好</router-link></el-button>
      <el-button type="info" round><router-link tag="span" to="/user">博主信息</router-link></el-button>
      <el-button type="info" round><router-link tag="span" to="/tiantian">后台管理</router-link></el-button>
    </div>
    
  </div>
</template>



<script type="text/ecmascript-6">
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      userInfo : state => state.user.userInfo
    })
  },
  mounted() {
    this.$store.dispatch('getUserInfo')
  },
};
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
    width: 440px;
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