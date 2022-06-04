<template>
  <div class="loading--root">
    <a-spin size="large" />
    <p v-if="label" class="label">{{ label }}</p>
  </div>
</template>
<script>
export default {
  props: {
    label: String
  }
}
</script>
<style scoped>
.loading--root {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-size: 24px;
}
.label {
  font-size: 16px;
  margin-bottom: 16px;
}
::v-deep .ant-spin-dot-item {
  background-color: white;
}
</style>
