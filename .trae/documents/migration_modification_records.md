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
| `apps/web-antd/src/api/biz/basic/model/userModel.ts` | 迁移 v2 的 LoginParams 类型定义 |
| `apps/web-antd/src/api/biz/basic/user.ts` | 迁移 v2 的用户 API 接口 |
| `apps/web-antd/src/api/biz/basic/index.ts` | 导出 biz/basic API |
| `apps/web-antd/src/api/biz/index.ts` | 导出 biz API |
| `apps/web-antd/src/types/config.ts` | 迁移 v2 的 GlobConfig 类型定义 |
| `apps/web-antd/src/utils/env.ts` | 简化版环境变量获取工具 |
| `apps/web-antd/src/hooks/setting/index.ts` | 迁移 v2 的 useGlobSetting hook |
| `apps/web-antd/src/utils/cipher.ts` | 迁移 v2 的加密解密工具 |

#### 1.2 修改文件

| 文件路径 | 说明 |
| --- | --- |
| `apps/web-antd/src/api/index.ts` | 添加 biz API 导出 |

### 2. 从 v2 迁移的业务内容

#### 2.1 登录相关 API 接口

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

#### 2.2 加密解密工具

| 函数 | 说明 |
| --- | --- |
| `AesEncryption` | AES 加密解密类 |
| `encryptByMd5` | MD5 加密 |
| `encryptByBase64` | Base64 加密 |
| `decodeByBase64` | Base64 解密 |

#### 2.3 配置工具

| 函数 | 说明 |
| --- | --- |
| `useGlobSetting` | 全局配置 hook，包含 cipherKey 等 |

### 3. 版本兼容改造点

| 改造项 | v2 | v5 | 处理方式 |
| --- | --- | --- | --- |
| API 调用 | `defHttp.post({ url, params })` | `requestClient.post(url, data, config)` | 适配 requestClient |
| Content-Type | `ContentTypeEnum.FORM_URLENCODED` | `'application/x-www-form-urlencoded'` | 直接使用字符串 |
| 环境变量 | `process.env` | `import.meta.env` | 适配 Vite 语法 |
| 路径别名 | `/@/` | `#/` | 适配 Vite 别名 |
| 加密 key | `useGlobSetting().cipherKey` | 同 v2，保持业务一致性 | 迁移 useGlobSetting |

### 4. 已修复报错项

- [x] TypeScript 类型导入错误
- [x] crypto-js 模块导入错误
- [x] API 命名冲突问题
- [x] 路径别名配置问题
- [x] 构建成功

### 5. 沉淀可复用通用修改指令

| 指令类型 | 规则 | 示例 |
| --- | --- | --- |
| 路径别名 | `s\|/@/\|#/\|g` | `/@/hooks/setting` → `#/hooks/setting` |
| API 调用 | `defHttp.post({url, params})` → `requestClient.post(url, data, config)` | 适配 v5 |
| Content-Type | `ContentTypeEnum.FORM_URLENCODED` → `'application/x-www-form-urlencoded'` | 直接使用字符串 |
| 环境变量 | `process.env` → `import.meta.env` | 适配 Vite |

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
- [x] 加密逻辑已迁移
- [x] 配置工具已迁移

---

## 第一阶段：Logo/Title/Favicon 迁移

### 迁移日期：2026-04-19（已合并）

### 1. 新增文件

| 文件路径 | 说明 |
| --- | --- |
| `apps/web-antd/public/logo.png` | 从 v2 复制的 logo |
| `apps/web-antd/public/favicon.ico` | 从 v2 复制的 favicon |

### 2. 修改文件

| 文件路径 | 说明 |
| --- | --- |
| `apps/web-antd/.env` | VITE_APP_TITLE=PASS开发平台 |

### 3. 迁移内容

- [x] Logo 图片迁移
- [x] Favicon 图标迁移
- [x] 网站标题配置
