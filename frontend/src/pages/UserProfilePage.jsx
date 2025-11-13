import { Card, Form, Input, Avatar, Button, Divider, List, Badge, Upload, message, Row, Col } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, EditOutlined, UploadOutlined, HistoryOutlined, StarOutlined, SearchOutlined, CheckSquareOutlined, BookOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

const { TextArea } = Input

// 模拟用户数据
const mockUser = {
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '138****1234',
  avatar: '',
  role: '普通用户',
  bio: '软件工程师，对敏捷开发和DevOps有浓厚兴趣。',
  contributions: {
    submitted: 12,
    approved: 10,
    favorites: 8
  }
}

// 模拟最近活动数据
const mockActivities = [
  { id: '1', type: 'submit', title: 'DevOps转型案例研究', time: '2024-01-20 14:30' },
  { id: '2', type: 'favorite', title: '敏捷开发在大型企业中的应用实践', time: '2024-01-19 09:15' },
  { id: '3', type: 'search', title: '代码审查', time: '2024-01-18 16:45' },
  { id: '4', type: 'approve', title: '自动化测试覆盖率研究', time: '2024-01-17 11:20' }
]

const UserProfilePage = () => {
  const [user, setUser] = useState(mockUser)
  const [editing, setEditing] = useState(false)
  const [form] = Form.useForm()

  const handleEdit = () => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio
    })
    setEditing(true)
  }

  const handleSave = (values) => {
    setUser({ ...user, ...values })
    message.success('个人信息更新成功')
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
  }

  const handleAvatarChange = ({ file }) => {
    // 模拟上传头像
    if (file.status === 'done') {
      message.success(`${file.name} 上传成功`)
      // 在实际应用中，这里会设置真实的头像URL
      setUser({ ...user, avatar: file.thumbUrl || '' })
    } else if (file.status === 'error') {
      message.error(`${file.name} 上传失败`)
    }
    return false // 阻止自动上传
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'submit':
        return <BookOutlined style={{ color: '#1890ff' }} />
      case 'favorite':
        return <StarOutlined style={{ color: '#fadb14' }} />
      case 'search':
        return <SearchOutlined style={{ color: '#52c41a' }} />
      case 'approve':
        return <CheckSquareOutlined style={{ color: '#722ed1' }} />
      default:
        return <HistoryOutlined />
    }
  }

  const getActivityText = (type) => {
    switch (type) {
      case 'submit':
        return '提交了文章'
      case 'favorite':
        return '收藏了文章'
      case 'search':
        return '搜索了关键词'
      case 'approve':
        return '审核了文章'
      default:
        return '进行了操作'
    }
  }

  return (
    <div className="page-container">
      <Card title="个人信息" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <Upload
             name="avatar"
             listType="picture-card"
             className="avatar-uploader"
             showUploadList={false}
             beforeUpload={handleAvatarChange}
           >
             <Avatar
               size={128}
               icon={user.avatar ? null : <UserOutlined />}
               src={user.avatar}
               style={{ cursor: 'pointer' }}
             />
           </Upload>
          <div style={{ marginLeft: 24 }}>
            <h2 style={{ marginBottom: 8 }}>{user.name}</h2>
            <p style={{ color: '#666', marginBottom: 8 }}>{user.role}</p>
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}
              >编辑资料</Button>
          </div>
        </div>

        {editing ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            className="form-container"
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input size="large"
                 prefix={<UserOutlined />}
               />
             </Form.Item>
             <Form.Item
               label="邮箱"
               name="email"
               rules={[{ required: true, type: 'email', message: '请输入有效的邮箱地址' }]}
             >
               <Input size="large"
                 prefix={<MailOutlined />}
               />
             </Form.Item>
             <Form.Item
               label="电话"
               name="phone"
             >
               <Input size="large"
                 prefix={<PhoneOutlined />}
               />
             </Form.Item>
             <Form.Item
               label="个人简介"
               name="bio"
             >
               <TextArea rows={4}
                 size="large"
                 placeholder="请输入个人简介"
               />
             </Form.Item>
             <Form.Item wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'center' }}>
               <Button type="primary" htmlType="submit" size="large"
                 style={{ marginRight: 16 }}
               >保存</Button>
               <Button onClick={handleCancel} size="large">取消</Button>
             </Form.Item>
           </Form>
        ) : (
          <div>
            <div style={{ lineHeight: 1.8 }}>
              <p style={{ marginBottom: 8 }}>
                <MailOutlined style={{ marginRight: 8 }} />
                <strong>邮箱：</strong>{user.email}
              </p>
              <p style={{ marginBottom: 8 }}>
                <PhoneOutlined style={{ marginRight: 8 }} />
                <strong>电话：</strong>{user.phone}
              </p>
              <p style={{ marginBottom: 8 }}>
                <strong>个人简介：</strong>
              </p>
              <p style={{ marginLeft: 24, color: '#666' }}>{user.bio}</p>
            </div>
          </div>
        )}
      </Card>

       <Row gutter={16}>
         <Col span={12}>
           <Card title="贡献统计" style={{ marginBottom: 24 }}>
             <div style={{ display: 'flex', justifyContent: 'space-around', padding: 24 }}>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1890ff' }}>{user.contributions.submitted}</div>
                 <div style={{ color: '#666', marginTop: 8 }}>提交文章</div>
               </div>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: 36, fontWeight: 'bold', color: '#52c41a' }}>{user.contributions.approved}</div>
                 <div style={{ color: '#666', marginTop: 8 }}>审核通过</div>
               </div>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: 36, fontWeight: 'bold', color: '#fadb14' }}>{user.contributions.favorites}</div>
                 <div style={{ color: '#666', marginTop: 8 }}>收藏文章</div>
               </div>
             </div>
           </Card>
         </Col>
         <Col span={12}>
           <Card title="最近活动" style={{ marginBottom: 24 }}>
              <List
                dataSource={mockActivities}
                renderItem={(item) => (
                  <List.Item
                    actions={[<span style={{ color: '#666' }}>{item.time}</span>]}
                    avatar={getActivityIcon(item.type)}
                    title={
                      <span style={{ fontSize: 14 }}>
                        您{getActivityText(item.type)}：<a href="#">{item.title}</a>
                      </span>
                    }
                  />
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
  )
}

export default UserProfilePage