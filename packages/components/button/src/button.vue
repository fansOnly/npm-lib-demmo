<template>
  <div :class="['vc-button', 'vc-button--' + type, round ? 'vc-button--round' : null]" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { log } from '@vitamin/shared'
  export default {
    name: 'vc-button',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      round: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      onClick() {
        log('button click.')
        this.$emit('click')
      }
    }
  }
</script>

<style src="../style/button.scss"></style>
