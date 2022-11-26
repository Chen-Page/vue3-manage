<template>
    <div class="table">
        <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '编辑用户'" width="50%"
            :before-close="handleClose">
            <el-form ref="formRef" :model="form" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="name" label="姓名">
                            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="age" label="年龄">
                            <el-input v-model.number="form.age" placeholder="请输入年龄"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="sex" label="性别">
                            <el-select v-model="form.sex" placeholder="请选择性别">
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="birth" label="出生日期">
                            <el-date-picker v-model="form.birth" value-format="YYYY-MM-DD" type="date"
                                placeholder="请选择出生日期" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item prop="addr" label="地址">
                    <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="submit(formRef)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div class="user-header">
            <el-button type="primary" @click="handleAdd">
                +新增
            </el-button>
            <el-form :model="userForm" :inline="true">
                <el-form-item prop="name">
                    <el-input v-model="userForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">
                        查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%" height="450">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
                :width="item.width ? item.width : 100"></el-table-column>
            <el-table-column label="Operations" min-width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pager" small background layout="prev, pager, next" @current-change="changePage"
            hide-on-single-page :pageSize="pageSize" :total="count" />
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
const { proxy } = getCurrentInstance()

let pageIndex = ref(1)
let pageSize = ref(20)
let tableData = ref([])
let count = ref(0)
let dialogVisible = ref(false)
let formRef = ref()
// 列表展示数据格式
let tableLabel = reactive([
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'age',
        label: '年龄'
    },
    {
        prop: 'sexLabel',
        label: '性别'
    },
    {
        prop: 'birth',
        label: '出生日期',
        width: 200
    },
    {
        prop: 'addr',
        label: '地址',
        width: 320
    }
])

// 搜索框数据
let userForm = reactive({
    name: ''
})

// 表单
let form = reactive({
    name: '',
    age: '',
    sex: '',
    birth: '',
    addr: ''
})

// 表单提交规则
let rules = reactive({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    age: [
        { required: true, message: '请输入年龄', trigger: 'blur' },
        { type: 'number', message: '请输入一个数字', trigger: 'blur' }
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    birth: [
        { required: true, message: '请选择出生日期', trigger: 'blur' }
    ],
    addr: [
        { required: true, message: '请输入住址', trigger: 'blur' }
    ],
})

// 当前操作类型
let action = ref('add')

let getUserData = async () => {
    let res = await proxy.$api.getUserData({
        name: userForm.name,
        page: pageIndex.value,
        limit: pageSize.value
    })
    console.log(res)
    tableData.value = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? '女' : '男'
        return item
    })
    count.value = res.count
}
let changePage = (index) => {
    pageIndex.value = index
    getUserData()
}
let handleAdd = () => {
    action.value = 'add'
    dialogVisible.value = true
}
let handleClose = () => {
    ElMessageBox.confirm('要取消用户输入吗？')
        .then((e) => {
            if (e == 'confirm') {
                dialogVisible.value = false
                proxy.$refs.formRef.resetFields()
            }
        }).catch(() => { })
}
let cancel = () => {
    handleClose()
}
let submit = async (formEl) => {
    if (!formEl) {
        return
    }
    await formEl.validate((valid, fields) => {
        if (!valid) {
            console.log('验证失败')
            ElMessage({
                message: '请按照提示输入内容',
                type: 'warning'
            })
        } else {
            if (action.value == 'add') {
                proxy.$api.addUser(form).then(() => {
                    ElMessage({
                        message: '添加成功',
                        type: 'success'
                    })
                    dialogVisible.value = false
                    proxy.$refs.formRef.resetFields()
                    pageIndex = 1
                    getUserData()
                })
            } else {
                if (!form.id) {
                    ElMessage.error('未获取到id')
                    return
                }
                proxy.$api.editUser(form).then(() => {
                    ElMessage({
                        message: '修改成功',
                        type: 'success'
                    })
                    dialogVisible.value = false
                    proxy.$refs.formRef.resetFields()
                    getUserData()
                })
            }
        }
    })
}

let search = () => {
    getUserData()
}
let handleEdit = (index, item) => {
    console.log(item)
    action.value = 'edit'
    dialogVisible.value = true
    proxy.$nextTick(() => {
        Object.assign(form, item)
    })
}
let handleDelete = (index, item) => {
    ElMessageBox.confirm('是否删除此数据？')
        .then((e) => {
            if (e == 'confirm') {
                proxy.$api.deleteUser({
                    id: item.id
                }).then(() => {
                    ElMessage({
                        message: '删除成功',
                        type: 'success'
                    })
                    getUserData()
                })
            }
        }).catch(() => { })
}
onMounted(() => {
    getUserData()
})
</script>
<style lang="less" scoped>
.table {
    position: relative;
    box-sizing: border-box;
    padding-bottom: 40px;

    .user-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .pager {
        position: absolute;
        right: 0;
        bottom: 0;
    }
}
</style>