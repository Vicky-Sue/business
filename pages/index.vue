<template>
  <div class="container">
      <!-- 背景图片 -->
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <div class='banImg'
            :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat`">
          </div>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  data(){
    return {
      // 轮播图
      banners:[]
    }
  },
  // 首页轮播图加载
  mounted(){
    this.$axios({
      url:'/scenics/banners',
    }).then(res=>{
      // console.log(this,'首页轮播图里this的指向')
      // console.log(res,'首页轮播图res')
      // console.log(res.data,'首页轮播图data')
      if(res.status ===200){
        // 方法一：
        // var banner=this.banners=res.data.data;
        // console.log(banner,'数据库返回的轮播图')
        // 方法二：解构对象data:data键值一致就可以简写data
        const {data} =res.data;
        this.banners=data;
      }
    })
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  /deep/.el-carousel__container{
    height:700px;
  }
  .banImg {
    width:100%;
    height:100%;
    background-size:contain contain;
  }
}
</style>
