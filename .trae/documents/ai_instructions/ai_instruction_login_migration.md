# AI 迁移指令 - 第一阶段：登录页适配

## 指令概述

本指令用于指导 AI 助手将 vue-vben-admin v2.11.5 的登录页业务代码迁移到 v5.7.0 web-antd 工程。

## 核心规则

### 1. 严格遵守架构约束

- 只读 v2 旧项目，绝不修改、删除原 v2 任何源码
- 所有操作只在 v5.7.0 工程内执行
- 严格遵守 v5 monorepo 结构
- 禁止修改 packages 内核文件
- 禁止覆盖 \_core 核心登录/布局/权限文件

### 2. 迁移原则

- 全程统一使用 v5 原生页面与原生基础组件
- 仅从 v2 迁移业务相关内容：业务接口、权限配置、表单字段、校验规则、自定义 LOGO、系统标题、文案、专属业务逻辑
- 只迁移业务代码、只做版本兼容修复
- 禁止重构业务、禁止删减逻辑、禁止私自优化、禁止额外新增功能

### 3. 差异规范

- `visible` => `open`
- `prop` => `name`
- `validateFields` => `validate`
- 完整适配 v-model 语法
- 路径别名 `/@/` => `#/`
- Webpack 语法转 Vite 语法
- `process.env` 转为 `import.meta.env`

## 迁移执行指令

### 步骤 1：读取差异分析文档

```
读取文件：/Users/jiemixiong/Documents/workspace/vue-vben-admin/.trae/documents/v2_to_v5_diff_analysis.md
```

### 步骤 2：创建业务 API 目录结构

```
创建目录：apps/web-antd/src/api/biz/basic/model
创建目录：apps/web-antd/src/api/biz/basic
创建文件：apps/web-antd/src/api/biz/basic/index.ts
创建文件：apps/web-antd/src/api/biz/index.ts
```

### 步骤 3：迁移 user API 接口

#### 3.1 创建 userModel.ts

```typescript
// 文件路径：apps/web-antd/src/api/biz/basic/model/userModel.ts
export interface LoginParams {
  account: string;
  password: string;
  code?: string;
  origin?: string;
  timestamp?: number;
  tsa_ticket?: string;
  goHome?: boolean;
  mode?: string;
}

export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: string;
  account: string;
  name: string;
  avatar: string;
  prevLogin?: number;
  prevLoginTime?: string;
  prevLoginIPAddress?: string;
  prevLoginIPAddressName?: string;
  systemId?: string;
  portalId?: string;
}
```

#### 3.2 创建 user.ts API 文件

```typescript
// 文件路径：apps/web-antd/src/api/biz/basic/user.ts
import { requestClient } from '#/api/request';
import type { LoginParams } from './model/userModel';

enum Api {
  Prefix = '/bot/authsession',
  Login = '/bot/authsession/Login',
  Logout = '/bot/authsession/Logout',
  GetUserInfo = '/bot/authsession/CurrentUser',
  Unlock = '/bot/authsession/LockScreen',
}

export function loginApi(params: LoginParams) {
  return requestClient.post({
    url: Api.Login,
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}

export function getUserInfo() {
  return requestClient.get({ url: Api.GetUserInfo });
}

export function doLogout() {
  return requestClient.get({ url: Api.Logout });
}

export function unlock(data: LoginParams) {
  return requestClient.post({ url: Api.Unlock, data });
}

export function getConfig(account) {
  return requestClient.get({ url: Api.Prefix + `/getConfig/${account}` });
}

export function getLoginConfig() {
  return requestClient.get({ url: Api.Prefix + `/getLoginConfig` });
}

export function getTicket() {
  return requestClient.get({ url: Api.Prefix + `/getTicket` });
}

export function getTicketStatus(ticket) {
  return requestClient.get({ url: Api.Prefix + `/getTicketStatus/${ticket}` });
}

export function socialsLogin(params) {
  return requestClient.post({
    url: Api.Prefix + `/Login/socials`,
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
```

#### 3.3 创建 index.ts 导出文件

```typescript
// 文件路径：apps/web-antd/src/api/biz/basic/index.ts
export * from './user';
```

#### 3.4 创建 biz/index.ts 导出文件

```typescript
// 文件路径：apps/web-antd/src/api/biz/index.ts
export * from './basic';
```

### 步骤 4：更新 api/index.ts

```typescript
// 文件路径：apps/web-antd/src/api/index.ts
export * from './biz';
export * from './core';
export * from './request';
```

### 步骤 5：修改 store/auth.ts 适配登录逻辑

#### 5.1 修改 import 语句

