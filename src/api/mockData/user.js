import Mock, { mock } from "mockjs";

let List = []
let count = 200

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1),
    }))
}

const param2Obj = (url) => {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

// 获取用户列表
// 要带参数name，page，limit；name为可选项，page和limit存在默认值
// @param name，page，limit
// @return {{code: number, count: number, data: *[]}}
let getUserList = (req) => {
    const { name, page = 1, limit = 20 } = param2Obj(req.url)
    console.log(`搜索名称${name}, 搜索分页${page}, 搜索单页条数${limit}`)
    const mockList = List.filter(user => {
        if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) {
            return false
        }
        return true
    })
    const pageList = mockList.filter((item, index) => {
        return index < (limit * page) && index >= (limit * (page - 1))
    })
    return {
        code: 200,
        data: {
            count: mockList.length,
            list: pageList
        }
    }
}

let createUser = (req) => {
    const { name, addr, age, birth, sex } = JSON.parse(req.body)
    List.unshift({
        id: Mock.Random.guid(),
        name,
        addr,
        age,
        sex,
        birth
    })
    return {
        code: 200,
        data: {
            msg: '添加成功'
        }
    }
}

let deleteUser = (req) => {
    const { id } = JSON.parse(req.body)
    if (!id) {
        return {
            code: -999,
            msg: '参数不正确'
        }
    }
    List = List.filter(u => {
        return u.id !== id
    })
    return {
        code: 200,
        data: {
            msg: '删除成功'
        }
    }
}


let batchremove = (req) => {
    let { ids } = param2Obj(req.url)
    if (!ids) {
        return {
            code: -999,
            msg: '参数不正确'
        }
    }
    ids = ids.split(',')
    List = List.filter((u) => {
        return !ids.includes(u.id)
    })
    return {
        code: 200,
        data: {
            msg: '批量删除成功'
        }
    }
}

let updateUser = (req) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(req.body)
    const sex_num = parseInt(sex)
    List.some(u => {
        if (u.id === id) {
            u.name = name
            u.addr = addr
            u.age = age
            u.birth = birth
            u.sex = sex_num
            return true
        }
    })
    return {
        code: 200,
        data: {
            msg: '编辑成功'
        }
    }
}

export default {
    getUserList,
    createUser,
    deleteUser,
    batchremove,
    updateUser
}