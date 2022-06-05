<template>
  <a-button :class="type && `${type}-button`" v-bind="$attrs"
    ><slot></slot
  ></a-button>
</template>
<script>
export default {
  props: {
    type: String
  }
}
</script>
<style scoped>
.ant-btn {
  border-color: #8066b5;
  background-color: #3c3054;
  color: white;
  padding: 16px 24px;
  line-height: 1;
  border-radius: 8px;
  height: auto;
}
.ant-btn:hover {
  background-color: #2a213c;
}

.success-button {
  background-color: rgba(172, 255, 47, 0.259) !important;
  border-color: greenyellow !important;
  color: greenyellow !important;
}

.success-button:hover {
  background-color: rgb(173, 255, 47, 0.1) !important;
}

.error-button {
  background-color: rgb(128, 0, 0, 0.5) !important;
  border-color: red !important;
  color: red !important;
}

.error-button:hover {
  background-color: rgba(128, 0, 0, 0.2) !important;
}
</style>
