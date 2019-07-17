<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions: 远程获取建议，输入框的值发生改变时候触发 -->
        <!-- select: 选中下拉框的选项时候触发 -->
        <el-autocomplete
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          v-model="ticketForm.departCity"
          :fetch-suggestions="depQuerySearch"
          @select="depHandleSelect"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          v-model="ticketForm.destCity"
          :fetch-suggestions="desQuerySearch"
          @select="desHandleSelect"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          v-model="ticketForm.departDate"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label>
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click.native="handleSearchSubmit"
        >搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment, { fn } from "moment";

export default {
  data() {
    return {
      // 搜索表单
      ticketForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    //获取出发城市的数据
    // 出发城市输入值发生改变的时候触发
    // value: 输入框的值
    // cb： 回调函数，这个回调函数是必须要调用的
    // cb函数必须要接收一个数组，数组中每一项必须是对象, 对象中必须要有value属性
    // 封装搜索城市关键词的函数
    queryStringSearch(queryString) {
      //没有输入值的时候不出现下拉框
      return new Promise((resolve, reject) => {
        if (!queryString) {
          resolve([]);
          return;
        }
        //   请求推荐城市列表
        this.$axios({
          url: "/airs/city",
          params: { name: queryString }
        }).then(res => {
          console.log(res, "获取城市数据的res");
          // 推荐列表的数组
          const { data } = res.data;
          // 给数组中的对象添加value
          const newData = data.map(v => {
            v.value = v.name.replace("市", "");
            return v;
          });
          //设置默认选中第一个
          // this.ticketForm.departCity = newData[0].value;
          // this.ticketForm.departCode = newData[0].sort;
          // 调用 callback 返回建议列表的数据
          resolve(newData);
        });
      });
    },
    //获取出发城市的数据
    async depQuerySearch(value, cb) {
      const res = await this.queryStringSearch(value)
        if (res.length > 0) {
          this.ticketForm.departCity = res[0].value;
          this.ticketForm.departCode = res[0].sort;
        }
        cb(res);
    },
    //获取到达城市的数据
    async desQuerySearch(value, cb) {
      const res= await this.queryStringSearch(value)
        if(res.length>0){
          this.ticketForm.destCity = res[0].value;
        this.ticketForm.destCode = res[0].sort;
        }
        cb(res);  
    },
    // 下拉选中出发城市时触发
    depHandleSelect(item) {
      // 赋值给form里面的对象
      console.log(item, "选中出发城市的item");
      this.ticketForm.departCity = item.value;
      this.ticketForm.departCode = item.sort;
    },
    // 选中目的城市
    desHandleSelect(item) {
      console.log(item, "选中目的城市的item");
      this.ticketForm.destCity = item.value;
      this.ticketForm.destCode = item.sort;
    },
    // 选中出发日期时触发
    handleDate(value) {
      console.log("value；", value);
      this.ticketForm.departDate = moment(value).format("YYYY-MM-DD");
    },
    // 出发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.ticketForm;

      this.ticketForm.departCity = destCity;
      this.ticketForm.departCode = destCode;

      this.ticketForm.destCity = departCity;
      this.ticketForm.destCode = departCode;
    },
    // 提交搜索表单数据
    handleSearchSubmit() {
      console.log(this.ticketForm, "提交搜索表单的数据ticketForm");
      // 验证方式
      const rules = {
        departCity: {
          value: this.ticketForm.departCity,
          message: "请选择出发城市"
        },
        destCity: {
          value: this.ticketForm.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.ticketForm.departDate,
          message: "请选择出发日期"
        }
      };
      rules.departCity.value = rules["departCity"]["value"];
      // 开关作用，判断验证是否通过
      let valid = true;
      // 循环判断上面的字段是否为空
      Object.keys(rules).forEach((v, index) => {
        // 判断只要有一次是空，不会在执行循环
        if (!valid) return;

        // 判断字段的值为空
        if (!rules[v].value) {
          valid = false;
          this.$message.warning(rules[v].message);
        }
      });
      //   跳转
      if (valid) {
        this.$router.push({
          path: "/air/flights",
          query: this.ticketForm
        });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
