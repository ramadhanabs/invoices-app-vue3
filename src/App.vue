<template>
  <Navbar />
  <div id="root">
    <router-view />
  </div>
  <Transition name="slide-fade">
    <SideModal v-if="store.isOpen" />
  </Transition>
</template>
<script>
import Navbar from '@/components/Navbar/index.vue'
import SideModal from '@/components/Modal/index.vue'
import { defineComponent, ref } from 'vue'
import { useModalStore } from '@/stores/modal.js'
export default defineComponent({
  components: { Navbar, SideModal },
  setup() {
    const store = useModalStore()

    return { store }
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

#root {
  display: flex;
  justify-content: center;
  padding: 48px;
  height: 100%;
}

#app {
  height: 100%;
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
</style>
