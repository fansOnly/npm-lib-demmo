<template>
  <view :class="['vc-cell', `vc-cell-${size}`, isBorder ? 'vc-hairline--bottom' : null, disabled ? 'vc-cell--disabled' : null, customClasses]" :style="wrapperStyled" :hover-class="cellHoverClass" :hover-stay-time="200" @click="onClick">
    <view :class="['vc-cell__title', titleClasses]" :style="titleStyled">
      <template v-if="title">{{title}}</template>
      <slot v-else name="title"></slot>
    </view>
    <view class="vc-cell__right" :style="rightStyled">
      <view :class="['vc-cell__value', textClasses]" :style="textStyled">
        <template v-if="text">{{text}}</template>
        <slot v-else name="text"></slot>
      </view>
      <view v-if="isLink" class="vc-cell__right-icon">
        <!-- slot 命名 right-icon 不支持？？？ -->
        <slot name="icon"><vc-icon name="arrow-right" /></slot>
      </view>
      <slot name="extra"></slot>
    </view>
  </view>
</template>

<script>
import { addUnit } from '../common/util';

export default {
  name: 'vc-cell',
  inject: {
    parent: {
      from: 'cellGroup',
      default: null
    }
  },
  props: {
    // 左侧标题
    title: null,
    // 右侧文本内容
    text: null,
    // 左侧标题宽度，不设置默认为铺满
    titleWidth: {
      type: [String, Number],
      default: 80
    },
    // 高度
    height: {
      type: [Number, String],
      default: 'auto'
    },
    // 是否链接样式，开启右侧图标
    isLink: {
      type: Boolean,
      default: false,
    },
    // 尺寸
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'small', 'mini', 'large'].includes(value);
      }
    },
    // 当 isLink 为 true 可设置高亮颜色
    isLinkActive: {
      type: Boolean,
      default: false
    },
    // 高亮颜色
    linkActiveColor: null,
    // 底部边框线
    border: null,
    // 禁用状态 - 样式，禁用点击交互
    disabled: {
      type: Boolean,
      default: false
    },
    // 微信 view 标签的 hover-class
    hoverClass: {
      type: [String, null],
      default: 'vc-cell-hover-class'
    },
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
  computed: {
    wrapperStyled() {
      let style = '';
      const lineHeight = this.height === 'auto' ? 'auto' : this.height + 'px';
      style += `height: ${lineHeight};`;
      return style + (this.customStyle ?? '') + (this.parent?.customStyle ?? '');
    },
    titleStyled() {
      let style = '';
      if (this.titleWidth) {
        style += `min-width: ${addUnit(this.titleWidth)};`;
      } else {
        style += 'flex: 1;';
      }
      return style + (this.titleStyle ?? '') + (this.parent?.titleStyle ?? '');
    },
    rightStyled() {
      return Number(this.titleWidth) === 0 ? '' : 'flex: 1;';
    },
    textStyled() {
      let style = '';
      if (this.isLinkActive && this.linkActiveColor) {
        style += `color: ${this.linkActiveColor};`;
      }
      return style + (this.textStyle ?? '') + (this.parent?.textStyle ?? '');
    },
    customClasses() {
      return (this.customClass ?? '') + (this.parent?.customClass ?? '');
    },
    titleClasses() {
      return (this.titleClass ?? '') + (this.parent?.titleClass ?? '');
    },
    textClasses() {
      return (this.textClass ?? '') + (this.parent?.textClass ?? '');
    },
    isBorder() {
      return this.border === null ? this.parent?.border : this.border;
    },
    cellHoverClass() {
      return this.isLink ? this.hoverClass : null;
    }
  },
  methods: {
    onClick(evt) {
      if (this.disabled) return;
      this.$emit('click', evt);
    },
  }
};
</script>

<style lang="scss" scoped>
  .vc-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
    &-normal {
      padding: 15px 32rpx;
    }
    &-small {
      padding: 13px 32rpx;
    }
    &-mini {
      padding: 6px 32rpx;
    }
    &-large {
      padding: 18px 32rpx;
    }
  }
  .vc-cell--disabled .vc-cell__title,
  .vc-cell--disabled .vc-cell__value {
    color: $uni-text-color-disabled!important;
    /* #ifdef H5 */
    cursor: not-allowed;
    /* #endif */
  }
  .vc-cell--disabled .vc-cell__right-icon {
    opacity: .6;
  }
  .vc-cell__title {
    text-align: left;
  }
  .vc-cell__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .vc-cell__value {
    flex: 1;
    color: $uni-text-color-sub;
    text-align: right;
  }
  .vc-cell-hover-class {
    background: #fafafa;
  }
</style>
