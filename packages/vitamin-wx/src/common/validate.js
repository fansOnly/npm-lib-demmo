/**
 * 转换为字符
 * @param {Object} v
 */
export const toString = (v) => {
  return Object.prototype.toString.apply(v);
};

/**
 * 是否 json 字符串
 */
export const isJsonString = str => {
  return /^\{("(.+)":(.+))\}/.test(str);
};

/**
* 是否已定义
* @param {} v
*/
export function isDefined(v) {
  return typeof v !== 'undefined';
}

/**
 * 是否为空
 * @param {} v
 * @param {} allowBlank
 */
export function isEmpty(v, allowBlank) {
  if (isObject(v)) {
    let name;
    for (name in v) {
      return false;
    }
    return true;
  }
  if (isArray(v)) {
    return !v.length;
  }
  return v === null || v === undefined || String(v).toUpperCase() === 'NULL' || (!allowBlank ? v === '' : false);
}

/**
 * 是否是数组
 * @param {} v
 */
export function isArray(v) {
  return toString(v) === '[object Array]';
}

/**
 * 是否是日期
 * @param {} v
 */
export function isDate(v) {
  return toString(v) === '[object Date]' && String(v) !== 'Invalid Date';
}

/**
 * 是否是对象
 * @param {} v
 */
export function isObject(v) {
  return toString(v) === '[object Object]';
}

/**
 * 是否是函数
 * @param {} v
 */
export function isFunction(v) {
  return toString(v) === '[object Function]';
}

/**
 * 是否是 Promise
 * @param {} v
 */
export function isPromise(v) {
  return toString(v) === '[object Promise]';
}

/**
 * 是否是数值型
 * @param {} v
 */
export function isNumber(v) {
  return typeof v === 'number' && isFinite(v);
}

/**
 * 是否是字符型
 * @param {} v
 */
export function isString(v) {
  return typeof v === 'string';
}

/**
 * 是否是布尔型
 * @param {} v
 */
export function isBoolean(v) {
  return typeof v === 'boolean';
}

/**
 * 是否是原始类型
 * @param {} v
 */
export function isPrimitive(v) {
  return isString(v) || isNumber(v) || isBoolean(v);
}

/**
 * 是否可迭代
 * @param {} v
 */
export function isIterable(v) {
  return (v && typeof v !== 'string') ? isDefined(v.length) : false;
}

/**
 * 手机号规则
 */
export function checkMobile(v) {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(String(v));
}

/**
 * 网址验证
 */
export function checkUrl(v) {
  const reg = new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i');
  return reg.test(v);
}

/**
 * 身份证规则
 */
export function checkIdCard(v) {
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]/.test(v);
}

/**
 * 邮箱规则
 * 不能包含特殊字符
 */
export function checkEmail(v) {
  return /^\S+?@\S+?\.\S+?$/.test(String(v));
}
