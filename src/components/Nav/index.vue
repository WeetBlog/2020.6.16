<template>
  <el-col :span="22" :offset="1" style="margin-top:10px;">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <router-link tag="span" slot="title" to="/" style="display:inline-block; width:100%;">博客首页</router-link>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>我的博客</span>
        </template>
        <el-menu-item v-for="blog in blogs" :key="blog.blogId" index="1-3">
          <router-link tag="li" :to="`/blogInfo/${blog.blogId}`">
            <li class="li el-icon-caret-right">
              <span class="date">{{blog.blogDate}}</span>
              <span class="title">{{blog.blogTitle}}</span>
            </li>
          </router-link>
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="3">
        <i class="el-icon-camera-solid"></i>
        <router-link
          tag="span"
          slot="title"
          to="/favorite"
          style="display:inline-block; width:100%;"
        >个人爱好</router-link>
      </el-menu-item>

      <el-menu-item index="4">
        <i class="el-icon-s-custom"></i>
        <router-link
          tag="span"
          slot="title"
          to="/user"
          style="display:inline-block; width:100%;"
        >博主信息</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-s-tools"></i>
        <router-link
          tag="span"
          slot="title"
          to="/tiantian"
          style="display:inline-block; width:100%;"
        >后台管理</router-link>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>



<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      blogs: state => state.blog.blog
    })
  },
  mounted() {
    this.$store.dispatch("getBlog");
  }
};
</script>



<style scoped>
.li {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.date {
  color: rgb(78, 97, 50);
  padding-right: 10px;
}
.title {
  font-family: sweet2;
  color: #666;
  font-size: 16px;
}
</style>