# v2.11.5 与 v5.7.0 完整差异清单

## 目录
1. [项目架构差异](#1-项目架构差异)
2. [依赖版本差异](#2-依赖版本差异)
3. [路径别名差异](#3-路径别名差异)
4. [核心功能模块差异](#4-核心功能模块差异)
5. [构建配置差异](#5-构建配置差异)
6. [开发体验差异](#6-开发体验差异)
7. [技术栈升级](#7-技术栈升级)
8. [架构设计差异](#8-架构设计差异)
9. [配置管理差异](#9-配置管理差异)
10. [代码质量保障](#10-代码质量保障)
11. [项目启动差异](#11-项目启动差异)
12. [关键 API 差异](#12-关键-api-差异)
13. [迁移注意事项](#13-迁移注意事项)

---

## 1. 项目架构差异

| 项目 | v2 | v5 | 说明 |
| --- | --- | --- | --- |
| **项目结构** | 单项目结构 | Monorepo 结构（pnpm workspace） | v5 采用 monorepo 管理多个应用 |
| **核心模块** | src 目录 | packages/ 和 apps/ 分离 | v5 将核心代码拆分到 packages/@core |
| **业务代码** | src 目录平铺 | apps/web-antd/src/ | 业务代码在 apps 目录下 |
| **类型定义** | src/#/config | src/types/ | v5 使用 types 目录 |

---

## 2. 依赖版本差异

| 依赖 | v2 版本 | v5 版本 |
| --- | --- | --- |
| **vue** | 3.3.4 | 3.5.32 |
| **vue-router** | 4.2.1 | 5.0.4 |
| **pinia** | 2.1.3 | 3.0.4 |
| **ant-design-vue** | 3.2.20 | 4.2.6 |
| **vite** | 4.3.8 | 8.0.8 |
| **typescript** | 5.0.4 | 6.0.2 |
| **@vben/*** | - | 5.7.0 |
| **pnpm** | 8+ | 10+ |

---

## 3. 路径别名差异

| v2 | v5 | 说明 |
| --- | --- | --- |
| `/@/` | `#/` | 指向 src 目录 |
| `/#/` | `#/` | 指向 types 目录 |
| `/@/utils/` | `#/utils/` | 工具函数 |
| `/@/api/` | `#/api/` | API 接口 |
| `/@/hooks/` | `#/hooks/` | Hooks |
| `/@/store/` | `@vben/stores` | 状态管理 |

---

## 4. 核心功能模块差异

| 模块 | v2 | v5 | 说明 |
| --- | --- | --- | --- |
| **状态管理** | 本地 store 目录 | @vben/stores 包 | v5 使用 @vben/stores |
| **路由管理** | 传统路由配置 | 模块化路由（dynamicRoutes） | v5 支持动态路由 |
| **API 请求** | defHttp（axios 封装） | requestClient（@vben/request） | v5 统一请求封装 |
| **布局组件** | 自定义布局 | @vben/layouts | v5 使用统一布局组件 |
| **权限控制** | 自定义权限模块 | @vben/stores 的 useAccessStore | v5 权限更完善 |
| **国际化** | vue-i18n | @vben/locales | v5 统一国际化方案 |

---

## 5. 构建配置差异

| 配置项 | v2 | v5 | 说明 |
| --- | --- | --- | --- |
| **构建工具** | Vite 4.x | Vite 8.x | v5 使用最新版 Vite |
| **TypeScript** | 5.0.4 | 6.0.2 | v5 使用新版 TS |
| **CSS 预处理器** | less | less/sass/stylus | v5 支持更多选择 |
| **环境变量** | process.env | import.meta.env | v5 使用 Vite 原生方式 |
| **依赖优化** | 详细的 optimizeDeps 配置 | 简化的配置 | v5 依赖管理更智能 |

---

## 6. 开发体验差异

| 体验项 | v2 | v5 | 说明 |
| --- | --- | --- | --- |
| **开发服务器** | 详细的 server 配置 | 简化的配置 | v5 开发服务器配置更直观 |
| **类型检查** | vue-tsc 命令 | 统一的 typecheck 脚本 | v5 类型检查更规范化 |
| **代码风格** | eslint + prettier + stylelint | 同样的工具链，但配置更统一 | v5 代码风格管理更一致 |
| **测试支持** | 基本测试配置 | 完善的单元测试和 e2e 测试 | v5 测试覆盖率更高 |
| **部署支持** | 基本部署配置 | 包括 docker 部署支持 | v5 部署选项更丰富 |
| **包管理** | pnpm | pnpm (更新版本) | v5 使用 pnpm 10+ |
| **Node.js 版本** | >=18.12.0 | ^20.19.0 | v5 要求更高的 Node.js 版本 |

---

## 7. 技术栈升级

| 技术 | v2 | v5 | 升级内容 |
| --- | --- | --- | --- |
| **Vue** | 3.3.4 | 3.5.32 | 响应式系统优化、Composition API 增强 |
| **Vue Router** | 4.2.1 | 5.0.4 | 路由组织更灵活 |
| **Pinia** | 2.1.3 | 3.0.4 | 更好的 TypeScript 支持 |
| **Vite** | 4.3.8 | 8.0.8 | 构建速度更快 |
| **TypeScript** | 5.0.4 | 6.0.2 | 类型检查更严格 |

---

## 8. 架构设计差异

| 设计 | v2 | v5 |
| --- | --- | --- |
| **模块化** | 基本模块化 | 完全模块化（Monorepo） |
| **核心库** | 自定义封装 | @vben/* 官方封装 |
| **业务隔离** | 平铺结构 | apps 目录隔离 |
| **主题系统** | less 变量 | CSS 变量 + Tailwind CSS 支持 |

---

## 9. 配置管理差异

| 配置 | v2 | v5 | 说明 |
| --- | --- | --- | --- |
| **环境变量** | .env 文件 | .env 文件 + import.meta.env | v5 使用 Vite 原生方式 |
| **主题配置** | projectSetting.ts | preferences.ts | v5 配置更集中 |
| **路由配置** | 静态路由 | 静态+动态路由 | v5 支持动态路由 |
| **状态持久化** | 本地缓存 | @vben/stores 统一管理 | v5 更安全 |

---

## 10. 代码质量保障

| 保障 | v2 | v5 | 说明 |
| --- | --- | --- | --- |
| **ESLint** | ✅ | ✅ | 代码规范检查 |
| **Prettier** | ✅ | ✅ | 代码格式化 |
| **Stylelint** | ✅ | ✅ | 样式规范检查 |
| **TypeScript** | ✅ | ✅ | 类型检查 |
| **单元测试** | 基本 | vitest +覆盖率 | v5 测试更完善 |
| **Git Hooks** | ✅ | ✅ | lefthook |

---

## 11. 项目启动差异

| 命令 | v2 | v5 | 说明 |
| --- | --- | --- | --- |
| **开发** | pnpm dev | pnpm dev:antd | v5 需要指定应用 |
| **构建** | pnpm build | pnpm build | 相同 |
| **类型检查** | vue-tsc | pnpm typecheck | v5 统一命令 |
| **Lint** | eslint + prettier | pnpm lint | v5 统一命令 |

---

## 12. 关键 API 差异

### 12.1 API 请求差异

| v2 | v5 | 说明 |
| --- | --- | --- |
| `defHttp.post({ url, params })` | `requestClient.post(url, data, config)` | 请求格式变化 |
| `defHttp.get({ url, data })` | `requestClient.get(url, { params })` | GET 请求参数格式 |
| `ContentTypeEnum.FORM_URLENCODED` | `'application/x-www-form-urlencoded'` | Content-Type 直接使用字符串 |

### 12.2 v5 requestClient 正确使用方式

```typescript
// POST 请求
requestClient.post(url, data, config);

// GET 请求
requestClient.get(url, { params: { key: value } });

// 请求配置
requestClient.post(url, data, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 30000,
});
```

### 12.3 响应拦截器配置

```typescript
// requestClient 配置
client.addResponseInterceptor(
  defaultResponseInterceptor({
    codeField: 'code',        // 状态码字段
    dataField: 'data',        // 数据字段
    successCode: 0,           // 成功状态码
  }),
);

// 返回值直接是 data 字段
const { accessToken } = await requestClient.post(url, data);
// accessToken 就是 responseData.data.accessToken
```

---

## 13. 迁移注意事项

### 13.1 增量迁移核心规则

**增量迁移原则**：只迁移业务代码，核心代码优先使用 v5 原生实现。

#### 13.1.1 import 来源分类与处理方式

| import 来源 | 处理方式 | 说明 |
| --- | --- | --- |
| **v2 核心代码** | 检查 v5 是否有可替换的，如果有就用 v5 的 | 例如 `useMessage` → `ant-design-vue message` |
| **v2 业务代码** | 按照同样的规则递归迁移 | 例如自定义的 API、store、hooks 等 |
| **第三方库** | 直接使用，不做修改 | 例如 `crypto-js`、`axios` 等 |
| **v5 已有的功能** | 直接使用 v5 的 | 不需要重复迁移 |

#### 13.1.2 递归迁移规则

如果被迁移的代码中还有 import，就按照同样的规则一直递归下去。

```
迁移文件
├── v2 核心代码（如 useMessage）
│   └── v5 有替换 → 使用 v5 的
├── v2 业务代码（如自定义 hook）
│   └── 递归处理其 import
│       ├── v2 核心代码 → 检查 v5
│       ├── v2 业务代码 → 继续迁移
│       └── 第三方库 → 直接使用
└── 第三方库 → 直接使用
```

### 13.2 通用迁移规则

1. **禁止修改 v5 核心文件**：packages/@core 目录下的文件不能修改
2. **禁止覆盖 _core 核心页面**：views/_core 目录下的文件不能覆盖
3. **只迁移业务代码**：只迁移业务相关的 API、配置、样式等
4. **路径别名替换**：`/@/` 替换为 `#/`
5. **API 调用适配**：`defHttp.post({ url, params })` → `requestClient.post(url, data, config)`
6. **Content-Type**：使用字符串 `'application/x-www-form-urlencoded'` 而不是 `ContentTypeEnum.FORM_URLENCODED`
7. **环境变量**：`process.env` → `import.meta.env`
8. **响应数据处理**：v5 的 requestClient 配置了 `responseReturn: 'data'`，返回值直接是 data 字段
9. **状态管理**：使用 v5 的 `@vben/stores`
10. **组件库**：使用 v5 的 `@vben/common-ui` 和 `ant-design-vue` 4.x
11. **API 响应格式差异**：v2 的 `res.data.token` 在 v5 中直接是 `res.token`（因为 responseReturn: 'data'）
12. **requestClient 调用方式**：v5 使用 `requestClient.post(url, data, config)` 而不是 `requestClient.post({ url, data, ... })`

### 13.3 迁移后验证清单

- [ ] TypeScript 类型检查通过
- [ ] 构建成功
- [ ] 开发服务器正常启动
- [ ] 页面渲染正常
- [ ] API 请求正常
- [ ] 无控制台报错
- [ ] 样式显示正常

---

## 总结

从 v2.11.5 升级到 v5.7.0 主要变化：

1. **架构更现代化**：采用 monorepo 结构，模块划分更清晰
2. **依赖版本更先进**：所有核心依赖都升级到最新版本
3. **开发体验更优**：配置更简洁，工具链更统一
4. **代码质量更高**：更严格的类型检查和代码规范
5. **扩展性更强**：模块化设计使扩展更容易

迁移过程需要注意 API 变化和项目结构调整，但升级后会获得更好的开发体验和代码质量。
