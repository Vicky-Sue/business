<template>
  <div class="container">
    <el-row justify="space-between" type="flex" class="main">
      <!-- logo部分 -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 导航部分 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录部分 -->
      <div class="user">
        <div v-if="false">
          <nuxt-link to="/user/login"></nuxt-link>
        </div>
        <div class='login'>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
              perfect程序优化
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="info">
          <i class="el-icon-bell"></i>消息</div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
};
</script>

<style scoped lang="less">
.container {
  height: 60px;
  box-shadow: 0 5px 3px blueviolet;
}

.main {
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
}
.logo {
    img{
     height:60px   
    }
}
.navs {
  flex: 1;
  a{
      display:block;
      padding: 0 20px;
      height: 60px;
      box-sizing:border-box;
      &:hover{
          color:#3f9ffe;
          border-bottom: 5px solid #3f9ffe;
      }
  }

  .nuxt-link-exact-active{
      background-color: #3f9ffe;
      color:#fff;
      &:hover{
          color:#fff;
      }
  }
}
.user {
    .info{
        float:right;
        margin-right:10px;
    }
    .login{
        float:right;
        img{
            width:36px;
            height:36px;
            vertical-align: middle;
        }
    }
}
</style>
