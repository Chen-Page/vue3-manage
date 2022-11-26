<template>
    <div class="l-content">
        <el-button :size="size" @click="hanleClose">
            <el-icon>
                <Menu />
            </el-icon>
        </el-button>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: current.name }" v-if="current">{{ current.label }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown>
            <span class="el-dropdown-link">
                <img class="user" :src="user.img" alt="用户头像">
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup>
import { computed } from "@vue/reactivity"
import { useStore } from "vuex"
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router";

let store = useStore()
let router = useRouter()

let size = ref('small')
let color = ref('#09bb07')

let logOut = (e) => {
    console.log('退出')
    console.log(e)
    store.commit('clearMenu')
    store.commit('clearToken')
    router.replace({
        name: 'login'
    })
    ElMessage({
        message: '退出成功',
        type: 'warning'
    })
}

const userHeader = new URL('../assets/userHeader.png', import.meta.url).href
let user = reactive({
    img: userHeader
})
let hanleClose = () => {
    console.log('点击按钮了')
    store.commit('updateIsCollapse')
}
const current = computed(() => {
    return store.state.currentMenu
})
</script>

<style lang="less" scoped>
.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 10px;
    }

    h3 {
        color: #fff;
    }

    /** 写法可改为:deep(选择器父级 选择器子级) {}
        */
    .el-breadcrumb {
        & /deep/ span {
            color: #fff !important;
            cursor: pointer;
        }
    }
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>