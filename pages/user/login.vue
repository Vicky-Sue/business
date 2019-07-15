<template>
  <div class="container">
    <el-row type="flex" class="main" justify="center" align="middle">
      <div class="form-wrapper">
          <!-- 表单头部 -->
        <el-row type='flex' class="tabs">
          <span 
          v-for='(item,index) in ["登录","注册"]' :key='index'
          @click='handleClick(index)'
          :class="{active: current===index}"
          >
          {{item}}
          </span>
        </el-row>

        <!-- 登录功能组件 -->
        <Loginform v-if='current===0'/> 
        <!-- 注册功能组件 -->
        <Registerform v-if='current===1'/>   
      </div>
    </el-row>
  </div>
</template>

<script>
import Loginform from '@/components/user/loginform'
import Registerform from '@/components/user/registerform'
export default {
    // 注册组件
    components:{
    Loginform,
    Registerform,
    },
    data(){
        return{
            // 当前索引
            current:0,
        }
    },
    methods:{
        handleClick(index){
            this.current=index;
        }
    }
    
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  height: 700px;
  background: url(http://127.0.0.1:1337/assets/images/th03.jfif) center 0;
  .main {
    width: 1000px;
    height: 100%;

    margin: 0 auto;
    .form-wrapper {
      width: 402px;
      margin: 0 auto;
      //   position: absolute;
      overflow: hidden;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      .tabs {
        span {
          box-sizing: border-box;
          display: block;
          height: 50px;
          width: 50%;
          font-size: 16px;
          line-height: 48px;
          color: #666;
          cursor: pointer;
          text-align: center;
          background: #eee;
          border-top: 2px #eee solid;

          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
