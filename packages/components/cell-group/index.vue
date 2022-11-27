<template>
  <view class="vc-cell-group">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'vc-cell-group',
  provide() {
    return {
      cellGroup: this
    }
  },
  props: {
    // 是否显示边框线
    border: null,
    // 自定义组件类 class
    customClass: null,
    // 自定义左侧标题类 class
    titleClass: null,
    // 自定义右侧文本类 class
    textClass: null,
    // 自定义组件样式
    customStyle: null,
    // 自定义左侧标题样式
    titleStyle: null,
    // 自定义右侧文本样式
    textStyle: null
  },
}
</script>
