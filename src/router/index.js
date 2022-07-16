import { createWebHistory, createRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from '@/views/Home.vue'
import Analytics from '@/views/Analytics.vue'
import Settings from '@/views/Settings.vue'
import InvoiceDetail from '@/views/InvoiceDetail.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import { useUserStore } from '@/stores/user.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'dashboard-layout',
      requiresAuth: true
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
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'auth-layout'
    }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
    meta: {
      layout: 'dashboard-layout',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      layout: 'dashboard-layout',
      requiresAuth: true
    }
  },
  {
    path: '/invoice/:invoiceId',
    name: 'Invoice',
    component: InvoiceDetail,
    meta: {
      layout: 'dashboard-layout',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      next()
      userStore.getUser()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
