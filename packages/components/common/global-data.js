/* eslint-disable no-undef */
const appInstance = getApp();

/**
 * 获取全局变量
 * @param {string|array} keys
 */
export function getAppData(keys) {
  if (Array.isArray(keys)) {
    return keys.reduce((acc, cur) => [...acc, appInstance.globalData[cur]], []);
  } else {
    return appInstance.globalData[keys];
  }
}

/**
 * 设置全局变量
 * @param {*} key
 * @param {*} value
 */
export function setAppData(key, value) {
  appInstance.globalData[key] = value;
}
