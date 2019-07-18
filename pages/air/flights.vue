<template>
  <div class="flights">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤部分 -->
        <div class="filters"></div>

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
  data() {
    return {
      // 机票总数据
      flightsData: [],
      // 机票总条数：
      total: 0,
      currentPage: 1,
      pageSize: 2,
      //负责渲染页面的航班列表数据
      pageData: []
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    // 获取所有航班数据
    getLists() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res, "机票列表的res");
        // 总数据
        this.flightsData = res.data;
        // 总条数
        this.total = res.data.flights.length;
        this.setPage();
      });
    },
    // 封装根据页数，条数变化提供数据的方法
    setPage() {
      this.pageData = this.flightsData.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },

    // 每页展示条数的改变
    handleSizeChange(value) {
      console.log(value, "每页展示条数的改变");
      this.pageSize = value;
      this.currentPage=1;
      this.setPage();
    },
    // 当前页的改变
    handleCurrentChange(value) {
      console.log(value, "当前页的改变");
      this.currentPage = value;
      this.setPage();
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
