<template>
  <div class="root">
    <a-row justify="space-between" align="middle">
      <div>
        <p class="title">Invoices</p>
        <p>There are 2 invoices</p>
      </div>
      <div>
        <Button type="primary" shape="round" @click="store.isOpen = true">
          Add New
        </Button>
      </div>
    </a-row>
    <div style="margin-top: 48px; margin-bottom: 48px">
      <ListItem v-for="item of invoiceList" :key="item.id" :data="item" />
    </div>
  </div>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { useModalStore } from '@/stores/modal.js'
import Button from '@/components/Button/index.vue'
import ListItem from '@/components/List/home.vue'
export default defineComponent({
  components: {
    PlusOutlined,
    Button,
    ListItem
  },
  setup() {
    const store = useModalStore()
    const invoiceList = ref([
      {
        id: 'INV-001',
        dueDate: 'Jul 1, 2021',
        biller: 'Jean Sean',
        amount: 200000,
        status: 'pending'
      },
      {
        id: 'INV-002',
        dueDate: 'Jul 1, 2021',
        biller: 'Anthony Jhon Banderas',
        amount: 500000,
        status: 'paid'
      },
      {
        id: 'INV-003',
        dueDate: 'Jul 1, 2021',
        biller: 'Anthony Jhon',
        amount: 500000,
        status: 'overdue'
      }
    ])

    return { store, invoiceList }
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
