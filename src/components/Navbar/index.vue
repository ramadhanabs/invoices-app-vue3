<template>
  <div class="sidenav">
    <div class="wrapper">
      <router-link
        v-for="item of menu"
        :key="item.route"
        :to="item.route"
        active-class="active"
      >
        <component v-bind:is="item.icon" />
      </router-link>
      <a type="button" @click="handleSignOut" icon style="margin-top: auto">
        <LogoutOutlined />
      </a>
    </div>
  </div>
</template>
<script>
import {
  DollarCircleFilled,
  SlidersFilled,
  LogoutOutlined,
  SettingFilled
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modal.js'
import { useInvoiceStore } from '@/stores/invoices.js'
import { useUserStore } from '@/stores/user.js'

export default defineComponent({
  components: {
    DollarCircleFilled,
    SlidersFilled,
    LogoutOutlined,
    SettingFilled
  },
  setup() {
    const router = useRouter()
    const store = useModalStore()
    const invoiceStore = useInvoiceStore()
    const userStore = useUserStore()

    const menu = ref([
      {
        route: '/',
        icon: 'dollar-circle-filled'
      },
      {
        route: '/analytics',
        icon: 'sliders-filled'
      },
      {
        route: '/settings',
        icon: 'setting-filled'
      }
    ])

    const handleSignOut = () => {
      const auth = getAuth()
      signOut(auth).then(() => {
        router.push('/login')

        /* Reset all store */
        store.$reset()
        invoiceStore.$reset()
        userStore.$reset()
      })
    }

    return {
      handleSignOut,
      menu
    }
  }
})
</script>
<style scoped>
.sidenav {
  height: 100%;
  width: 100px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1e2030;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.sidenav a {
  color: white;
  text-align: center;
  margin: 16px auto;
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: all ease 0.3s;
}

.sidenav a:hover {
  background-color: #393d5b;
  border-radius: 8px;
  transition: all ease 0.3s;
}

.active {
  background-color: #393d5b;
  border-radius: 8px;
}
</style>
