# AI 迁移指令 - 登录页适配

## 指令概述

本指令用于指导 AI 助手将 vue-vben-admin v2.11.5 的登录页业务代码迁移到 v5.7.0 web-antd 工程。

## 核心规则

### 1. 严格遵守架构约束

- 只读 v2 旧项目，绝不修改、删除原 v2 任何源码
- 所有操作只在 v5.7.0 工程内执行
- 严格遵守 v5 monorepo 结构
- 禁止修改 packages/@core 内核文件
- 禁止覆盖 apps/web-antd/src/views/\_core 核心页面

### 2. 迁移原则

- 全程统一使用 v5 原生页面与原生基础组件
- 仅从 v2 迁移业务相关内容：业务接口、权限配置、表单字段、校验规则、自定义 LOGO、系统标题、文案、专属业务逻辑
- 只迁移业务代码、只做版本兼容修复
- 禁止重构业务、禁止删减逻辑、禁止私自优化、禁止额外新增功能

### 3. 增量迁移规则

#### 3.1 import 来源分类与处理方式

| import 来源 | 处理方式 | 说明 |
| --- | --- | --- |
| **v2 核心代码** | 检查 v5 是否有可替换的，如果有就用 v5 的 | 例如 `useMessage` → `ant-design-vue message` |
| **v2 业务代码** | 按照同样的规则递归迁移 | 例如自定义的 API、store、hooks 等 |
| **第三方库** | 直接使用，不做修改 | 例如 `crypto-js`、`axios` 等 |
| **v5 已有的功能** | 直接使用 v5 的 | 不需要重复迁移 |

#### 3.2 递归迁移规则

如果被迁移的代码中还有 import，就按照同样的规则一直递归下去：

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

## 差异规范

| v2 | v5 | 说明 |
| --- | --- | --- |
| `visible` | `open` | Ant Design Vue 4.x 属性变化 |
| `prop` | `name` | 表单字段属性变化 |
| `validateFields` | `validate` | 表单验证方法变化 |
| 路径别名 `/@/` | `#/` | Vite 别名配置 |
| `process.env` | `import.meta.env` | Vite 环境变量 |
| `defHttp` | `requestClient` | API 请求封装 |
| `ContentTypeEnum.FORM_URLENCODED` | `'application/x-www-form-urlencoded'` | Content-Type 直接使用字符串 |

## 迁移执行指令

### 1. 分析 v2 登录相关文件

读取以下 v2 文件并分析其 import：

```typescript
// v2/src/api/basic/user.ts
import { defHttp } from '/@/utils/http/axios';
import { LoginParams } from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { getTsaAppId } from '/@/utils/tsa';
```

### 2. 按 import 来源分类处理

| import | 来源 | 处理方式 |
| --- | --- | --- |
| `defHttp` | v2 核心 | 使用 v5 的 `requestClient` |
| `LoginParams` | v2 业务 | 迁移类型定义 |
| `ContentTypeEnum` | v2 核心 | 直接使用字符串 `'application/x-www-form-urlencoded'` |
| `getTsaAppId` | v2 核心 | 迁移函数功能 |

### 3. 递归处理被依赖的文件

继续分析 `cipher.ts`、`useGlobSetting` 等文件的 import：

```typescript
// v2/src/utils/cipher.ts
import { encrypt, decrypt } from 'crypto-js/aes'; // 第三方库 → 直接使用
import { parse } from 'crypto-js/enc-utf8'; // 第三方库 → 直接使用
import { useGlobSetting } from '/@/hooks/setting'; // v2 核心 → 需要迁移
```

### 4. API 调用适配

#### v2 defHttp 调用方式：

```typescript
defHttp.post({
  url: Api.Login,
  params,
  headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
});
defHttp.get({ url: Api.GetUserInfo, data: { systemCode } });
```

#### v5 requestClient 调用方式：

```typescript
// POST 请求
requestClient.post(url, data, config);
// config 中的 headers 使用字符串
requestClient.post(Api.Login, params, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

// GET 请求
requestClient.get(url, { params: { key: value } });
requestClient.get(Api.GetUserInfo);
```

### 5. 响应数据处理

v5 的 `requestClient` 配置了 `responseReturn: 'data'`，所以：

| v2               | v5          |
| ---------------- | ----------- |
| `res.data.token` | `res.token` |
| `res.data`       | `res`       |

### 6. 环境变量适配

| v2                        | v5                            |
| ------------------------- | ----------------------------- |
| `process.env.VITE_GLOB_*` | `import.meta.env.VITE_GLOB_*` |
| `isDevMode()`             | `import.meta.env.DEV`         |
| `isProdMode()`            | `import.meta.env.PROD`        |

## 通用适配规则总结

### 路径别名替换

```bash
s|/@/|#/|g
s|/#/|#/|g
```

### API 调用替换

```bash
s|defHttp\.post\(\{ url:|requestClient.post(|g
s|defHttp\.get\(\{ url:|requestClient.get(|g
s|defHttp\.put\(\{ url:|requestClient.put(|g
s|defHttp\.delete\(\{ url:|requestClient.delete(|g
s|params:|data:|g
s|data: \{|params: {|g
```

### Content-Type 替换

```bash
s|ContentTypeEnum\.FORM_URLENCODED|'application/x-www-form-urlencoded'|g
```

### 环境变量替换

```bash
s|process\.env\.|import\.meta\.env\.|g
s|isDevMode\(\)|import\.meta\.env\.DEV|g
s|isProdMode\(\)|import\.meta\.env\.PROD|g
```

### 响应数据处理

```typescript
// v2: const { token } = res.data;
// v5: const { token } = res; // 因为 responseReturn: 'data'
```

## 输出要求

每次迁移完成后，必须输出以下内容：

1. 本次修改的文件路径清单
2. 从 v2 迁移的业务内容
3. 版本兼容改造点
4. 已修复报错项
5. 沉淀可复用通用修改指令

## 验证清单

- [x] TypeScript 类型检查通过
- [x] API 接口导入正确
- [x] 登录逻辑适配完成
- [x] 密码加密逻辑实现（使用 v2 的 cipherKey）
- [x] 依赖引入正确
- [x] 响应数据处理正确
- [x] 状态管理适配正确
- [x] 构建成功
