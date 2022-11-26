/**
 * 数值单位格式化
 * @param {string/number} val
 * @param {string} [unit = rpx | px]
 */
export function addUnit(val, unit = 'rpx') {
  if (!Number(val)) return val;
  return (unit === 'rpx' ? (val * 2) : val) + unit;
}

/**
 * 获取元素节点信息
 * @param {string} 实例 this
 * @param {string} 选择器
 */
export function getRect(context, selector) {
  return new Promise(
    (resolve) => {
      wx.createSelectorQuery()
        .in(context)
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]));
    }
  );
}

/**
 * 缓动动画
 */
export function requestAnimationFrame() {
  return new Promise((resolve) => {
    const systemInfo = uni.getSystemInfoSync();
    if (systemInfo.platform === 'devtools') {
      return setTimeout(function () {
        resolve();
      }, 1000 / 30);
    }
    return wx
      .createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(function () {
        resolve();
      });
  });
}

/**
 * 日期格式化
 * @param {string | number} value 时间 / 时间戳
 * @param {string} [formatter = 'YYYY-MM-DD HH:mm:ss'] 时间格式
 */
export const formatDate = (value, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  const dateReg = /^(?<year>\d{4})?([/-](?<month>\d{1,2}))?([/-](?<day>\d{1,2}))?\s?(?<hour>\d{1,2})?(:(?<minute>\d{1,2}))?(:(?<second>\d{1,2}))?$/;
  let date = new Date();
  let groups = {};
  if (!value) {
    date = new Date();
  } else if (typeof value === 'number') {
    date = new Date(value);
  } else if (typeof value === 'string' && dateReg.test(value)) {
    const matched = value.match(dateReg);
    groups = matched.groups;
  } else if (Object.prototype.toString.call(value) === '[object Date]') {
    date = value;
  } else {
    console.warn('[info] Invalid Date', value);
    return value;
  }

  const Y = groups.year || date.getFullYear() + '';
  const M = groups.month || date.getMonth() + 1;
  const D = groups.day || date.getDate();
  const H = groups.hour || date.getHours();
  const m = groups.minute || date.getMinutes();
  const s = groups.second || date.getSeconds();

  return formatter.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substring(2))
    .replace(/MM/g, String(M).padStart(2, '0'))
    .replace(/DD/g, String(D).padStart(2, '0'))
    .replace(/HH|hh/g, String(H).padStart(2, '0'))
    .replace(/mm/g, String(m).padStart(2, '0'))
    .replace(/ss/g, String(s).padStart(2, '0'));
};

/**
 * merge same style value by order
 */
export function mergeStyle(source, target) {
  if (!source || !target) return source ?? target ?? '';
  const styleReg = /([\w-]+):\s*([^;]+)/ig;
  const sourceStyleObj = {};
  const targetStyleObj = {};
  source.replace(styleReg, function (_, key, val) {
    sourceStyleObj[key] = val;
  });
  target.replace(styleReg, function (_, key, val) {
    targetStyleObj[key] = val;
  });
  const styleObj = Object.assign(sourceStyleObj, targetStyleObj);
  let style = '';
  for (const [key, val] of Object.entries(styleObj)) {
    style += `${style ? ' ' : ''}${key}: ${val.trim()};`;
  }
  return style;
}

/**
 * 版本号比较
 * @param {string} v1
 * @param {string} v2
 */
export function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}
