<template>
  <p class="label" v-if="label">{{ label }}</p>
  <a-input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-if="!textArea"
  />
  <a-textarea
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-else
  />
</template>
<script>
export default {
  props: {
    label: String,
    textArea: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
<style scoped>
.ant-input {
  background-color: #1e2030 !important;
  border-radius: 6px !important;
  padding: 8px 16px !important;
  color: white !important;
}

.ant-input:focus {
  border-color: #8066b5 !important;
  background-color: #3c3054 !important;
  box-shadow: none !important;
}

.ant-input:hover {
  border-color: #8066b5 !important;
}

.ant-input:disabled {
  opacity: 0.3;
}

.ant-input-affix-wrapper {
  background-color: #1e2030 !important;
  border-radius: 6px !important;
  padding: 8px 16px !important;
  color: white !important;
}

::v-deep input.ant-input {
  background-color: transparent !important;
  color: white !important;
}

.ant-input-affix-wrapper-focused {
  border-color: #8066b5 !important;
  background-color: #3c3054 !important;
  box-shadow: none !important;
}

.ant-input-affix-wrapper:hover {
  border-color: #8066b5 !important;
}

.ant-input-affix-wrapper input:disabled {
  opacity: 0.3;
}

.label {
  color: #fafafa !important;
  font-size: 12px;
  margin-bottom: 4px !important;
  opacity: 0.5;
}
</style>