```typescript
import type { Recordable, UserInfo } from '@vben/types';
import type { LoginParams } from '#/api/biz/basic/model/userModel';

import { loginApi, doLogout, getUserInfo } from '#/api';
import { encryptByMd5 } from '@vben/utils';
import { AesEncryption } from '@vben/utils';

const aesEncryption = new AesEncryption({ useHex: true });
```

#### 5.2 修改 authLogin 函数

```typescript
async function authLogin(
  params: Recordable<any>,
  onSuccess?: () => Promise<void> | void,
) {
  let userInfo: null | UserInfo = null;
  try {
    loginLoading.value = true;

    // 密码加密：MD5 + AES
    const password = encryptByMd5(params.password);
    const encryptPassword = aesEncryption.encryptByAES(password);

    // 构建登录参数
    const loginParams: LoginParams = {
      account: params.username,
      password: encryptPassword,
      code: params.code,
      origin: 'password',
      timestamp: params.timestamp,
      tsa_ticket: params.tsa_ticket,
      goHome: true,
    };

    // 调用登录 API
    const res = await loginApi(loginParams);
    const { token } = res.data;

    // 设置 Token
    if (token) {
      accessStore.setAccessToken(token);
      userInfo = await fetchUserInfo();

      if (accessStore.loginExpired) {
        accessStore.setLoginExpired(false);
      } else {
        onSuccess
          ? await onSuccess?.()
          : await router.push(
              userInfo?.homePath || preferences.app.defaultHomePath,
            );
      }

      if (userInfo?.name) {
        notification.success({
          description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.name}`,
          duration: 3,
          message: $t('authentication.loginSuccess'),
        });
      }

      // 上次登录信息
      if (userInfo?.prevLogin === 1) {
        notification.open({
          message: $t('sys.login.lastLoginInfo'),
          description: `时间： ${userInfo.prevLoginTime || ''}<br>地点： ${userInfo.prevLoginIPAddressName || ''}<br>IP： ${userInfo.prevLoginIPAddress || ''}`,
          placement: 'bottomRight',
          style: { width: '300px' },
        });
      }
    }
  } catch (error: any) {
    if (typeof error === 'string') {
      message.error(error);
    }
  } finally {
    loginLoading.value = false;
  }

  return { userInfo };
}
```

#### 5.3 修改 fetchUserInfo 函数

```typescript
async function fetchUserInfo() {
  const res = await getUserInfo();
  const userInfo = res.data;
  userStore.setUserInfo(userInfo);
  return userInfo;
}
```

## 通用适配规则总结

### 路径别名规则

| v2 路径                 | v5 路径                |
| ----------------------- | ---------------------- |
| `/@/utils/http/axios`   | `#/api/request`        |
| `/@/api/basic/user`     | `#/api/biz/basic/user` |
| `/@/store/modules/user` | `@vben/stores`         |
| `/@/utils/cipher`       | `@vben/utils`          |

### API 调用规则

| v2 调用                           | v5 调用                               |
| --------------------------------- | ------------------------------------- |
| `defHttp.post({ url, data })`     | `requestClient.post({ url, data })`   |
| `defHttp.get({ url, data })`      | `requestClient.get({ url, data })`    |
| `ContentTypeEnum.FORM_URLENCODED` | `'application/x-www-form-urlencoded'` |

### 登录参数映射

| v5 参数           | v2 参数               | 说明              |
| ----------------- | --------------------- | ----------------- |
| `params.username` | `loginParams.account` | 用户名            |
| `params.password` | 加密后的 password     | 需 MD5 + AES 加密 |

### 响应数据处理

| v2 响应          | v5 处理                      |
| ---------------- | ---------------------------- |
| `res.data.token` | `const { token } = res.data` |
| `res.data`       | `userInfo = res.data`        |

### 状态管理映射

| v2 Store                       | v5 Store                            |
| ------------------------------ | ----------------------------------- |
| `useUserStore`                 | `useUserStore (@vben/stores)`       |
| `userStore.login()`            | `authStore.authLogin()`             |
| `userStore.getUserInfo()`      | `fetchUserInfo()`                   |
| `userStore.updateToken(token)` | `accessStore.setAccessToken(token)` |

## 验证清单

- [x] TypeScript 类型检查通过
- [x] API 接口导入正确
- [x] 登录逻辑适配完成
- [x] 密码加密逻辑实现
- [x] 依赖引入正确
- [x] 响应数据处理正确
- [x] 状态管理适配正确

## 输出要求

每次迁移完成后，必须输出以下内容：

1. 本次修改的文件路径清单
2. 从 v2 迁移的业务内容
3. 版本兼容改造点
4. 已修复报错项
5. 沉淀可复用通用修改指令
