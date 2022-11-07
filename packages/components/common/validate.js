export const toString = Object.prototype.toString
export const getType = val => toString.call(val).slice(8, -1).toLowerCase()
export const isObject = val => typeof val === 'object' && val !== null
export const isArray = Array.isArray

export const isJsonString = str => {
  return /^\{("(.+)":(.+))\}/.test(str);
};

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
