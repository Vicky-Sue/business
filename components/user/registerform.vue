<template>
  <div class="register">
    <el-form
      :model="regisForm"
      :rules="rules"
      ref="regisForm"
      style="width:350px;"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input v-model="regisForm.username" placeholder="用户名手机号"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="regisForm.captcha" placeholder="验证码">
          <template slot="append">
            <el-button @click.native="handleCaptchaSend">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="regisForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="regisForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input v-model="regisForm.checkPassword" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:350px;" @click.native="handleRegisSubmit">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 确认密码
    // rule：当前的规则
    // value: 输入框的值
    // callback：回调函数，必须要调用的
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regisForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      regisForm: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPassword: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //   发送验证码
    handleCaptchaSend() {
      if (!this.regisForm.username) {
        this.$confirm("手机号不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (this.regisForm.username.length !== 11) {
        this.$confirm("手机号码格式不正确", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 验证码接口
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.regisForm.username }
      }).then(res => {
        console.log(res, "验证发送的res");
        const { code } = res.data;
        this.$confirm(`手机验证码为${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    //   提交注册
    handleRegisSubmit() {
      this.$refs.regisForm.validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.regisForm;
          this.$store.dispatch('user/register',props).then(res => {
            console.log(res, "提交注册的res");
            // 把数据保存到vuex,user是模块名字（命名空间）
            this.$message.success('恭喜！注册成功！')
            this.$router.back();
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  margin: 20px 25px;
}
</style>
