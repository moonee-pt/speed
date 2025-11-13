import { Layout, Menu, Typography } from 'antd'
import { BookOutlined, CheckSquareOutlined, DatabaseOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import React, { useCallback } from 'react'

// 导入页面组件
import SearchPage from './pages/SearchPage'
import SubmitPage from './pages/SubmitPage'
import ModeratorPage from './pages/ModeratorPage'
import AnalysisPage from './pages/AnalysisPage'
import UserProfilePage from './pages/UserProfilePage'

const { Header, Content, Footer, Sider } = Layout
const { Title, Paragraph } = Typography

// 侧边栏组件，带导航功能
const SideMenu = () => {
  const navigate = useNavigate()
  
  const handleMenuClick = useCallback(({ key }) => {
    switch (key) {
      case '1':
        navigate('/')
        break
      case '2':
        navigate('/submit')
        break
      case '3':
        navigate('/moderator')
        break
      case '4':
        navigate('/analysis')
        break
      case '5':
        navigate('/profile')
        break
      default:
        navigate('/')
    }
  }, [navigate])

  return (
    <Sider width={200} theme="light" breakpoint="lg" collapsedWidth="0">
      <Menu 
        mode="inline" 
        defaultSelectedKeys={['1']} 
        style={{ height: '100%' }}
        onClick={handleMenuClick}
      >
        <Menu.Item key="1" icon={<SearchOutlined />}>
          搜索文章
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
          提交文章
        </Menu.Item>
        <Menu.Item key="3" icon={<CheckSquareOutlined />}>
          审核文章
        </Menu.Item>
        <Menu.Item key="4" icon={<DatabaseOutlined />}>
          数据分析
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />}>
          个人中心
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

// 主要布局组件
const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1890ff' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>SPEED - 软件实践证据数据库</Title>
      </Header>
      <Layout>
        <SideMenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ margin: '24px 0', minHeight: 280, background: 'white', padding: 24 }}>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/moderator" element={<ModeratorPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            SPEED © 2025 版权所有
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  )
}

export default App