<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/userHeader.png" />
                    <div class="userInfo">
                        <p class="name">
                            Admin
                        </p>
                        <div class="role">
                            超级管理员
                        </div>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2022-7-11</span></p>
                    <p>上次登录地点：<span>北京</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" class="history">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="count">
                <el-card v-for="item in countData" :body-style="{ padding: 0, display: 'flex' }" :key="item.name">
                    <component class="icons" :is="item.icon" :style="{ backgroundColor: item.color }"></component>
                    <div class="detail">
                        <p class="num">
                            ￥{{ item.value }}
                        </p>
                        <p class="text">
                            {{ item.name }}
                        </p>
                    </div>
                </el-card>
            </div>
            <div>
                <el-card style="height: 280px">
                    <div ref="echarts1" style="height: 280px"></div>
                </el-card>
            </div>
            <div class="graph">
                <el-card style="height: 260px">
                    <div ref="echarts2" style="height: 240px"></div>
                </el-card>
                <el-card style="height: 260px">
                    <div ref="echarts3" style="height: 240px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
// import axios from 'axios'
const { proxy } = getCurrentInstance()


let tableData = ref([])
let countData = ref([])
let tableLabel = {
    name: '课程',
    todayBuy: '今日购买',
    monthBuy: '本月购买',
    totalBuy: '总购买'
}
const getTableList = async () => {
    // 本地mock
    // await axios.get('/home/getData').then((res) => {
    //     console.log(res);
    //     tableData.value = res.data.data.tableData
    // })
    // 远程mock
    // await axios.get('http://129.204.116.48:3000/mock/52fa1b6b0d82f201dd7e3609ffd86fcb/api/home/getTableData').then((res) => {
    //     console.log(res);
    //     if (res.data.code == 200) {
    //         tableData.value = res.data.data.tableData
    //     }
    // })
    // 调用封装后的api
    let res = await proxy.$api.getTableData()
    console.log('获取到的表格数据', res)
    tableData.value = res.tableData
}
const getCountData = async () => {
    let res = await proxy.$api.getCountData()
    console.log('获取统计数据', res)
    countData.value = res
}

// 图表默认配置
let xOptions = reactive({
    legend: {
        textStyle: {
            color: '#333'
        }
    },
    grid: {
        left: '20%'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: [],
        axisLine: {
            lineStyle: {
                color: '#17b3a3'
            }
        },
        axisLabel: {
            interval: 0,
            color: '#333'
        }
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: "#17b3a3"
            }
        }
    },
    color: ['#2ec7c9', '#b6a2de', '#ffb980', '#d87a80', '#8d98b3'],
    series: []
})
let pieOptions = reactive({
    tooltip: {
        trigger: 'item'
    },
    color: [
        '#0f78f4',
        '#dd536b',
        '#9462e5',
        '#a6a6a6',
        '#e1bb22',
        '#39c362',
        '#3ed1cf',
    ],
    series: []
})
let orderData = reactive({
    xData: [],
    series: [],
})
let userData = reactive({
    xData: [],
    series: [],
})

let videoData = reactive({
    series: []
})

const getChartData = async () => {
    let res = await proxy.$api.getChartData()
    console.log('获取图表数据', res)
    // countData.value = res
    const videoRes = res.videoData
    const userRes = res.userData
    const orderRes = res.orderData
    orderData.xData = orderRes.date
    const keyArray = Object.keys(orderRes.data[0])
    const series = []
    keyArray.forEach((key) => {
        series.push({
            name: key,
            data: orderRes.data.map((item) => {
                return item[key]
            }),
            type: 'line'
        })
    })
    orderData.series = series
    xOptions.xAxis.data = orderData.xData
    xOptions.series = orderData.series
    let hEcharts = echarts.init(proxy.$refs['echarts1'])
    hEcharts.setOption(xOptions)
    userData.xData = userRes.map((item) => {
        return item.date
    })
    userData.series = [
        {
            name: '新增用户',
            data: userRes.map((item) => {
                return item.new
            }),
            type: 'bar'
        },
        {
            name: '活跃用户',
            data: userRes.map((item) => {
                return item.active
            }),
            type: 'bar'
        }
    ]
    xOptions.xAxis.data = userData.xData
    xOptions.series = userData.series
    let echarts2 = echarts.init(proxy.$refs['echarts2'])
    echarts2.setOption(xOptions)
    videoData.series = [
        {
            data: videoRes,
            type: 'pie'
        }
    ]
    pieOptions.series = videoData.series
    let echarts3 = echarts.init(proxy.$refs['echarts3'])
    echarts3.setOption(pieOptions)
}
onMounted(() => {
    console.log('页面mounted')
    getTableList()
    getCountData()
    getChartData()
})
</script>
<style lang="less" scoped>
.home {
    margin-top: 20px;

    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 70px;
            }
        }
    }

    .history {
        margin-top: 20px;
    }

    .count {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;

            .icons {
                width: 80px;
                height: 80px;
                line-height: 80px;
                color: #fff;
                text-align: center;
            }

            .detail {
                margin-left: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;

                .num {
                    font-size: 30px;
                    margin-bottom: 10px;
                }

                .text {
                    font-size: 14px;
                    color: #999;
                }
            }
        }
    }

    .graph {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .el-card {
            width: 48%;
        }
    }
}
</style>