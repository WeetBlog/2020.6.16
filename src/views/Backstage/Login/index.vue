<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :span="8" :offset="7">
        <h1>博客后台管理</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="博主名称" prop="pass">
            <el-input
              icon="el-icon-user-solid"
              type="text"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="登入密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>



<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ required: true, message: "请输入博主名称", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.pass === this.userInfo.name) {
            if (this.ruleForm.checkPass === this.userInfo.password) {
              this.$message({
                showClose: true,
                message: "登入成功",
                type: "success"
              });
              window.localStorage.setItem('userName',this.ruleForm.pass)
              this.$router.push('/tiantian/userinfo')
            } else {
              this.$message({
                showClose: true,
                message: "密码错误",
                type: "error"
              });
            }
          } else {
            this.$message({
              showClose: true,
              message: "博主名不存在",
              type: "error"
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "登入信息不完整",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>



<style scoped>
.login {
  height: 500px;
  background-image: linear-gradient(#fff, #ccc, #ccc, #fff);
}
.login h1 {
  text-align: center;
  margin: 150px 0 30px;
  font-family: sweet2;
  font-size: 30px;
}
</style>