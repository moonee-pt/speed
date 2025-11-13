import { describe, it, expect } from 'vitest';
import { formatDate, formatNumber } from './formatters';

describe('formatDate函数测试', () => {
  it('应该正确格式化有效的日期对象', () => {
    // 2024年12月25日
    const date = new Date(2024, 11, 25);
    expect(formatDate(date)).toBe('2024-12-25');
  });

  it('应该正确格式化月份和日期需要补零的情况', () => {
    // 2023年1月5日
    const date = new Date(2023, 0, 5);
    expect(formatDate(date)).toBe('2023-01-05');
  });

  it('应该抛出TypeError当参数不是Date对象时', () => {
    expect(() => formatDate('2024-12-25')).toThrow(TypeError);
    expect(() => formatDate(null)).toThrow(TypeError);
    expect(() => formatDate(undefined)).toThrow(TypeError);
  });
});

describe('formatNumber函数测试', () => {
  it('应该正确格式化普通数字', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('应该正确格式化小数', () => {
    expect(formatNumber(1234.567)).toBe('1,234.567');
  });

  it('应该正确处理小于1000的数字', () => {
    expect(formatNumber(42)).toBe('42');
    expect(formatNumber(999)).toBe('999');
  });

  it('应该正确处理负数', () => {
    expect(formatNumber(-1234567)).toBe('-1,234,567');
  });

  it('应该抛出TypeError当参数不是数字时', () => {
    expect(() => formatNumber('1234')).toThrow(TypeError);
    expect(() => formatNumber(null)).toThrow(TypeError);
    expect(() => formatNumber(undefined)).toThrow(TypeError);
  });
});