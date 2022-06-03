<template>
  <div class="badge--root" :class="`${type}-badge`">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: String
  }
}
</script>

<style scoped>
.badge--root {
  padding: 4px 16px;
  border-radius: 6px;
  width: auto;
  background-color: #3c3054;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
}
.warning-badge {
  background: rgb(255, 165, 0, 0.1);
  border: 1px solid orange;
  color: orange;
}
.success-badge {
  background: rgb(173, 255, 47, 0.1);
  border: 1px solid greenyellow;
  color: greenyellow;
}

.error-badge {
  background: rgb(128, 0, 0, 0.2);
  border: 1px solid red;
  color: red;
}
</style>
