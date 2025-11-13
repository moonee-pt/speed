import { Card, Form, Input, DatePicker, Upload, Button, Select, InputNumber, message } from 'antd'
import { UploadOutlined, FileTextOutlined, PaperClipOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

const { TextArea } = Input
const { Option } = Select

const SubmitPage = () => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  const handleSubmit = values => {
    console.log('表单提交数据:', values)
    message.success('文章提交成功！等待审核')
    form.resetFields()
    setFileList([])
  }

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    onChange: handleUploadChange,
    beforeUpload: file => {
      // 检查文件类型
      const isBibtex = file.name.endsWith('.bib')
      const isPDF = file.name.endsWith('.pdf')
      if (!isBibtex && !isPDF) {
        message.error(`${file.name} 不是有效的文件类型！请上传 .bib 或 .pdf 文件`)
        return Upload.LIST_IGNORE
      }
      return false // 阻止自动上传，等待表单提交时一起处理
    },
    accept: '.bib,.pdf'
  }

  return (
    <Card title="提交学术文章" className="page-container">
      <Form
        form={form}
        layout="vertical"
        className="form-container"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input placeholder="请输入完整的文章标题"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="作者"
          name="authors"
          rules={[{ required: true, message: '请输入作者信息' }]}
        >
          <Input
            placeholder="多个作者请用英文逗号分隔，例如：张三, 李四, Wang San"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="发表年份"
          name="year"
          rules={[{ required: true, message: '请输入发表年份' }]}
        >
          <DatePicker
            picker="year"
            size="large"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="期刊/会议名称"
          name="journal"
          rules={[{ required: true, message: '请输入期刊或会议名称' }]}
        >
          <Input placeholder="请输入期刊或会议的完整名称"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="卷/期"
          name="volumeIssue"
        >
          <Input placeholder="例如：Vol. 12, No. 3"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="页码"
          name="pages"
        >
          <Input placeholder="例如：123-145"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="DOI"
          name="doi"
        >
          <Input placeholder="请输入DOI号码"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="涉及的软件实践类型"
          name="practices"
          rules={[{ required: true, message: '请至少选择一种实践类型' }]}
        >
          <Select
            mode="multiple"
            placeholder="请选择文章中涉及的软件实践类型"
            size="large"
          >
            <Option value="敏捷开发">敏捷开发</Option>
            <Option value="DevOps">DevOps</Option>
            <Option value="代码审查">代码审查</Option>
            <Option value="持续集成">持续集成</Option>
            <Option value="自动化测试">自动化测试</Option>
            <Option value="Scrum">Scrum</Option>
            <Option value="极限编程">极限编程</Option>
            <Option value="看板方法">看板方法</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="摘要"
          name="abstract"
        >
          <TextArea
            rows={4}
            placeholder="请输入文章摘要（可选）"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="文件上传（BibTeX或PDF）"
          name="files"
        >
          <Upload.Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              点击或拖拽文件到此区域上传
            </p>
            <p className="ant-upload-hint">
              支持单个或批量上传 .bib 和 .pdf 文件
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 0, span: 24 }}
          style={{ textAlign: 'center' }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<FileTextOutlined />}
            style={{ marginRight: 16 }}
          >
            提交文章
          </Button>
          <Button
            type="default"
            onClick={() => {
              form.resetFields()
              setFileList([])
            }}
            size="large"
          >
            重置表单
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default SubmitPage