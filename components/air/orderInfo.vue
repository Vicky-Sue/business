<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in orderParams.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input
              v-model="orderParams.users[index].username"
              placeholder="姓名"
              class="input-with-select"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input v-model="orderParams.users[index].id" placeholder="证件号码" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div v-for="(item,index) in infoData.insurances" :key="index" class="insurance-item">
          <el-checkbox
            @change="handleInsurance(item)"
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}万`"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="orderParams.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="orderParams.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model='orderParams.captcha'></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 把总价格从store里面拿出来，存在隐藏域里面,computed属性要调用才会发生相应的变化-->
    <input type="hidden" :value="sumPrice" />
  </div>
</template>

<script>
import { fn } from "moment";
export default {
  data() {
    return {
      // 提交机票需要提供的数据
      orderParams: {
        users: [{ username: "", id: "" }], //用户集合
        insurances: [], //保险集合
        contactName: "", //联系人名字
        contactPhone: "", //联系人电话
        captcha: "",            // 验证码 （注意下接口文档没有说明）
        invoice: false, //是否需要发票，默认为false
        seat_xid: "", //作为id（来自于参数
        air: "" //航班id（来自于参数）
      },
      //   机票信息数据
      infoData: {
        insurances: [],
        seat_infos: {}
      }
    };
  },
  computed: {
    sumPrice() {
      let price = 0;
      // 基建燃油费
      price += this.infoData.seat_infos.org_settle_price;
      // 机票单价
      price += this.infoData.airport_tax_audlet;
      // 保险
      price += this.orderParams.insurances.length*30
      // 人数
      price *= this.orderParams.users.length
      this.$store.commit('air/setAllPrice',price)
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.orderParams.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.orderParams.users.splice(index, 1);
    },
    // 选择保险
    handleInsurance(insurance) {
      // 判断该数组中是否已经存在该id
      const index = this.orderParams.insurances.indexOf(insurance.id);
      console.log(insurance.id, "insurance.id");
      console.log(index, "index");
      if (index > -1) {
        //如果存在就删除
        this.orderParams.insurances.splice(index, 1);
      } else {
        this.orderParams.insurances.push(insurance.id);
      }
      console.log(this.orderParams.insurances, "-------this.insurances");
    },
    // 发送手机验证码
    handleSendCaptcha() {
      this.$store
        .dispatch("user/getCaptchas", this.orderParams.contactPhone)
        .then(code => {
          this.captcha=code;
          this.$alert(`手机验证码是：${code}`, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        });
      // console.log(this.orderParams.contactPhone,'----this.orderParams.contactPhone')
    },

    // 提交订单
    handleSubmit() {
      // 判断状态的对象
      console.log(this.orderParams,'-------------this.orderParams')
      console.log(this.orderParams.users[0].username,'this.orderParams.users[0].username')
      const rulesb={
        users:{
          value:this.orderParams.users[0].username && this.orderParams.users[0].id,
          message:'乘机人不能为空'
        },
        contactName:{
          value:this.orderParams.contactName,
          message:'请输入联系人'
        },
        contactPhone:{
          value:this.orderParams.contactPhone,
          message:'请输入手机号'
        },
        captcha:{
          value:this.orderParams.captcha,
          message:'请输入验证码'
        },
      };
      // 开关作用-发现非填的选项立即组织
      let valid = true;
      Object.keys(rulesb).forEach( e => {
        if(!rulesb[e].value){
          valid = false;
          this.$message.warning(rulesb[e].message)
        }
        // if(!valid) return;
      });
      this.$axios({
        url:'/airorders',
        method:'POST',
        data:this.orderParams,
        headers:{
          // token规范来自于JWT
          Authorization:`Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res=>{
        console.log(res,'提交订单的res')
        this.$message.success('提交订单成功')
      })
    }
  },
  mounted() {
    //   订单详情
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      console.log(res, "选择机票，跳转到订单详情页携带的res");
      this.infoData = res.data;
      this.$emit("orderData", this.infoData);
      console.log(this.infoData, "this.infoData");
    });
    this.orderParams.seat_xid = this.$route.query.seat_xid;
    this.orderParams.air = this.$route.query.id;
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>