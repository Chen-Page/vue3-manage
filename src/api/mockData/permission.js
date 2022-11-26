import Mock from 'mockjs'

export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        if (username == 'admin' && password == 'admin') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 'House',
                            url: 'home/Home'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'VideoPlay',
                            url: 'mall/Mall',
                            meta: {
                                keepAlive: true
                            }
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/User'
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
                                    url: 'page/PageOne'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: '页面二',
                                    icon: 'setting',
                                    url: 'page/PageTwo'
                                },
                            ]
                        },
                        {
                            path: '/editShop/:id',
                            name: 'editShop',
                            label: '编辑商家',
                            url: 'mall/EditShop'
                         },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username == 'xiaoxiao' && password == 'xiaoxiao') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 'House',
                            url: 'Home'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'Mall'
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                msg: '用户名或密码错误',
                data: {
                    message: '用户名或密码错误'
                }
            }
        }
    }
}