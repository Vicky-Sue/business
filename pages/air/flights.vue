<template>
  <div class="flights">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤部分 -->
        <div class="filters"></div>

        <!-- 航班头部部分 -->
        <FlightsHead/>

        <!-- 航班列表部分 -->
        <FlightsLists v-for='(item,index) in flightsData.flights' 
        :key='index'
        :ticketsdata='item'
        />

        <!-- 分页部分 -->
        <!-- <FlightsPagination/> -->
      </div>

        <!-- 航班搜索记录侧栏部分 -->
        <div class="aside">侧栏部分</div>
    </el-row>
  </div>
</template>

<script>
import FlightsHead from "@/components/air/flightsHead";
import FlightsLists from "@/components/air/flightsList";
export default {
  // 注册组件
  components: {
    FlightsHead,
    FlightsLists
  },
  data(){
    return{
      // 机票总数据
      flightsData:[],
      // 机票总条数：
      total:0,
    }
  },
  mounted(){
    this.$axios({
      url:'/airs',
      params:this.$route.query
    }).then((res)=>{
      console.log(res,'机票列表的res')
      // 总数据
      this.flightsData= res.data;
      // 总条数
      this.totol=res.data.flights.length;
    })
  }
  
};
</script>

<style scoped lang="less">
.flights {
  width: 1000px;
  margin: 20px auto;

  .flights-content {
    width: 745px;
    font-size: 14px;
  }

  .aside {
    width: 240px;
  }
}
</style>
