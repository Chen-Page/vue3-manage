/**
 * 环境配置文件
 * 开发环境、测试环境、线上环境
 */

// 当前环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'http://129.204.116.48:3000/mock/52fa1b6b0d82f201dd7e3609ffd86fcb/api',
    },
    // 测试环境
    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'http://129.204.116.48:3000/mock/52fa1b6b0d82f201dd7e3609ffd86fcb/api',
    },
    // 开发环境
    prod: {
        baseApi: '//future.com/api',
        mockApi: 'http://129.204.116.48:3000/mock/52fa1b6b0d82f201dd7e3609ffd86fcb/api',
    }
}

export default {
    env,
    // mock的总开关
    mock: true,
    ...EnvConfig[env]
}