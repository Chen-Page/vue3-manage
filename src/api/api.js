/**
 * 整个项目api的管理
 */
import request from './request'

export default {
    // home组件 左侧表格数据
    getTableData (params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getCountData (params) {
        return request({
            url: '/home/getCountData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getChartData (params) {
        return request({
            url: '/home/getChartData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    // 本地mock时，mock标识设为false，防止使用远程内容
    getUserData (params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            data: params,
            mock: false
        })
    },
    addUser (data) {
        return request({
            url: '/user/addUser',
            method: 'post',
            data: data,
            mock: false
        })
    },
    editUser (data) {
        return request({
            url: '/user/editUser',
            method: 'post',
            data: data,
            mock: false
        })
    },
    deleteUser (data) {
        return request({
            url: '/user/deleteUser',
            method: 'post',
            data: data,
            mock: false
        })
    },
    getMenu (data) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            data: data,
            mock: false
        })
    }
}