<template>
  <Navbar />
  <div id="root">
    <slot />
  </div>
  <Transition name="slide-fade">
    <SideModal v-if="store.isOpen" />
  </Transition>
</template>
<script>
import Navbar from '@/components/Navbar/index.vue'
import SideModal from '@/components/Modal/index.vue'
import { useModalStore } from '@/stores/modal.js'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Navbar, SideModal },
  setup() {
    const store = useModalStore()

    return { store }
  }
})
</script>
<style scoped>
#root {
  display: flex;
  justify-content: center;
  padding: 48px;
  height: 100%;
}
</style>
