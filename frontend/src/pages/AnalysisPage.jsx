import { Card, Row, Col, Statistic, Table, Tag, Select } from 'antd'
import { BarChartOutlined, PieChartOutlined, LineChartOutlined, BookOutlined, CheckSquareOutlined, ClockCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

const { Option } = Select

// 模拟统计数据
const statistics = {
  totalArticles: 156,
  approvedArticles: 124,
  pendingArticles: 32,
  monthlyGrowth: 12.5
}

// 模拟实践类型分布数据
const practiceDistribution = [
  { name: '敏捷开发', count: 45, percentage: 28.9 },
  { name: 'DevOps', count: 32, percentage: 20.5 },
  { name: '代码审查', count: 28, percentage: 17.9 },
  { name: '自动化测试', count: 22, percentage: 14.1 },
  { name: '持续集成', count: 18, percentage: 11.5 },
  { name: '其他', count: 11, percentage: 7.1 }
]

// 模拟年度趋势数据
const yearlyTrends = [
  { year: '2019', count: 12 },
  { year: '2020', count: 25 },
  { year: '2021', count: 38 },
  { year: '2022', count: 48 },
  { year: '2023', count: 68 },
  { year: '2024', count: 85 }
]

const AnalysisPage = () => {
  const [timeRange, setTimeRange] = useState('year')

  const handleTimeRangeChange = (value) => {
    setTimeRange(value)
    // 在实际应用中，这里会根据时间范围加载不同的数据
  }

  // 简单的表格列定义
  const practiceColumns = [
    {
      title: '实践类型',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '文章数量',
      dataIndex: 'count',
      key: 'count'
    },
    {
      title: '占比',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value) => <Tag color="blue">{value}%</Tag>
    }
  ]

  const trendColumns = [
    {
      title: timeRange === 'year' ? '年份' : '月份',
      dataIndex: timeRange === 'year' ? 'year' : 'month',
      key: 'time'
    },
    {
      title: '文章数量',
      dataIndex: 'count',
      key: 'count'
    }
  ]

  // 模拟趋势表格数据
  const trendData = timeRange === 'year' ? yearlyTrends : [
    { month: '1月', count: 8 },
    { month: '2月', count: 12 },
    { month: '3月', count: 15 },
    { month: '4月', count: 18 },
    { month: '5月', count: 22 },
    { month: '6月', count: 28 }
  ]

  // 简单的条形图渲染（使用CSS模拟）
  const renderSimpleBarChart = (data) => {
    const maxCount = Math.max(...data.map(item => item.count))
    return (
      <div style={{ padding: 16 }}>
        {data.map((item) => (
          <div key={item.name} style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 100, textAlign: 'right', marginRight: 16 }}>{item.name}</div>
            <div style={{ flex: 1, height: 30, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: '#1890ff',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
            <div style={{ width: 60, marginLeft: 16, fontWeight: 'bold' }}>{item.count}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="page-container">
      <Card title="数据分析概览" style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="总文章数" value={statistics.totalArticles} prefix={<BookOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="已审核文章" value={statistics.approvedArticles} prefix={<CheckSquareOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="待审核文章" value={statistics.pendingArticles} prefix={<ClockCircleOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="月度增长率" value={statistics.monthlyGrowth} suffix="%" />
          </Col>
        </Row>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <PieChartOutlined style={{ marginRight: 8 }} />
                软件实践类型分布
              </span>
            }
            style={{ height: 400 }}
          >
            {renderSimpleBarChart(practiceDistribution)}
            <Table
              columns={practiceColumns}
              dataSource={practiceDistribution}
              pagination={false}
              scroll={{ y: 200 }}
            />
            </Card>
        </Col>
        <Col span={12}>
          <Card
            title={
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <LineChartOutlined style={{ marginRight: 8 }} />
                  文章数量趋势
                </span>
                <Select
                  defaultValue="year"
                  style={{ width: 120 }}
                  onChange={handleTimeRangeChange}
                >
                  <Option value="year">按年度</Option>
                  <Option value="month">按月度</Option>
                </Select>
              </span>
            }
            style={{ height: 400 }}
          >
            {renderSimpleBarChart(trendData)}
            <Table
              columns={trendColumns}
              dataSource={trendData}
              pagination={false}
              scroll={{ y: 200 }}
            />
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AnalysisPage