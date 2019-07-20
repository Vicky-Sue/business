export const state=()=>{
    return{
        // 机票的总价格
        allPrice:0
    }
}

export const mutations={
    // 设置总价格
    setAllPrice(state,price){
        state.allPrice=price;
    }

}