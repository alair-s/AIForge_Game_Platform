# AI游戏创作者中心前端项目

基于Vue3 + Element Plus + TypeScript + Three.js开发的FPS游戏皮肤创作和交易平台前端。

## 技术栈

- **框架**: Vue3 + TypeScript
- **UI组件库**: Element Plus
- **路由**: Vue Router
- **状态管理**: Pinia
- **3D渲染**: Three.js
- **构建工具**: Vite
- **样式**: Tailwind CSS

## Demo（开发中）
http://askein.top:3333/

## 项目结构

```
front/
├── src/
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   │   └── ModelViewer.vue
│   ├── layouts/          # 布局组件
│   │   └── DefaultLayout.vue
│   ├── pages/            # 页面组件
│   │   ├── HomePage.vue
│   │   ├── CreateCenter.vue
│   │   ├── Marketplace.vue
│   │   └── UserProfile.vue
│   ├── stores/           # 状态管理
│   │   └── user.ts
│   ├── router/           # 路由配置
│   │   └── index.ts
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript类型定义
│   ├── api/              # API接口
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── public/               # 公共资源
├── package.json          # 项目依赖
├── tsconfig.json         # TypeScript配置
├── vite.config.ts        # Vite配置
└── tailwind.config.js    # Tailwind配置
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 开发环境运行

```bash
pnpm run dev
```

### 3. 生产环境构建

```bash
pnpm run build
```

## 核心功能

### 1. 首页 (HomePage)
- 展示平台特色和热门作品
- 创作者排行榜
- 平台数据统计
- 快速开始引导

### 2. 创作中心 (CreateCenter)
- 多步骤AI皮肤生成流程
- 支持文本描述生成
- 支持图片参考生成
- 支持风格模板生成
- 实时3D预览

### 3. 交易市场 (Marketplace)
- 作品浏览和搜索
- 多维度筛选（类型、风格、价格等）
- 作品详情展示
- 购买和收藏功能

### 4. 3D预览 (ModelViewer)
- Three.js集成
- 支持多种模型格式
- 交互式3D展示
- 纹理和材质切换

### 5. 用户中心 (UserProfile)
- 个人信息管理
- 作品管理
- 订单管理
- 收益统计

## 页面路由

- `/` - 首页
- `/create` - 创作中心
- `/marketplace` - 交易市场
- `/preview/:id` - 3D预览
- `/profile` - 用户中心
- `/login` - 登录页面

## 状态管理

使用Pinia进行状态管理，主要模块：

- `user` - 用户状态管理
- `works` - 作品状态管理
- `marketplace` - 交易市场状态管理

## 3D功能

使用Three.js实现3D模型展示：

- 支持OBJ、FBX、GLTF等格式
- 交互式相机控制
- 材质和纹理切换
- 光照和阴影效果

## API集成

所有API请求通过统一的API客户端处理：

- 自动Token管理
- 错误处理
- 请求拦截
- 响应格式化

## 响应式设计

使用Tailwind CSS实现响应式布局：

- 移动端优先
- 自适应网格系统
- 弹性布局
- 媒体查询

## 开发规范

### 组件规范

- 组件文件使用PascalCase命名
- 组件内部逻辑清晰分离
- 合理使用TypeScript类型
- 遵循Vue3 Composition API规范

### 代码风格

- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循团队约定的代码规范

### 性能优化

- 组件懒加载
- 图片懒加载
- 虚拟滚动
- 缓存策略

## 部署说明

### 环境变量

- `VITE_API_BASE_URL` - API基础地址
- `VITE_APP_TITLE` - 应用标题
- `VITE_APP_ENV` - 应用环境

### 构建配置

生产环境构建会自动：
- 代码压缩
- 资源优化
- 按需加载
- 缓存策略

## 开发计划

### 第一阶段（已完成）
- [x] 项目初始化
- [x] 基础页面搭建
- [x] 路由配置
- [x] 状态管理
- [x] 3D预览功能

### 第二阶段（进行中）
- [ ] API集成
- [ ] 用户认证
- [ ] 作品管理
- [ ] 交易功能

### 第三阶段（计划中）
- [ ] AI集成功能
- [ ] 高级搜索
- [ ] 社交功能
- [ ] 移动端优化

## 许可证

MIT License