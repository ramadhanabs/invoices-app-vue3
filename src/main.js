import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createPinia } from 'pinia'

import router from './router'

const app = createApp(App)
app.use(router).use(Antd).use(createPinia()).mount('#app')
