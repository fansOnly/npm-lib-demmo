<template>
  <button :class="['vc-button', 'vc-button--' + type, 'vc-button--' + round]" @click="handleClick">
    <slot>默认文本</slot>
  </button>
</template>

<script setup>
import { buttonProps, buttonEmits } from './button'
const props = defineProps(buttonProps)

const emit = defineEmits(buttonEmits)

const handleClick = (evt) => {
  console.log('button click', evt)
  emit('click', evt)
}
</script>
