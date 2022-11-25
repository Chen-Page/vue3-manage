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
        <el-col :span="16"></el-col>
    </el-row>
</template>
<script setup>
let tableData = [
    {
        "name": "小米",
        "todayBuy": 395,
        "monthBuy": 1031,
        "totalBuy": 4786
    },
    {
        "name": "苹果",
        "todayBuy": 321,
        "monthBuy": 826,
        "totalBuy": 3719
    },
    {
        "name": "三星",
        "todayBuy": 183,
        "monthBuy": 696,
        "totalBuy": 9945
    },
    {
        "name": "oppo",
        "todayBuy": 487,
        "monthBuy": 735,
        "totalBuy": 2978
    },
    {
        "name": "华为",
        "todayBuy": 345,
        "monthBuy": 1445,
        "totalBuy": 4361
    },
    {
        "name": "魅族",
        "todayBuy": 352,
        "monthBuy": 504,
        "totalBuy": 2801
    }
]
let tableLabel = {
    name: '课程',
    todayBuy: '今日购买',
    monthBuy: '本月购买',
    totalBuy: '总购买'
}
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
}
</style>