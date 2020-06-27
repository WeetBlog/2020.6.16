<template>
  <div>
    <el-row>
      <el-col :span="10">
        <h1 class="title">博客标题</h1>
        <el-input
          type="text"
          size="large"
          v-model="title"
          placeholder="请输入博客标题"
          maxlength="20"
          show-word-limit
          @focus="writeTitle"
        ></el-input>
        <span class="resTitle">{{res.title}}</span>
      </el-col>
      <el-col :span="15">
        <h2 class="title">博客简介</h2>
        <el-input
          type="text"
          size="medium"
          v-model="introduction"
          placeholder="请输入博客简介"
          maxlength="50"
          show-word-limit
          @focus="writeIntroduction"
        ></el-input>
        <span class="resTitle">{{res.introduction}}</span>
      </el-col>
      <el-col :span="24">
        <div class="content">
          <p v-for="(item, index) in blogContent" :key="index">{{item.content}}</p>
        </div>
      </el-col>
      <el-col>
        <!-- 上传多个图片 -->
        <el-upload
          style="margin-top:10px;"
          class="upload-demo"
          ref="upload"
          action="http://180.76.238.89:8080/sweet/fileUploadNewBlogImage"
          :on-preview="handlePreview"
          :file-list="arr"
          :before-upload="beforUpload"
          :auto-upload="false"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">点击为博客添加图片，只能上传jpg/png文件，且不超过500kb , 
          <br>
          <span class="el-icon-close" style="color:orange;"> 文件名有中文或有特殊符号则无法上传</span></div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-col>
      <el-col :span="24">
        <h3 class="title">段落内容</h3>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10}"
          placeholder="请输入段落内容"
          v-model="textarea"
          @focus="writeTextarea"
        ></el-input>
        <span class="resTitle">{{res.textarea}}</span>
      </el-col>
      <el-col :span="20" class="button">
        <el-button type="success" :plain="true" @click="addContent">新增一段</el-button>
        <el-button type="primary" :plain="true" @click="addBlog">完成博客</el-button>
      </el-col>
    </el-row>
  </div>
</template>



<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      introduction: "",
      textarea: "",
      blogContent: [],
      res: {
        title: "",
        introduction: "",
        textarea: ""
      },
      arr: [],
      contentImage: [],
      dialogImageUrl: "",
      dialogVisible: false,
      flag: false
    };
  },
  computed: {
    ...mapState({
      blog: state => state.blog.blog
    })
  },
  mounted() {
    this.$store.dispatch("getBlog");
  },
  methods: {
    addContent() {
      if (this.textarea.trim()) {
        let obj = {
          content: this.textarea,
          image: []
        };
        this.blogContent.push(obj);
        this.$message({
          showClose: true,
          message: "新增了博客的一个段落"
        });
        this.res.textarea = "";
      } else {
        this.res.textarea = "不能添加空的段落内容";
      }
      this.textarea = "";
    },
    async addBlog() {
      if (!this.title.trim()) {
        this.res.title = "博客标题不能为空";
      }
      if (!this.introduction.trim()) {
        this.res.introduction = "博客简介不能为空";
      }
      if (this.blogContent.length === 0) {
        this.res.textarea = "这篇博客没有内容，无法上传";
      }
      if (
        this.title.trim() &&
        this.introduction.trim() &&
        this.blogContent.length > 0
      ) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let time = year + "-" + month + "-" + day;
        let obj = {
          blogId: Date.now(),
          blogDate: time,
          blogTitle: this.title,
          introduction: this.introduction,
          blogContent: this.blogContent
        };
        this.blog.push(obj);
        await this.$store.dispatch("addBlog", this.blog);
        await this.$refs.upload.submit();
        this.title = "";
        this.introduction = "";
        this.blogContent = [];
        await this.$message({
          showClose: true,
          message: "恭喜您，博客发布成功",
          type: "success"
        });
        await setTimeout(()=>{
          this.$router.push(`/blogInfo/${obj.blogId}`)
        },1000)
      }
    },
    writeTitle() {
      this.res.title = "";
    },
    writeIntroduction() {
      this.res.introduction = "";
    },
    writeTextarea() {
      this.res.textarea = "";
    },
    async beforUpload(file) {
      console.log(file);
      let reg = /^[A-z|0-9|\.]+$/;
      const isJPGORPNG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!reg.test(file.name)) {
        return false;
      }
      if (!isJPGORPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      this.flag = isJPGORPNG && isLt2M && reg.test(file.name);
      return this.flag;
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>



<style scoped>
.resTitle {
  color: red;
  display: block;
  padding: 10px;
}
.button {
  margin-top: 10px;
}
.title {
  margin: 20px 0 10px;
}
.content {
  margin-top: 20px;
  border-radius: 5px;
  min-height: 100px;
  /* background: rgb(235, 228, 228); */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  box-sizing: border-box;
}
.content p {
  line-height: 150%;
  font-size: 18px;
  text-indent: 30px;
  letter-spacing: 2px;
  color: #555;
  font-family: sweet2;
}
</style>