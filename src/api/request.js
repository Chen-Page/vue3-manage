// 封装axios

import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '网络请求异常，请稍后重试'

const service = axios.create({
    baseURL: config.baseApi
})

// 拦截请求
// 用于自定义header
// jwt-token认证的时候
service.interceptors.request.use(function (req) {
    return req
}, function (error) {
    console.log('请求出错', error);
    return Promise.reject(error)
})

// 拦截响应
service.interceptors.response.use(function (res) {
    const {
        code,
        data,
        msg
    } = res.data
    if (code == 200) {
        return data
    } else  {
        // 网络请求错误
        console.log(res)
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
}, function (error) {
    console.log('获取数据出错', error);
    return Promise.reject(error)
})

// 封装的核心函数
function request (options) {
    // 使用时
    // request({
    //     method: 'get',
    //     data: {

    //     },
    //     mock: true
    // })
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        // get方法需要将data转换为params
        options.params = options.data
    }
    // 对mock的处理
    let isMock = config.mock // mock总开关
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock // 单接口是否mock
    }
    // 对线上环境处理
    if (config.env == 'prod') {
        // 线上环境关闭mock使用，防止错误
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}


export default request