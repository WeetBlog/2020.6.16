<template>
  <el-timeline>
    <el-timeline-item
      class="list"
      v-for="(item, index) in blogs"
      :key="item.blogId"
      :timestamp="item.blogDate"
      placement="top"
    >
      <div @click="getIndex(index,item.blogTitle)">
        <el-tooltip class="item" effect="dark" content="点击删除这条博客" placement="bottom">
          <el-card>
            <h2>{{item.blogTitle}}</h2>
            <p>{{item.introduction}}</p>
          </el-card>
        </el-tooltip>
      </div>
    </el-timeline-item>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>确认删除《{{name}}》这篇博客吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delBlog">确 定</el-button>
      </span>
    </el-dialog>
  </el-timeline>
</template>



<script type="text/ecmascript-6">
export default {
  data() {
    return {
      dialogVisible: false,
      index : 0,
      name : ""
    };
  },
  computed: {
    blogs: {
      get() {
        return this.$store.state.blog.blog.reverse();
      },
      set(val) {
        this.$store.state.blog.blog = val;
      }
    }
  },
  mounted() {
    this.$store.dispatch("getBlog");
  },
  methods: {
    getIndex(index,name){
        this.dialogVisible = true
        this.index = index
        this.name = name
    },
    delBlog(){
      this.dialogVisible = false
      this.deleteBlog(this.index)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deleteBlog(index) {
      this.blogs.splice(index, 1);
      this.$store.dispatch("addBlog", this.blogs.sort());
      this.$message.success('删除《'+this.name+"》成功");
    }
  }
};
</script>



<style scoped>
p {
  color: #777;
  font-family: "楷体";
  font-size: 16px;
}
.list {
  cursor: pointer;
}
div:hover {
  box-shadow: 0 0 5px rgba(230, 27, 27, 0.3);
}
</style>