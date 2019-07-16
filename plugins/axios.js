// Message = this.$messasge
import { Message } from "element-ui";

// axios拦截器
// 第一个参数是nuxt对象
export default ({ $axios }) => {

    // 拦截axios的错误请求
    $axios.onError(err => {
        console.log(err,'拦截器的res')
        console.log(err.response,'拦截器的response')
        const { message, statusCode } = err.response.data;

        if (statusCode === 400) {
            // 错误提示
            Message.error('用户名或者密码错误，请重试');
        }
    })

}