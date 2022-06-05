<template>
  <div class="root">
    <a-row align="middle" style="margin-bottom: 24px">
      <a-button shape="circle" @click="handleRoute">
        <template #icon>
          <ArrowLeftOutlined />
        </template>
      </a-button>
      <p style="margin-left: 8px">Back to Dashboard</p>
    </a-row>
    <div v-if="Object.keys(invoiceData).length !== 0">
      <div class="wrapper">
        <a-row justify="space-between" align="middle">
          <div>
            <p>Invoice Detail</p>
            <p class="title">{{ invoiceData.id }}</p>
          </div>
          <a-space size="middle">
            <Button>Edit</Button>
            <Button type="error">Delete</Button>
            <Button
              type="success"
              @click="handleUpdatePaid"
              v-if="invoiceData.status !== 'paid'"
              >Mark as Paid</Button
            >
          </a-space>
        </a-row>
      </div>
      <div class="wrapper">
        <a-row justify="space-between">
          <a-col :span="8">
            <p class="label">Bill To:</p>
            <p class="content" style="font-weight: 600">
              {{ invoiceData.billTo.name }}
            </p>
            <p class="label">{{ invoiceData.billTo.email }}</p>
            <p class="label">{{ invoiceData.billTo.phone }}</p>
            <p class="label">{{ invoiceData.billTo.address }}</p>
          </a-col>
          <a-col :span="8">
            <div style="margin-bottom: 16px">
              <p class="label">Due Date:</p>
              <p class="content">{{ dueDate }}</p>
            </div>
            <div>
              <p class="label">Due Date:</p>
              <p class="content">{{ invoiceDate }}</p>
            </div>
          </a-col>
          <a-col :span="8">
            <Badge :type="statusChecker(invoiceData.status)">
              <ExclamationCircleFilled style="margin-right: 8px" />
              {{ invoiceData.status }}
            </Badge>
          </a-col>
        </a-row>
        <div class="wrapper--table">
          <a-row class="table--header">
            <a-col :span="12">Item Name</a-col>
            <a-col :span="4" style="text-align: center">Qty</a-col>
            <a-col :span="4" style="text-align: right">Price</a-col>
            <a-col :span="4" style="text-align: right">Total</a-col>
          </a-row>
          <div class="table--item">
            <a-row
              v-for="i of invoiceData.itemList"
              :key="i.id"
              style="padding: 8px 0px"
            >
              <a-col :span="12">{{ i.name }}</a-col>
              <a-col :span="4" style="text-align: center">{{ i.qty }}</a-col>
              <a-col :span="4" style="text-align: right">{{
                formatPrice(i.price)
              }}</a-col>
              <a-col :span="4" style="text-align: right">{{
                formatPrice(i.total)
              }}</a-col>
            </a-row>
          </div>
        </div>

        <a-row justify="space-between" align="middle" style="padding: 16px">
          <p>Grand Total:</p>
          <p class="total-price">{{ formatPrice(invoiceData.totalAmount) }}</p>
        </a-row>
      </div>
    </div>
    <Loading v-else label="Retrieving invoices..." />
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, computed } from 'vue'
import {
  ArrowLeftOutlined,
  ExclamationCircleFilled,
  DeleteFilled
} from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import Loading from '@/components/Loading/index.vue'
import Button from '@/components/Button/index.vue'
import db from '../firebase/firebaseInit'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    ArrowLeftOutlined,
    Loading,
    ExclamationCircleFilled,
    Button,
    DeleteFilled
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const invoiceData = ref({})
    const docsId = ref(null)

    const handleRoute = () => {
      router.push('/')
    }

    const fetchData = async () => {
      const id = route.params.invoiceId
      const getData = await db
        .collection('invoices')
        .where('id', '==', id)
        .get()

      const snapshot = getData.docs[0]
      const data = snapshot.data()

      invoiceData.value = { ...data, documentId: snapshot.id }
    }

    const statusChecker = (value) => {
      const obj = {
        pending: 'warning',
        overdue: 'error',
        paid: 'success'
      }

      return obj[value] || ''
    }

    const formatPrice = (value) => {
      if (!value) return 'Rp0'
      let _value = Number(value)

      if (isNaN(_value)) return ''

      _value = _value.toLocaleString('id-ID')
      return `Rp ${_value}`
    }

    const handleUpdatePaid = async () => {
      const { documentId } = invoiceData.value
      await db
        .collection('invoices')
        .doc(documentId)
        .update({ status: 'paid' })
        .then(() => {
          message.success('Success mark as paid')
        })
        .catch((err) => {
          message.error(err)
        })
    }

    const dueDate = computed(() =>
      dayjs(invoiceData.value.dueDate).format('MMMM D, YYYY')
    )

    const invoiceDate = computed(() =>
      dayjs(invoiceData.value.invoiceDate).format('MMMM D, YYYY')
    )

    onMounted(() => {
      fetchData()
    })

    return {
      handleRoute,
      invoiceData,
      statusChecker,
      dueDate,
      invoiceDate,
      formatPrice,
      handleUpdatePaid
    }
  }
})
</script>
<style scoped>
.root {
  width: 768px;
}
.wrapper {
  background-color: #1e2030;
  padding: 24px;
  border-radius: 16px;
  margin: 20px 0px;
}
.wrapper--table {
  margin: 20px 0px;
}
.table--header {
  padding: 16px;
  background-color: #272a47;
  border-radius: 8px 8px 0px 0px;
  color: white;
  font-weight: 600;
}
.table--item {
  padding: 16px;
  border-radius: 0px 0px 8px 8px;
  color: white;
  font-weight: 400;
  background-color: #272a4777;
}
.ant-btn {
  border-color: #8066b5;
  background-color: #3c3054;
  color: #a185da;
}
.ant-btn:hover {
  background-color: #2a213c;
}
.title {
  font-size: 24px;
  font-weight: 600;
}
.label {
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 8px !important;
  color: #fafafa9e;
}
.content {
  font-size: 14px;
  font-weight: 600;
  margin: 4px 0px !important;
  color: #fafafad7;
}
.total-price {
  font-size: 24px;
  font-weight: 600;
}
</style>
