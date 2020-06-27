<template>
  <el-row :gutter="20">
    <!-- 左侧 -->
    <el-col :span="14">
      <div class="left">
        <el-row>
          <el-col :span="23">
            <el-timeline>
              <el-timeline-item
                class="list"
                v-for="(item, index) in getBlogs"
                :key="item.blogId"
                :timestamp="item.blogDate"
                placement="top"
              >
                <div class="blogsDiv" @click="setBlog(index)">
                  <el-tooltip class="item" effect="dark" content="点击修改这条博客" placement="bottom">
                    <el-card>
                      <h2>{{item.blogTitle}}</h2>
                      <p class="p">{{item.introduction}}</p>
                    </el-card>
                  </el-tooltip>
                </div>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </div>
    </el-col>

    <!-- 右侧 -->
    <el-col :span="10">
      <div class="right">
        <el-row>
          <el-col :span="10">
            <h1 class="title">博客标题</h1>
            <el-input
              disabled
              type="text"
              size="large"
              v-model="blogs.blogTitle"
              placeholder="博客标题"
              maxlength="20"
              show-word-limit
            ></el-input>
            <span class="resTitle">{{res.title}}</span>
          </el-col>
          <el-col :span="15">
            <h2 class="title">博客简介</h2>
            <el-input
              type="text"
              size="medium"
              v-model="blogs.introduction"
              placeholder="请输入博客简介"
              maxlength="50"
              show-word-limit
            ></el-input>
            <span class="resTitle">{{res.introduction}}</span>
          </el-col>
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" content="选择段落进行修改" placement="top">
              <div class="content">
                <p
                  v-for="(item, index) in blogs.blogContent"
                  :key="index"
                  @click="setContent(index)"
                >
                  【第{{index+1}}段】：
                  <br />
                  <span>{{item.content}}</span>
                  <br />
                  <el-collapse style="margin-top:20px;" accordion>
                    <el-collapse-item>
                      <template slot="title">
                        <span style="color:skyblue;font-size:15px;">段落图片</span>
                      </template>
                      <i v-for="(url, index) in item.image" :key="index" style="padding:10px;">
                        第{{index+1}}张：
                        <el-link
                          icon="el-icon-picture"
                          style="display:inline-block; width:100%;"
                          class="link"
                          :href="url"
                          type="success"
                          target="_blank"
                        >{{url}}</el-link>
                        <br />
                      </i>
                    </el-collapse-item>
                  </el-collapse>
                </p>
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="24">
            <h3 class="title">段落内容</h3>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10}"
              placeholder="请输入段落内容"
              v-model="textarea"
            ></el-input>
            <span class="resTitle">{{res.textarea}}</span>
          </el-col>
          <el-col>
            <!-- 上传多个图片 -->
            <el-upload
              style="margin-top:10px;"
              v-if="flag"
              class="upload-demo"
              ref="upload"
              :data="{index2:conIndex,index1:blogIndex}"
              action="http://180.76.238.89:8080/sweet/fileUploadBlogImage"
              :on-remove="handleRemove"
              :file-list="arr"
              :before-upload="beforUpload"
              :auto-upload="false"
              list-type="picture"
            >
              <el-button slot="trigger" size="small" type="primary">为该段落添加图片</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
              >上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="20" class="button">
            <el-button
              v-if="hideButton"
              type="success"
              :disabled="disable1"
              :plain="true"
              @click="addContent"
            >新增一段并保存</el-button>
            <el-button v-else type="warning" :plain="true" @click="updateContent">修改并保存</el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>



<script type="text/ecmascript-6">
import cloneDeep from "lodash/cloneDeep";
export default {
  data() {
    return {
      hideButton: true,
      flag: false,
      textarea: "",
      res: {
        title: "",
        introduction: "",
        textarea: ""
      },
      blogs: {},
      disable1: true,
      disable2: true,
      conIndex: 0,
      blogIndex: 0
    };
  },
  watch: {
    $route(to, from) {
      this.shuaxin();
    }
  },
  computed: {
    arr() {
      let arr = [];
      if (this.blogs.blogId) {
        this.blogs.blogContent[this.conIndex].image.forEach(text => {
          let obj = {
            name: text,
            url: text
          };
          arr.push(obj);
        });
      }
      return arr;
    },
    getBlogs: {
      get() {
        return this.$store.state.blog.blog;
      },
      set(val) {
        this.$store.state.blog.blog = val;
      }
    }
  },
  mounted() {
    this.shuaxin();
  },
  // activated() {
  //   this.shuaxin();
  // },
  methods: {
    shuaxin() {
      this.$store.dispatch("getBlog");
    },
    setBlog(index) {
      this.blogs = cloneDeep(this.getBlogs[index]);
      this.hideButton = true;
      this.textarea = "";
      this.disable1 = false;
      this.disable2 = true;
      this.flag = false;
      this.blogIndex = index;
    },
    setContent(index) {
      this.textarea = this.blogs.blogContent[index].content;
      this.hideButton = false;
      this.conIndex = index;
      this.flag = true;
    },

    // 修改并保存
    updateContent() {
      if (this.textarea.trim()) {
        let array = [];
        this.arr.forEach(item => {
          array.push(item.url);
        });
        this.blogs.blogContent[this.conIndex].content = this.textarea;
        this.blogs.blogContent[this.conIndex].image = array;
        this.blogs.blogContent.splice(0, 0);
        this.textarea = "";
        this.hideButton = true;
        this.disable2 = false;
        this.$message({
          showClose: true,
          message: "已修改内容",
          type: "success"
        });
        this.getBlogs.splice(this.blogIndex, 1, this.blogs);
        this.$store.dispatch("addBlog", this.getBlogs);
      } else {
        this.$message({
          showClose: true,
          message: "该段落无内容，已自动删除",
          type: "warning"
        });
        this.blogs.blogContent.splice(this.conIndex, 1);
      }
      this.flag = false;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },

    addContent() {
      if (this.textarea.trim()) {
        let obj = {
          content: "",
          image: []
        };
        obj.content = this.textarea;
        this.blogs.blogContent.push(obj);
        this.textarea = "";
        this.disable2 = false;
        this.$message({
          showClose: true,
          message: "添加了新的一段",
          type: "success"
        });
        this.getBlogs.splice(this.blogIndex, 1, this.blogs);
        this.$store.dispatch("addBlog", this.getBlogs);
        this.flag = false;
        this.hideButton = false;
      } else {
        this.$message({
          showClose: true,
          message: "不能添加空的内容",
          type: "error"
        });
      }
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i].uid === file.uid) {
          this.arr.splice(i, 1);
          break;
        }
      }
    },
    beforUpload(file) {
      const isJPGORPNG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGORPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPGORPNG && isLt2M;
    }
  }
};
</script>



<style scoped>
.p {
  color: #777;
  font-family: "楷体";
  font-size: 16px;
}
.list {
  cursor: pointer;
}
.blogsDiv:hover {
  box-shadow: 0 0 5px rgba(230, 27, 27, 0.3);
}
.left,
.right {
  overflow: auto;
  max-height: 1000px;
}
.button {
  margin-top: 10px;
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
  /* text-indent: 30px; */
  letter-spacing: 2px;
  color: #555;
  font-family: sweet2;
  box-sizing: border-box;
  padding: 10px;
}
.content .link {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content p:hover {
  cursor: pointer;
  /* background-color: ; */
  border-radius: 5px;
  box-shadow: 0 0 5px rgb(193, 221, 233);
}
</style>