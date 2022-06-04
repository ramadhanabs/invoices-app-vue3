<template>
  <p class="label" v-if="label">{{ label }}</p>
  <a-date-picker
    v-bind="$attrs"
    :value="modelValue"
    @change="$emit('update:modelValue', $event)"
  />
</template>
<script>
export default {
  props: {
    label: String,
    modelValue: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.ant-picker {
  background-color: #1e2030 !important;
  border-radius: 6px !important;
  padding: 8px 16px !important;
  color: white !important;
  width: 100% !important;
}
::v-deep .ant-picker-suffix {
  color: white !important;
}
::v-deep .ant-picker-input > input {
  color: white !important;
}

::v-deep .ant-picker-clear {
  background: #1e2030 !important;
  color: white !important;
}
.label {
  color: #fafafa !important;
  font-size: 12px;
  margin-bottom: 4px !important;
  opacity: 0.5;
}
</style>
