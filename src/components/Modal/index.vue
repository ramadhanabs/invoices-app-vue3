<template>
  <div class="overlay">
    <div class="sidemodal">
      <p class="title">Add new invoices</p>

      <div style="margin-bottom: 24px">
        <a-progress
          :percent="stepper * 50"
          :show-info="false"
          status="active"
        />
        <p>Progress: {{ stepperText }} ({{ stepper }}/2)</p>
      </div>

      <text-input
        label="Invoice ID"
        placeholder="Invoice ID"
        v-model="invoiceId"
        disabled
      />
      <Transition name="slide-fade" mode="out-in">
        <a-row :gutter="24" v-if="stepper === 1">
          <!-- Form one -->
          <a-col :span="12" class="section--root">
            <p class="subtitle">Bill from:</p>
            <a-space direction="vertical" size="middle" style="width: 100%">
              <text-input
                v-model="billFrom.name"
                label="Name"
                placeholder="Name"
              />
              <text-input
                v-model="billFrom.email"
                label="Email"
                placeholder="Email"
                type="email"
              />
              <text-input
                v-model="billFrom.phone"
                label="Phone Number"
                type="number"
                placeholder="Phone Number"
              />
              <text-input
                v-model="billFrom.address"
                label="Address"
                placeholder="Address"
                :rows="4"
                textArea
              />
            </a-space>
          </a-col>
          <!-- End of Form one -->

          <!-- Form two -->
          <a-col :span="12" class="section--root">
            <p class="subtitle">Bill to:</p>
            <a-space direction="vertical" size="middle" style="width: 100%">
              <text-input
                v-model="billTo.name"
                label="Name"
                placeholder="Name"
              />
              <text-input
                v-model="billTo.email"
                label="Email"
                placeholder="Email"
                type="email"
              />
              <text-input
                v-model="billTo.phone"
                label="Phone Number"
                type="number"
                placeholder="Phone Number"
              />
              <text-input
                v-model="billTo.address"
                label="Address"
                placeholder="Address"
                :rows="4"
                textArea
              />
            </a-space>
          </a-col>
          <!-- End of Form Two -->
        </a-row>
        <div v-else-if="stepper === 2">
          <div class="section--root">
            <p class="subtitle">List item:</p>
            <div class="grid--root">
              <p class="label">Item Name</p>
              <p class="label">Price</p>
              <p class="label">Qty</p>
              <p class="label">Total</p>
              <p class="label">Action</p>
            </div>
            <a-space
              direction="vertical"
              size="middle"
              style="
                width: 100%;
                margin-bottom: 16px;
                height: 240px;
                overflow: scroll;
                padding: 16px;
                background: rgb(41, 16, 92, 0.1);
                border: 1px solid rgb(161, 133, 218, 0.3);
                border-radius: 8px;
              "
            >
              <div
                class="grid--root"
                v-for="(i, index) in invoiceList"
                :key="i.id"
              >
                <text-input
                  v-model="i.name"
                  placeholder="Name"
                  style="margin-bottom: 0px"
                />
                <text-input v-model="i.price" type="number" prefix="Rp." />
                <text-input v-model="i.qty" type="number" placeholder="Qty" />
                <div>Rp. {{ (i.total = i.price * i.qty) }}</div>
                <a-button
                  shape="circle"
                  @click="deleteList(index)"
                  :disabled="invoiceList.length <= 1"
                >
                  <template #icon>
                    <DeleteFilled />
                  </template>
                </a-button>
              </div>
              <Button block @click="addNewList">Add New Item</Button>
            </a-space>
            <a-row align="middle" justify="end">
              <a-col :span="12">
                <p style="text-align: right">Total: Rp. {{ totalPrice }}</p>
              </a-col>
            </a-row>
          </div>

          <p class="subtitle">Payment details:</p>
          <a-row :gutter="24" class="section--root">
            <a-col :span="12">
              <a-space direction="vertical" size="middle" style="width: 100%">
                <date-picker v-model="invoiceDate" label="Invoice Date" />
              </a-space>
            </a-col>
            <a-col :span="12">
              <a-space direction="vertical" size="middle" style="width: 100%">
                <date-picker v-model="dueDate" label="Payment Due Date" />
                <text-input
                  v-model="discount"
                  type="number"
                  maxLength="2"
                  label="Discount"
                  placeholder="Discount"
                  suffix="%"
                />
              </a-space>
            </a-col>
          </a-row>
        </div>
      </Transition>
      <a-row justify="end">
        <div v-if="stepper === 1">
          <Button @click="store.isOpen = false" style="margin-right: 8px"
            >Cancel</Button
          >
          <Button @click="stepper++">Next</Button>
        </div>
        <div v-else>
          <Button @click="stepper--" style="margin-right: 8px">Previous</Button>
          <Button @click="handleSubmit" :loading="loading">Submit</Button>
        </div>
      </a-row>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useModalStore } from '@/stores/modal.js'
