import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import Analytics from '@/views/Analytics.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
