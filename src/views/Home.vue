<template>
  <div class="root">
    <div v-if="!invoiceStore.isLoading">
      <p>Hello, {{ userStore.name || userStore.email }}</p>
      <a-row justify="space-between" align="middle">
        <div>
          <p class="title">Invoices</p>
          <p>There are {{ invoiceStore.data.length }} invoices</p>
        </div>
        <div>
          <Button type="primary" shape="round" @click="store.isOpen = true">
            Add New
          </Button>
        </div>
      </a-row>
      <div style="margin-top: 48px; margin-bottom: 48px">
        <ListItem
          v-for="item of invoiceStore.data"
          :key="item.id"
          :data="item.preview"
        />
        <div
          v-if="invoiceStore.data.length === 0"
          style="text-align: center; color: white"
        >
          No invoice found
        </div>
      </div>
    </div>
    <Loading v-else label="Retrieving invoices..." />
  </div>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, onMounted } from 'vue'
import { useModalStore } from '@/stores/modal.js'
import { useInvoiceStore } from '@/stores/invoices.js'
import { useUserStore } from '@/stores/user.js'
import Button from '@/components/Button/index.vue'
import ListItem from '@/components/List/home.vue'
import Loading from '@/components/Loading/index.vue'
export default defineComponent({
  components: {
    PlusOutlined,
    Button,
    ListItem,
    Loading
  },
  setup() {
    const store = useModalStore()
    const invoiceStore = useInvoiceStore()
    const userStore = useUserStore()

    const fetchData = () => {
      invoiceStore.fetchData(userStore.id)
    }

    onMounted(() => {
      fetchData()
    })

    return { store, invoiceStore, userStore }
  }
})
</script>
<style scoped>
.root {
  width: 768px;
}

.title {
  font-size: 36px;
  font-weight: 600;
}
</style>
