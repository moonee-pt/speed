# 团队GitHub Actions CI/CD流水线设置指南

本文档提供了如何使用和配置已创建的GitHub Actions工作流文件的详细指南。

## 工作流配置文件概述

已创建以下三个主要的工作流配置文件：

1. **前端工作流**：`.github/workflows/frontend.yml`
   - 处理前端代码的检查、构建和部署

2. **后端工作流**：`.github/workflows/backend.yml`
   - 处理后端代码的检查、构建和部署

3. **综合CI/CD流水线**：`.github/workflows/cicd-pipeline.yml`
   - 整合前端和后端的完整CI/CD流程
   - 并行运行测试和检查
   - 统一管理构建和部署

## 如何将工作流配置文件提交到GitHub

1. 确保已安装Git并配置好GitHub账户

2. 在项目根目录打开命令行终端

3. 添加工作流配置文件到Git暂存区：
   ```bash
   git add .github/workflows/frontend.yml .github/workflows/backend.yml .github/workflows/cicd-pipeline.yml
   ```

4. 提交更改：
   ```bash
   git commit -m "Add GitHub Actions CI/CD workflows"
   ```

5. 推送到GitHub仓库：
   ```bash
   git push origin main  # 或 git push origin develop
   ```

## GitHub Secrets配置

为了确保工作流正常运行，需要在GitHub仓库中设置以下Secrets：

1. 打开GitHub仓库 → Settings → Secrets and variables → Actions → New repository secret

2. 添加以下Secrets：

   ### 后端Secrets：
   - `MONGODB_URI`: MongoDB数据库连接字符串
     - 示例：`mongodb+srv://username:password@cluster0.mongodb.net/production-db?retryWrites=true&w=majority`
   
   - `JWT_SECRET`: JWT签名密钥
     - 建议使用强随机字符串，至少32个字符

   ### 前端Secrets：
   - `REACT_APP_API_URL`: API服务器URL
     - 示例：`https://api.yourdomain.com/api`

## 工作流触发条件

- 推送到`main`或`develop`分支时自动触发
- 提交拉取请求到这些分支时自动触发
- 前端工作流仅在修改前端代码时触发
- 后端工作流仅在修改后端代码时触发

## 工作流功能详解

### 1. 代码检查
- 使用ESLint进行代码质量检查
- 对JavaScript和JSX文件进行语法和风格检查
- 提供警告但不会阻止构建（可根据团队需要调整）

### 2. 构建过程
- 前端：安装依赖、设置环境变量、构建生产版本
- 后端：安装依赖、配置环境变量、准备部署文件

### 3. 安全性
- 使用GitHub Secrets管理敏感信息
- 提供默认回退值确保工作流不会因缺少Secrets而失败
- 设置NODE_ENV为production确保生产环境配置正确

## 如何监控和验证工作流

1. 提交更改后，在GitHub仓库中导航到Actions标签页
2. 查看最近运行的工作流
3. 点击工作流名称可查看详细日志和执行状态
4. 如果遇到问题，查看详细日志找出错误原因

## 自定义和扩展

### 修改工作流配置
- 可以根据项目需要调整Node.js版本
- 可以添加更多的检查步骤（如单元测试、集成测试）
- 可以扩展部署步骤（如部署到云服务）

### 添加更多功能
- 可以添加缓存步骤提高构建速度
- 可以添加代码覆盖率报告
- 可以集成Slack或其他通知服务

## 注意事项

1. 确保`.gitignore`文件正确配置，不要提交敏感信息
2. 定期更新工作流配置以使用最新的Actions版本
3. 对于生产环境部署，建议添加手动审批步骤

## 故障排除

- **工作流未触发**：检查分支名称是否匹配，文件路径是否正确
- **构建失败**：查看详细日志，检查依赖安装和环境变量设置
- **Secrets不生效**：确认Secrets名称正确，重新设置并再次触发工作流

---

如果有任何问题或需要进一步的定制，请参考[GitHub Actions官方文档](https://docs.github.com/en/actions)或联系团队的DevOps工程师。