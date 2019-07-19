<template>
  <div class="flight-item">
    <div @click="isShow=!isShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ticketsdata.airline_name}}</span>
          {{ticketsdata.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{ticketsdata.dep_time}}</strong>
              <span>{{ticketsdata.org_airport_name}}{{ticketsdata.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ticketsdata.arr_time}}</strong>
              <span>{{ticketsdata.dst_airport_name}}{{ticketsdata.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{ticketsdata.base_price/2}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-show="isShow">
      <!-- 隐藏的座位信息列表 -->
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        v-for="(seatinfo,index) in ticketsdata.seat_infos"
        :key="index"
      >
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>{{seatinfo.group_name}}</span>
              | {{seatinfo.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{seatinfo.par_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click='handleSelectSeat(ticketsdata.id,seatinfo.seat_xid)'>选定</el-button>
              <p>剩余：{{seatinfo.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 用对象的方式便于维护
  props: {
    // 数据
    ticketsdata: {
      type: Object,
      // 默认是空对象
      default: {}
    }
  },
  // 计算时间-事件
  computed: {
    rankTime() {
      let start = this.ticketsdata.dep_time.split(":");
      let end = this.ticketsdata.arr_time.split(":");
      if (end < start) {
        end[0] = +end[0] + 24;
      }

      const rank = end[0] * 60 + +end[1] - (start[0] * 60 + +start[1]);
      const hour = Math.floor(rank / 60);
      const min = rank % 60;
      // console.log(start, "start");
      // console.log(end, "end");
      // console.log(rank, "rank");
      return `${hour}小时${min}分钟`;
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    // 选定座位信息
    handleSelectSeat(id,seat_xid){
      this.$router.push({
        path:'/air/order',
        query:{id,seat_xid}
      })
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>