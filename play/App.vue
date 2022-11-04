<template>
  <div class="page">
    <div>demo</div>
    <vc-button @click="add">普通按钮-{{sum}}</vc-button>
    <vc-button type="primary">确认按钮</vc-button>
    <vc-button type="info">信息按钮</vc-button>
    <vc-button round>圆角按钮</vc-button>
  </div>
</template>

<script>
import { VcButton } from 'vitamin-cc'
import { add } from '@vitamin/shared'
export default {
  name: 'App',
  components: {
    VcButton,
  },
  data() {
    return {
      sum: 0
    }
  },
  methods: {
    add() {
      this.sum = add(1, 2)
    }
  }
}
</script>
