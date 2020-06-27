<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-card shadow="always">
          <h1>{{blog.blogTitle}}</h1>
          <el-divider content-position="left"><span class="date">{{blog.blogDate}}</span></el-divider>
          
          <h3>{{blog.introduction}}</h3>
          <el-card>
            <div v-for="(item,index) in blog.blogContent" :key="index" class="text item">
              {{item.content}}
              <br />
              <br />
              <img v-for="(img, index) in item.image" :key="index" :src="img" width="100%" style="border-radius:5px"/>
            </div>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
    <div class="menu">
      <el-button @click="drawer = true" type="info" plain style="margin-left: 16px;">MENU</el-button>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <Nav />
    </el-drawer>
  </div>
</template>



<script type="text/ecmascript-6">
import { mapState } from "vuex";
import Nav from "../../components/Nav";
export default {
  data() {
    return {
      drawer: false
    };
  },
  components: {
    Nav
  },
  watch: {
    $route(to,from){
      this.$store.dispatch("getBlogById", to.params.blogid);
    }
  },
  computed: {
    ...mapState({
      blog: state => state.blog.oneBlog
    })
  },
  mounted() {
    this.$store.dispatch("getBlogById", this.$route.params.blogid);
  }
};
</script>



<style scoped>
.menu {
  position: fixed;
  top: 5px;
  left: -10px;
}
h1 {
  font-size: 29px;
  font-family: sweet2;
  letter-spacing: 5px;
}
.date {
  font-size: 13px;
  color: rgb(167, 164, 164);
  letter-spacing: 2px;
  font-family: sweet3;
}
h3 {
  font-size: 15px;
  margin-bottom: 40px;
  font-family: sweet1;
  letter-spacing: 2px;
}
.text {
  font-size: 13px;
}

.item {
  padding: 18px 0;
  text-indent: 26px;
}
</style>