import { useInvoiceStore } from '@/stores/invoices.js'
import TextInput from '@/components/Input/text.vue'
import Button from '@/components/Button/index.vue'
import DatePicker from '@/components/Input/datepicker.vue'
import { uid } from 'uid'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import { DoubleLeftOutlined, DeleteFilled } from '@ant-design/icons-vue'
import db from '../../firebase/firebaseInit'

export default defineComponent({
  name: 'SideModal',
  components: {
    TextInput,
    Button,
    DatePicker,
    DoubleLeftOutlined,
    DeleteFilled
  },
  setup() {
    const store = useModalStore()
    const invoiceStore = useInvoiceStore()
    const stepper = ref(1)
    const invoiceId = ref(null)
    const loading = ref(false)

    /* Biller Invoice Information */
    const billFrom = ref({
      name: '',
      email: '',
      phone: '',
      address: ''
    })

    const billTo = ref({
      name: '',
      email: '',
      phone: '',
      address: ''
    })

    /* Detail Invoice Information */
    const invoiceDate = ref('')
    const dueDate = ref('')
    const discount = ref(0)
    const invoiceList = ref([
      {
        id: 1323,
        name: '',
        price: 0,
        qty: 0,
        total: 0
      }
    ])

    const incrementStep = () => {
      stepper.value++
    }

    const addNewList = () => {
      const newObj = {
        id: 2132,
        name: '',
        price: 0,
        qty: 0,
        total: 0
      }

      invoiceList.value.push(newObj)
    }

    const deleteList = (index) => {
      invoiceList.value.splice(index, 1)
    }

    const countTotal = (currentIndex) => {
      const { price, qty } = invoiceList.value[currentIndex]
      console.log(price, qty)
    }

    const handleSubmit = async () => {
      const payload = {
        id: invoiceId.value,
        billFrom: JSONParser(billFrom.value),
        billTo: JSONParser(billTo.value),
        itemList: JSONParser(invoiceList.value),
        invoiceDate: dayjs(invoiceDate.value).format(),
        dueDate: dayjs(dueDate.value).format(),
        discount: discount.value,
        status: 'pending',
        totalAmount: totalPrice.value
      }
      loading.value = true
      await postInvoice(payload)
      loading.value = false
    }

    const postInvoice = async (payload) => {
      const database = db.collection('invoices').doc()
      await database
        .set(payload)
        .then(() => {
          message.success('Success add new invoices')
          invoiceStore.fetchData()
          store.isOpen = false
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const JSONParser = (val) => {
      return JSON.parse(JSON.stringify(val))
    }

    const stepperText = computed(() =>
      stepper.value === 1 ? 'Biller Information' : 'Billing Detail'
    )

    const totalPrice = computed(() => {
      const reducer = (a, b) => a + b
      const arrayOfPrice = invoiceList.value.map((item) => item.total)
      return arrayOfPrice.reduce(reducer, 0)
    })

    onMounted(() => {
      invoiceId.value = `INV-${uid(4)}`
    })

    return {
      store,
      stepper,
      incrementStep,
      stepperText,
      invoiceId,
      invoiceDate,
      dueDate,
      invoiceList,
      addNewList,
      deleteList,
      discount,
      totalPrice,
      countTotal,
      billFrom,
      billTo,
      handleSubmit,
      loading
    }
  }
})
</script>
<style scoped>
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  cursor: pointer;
}
.sidemodal {
  height: 100%;
  width: 50%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #1e2030;
  z-index: 100;
  cursor: default;
  padding: 48px;
  overflow: scroll;
}

.outer-sidemodal {
  background-color: #1e2030;
  height: 150px;
  width: 40px;
  position: fixed;
  right: 50%;
  top: 50%;
  border-radius: 24px 0px 0px 24px;
}

.section--root {
  margin-top: 24px;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px !important;
}

.subtitle {
  font-weight: 600;
  margin-bottom: 16px !important;
}

.label {
  color: #fafafa !important;
  font-size: 12px;
  margin-bottom: 4px !important;
  opacity: 0.5;
}

.grid--root {
  display: grid;
  grid-template-columns: 2fr 1fr 0.5fr 1fr 0.5fr;
  gap: 16px;
  align-items: center;
  color: white;
}

.ant-btn {
  border-color: #8066b5 !important;
  background-color: #3c3054 !important;
  color: #a185da;
}
.ant-btn:hover {
  background-color: #2a213c !important;
  color: #a185da;
}
</style>
