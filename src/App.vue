<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script>
import DashboardLayout from '@/layout/dashboard.vue'
import AuthLayout from '@/layout/auth.vue'
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useModalStore } from '@/stores/modal.js'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: { DashboardLayout, AuthLayout },
  setup() {
    const route = useRoute()
    const store = useModalStore()
    const layout = ref(null)

    watch(
      () => route.name,
      () => (layout.value = route.meta.layout)
    )

    return { store, layout }
  }
})
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #141625 !important;
  font-family: 'Poppins', sans-serif !important;
}

p {
  color: white;
  margin-bottom: 0px !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.ant-progress-inner {
  background-color: #3c3054 !important;
}

.ant-progress-bg {
  background-color: #8066b5 !important;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
}
@media (min-width: 476px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (min-width: 768px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (min-width: 992px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (min-width: 1200px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}
@media (min-width: 476px) {
  .container {
    width: 100%;
  }
}
@media (min-width: 768px) {
  .container {
    width: 720px;
    max-width: 100%;
  }
}
@media (min-width: 992px) {
  .container {
    width: 960px;
    max-width: 100%;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1140px;
    max-width: 100%;
  }
}
@media (min-width: 1400px) {
  .container {
    width: 1340px;
    max-width: 100%;
  }
}
</style>
