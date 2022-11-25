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
    }
}