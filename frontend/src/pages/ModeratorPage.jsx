import { Card, Table, Button, Tag, Modal, Form, Input, Select, message } from 'antd'
const { TextArea } = Input
import { CheckOutlined, CloseOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

const { Option } = Select

// 模拟待审核文章数据
const mockPendingArticles = [
  {
    id: '3',
    title: '代码审查对软件质量的影响',
    authors: '孙七, 周八',
    year: '2023',
    journal: '计算机研究与发展',
    practices: ['代码审查', '静态分析'],
    submittedBy: 'lisi@example.com',
    submittedAt: '2024-01-15',
    abstract: '本文研究了代码审查对软件质量的影响，通过对多个开源项目的分析，发现代码审查可以显著降低代码缺陷率。'
  },
  {
    id: '4',
    title: '自动化测试覆盖率与缺陷检测关系研究',
    authors: '吴九, 郑十',
    year: '2024',
    journal: '软件测试学报',
    practices: ['自动化测试', '测试覆盖率'],
    submittedBy: 'wangwu@example.com',
    submittedAt: '2024-01-16',
    abstract: '本研究探讨了自动化测试覆盖率与缺陷检测效率之间的关系，提出了优化测试策略的建议。'
  }
]

const ModeratorPage = () => {
  const [articles, setArticles] = useState(mockPendingArticles)
  const [visible, setVisible] = useState(false)
  const [currentArticle, setCurrentArticle] = useState(null)
  const [form] = Form.useForm()

  const showReviewModal = (article) => {
    setCurrentArticle(article)
    form.setFieldsValue({
      practices: article.practices,
      comments: ''
    })
    setVisible(true)
  }

  const handleApprove = () => {
    const values = form.getFieldsValue()
    console.log('审核通过:', currentArticle.title, '评论:', values.comments)
    message.success('审核通过！')
    // 更新文章列表
    setArticles(articles.filter(article => article.id !== currentArticle.id))
    setVisible(false)
  }

  const handleReject = () => {
    const values = form.getFieldsValue()
    if (!values.comments) {
      message.error('请输入拒绝理由')
      return
    }
    console.log('审核拒绝:', currentArticle.title, '理由:', values.comments)
    message.success('已拒绝并发送反馈')
    // 更新文章列表
    setArticles(articles.filter(article => article.id !== currentArticle.id))
    setVisible(false)
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: '作者',
      dataIndex: 'authors',
      key: 'authors',
      ellipsis: true
    },
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      width: 80
    },
    {
      title: '提交时间',
      dataIndex: 'submittedAt',
      key: 'submittedAt'
    },
    {
      title: '提交人',
      dataIndex: 'submittedBy',
      key: 'submittedBy',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showReviewModal(record)}
        >
          审核
        </Button>
      )
    }
  ]

  return (
    <Card title="文章审核" className="page-container">
      <Table
        columns={columns}
        dataSource={articles}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
        locale={{ emptyText: '暂无待审核文章' }}
      />

      <Modal
        title="审核文章"
        open={visible}
        width={800}
        footer={null}
        onCancel={() => setVisible(false)}
      >
          {currentArticle && (
            <div>
              <h3>{currentArticle.title}</h3>
              <p style={{ color: '#666', marginBottom: 16 }}>作者：{currentArticle.authors} | {currentArticle.year} | {currentArticle.journal}</p>
              <div style={{ marginBottom: 16 }}>
                <strong>摘要：</strong>
                <p>{currentArticle.abstract}</p>
              </div>
              <Form form={form} layout="vertical">
              <Form.Item
                label="软件实践类型确认"
                name="practices"
                rules={[{ required: true, message: '请至少选择一种实践类型' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="请确认或调整实践类型"
                  size="large"
                >
                  <Option value="敏捷开发">敏捷开发</Option>
                  <Option value="DevOps">DevOps</Option>
                  <Option value="代码审查">代码审查</Option>
                  <Option value="持续集成">持续集成</Option>
                  <Option value="自动化测试">自动化测试</Option>
                  <Option value="测试覆盖率">测试覆盖率</Option>
                  <Option value="静态分析">静态分析</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="审核意见/拒绝理由"
                name="comments"
              >
                <TextArea
                  rows={4}
                  placeholder="请输入审核意见，拒绝时请务必填写理由"
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'right' }}
                >
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleApprove}
                  style={{ marginRight: 8 }}
                >
                  通过
                </Button>
                <Button
                  danger
                  icon={<CloseOutlined />}
                  onClick={handleReject}
                >
                  拒绝
                </Button>
              </Form.Item>
              </Form>
            </div>
          )}
        </Modal>
    </Card>
  )
}

export default ModeratorPage