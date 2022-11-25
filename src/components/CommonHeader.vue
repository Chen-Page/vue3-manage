<template>
    <div>
        <el-header>
            <div class="l-content">
                <!-- <el-icon :size="size" :color="color">
                    <Menu />
                </el-icon> -->
                <el-button :size="size" @click="hanleClose">
                    <el-icon>
                        <Menu />
                    </el-icon>
                </el-button>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{name: current.name}" v-if="current">{{current.label}}</el-breadcrumb-item>
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
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-header>
    </div>
</template>
<script>
import { computed } from "@vue/reactivity"
import { useStore } from "vuex"
export default {
    // data() {
    //     return {
    //         size: 'small',
    //         color: '#09bb07'
    //     }
    // }
    setup() {
        let store = useStore()
        const userHeader = new URL('../assets/userHeader.png', import.meta.url).href
        let hanleClose = () => {
            console.log('点击按钮了')
            store.commit('updateIsCollapse')
        }
        const current = computed(() => {
            return store.state.currentMenu
        })
        return {
            size: 'small',
            color: '#09bb07',
            user: {
                // img: 'https://th.bing.com/th/id/OIP.JPaFw0vH2f6Qy44aUfZ4jgAAAA'
                img: userHeader
            },
            current,
            hanleClose
        }
    }
}
</script>

<style lang="less" scoped>
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;

    .l-content {
        display: flex;
        align-items: center;

        .el-button {
            margin-right: 10px;
        }

        h3 {
            color: #fff;
        }
        .el-breadcrumb {
            & /deep/ span {
                color: #fff!important;
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
}
</style>