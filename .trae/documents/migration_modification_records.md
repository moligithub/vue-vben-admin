# 迁移修改记录

## 目录

- [第一阶段：Logo/Title/Favicon 迁移](#第一阶段logotitlefavicon-迁移)
- [第二阶段：登录页适配](#第二阶段登录页适配)

---

## 第二阶段：登录页适配

### 迁移日期：2026-04-20

### 1. 项目结构修改

#### 1.1 新增文件

| 文件路径 | 说明 |
| --- | --- |
| `apps/web-antd/src/api/biz/basic/user.ts` | 迁移 v2 的用户 API 接口 |
| `apps/web-antd/src/api/biz/basic/index.ts` | 导出 biz/basic API |
| `apps/web-antd/src/api/biz/index.ts` | 导出 biz API |
| `apps/web-antd/src/utils/cipher.ts` | 迁移 v2 的加密解密工具 |
| `apps/web-antd/src/views/biz/authentication/LoginForm.vue` | 新建 v2 风格的登录表单组件 |

#### 1.2 修改文件

| 文件路径                         | 说明              |
| -------------------------------- | ----------------- |
| `apps/web-antd/src/api/index.ts` | 添加 biz API 导出 |

### 2. 从 v2 迁移的业务内容

#### 2.1 登录相关 API 接口（13个）

| API 函数 | 说明 | v2 接口 |
| --- | --- | --- |
| `loginApi` | 用户登录 | /bot/authsession/Login |
| `getUserInfoApi` | 获取当前用户信息 | /bot/authsession/CurrentUser |
| `logoutApi` | 退出登录 | /bot/authsession/Logout |
| `unlockApi` | 锁屏解锁 | /bot/authsession/LockScreen |
| `getConfigApi` | 获取系统配置 | /bot/authsession/getConfig/{account} |
| `getLoginConfigApi` | 获取登录配置 | /bot/authsession/getLoginConfig |
| `getTicketApi` | 获取登录票据 | /bot/authsession/getTicket |
| `getTicketStatusApi` | 获取票据状态 | /bot/authsession/getTicketStatus/{ticket} |
| `socialsLoginApi` | 第三方登录 | /bot/authsession/Login/socials |
| `getCodeCertificateApi` | 扫码登陆获取凭证 | /bot/authsession/codeCertificate |
| `getCodeCertificateStatusApi` | 扫码登陆凭证状态 | /bot/authsession/codeCertificateStatus/{ticket} |
| `setCodeCertificateStatusApi` | 设置扫码登陆凭证状态 | /bot/authsession/setCodeCertificateStatus/{ticket}/{status} |
| `getAccessCodesApi` | 获取权限码 | /bot/authsession/getAccessCodes |
| `getImageCodeApi` | 获取图片验证码 | /bot/authsession/ImageCode/{length}/{timestamp} |

#### 2.2 登录业务逻辑

| 功能             | 说明                                       |
| ---------------- | ------------------------------------------ |
| **密码加密**     | MD5 + AES 双重加密                         |
| **验证码**       | 根据配置决定是否显示（账号失焦时请求配置） |
| **上次登录提示** | 显示上次登录时间、地点、IP                 |
| **三方登录**     | 社交登录列表展示                           |
| **SSO登录**      | SSO 单点登录                               |
| **扫码登录**     | 扫码登录流程                               |
| **多登录方式**   | 密码登录/SSO/第三方登录切换                |

#### 2.3 加密解密工具

| 函数              | 说明           |
| ----------------- | -------------- |
| `AesEncryption`   | AES 加密解密类 |
| `encryptByMd5`    | MD5 加密       |
| `encryptByBase64` | Base64 加密    |
| `decodeByBase64`  | Base64 解密    |

### 3. 版本兼容改造点

| 改造项 | v2 | v5 | 处理方式 |
| --- | --- | --- | --- |
| API 调用 | `defHttp.post({ url, params })` | `requestClient.post(url, data, config)` | 适配 requestClient |
| Content-Type | `ContentTypeEnum.FORM_URLENCODED` | `'application/x-www-form-urlencoded'` | 直接使用字符串 |
| 环境变量 | `process.env` | `import.meta.env` | 适配 Vite 语法 |
| 路径别名 | `/@/` | `#/` | 适配 Vite 别名 |
| crypto-js | 子路径导入 `import { encrypt } from 'crypto-js/aes'` | `import CryptoJS from 'crypto-js'` | 从主包导入 |
| 加密 key | `FZ9XfQwkN6HHxRao` | 同 v2 | 保持业务一致性（硬编码在 cipher.ts 中） |
| API 命名 | 与 core 的 getUserInfoApi 冲突 | 使用命名导出 `export { getUserInfoApi } from` | 避免冲突 |

### 4. 已修复报错项

- [x] TypeScript 类型导入错误
- [x] crypto-js 模块导入错误（构建时找不到模块）
- [x] API 命名冲突问题（core 和 biz 都有 getUserInfoApi）
- [x] crypto-js 类型声明缺失
- [x] `CryptoJS.lib.WordArray` 类型问题
- [x] 构建成功

### 5. 沉淀可复用通用修改指令

| 指令类型 | 规则 | 示例 |
| --- | --- | --- |
| 路径别名 | `s\|/@/\|#/\|g` | `/@/hooks/setting` → `#/hooks/setting` |
| API 调用 | `defHttp.post({url, params})` → `requestClient.post(url, data, config)` | 适配 v5 |
| Content-Type | `ContentTypeEnum.FORM_URLENCODED` → `'application/x-www-form-urlencoded'` | 直接使用字符串 |
| 环境变量 | `process.env` → `import.meta.env` | 适配 Vite |
| crypto-js 导入 | `import { encrypt } from 'crypto-js/aes'` → `import CryptoJS from 'crypto-js'` | 从主包导入 |
| API 命名冲突 | 使用命名导出而非 `export *` | `export { loginApi } from './biz/basic'` |
| 页面资源迁移 | 每次迁移页面时，将页面中的 logo、标题等资源全部替换为 v2 项目中的对应资源 | 登录页 logo、标题等资源替换 |

### 6. import 来源分类与处理方式

| import 来源 | 处理方式 | 示例 |
| --- | --- | --- |
| **v2 核心代码** | 检查 v5 是否有可替换的 | `useMessage` → `ant-design-vue message` |
| **v2 业务代码** | 按照同样的规则递归迁移 | 自定义的 API、store、hooks 等 |
| **第三方库** | 直接使用，不做修改 | `crypto-js`、`axios` 等 |
| **v5 已有的功能** | 直接使用 v5 的 | 不需要重复迁移 |

### 7. 验证清单

- [x] TypeScript 类型检查通过
- [x] 构建成功
- [x] 登录相关 API 接口已迁移完成
- [x] 密码加密逻辑已适配
- [x] 登录配置接口已迁移（SSO、三方登录）
- [x] 验证码功能已适配
- [x] crypto-js 已安装
- [x] @types/crypto-js 已安装

---

## 第一阶段：Logo/Title/Favicon 迁移

### 迁移日期：2026-04-19

### 1. 新增文件

| 文件路径                           | 说明                 |
| ---------------------------------- | -------------------- |
| `apps/web-antd/public/logo.png`    | 从 v2 复制的 logo    |
| `apps/web-antd/public/favicon.ico` | 从 v2 复制的 favicon |

### 2. 修改文件

| 文件路径             | 说明                        |
| -------------------- | --------------------------- |
| `apps/web-antd/.env` | VITE_APP_TITLE=PASS开发平台 |

### 3. 迁移内容

- [x] Logo 图片迁移
- [x] Favicon 图标迁移
- [x] 网站标题配置
