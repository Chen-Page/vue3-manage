<template>
    <el-aside>
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
            :collapse="$store.state.isCollapse" @open="handleOpen" @close="handleClose" :collapse-transition="false">
            <h3 v-show="!$store.state.isCollapse">
                后台管理
            </h3>
            <h3 v-show="$store.state.isCollapse">
                后台
            </h3>
            <el-menu-item v-for="(item) in noChildren()" :index="item.path" :key="item.path" @click="clickMenu(item)">
                <!-- <el-icon>
                    <icon-menu />
                </el-icon> -->
                <!-- 动态引入icon -->
                <component class="icons" :is="item.icon"></component>
                <span>
                    {{ item.label }}
                </span>
            </el-menu-item>
            <el-sub-menu v-for="(item) in hasChildren()" :index="item.label" :key="item.label">
                <template #title>
                    <!-- <el-icon>
                        <location />
                    </el-icon> -->
                    <!-- 动态引入icon -->
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(subItem) in item.children" :index="subItem.path" :key="subItem.path"
                        @click="clickMenu(subItem)">
                        {{ subItem.label }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const list = [
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'HomeFilled',
        url: 'Home.vue'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'Mall.vue',
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/user',
        name: 'User',
        label: '用户管理',
        icon: 'user',
        url: 'User.vue'
    },
    {
        label: '其他',
        icon: 'location',
        children: [
            {
                path: '/page1',
                name: 'page1',
                label: '页面一',
                icon: 'setting',
                url: 'PageOne.vue'
            },
            {
                path: '/page2',
                name: 'page2',
                label: '页面二',
                icon: 'setting',
                url: 'PageTwo.vue'
            },
        ]
    },
]
const router = useRouter()
const noChildren = () => {
    return list.filter(item => {
        return !item.children
    })
}
const hasChildren = () => {
    return list.filter(item => {
        return item.children
    })
}
let handleOpen = () => {

}
let handleClose = () => {

}
let clickMenu = (item) => {
    router.push({
        name: item.name
    })
}
</script>
<style lang="less" scoped>
.el-aside {
    overflow-x: hidden;
    h3 {
        text-align: center;
        color: #fff;
        height: 60px;
        line-height: 60px;
    }

    .icons {
        width: 18px;
        height: 18px;
    }

    .el-menu {
        border-right: 0;
    }
}
</style>