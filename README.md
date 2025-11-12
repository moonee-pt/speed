# speed 项目



## 技术栈

### 前端
- **框架**: React 18
- **构建工具**: Vite
- **UI库**: Ant Design
- **HTTP客户端**: Axios
- **状态管理**: React Context API (或Redux，根据需求选择)

### 后端
- **运行环境**: Node.js
- **Web框架**: Express
- **数据库**: MongoDB
- **身份验证**: JWT (JSON Web Tokens)
- **ORM**: Mongoose

## 项目结构

```
├── frontend/            # 前端项目
│   ├── public/          # 静态资源
│   ├── src/             # 源代码
│   │   ├── components/  # 组件
│   │   ├── pages/       # 页面
│   │   ├── assets/      # 资源文件
│   │   ├── utils/       # 工具函数
│   │   ├── App.jsx      # 应用入口组件
│   │   └── main.jsx     # 应用入口文件
│   └── package.json     # 前端依赖配置
├── backend/             # 后端项目
│   ├── src/             # 源代码
│   │   ├── routes/      # 路由
│   │   ├── controllers/ # 控制器
│   │   ├── models/      # 数据模型
│   │   ├── utils/       # 工具函数
│   │   └── server.js    # 服务器入口
│   ├── .env             # 环境变量
│   └── package.json     # 后端依赖配置
├── .gitignore           # Git忽略文件
└── README.md            # 项目说明文档
```

## 开发指南

### 前置要求
- Node.js 16.x 或更高版本
- MongoDB 4.x 或更高版本
- npm 或 yarn

### 前端开发
1. 进入前端目录：`cd frontend`
2. 安装依赖：`npm install` 或 `yarn install`
3. 启动开发服务器：`npm run dev` 或 `yarn dev`

### 后端开发
1. 进入后端目录：`cd backend`
2. 安装依赖：`npm install` 或 `yarn install`
3. 确保MongoDB已启动
4. 启动开发服务器：`npm run dev` 或 `yarn dev`

## 注意事项
- 确保配置正确的环境变量（特别是MongoDB连接信息）
- 开发环境下使用.env文件管理配置
- 生产环境部署时应使用实际的环境变量或安全的配置管理方案
- 遵循前端和后端的代码规范

## 许可证
该项目未指定许可证。
