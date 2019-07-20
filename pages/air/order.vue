<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderInfo @orderData='orderData' class="main"/>

            <!-- 侧边栏 -->
            <OrderAside :data='orderInfos' class="aside"/>
                          
        </el-row>
    </div>
</template>

<script>
import OrderInfo from '@/components/air/orderInfo'
import OrderAside from '@/components/air/orderAside'
export default {
    components:{
        OrderInfo,
        OrderAside
    },
    data(){
        return{
            orderInfos:{
                seat_infos:{}
            }
        }
    },
    methods:{
        orderData(data){
            this.orderInfos=data;
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>