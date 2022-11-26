<template>
    <div>
        <el-card class="box-card login-container">
            <el-form ref="formRef" :model="form" :label-position="labelPosition" :rules="formRules" label-width="80px">
                <h3 class="login_title">系统登录</h3>
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="form.username" placeholder="请输入登录账号" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" clearable></el-input>
                </el-form-item>
                <el-button type="primary" @click="submit">
                    登录
                </el-button>
            </el-form>
        </el-card>
    </div>
</template>
<script setup>
import { getCurrentInstance, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const { proxy } = getCurrentInstance()
let store = useStore()
let router = useRouter()
let labelPosition = ref('right')
let form = reactive({
    username: '',
    password: ''
})
let formRules = reactive({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ]
})

let submit = () => {
    proxy.$refs.formRef.validate((val) => {
        if (!val) {
            ElMessage({
                message: '请输入信息',
                type: 'error'
            })
            return
        }
        proxy.$api.getMenu(form).then((res) => {
            console.log(res);
            store.commit('setMenu', res.menu)
            store.commit('setToken', res.token)
            store.commit('addMenu', router)
            router.push({
                name: 'home'
            })
        }).catch((err) => {
            console.log(err);
        })
    })
}

</script>
<style lang='less' scoped>
.login-container {
    width: 350px;
    margin: 180px auto;
    text-align: center;

    .login_title {
        margin: 0 auto 40px;
        color: #505458;
    }

    .el-button {
        margin-top: 10px;
    }
}
</style>