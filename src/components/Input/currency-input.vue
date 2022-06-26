<template>
  <input ref="inputRef" type="text" />
</template>
<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  }
}
</script>
<style scoped>
input {
  background-color: #1e2030;
  border-radius: 6px;
  padding: 8px 16px;
  color: white;
  outline: none;
  border: 1px solid #d9d9d9;
  transition: all ease 0.3s;
}
input:focus {
  border-color: #8066b5;
  background-color: #3c3054;
  box-shadow: none;
}
input:hover {
  border-color: #8066b5;
}
input:disabled {
  opacity: 0.3;
}
</style>
