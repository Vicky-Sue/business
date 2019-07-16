<template>
  <div class="container">
    <!-- 背景图片 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banImg"
          :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat`"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span v-for="(item,index) in cateData" :key="index" :class="{active:current===index}">
            <i @click="handleClick(index)">{{item.title}}</i>
          </span>
        </el-row>
        <!-- 输入框 -->
        <div class="search-input">
          <input type="text" :placeholder="cateData[current].placeholder" />
          <i class="el-icon-search"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图
      banners: [],
      //当前的显示索引
      current: 0,
      // 三大页面数据
      cateData: [
        { title: "攻略", placeholder: "搜索城市" },
        { title: "酒店", placeholder: "请输入城市搜索酒店" },
        { title: "机票", placeholder: "" }
      ]
    };
  },
  methods: {
    // 切换tab栏时触发
    handleClick(index) {
      this.current = index;
      if (index === 2) {
        this.$router.push("/air");
      }
    }
  },
  // 首页轮播图加载
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(this,'首页轮播图里this的指向')
      // console.log(res,'首页轮播图res')
      // console.log(res.data,'首页轮播图data')
      if (res.status === 200) {
        // 方法一：
        // var banner=this.banners=res.data.data;
        // console.log(banner,'数据库返回的轮播图')
        // 方法二：解构对象data:data键值一致就可以简写data
        const { data } = res.data;
        this.banners = data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  /deep/.el-carousel__container {
    height: 700px;
  }
  .banImg {
    width: 100%;
    height: 100%;
    background-size: contain contain;
  }
  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    top: 45%;
    left: 45%;
    margin-left: -500px;
    // border: 2px solid greenyellow;
    .search-bar {
      width: 556px;
      margin: 0 auto;
      .search-tab {
        .active {
          i {
            color: black;
          }
          &:after {
            background-color: #eee;
          }
        }
        span {
          display: block;
          width: 90px;
          height: 36px;
          position: relative;
          margin-right: 8px;
          cursor: pointer;
          i {
            // z-index要配合定位才有效
            position: absolute;
            z-index: 999;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 30px;
            text-align: center;
            color: #fff;
          }
          &:after {
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            content: "";
            width: 100%;
            height: 100%;
            border: 1px rgba(255, 255, 255, 0.2) solid;
            border-bottom: none;
            transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
            transform-origin: bottom left;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 1px 2px 0 0;
            box-sizing: border-box;
          }
        }
      }
    }
    .search-input {
      width: 556px;
      height: 46px;
      background-color: #fff;
      border-radius: 4px;
      input {
        border-radius: 4px;
        padding: 13px 0px 13px 15px;
        width: 488px;
        height: 20px;
        border: none;
        outline: none;
        font-size: 16px;
      }
      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
