import { mapState, mapMutations } from "vuex";
// nuxt已经把store（vuex）关联到应用，只需要维护各个模块，
// 每个模块下面通常需要暴露三个属性

// state: 存数据
export const state = () => {
  return {
    userInfo: {
      token: '',
      user: {}
    }
  }
}

// mutations：同步设置修改state的数据
export const mutations = {
  // 设置用户的数据
  setUserInfo(state, data) {
    state.userInfo = data;
  }
}

// actions: 异步设置修改state的数据
export const actions = {
  // 负责登录的请求
  // 第一个参数是store对象
  // 第二个参数
  login({ commit }, data) {
    // 登录的接口
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data,
    }).then(res => {
      // 把数据保存到vuex,user是模块名字（命名空间）
      commit('setUserInfo', res.data)
    })
  }
}