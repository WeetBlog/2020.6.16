<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <router-link tag="li" to="/tiantian/userinfo">个人中心</router-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的博客</template>
          <el-menu-item index="2-1">
            <router-link tag="li" to="/tiantian/addblog">新增博客</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link tag="li" to="/tiantian/setblog">修改博客</router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <router-link tag="li" to="/tiantian/delblog">删除博客</router-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <li @click="drawer = true" >回到主页</li>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" :offset="2">
      <router-view></router-view>
    </el-col>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <Nav/>
    </el-drawer>
  </el-row>
</template>



<script type="text/ecmascript-6">
import Nav from '../../components/Nav'
export default {
  components:{
    Nav
  },
  data() {
    return {
      activeIndex: "1",
      drawer: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //       console.log(key, keyPath);
    },
    toHome() {
      this.$router.push("/");
    },
    
  }
};
</script>



<style lang="less" scoped>
// a{
//   color: cursor;
//   text-decoration: none;
// }
// .router-link-active {
//   text-decoration: none;
// }
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
</style>