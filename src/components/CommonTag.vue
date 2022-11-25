<template>
    <div class="tags">
        <el-tag v-for="(tag, index) in tags" :key="tag.name" class="mx-1" :closable="tag.name != 'home'"
            :disable-transitions="true" :effect="$route.name == tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)"
            @close="close(tag, index)">
            {{ tag.label }}
        </el-tag>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const route = useRoute()
const store = useStore()

let tags = store.state.tagsList

let changeMenu = (tag) => {
    router.push({
        name: tag.name
    })
    store.commit('selectMenu', tag)
}

let close = (tag, index) => {
    let len = tags.length;
    store.commit('closeTag', tag)
    // 删除非当前活动页面
    if (tag.name !== route.name) {
        return
    }
    if (index === (len - 1)) {
        router.push({
            name: tags[index - 1].name
        })
    } else {
        router.push({
            name: tags[index].name
        })
    }
}

</script>
<style lang="less" scoped>
.tags {
    margin-bottom: 20px;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>