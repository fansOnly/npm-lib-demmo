<template>
  <button :class="['vc-button', 'vc-button--' + type, 'vc-button--' + round]" @click="handleClick">
    <slot>默认文本</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
  round: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (evt) => {
  console.log('button click', evt)
  emit('click', evt)
}
</script>
