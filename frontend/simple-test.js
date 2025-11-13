const assert = require('assert');
const { formatDate, formatNumber } = require('./src/utils/formatters');

// 简单的测试函数
function runTests() {
  console.log('开始运行测试...');
  let passed = 0;
  let failed = 0;

  try {
    // 测试 formatDate
    const date = new Date(2024, 11, 25);
    assert.strictEqual(formatDate(date), '2024-12-25', '日期格式化测试失败');
    console.log('✓ 日期格式化测试通过');
    passed++;

    // 测试 formatNumber
    assert.strictEqual(formatNumber(1234567), '1,234,567', '数字格式化测试失败');
    console.log('✓ 数字格式化测试通过');
    passed++;

    // 测试异常处理
    assert.throws(() => formatDate('not a date'), TypeError, '异常处理测试失败');
    console.log('✓ 异常处理测试通过');
    passed++;

  } catch (error) {
    console.error('✗ 测试失败:', error.message);
    failed++;
  }

  console.log(`\n测试结果: 通过 ${passed} 个, 失败 ${failed} 个`);
  process.exit(failed > 0 ? 1 : 0);
}

// 运行测试
runTests();