import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import {createRouter, createWebHistory} from 'vue-router'
import EmployeeDetail from "@/components/EmployeeDetail.vue";
import EmployeeList from "@/components/EmployeeList.vue";

const app = createApp(App)

const routes = [
    { path: '/', component: EmployeeList },
    { path: '/employee/:id', component: EmployeeDetail },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.mount('#app')
