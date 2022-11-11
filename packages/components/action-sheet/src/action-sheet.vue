<template>
  <vc-popup :visible="visible" position="bottom" :round="round" :duration="duration" :close-on-click-overlay="closeOnClickOverlay" @click-overlay="clickOverlay">
    <view :class="['vc-popup-container', round ? 'vc-popup--round' : null]" :style="styled">
      <view v-for="(item,index) in data" :key="index" class="vc-action-sheet-item vc-hairline--bottom" @click="onSelect(item)">
        <view :class="['vc-action-sheet--flex', item.disabled ? 'vc-action-sheet--disabled' : 'tap-effect']">
          <view class="vc-action-sheet-info">
            <view class="vc-action-sheet__title" :style="{'color': value === item[valueProp] ? color : 'inherit'}">{{item[textProp]}}</view>
          </view>
        </view>
      </view>
      <template v-if="showCancel">
        <view class="vc-action-sheet__gap"></view>
        <vc-button size="large" :border="false" plain block color="#737373" @click="cancel">{{cancelText}}</vc-button>
      </template>
    </view>
  </vc-popup>
</template>

<script>
import { addUnit } from '../../common/util';
import '../style'

export default {
  name: 'vc-action-sheet',
  props: {
    // 显示开关 - 透传 popup 组件
    visible: {
      type: Boolean,
      default: false,
    },
    // 渲染源数据
    data: {
      type: Array,
      default: () => []
    },
    // 激活的值
    value: null,
    // height 默认自适应，如果内容过多，需要设置高度防止内容过溢出屏幕
    height: {
      type: [Number, String],
      default: 'auto',
    },
    // 是否显示圆角 - 透传 popup 组件
    round: {
      type: Boolean,
      default: false,
    },
    // 动画时长 ms - 透传 popup 组件
    duration: {
      type: Number,
      default: 300,
    },
    // 激活的颜色
    color: {
      type: String,
      default: '#3264DC'
    },
    // 是否显示取消按钮 - 透传 popup 组件
    showCancel: {
      type: Boolean,
      default: false,
    },
    // 取消按钮文案 - 透传 popup 组件
    cancelText: {
      type: String,
      default: '取消',
    },
    // 点击遮罩是否关闭菜单 - 透传 popup 组件
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    // 是否在点击选项后关闭
    closeOnClickAction: {
      type: Boolean,
      default: true,
    },
    // 文本属性映射
    textProp: {
      type: String,
      default: 'title',
    },
    // 值属性映射
    valueProp: {
      type: String,
      default: 'value',
    },
    // 值没有变化时是否触发刷新
    refresh: {
      type: Boolean,
      default: false
    },
    // 自定义组件样式
    customStyle: null
  },
  computed: {
    styled() {
      let style = '';
      style += `height: ${addUnit(this.height)};`;
      style += `color: #252525;`;
      return style + this.customStyle;
    },
  },
  methods: {
    onSelect(item) {
      if (item.disabled) return;
      if (this.value === item[this.valueProp] && !this.refresh) return;
      this.$emit('select', item);
      this.closeOnClickAction && this.close();
    },
    clickOverlay() {
      if (!this.closeOnClickOverlay) return;
      this.close();
    },
    cancel() {
      this.$emit('cancel');
      this.$emit('update:visible', false);
    },
    close() {
      this.$emit('close');
      this.$emit('update:visible', false);
    },
  }
};
</script>
