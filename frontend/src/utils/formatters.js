// 简单的格式化工具函数

/**
 * 格式化日期为YYYY-MM-DD格式
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('参数必须是Date对象');
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * 格式化数字，添加千位分隔符
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的数字字符串
 */
export function formatNumber(num) {
  if (typeof num !== 'number') {
    throw new TypeError('参数必须是数字');
  }
  
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}