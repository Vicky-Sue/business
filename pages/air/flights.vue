<template>
  <div class="flights">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤部分 -->
        <FlightsFilter :data='casheFlightsData' @changeFlights='changeFlights'/>

        <!-- 航班头部部分 -->
        <FlightsHead />

        <!-- 航班列表部分 -->
        <FlightsLists v-for="(item,index) in pageData" :key="index" :ticketsdata="item" />

        <!-- 分页部分 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 4, 6, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 航班搜索记录侧栏部分 -->
      <FlightsAside />
    </el-row>
  </div>
</template>

<script>
import FlightsHead from "@/components/air/flightsHead";
import FlightsAside from "@/components/air/flightAside";
import FlightsLists from "@/components/air/flightsList";
import FlightsFilter from "@/components/air/flightsFilter";
import _ from 'lodash'
export default {
  // 注册组件
  components: {
    FlightsHead,
    FlightsLists,
    FlightsFilter,
    FlightsAside
  },
  data() {
    return {
      // 机票总数据
      flightsData: {
        flights:[],
        info:{},
        options:{},
      },
      // 不会被改变的数据
      // 机票总条数：
      total: 0,
      currentPage: 1,
      pageSize: 2,
      //用于缓存大数据，一旦赋值之后不能被修改
      casheFlightsData:{
        flights:[],
        info:{},
        options:{},
      }
      
    };
  },
  // 计算属性-监听任意数据的变化
  // 监听和计算, 监听函数内部引用实例属性的变化，
  // 只要有一个属性发生了变化，函数会重新计算并且返回新的值
  computed: {
    pageData() {
      return this.flightsData.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  // // 当前url参数发生变化时候会触发
  // 先执行next()再调用函数
  beforeRouteUpdate (to, from, next) {
    next();    
    this.getLists();
  },
  mounted() {
    this.getLists();
  },
  methods: {
    // 传递过滤参数
    changeFlights(arr){
      this.flightsData.flights=arr;
      if(arr.length===0){
       this.$message.warning('该时间段无航班，请选择其他时间段！')
      }
    },
    // 获取所有航班数据
    getLists() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res, "机票列表的res");
        // 总数据
        this.flightsData = res.data;
        // 备份大数据，一旦赋值之后不能被修改
        this.casheFlightsData=_.cloneDeep(res.data);
        // 总条数
        this.total = res.data.flights.length;
      
      });
    },
    // 封装根据页数，条数变化提供数据的方法
    // setPage() {
    //   this.pageData = this.flightsData.flights.slice(
    //     (this.currentPage - 1) * this.pageSize,
    //     this.currentPage * this.pageSize
    //   );
    // },

    // 每页展示条数的改变
    handleSizeChange(value) {
      console.log(value, "每页展示条数的改变");
      this.pageSize = value;
      // 重新回到第一页
      this.currentPage = 1;
    },
    // 当前页的改变
    handleCurrentChange(value) {
      console.log(value, "当前页的改变");
      this.currentPage = value;
    }
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
