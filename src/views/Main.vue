<template>
    <div class="common-layout">
        <el-container>
            <el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header></common-header>
                </el-header>
                <el-main>
                    <common-tag></common-tag>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonTag from '../components/CommonTag.vue';
export default defineComponent({
    components: {
        CommonHeader,
        CommonAside,
        CommonTag
    }
})
</script>
<style lang="less" scoped>
.common-layout {
    height: 100%;

    & > .el-container {
        height: 100%;
        align-items: baseline;
        & > .el-aside {
            height: 100%;
            background-color: #545c64;
            overflow-x: hidden;
        }
        .el-header {
            padding: 0;
        }
    }
}
</style>
  