<template>
    <div class="component-aside" :style="`height:${bodyHeight}px`">
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
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
let bodyHeight = ref(400)
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
        name: 'user',
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
const store = useStore()
const asyncList = store.state.menu
let observer = null // 监听页面元素变化
const noChildren = () => {
    return asyncList.filter(item => {
        return !item.children
    })
}
const hasChildren = () => {
    return asyncList.filter(item => {
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
    store.commit('selectMenu', item)
}
onMounted(() => {
    bodyHeight.value = document.body.scrollHeight
    // window.addEventListener('resize', () => {
    //     bodyHeight.value = document.body.scrollHeight
    // })
    let MutationObserver = window.MutationObserver
        || window.WebKitMutationObserver
        || window.MozMutationObserver
        console.log('MutationObserver', MutationObserver)
    // 选择目标节点
    let target = document.body
    // 创建观察者对象
    observer = new MutationObserver(function (mutations) {
        console.log(`MutationObserver 触发了`)
        if (bodyHeight.value != document.body.clientHeight) {
            bodyHeight.value = document.body.clientHeight
            console.log('body高度变化了', bodyHeight.value)
        }
    })
    // 配置观察选项:
    let config = {
        attributes: true
    }
    // 传入目标节点和观察选项
    observer.observe(target, config)
})
onUnmounted(() => {
    // window.removeEventListener('resize', () => {})
    if (observer) {
        observer.disconnect()
    }
})
</script>
<style lang="less" scoped>
.component-aside {
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