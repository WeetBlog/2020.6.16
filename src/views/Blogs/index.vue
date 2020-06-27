<template>
  <div class="blog">
    <h2>Experience</h2>
    <p class="blogs" v-for="blog in blogs" :key="blog.blogId">
      <router-link tag="span" :to="`/blogInfo/${blog.blogId}`">
        <span class="left">{{blog.blogDate}}</span>
        <span class="right">{{blog.blogTitle}}</span>
      </router-link>
    </p>
  </div>
</template>



<script type="text/ecmascript-6">
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            blogs : state => state.blog.blog.reverse()
        })
    },
    mounted() {
        this.$store.dispatch('getBlog')
    },
};
</script>



<style scoped>
.blog {
  margin: 70px auto;
  width: 450px;
  padding: 10px;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  font-family: sweet2;
  font-weight: bold;
  color: #666;
}
.blogs {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 260%;
}
.blogs span {
  font-size: 14px;
}
.blogs .left{
    padding-right:20px ;
    color: #666;
    font-family: sweet1;
}
.blogs .right{
    letter-spacing: 2px;
    font-size: 16px;
    font-family: sweet2;
}
.blogs:hover{
  cursor: pointer;
}
.blogs :hover .right{
  
  color:rgb(71, 175, 216);
}
</style>