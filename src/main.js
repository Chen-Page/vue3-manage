import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)

// app.use(ElementPlus)

// 引入公用样式
import './assets/less/index.less';

// 引入element-plus icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入本地mockjs模拟数据
import './api/mock'

// 引入api
import api from './api/api'
app.config.globalProperties.$api = api

// 调取本地缓存数据
store.commit('addMenu', router)

// 引入路由和store
app.use(router)
app.use(store)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
