<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      style="width:350px;"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <nuxt-link to="/" type="primary" class="forgetPassword">忘记密码</nuxt-link>
      <el-button type="primary" style="width:350px;" @click.native="handleLoginSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    //   登录
    handleLoginSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "POST",
          //   data:this.loginForm
          // }).then(res => {
          //   console.log(res, "登录的res");
          //   if(res.status===200){
          //       // 把数据保存到vuex,user是模块名字（命名空间）
          //       this.$store.commit('user/setUserInfo',res.data)
          //       console.log(this.$store,'$store里面的值');
          //       this.$message.success('登录成功！')
          //       this.$router.back();
          //   }
          // });
          this.$store.dispatch('user/login',this.loginForm).then(res=>{
            // 成功提示
            console.log(res,'登录成功的res')
            this.$message({
              message:'登录成功，正在跳转',
              type:'success'
            });
            // 跳转到首页
            setTimeout(()=>{
              this.$router.replace('/')
            },1500)
          })
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.login {
  margin: 20px 25px;
  /deep/.forgetPassword {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    color: blue;
    float: right;
    cursor: pointer;
    margin-bottom: 10px;
  }
}
</style>
