<template>
  <a-button v-bind="$attrs"><slot></slot></a-button>
</template>
<style scoped>
.ant-btn {
  border-color: #8066b5 !important;
  background-color: #3c3054 !important;
  color: white;
  padding: 16px 24px !important;
  line-height: 1 !important;
  border-radius: 8px;
  height: auto;
}
.ant-btn:hover {
  background-color: #2a213c !important;
}
</style>
