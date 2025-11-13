import { Card, Input, Button, Select, Table, Tag, Space } from 'antd'
import { SearchOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

const { Search } = Input
const { Option } = Select

// 模拟数据
const mockArticles = [
  {
    id: '1',
    title: '敏捷开发在大型企业中的应用实践',
    authors: '张三, 李四',
    year: '2024',
    journal: '软件工程学报',
    practices: ['敏捷开发', 'Scrum', '持续集成'],
    status: '已审核'
  },
  {
    id: '2',
    title: 'DevOps转型案例研究',
    authors: '王五, 赵六',
    year: '2023',
    journal: '系统工程理论与实践',
    practices: ['DevOps', 'CI/CD', '自动化测试'],
    status: '已审核'
  },
  {
    id: '3',
    title: '代码审查对软件质量的影响',
    authors: '孙七, 周八',
    year: '2023',
    journal: '计算机研究与发展',
    practices: ['代码审查', '静态分析'],
    status: '审核中'
  }
]

const SearchPage = () => {
  const [searchText, setSearchText] = useState('')
  const [practiceFilter, setPracticeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState('year')
  const [filteredData, setFilteredData] = useState(mockArticles)

  const handleSearch = () => {
    // 简单的前端过滤逻辑
    let filtered = mockArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          article.authors.toLowerCase().includes(searchText.toLowerCase())
      const matchesPractice = !practiceFilter || article.practices.includes(practiceFilter)
      const matchesStatus = !statusFilter || article.status === statusFilter
      return matchesSearch && matchesPractice && matchesStatus
    })
    
    // 排序
    filtered.sort((a, b) => {
      if (sortBy === 'year') {
        return parseInt(b.year) - parseInt(a.year)
      }
      return a.title.localeCompare(b.title)
    })
    
    setFilteredData(filtered)
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="#"><strong>{text}</strong></a>
    },
    {
      title: '作者',
      dataIndex: 'authors',
      key: 'authors'
    },
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      width: 80
    },
    {
      title: '期刊',
      dataIndex: 'journal',
      key: 'journal'
    },
    {
      title: '实践类型',
      key: 'practices',
      dataIndex: 'practices',
      render: practices => (
        <Space size="small">
          {practices.map(practice => (
            <Tag color="blue" key={practice}>{practice}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === '已审核' ? 'success' : 'processing'}>
          {status}
        </Tag>
      )
    }
  ]

  return (
    <Card title="搜索研究证据" className="page-container">
      <div style={{ marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <Search
            placeholder="输入标题或作者"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
          <Select
            placeholder="选择实践类型"
            allowClear
            style={{ width: 200 }}
            onChange={setPracticeFilter}
            value={practiceFilter}
          >
            <Option value="敏捷开发">敏捷开发</Option>
            <Option value="DevOps">DevOps</Option>
            <Option value="代码审查">代码审查</Option>
            <Option value="Scrum">Scrum</Option>
          </Select>
          <Select
            placeholder="选择状态"
            allowClear
            style={{ width: 120 }}
            onChange={setStatusFilter}
            value={statusFilter}
          >
            <Option value="已审核">已审核</Option>
            <Option value="审核中">审核中</Option>
          </Select>
          <Select
            placeholder="排序方式"
            style={{ width: 120 }}
            onChange={setSortBy}
            value={sortBy}
          >
            <Option value="year">按年份降序</Option>
            <Option value="title">按标题字母顺序</Option>
          </Select>
        <Button type="primary" icon={<DownloadOutlined />}
          >导出结果</Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
    </Card>
  )
}

export default SearchPage