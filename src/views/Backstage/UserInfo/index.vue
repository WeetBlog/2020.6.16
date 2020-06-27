<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-tooltip class="item" effect="dark" content="点击更换头像" placement="right">
          <el-upload
            id="avatar-uploader"
            class="avatar-uploader"
            action="http://180.76.238.89:8080/sweet/fileUploadUserImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userInfo.imgUrl" :src="userInfo.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form
          :model="this.userInfo"
          :label-position="labelPosition"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="博主" prop="name">
            <el-input v-model="userInfo.name" maxlength="12" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="introduction">
            <el-input type="textarea" v-model="userInfo.introduction" autosize></el-input>
          </el-form-item>
          <el-form-item label="人生格言" prop="motto">
            <el-input
              type="textarea"
              v-model="userInfo.motto"
              :autosize="{ minRows: 2, maxRows: 4}"
            ></el-input>
          </el-form-item>
          <el-divider></el-divider>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="17">
        <el-table :data="userInfo.experience" style="width: 100%" max-height="250">
          <el-table-column fixed prop="experience" label="经历" width="550"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                @click.native.prevent="deleteRow(scope.$index, userInfo.experience)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-divider></el-divider>
        <el-form
          :model="this.ruleForm"
          :rules="rules2"
          ref="ruleForm2"
          :label-position="labelPosition"
          label-width="80px"
        >
          <el-form-item label="新增" prop="experience">
            <el-input placeholder="输入添加新的经历" v-model="ruleForm.experience" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-divider></el-divider>
        <el-button :plain="true" type="primary" @click="open2('ruleForm2')">添加经历</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="save('ruleForm')">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>



<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  data() {
    return {
      imageUrl: "",
      labelPosition: "left",
      ruleForm: {
        experience: ""
      },
      rules: {
        name: [
          { required: true, message: "博主名称不能为空", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "简介不能为空", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        motto: [
          { required: true, message: "人生格言不能为空", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ]
      },
      rules2: {
        experience: [
          { required: true, message: "不能添加空的段落", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      userStr: state => JSON.stringify(state.user.userInfo)
    })
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res);

      this.userInfo.imgUrl = res;
    },
    beforeAvatarUpload(file) {
      const isJPGORPNG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGORPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPGORPNG && isLt2M;
    },
    deleteRow(index, rows) {
      this.$message({
        showClose: true,
        message: "成功删除一条记录",
        type: "error"
      });
      rows.splice(index, 1);
    },
    open2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            showClose: true,
            message: "成功添加一条信息",
            type: "success"
          });
          let obj = {};
          obj.experience = this.ruleForm.experience;
          this.userInfo.experience.push(obj);
          this.ruleForm.experience = "";
        } else {
          this.$message({
            showClose: true,
            message: "添加失败",
            type: "error"
          });
        }
      });
    },
    save(formName) {
      // this.$refs[formName].resetFields();
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("addUserInfo", {
            userInfo: this.userInfo,
            fun: this.alertSuccess
          });
        } else {
          this.$message({
            showClose: true,
            message: "error submit!!",
            type: "error"
          });
          return false;
        }
      });
    },
    alertSuccess(flag) {
      if (flag) {
        this.$message({
          showClose: true,
          message: "保存成功",
          type: "success"
        });
      } else {
        this.$message({
          showClose: true,
          message: "保存失败",
          type: "error"
        });
      }
    }
  }
};
</script>



<style lang="less" scoped>
#image {
  margin: 20px;
}
#avatar-uploader {
  width: 180px;
  height: 180px;
  border: 1px dashed skyblue;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  // background-image: url(./images/touxiang.jpg);
  background-size: 100% 100%;
  opacity: 0.7;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed skyblue;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.bottom {
  clear: both;
  text-align: center;
}
.item {
  margin: 10px;
}
</style>