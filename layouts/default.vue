<template>
  <div>
    <!-- 头部组件 -->
    <Header />
    <!-- 相当于router-view, 是一个页面组件的占位符 -->
    <nuxt />
    <!-- 页脚组件 -->
    <Footer />
  </div>
</template>

<script>
import header from '@/components/header'
import footer from '@/components/footer'
export default {
  components:{
    Header: header,
    Footer: footer
  }
}
</script>


<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

/* 把所有的标签自带的margin与padding设置为0  */
*{
  margin: 0;
  padding:0;
}
/* 列表去除列表样式 */
ul, li , ol{
  list-style: none;
}
/* a标签颜色改为继承，去掉修饰线 */
a{
  color: inherit;
  text-decoration: none;
}
/* 斜体-正常样式 */
em,i {
  font-style: normal;
}
</style>
