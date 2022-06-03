<template>
  <div class="invoice--list grid--root">
    <p>{{ data.id }}</p>
    <p>{{ data.dueDate }}</p>
    <p>{{ data.biller }}</p>
    <p style="font-weight: 800">{{ formattedPrice }}</p>
    <Badge :type="statusChecker(data.status)">
      <ExclamationCircleFilled style="margin-right: 8px" />{{ data.status }}
    </Badge>
    <div style="text-align: right">
      <a-button shape="circle">
        <template #icon>
          <ArrowRightOutlined />
        </template>
      </a-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  CloseCircleFilled,
  ArrowRightOutlined
} from '@ant-design/icons-vue'
import Badge from '@/components/Badge/index.vue'

export default defineComponent({
  props: {
    data: Object
  },
  components: {
    CheckCircleFilled,
    ExclamationCircleFilled,
    CloseCircleFilled,
    ArrowRightOutlined,
    Badge
  },
  setup(props) {
    const statusChecker = (value) => {
      const obj = {
        pending: 'warning',
        overdue: 'error',
        paid: 'success'
      }

      return obj[value] || ''
    }

    const formattedPrice = computed(() => {
      const value = props.data.amount
      if (!value) return 'Rp0'
      let _value = Number(value)

      if (isNaN(_value)) return ''

      _value = _value.toLocaleString('id-ID')
      return `Rp ${_value}`
    })

    return { statusChecker, formattedPrice }
  }
})
</script>
<style scoped>
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.grid--root {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr 0.5fr;
  gap: 16px;
}
.invoice--list {
  background-color: #1e2030;
  padding: 24px;
  border: 1px solid #8066b5;
  border-radius: 12px;
  margin-bottom: 16px;
  align-items: center;
}
.ant-btn {
  border-color: #8066b5 !important;
  background-color: #3c3054 !important;
  color: #a185da;
}
.ant-btn:hover {
  background-color: #2a213c !important;
}
</style>
