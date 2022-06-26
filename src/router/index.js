import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import Analytics from '@/views/Analytics.vue'
import InvoiceDetail from '@/views/InvoiceDetail.vue'
import Register from '@/views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'dashboard-layout'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      layout: 'auth-layout'
    }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
    meta: {
      layout: 'dashboard-layout'
    }
  },
  {
    path: '/invoice/:invoiceId',
    name: 'Invoice',
    component: InvoiceDetail,
    meta: {
      layout: 'dashboard-layout'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
