<template>
    <div class="page_notfound">
        <h2>404 Not Found</h2>
        <h5>当前页面不存在/或无权限访问</h5>
        <div class="a">
            将在{{ time }}秒后跳转回<router-link :to="{ name: 'home' }" tag="a" class="a">首页</router-link>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let time = ref(5)
let interval = null
let router = useRouter()

onMounted(() => {
    interval = setInterval(() => {
        time.value = time.value - 1
        if (time.value <= 0) {
            clearInterval(interval)
            interval = null
            router.replace({
                name: 'home'
            })
        }
    }, 1000)
})
onBeforeUnmount(() => {
    if (interval) {
        clearInterval(interval)
        interval = null
    }
})
</script>

<style lang='less' scoped>
.page_notfound {
    text-align: center;
    padding: 50px 0;
    h2 {
        font-size: 30px;
        margin: 20px auto;
    }
    h5 {
        font-size: 18px;
        margin: 15px auto;
    }

    .a {
        margin: 0 5px;

    }
}
</style>