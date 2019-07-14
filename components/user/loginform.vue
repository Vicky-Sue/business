<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      style="width:350px;"
      class="demo-ruleForm"
    >
      <el-form-item prop="nickname">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
        <el-link type="primary" class='forgetPassword'>忘记密码</el-link>
      <el-button type="primary" style="width:350px;">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        nickname: "",
        password: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style scoped lang="less">
.login{
    margin:20px 25px;
    /deep/.forgetPassword{
        height:20px;
        font-size:14px;
        line-height: 20px;
        color:blue;
        float:right;
    }
}
</style>
