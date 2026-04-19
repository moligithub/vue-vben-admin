# 迁移修改记录 - 第一阶段：登录页适配

## 迁移日期：2026-04-19

## 1. 项目结构修改

### 1.1 新增文件

- [x] `apps/web-antd/src/api/biz/basic/user.ts` - 业务用户 API 接口
- [x] `apps/web-antd/src/api/biz/basic/model/userModel.ts` - 用户类型定义
- [x] `apps/web-antd/src/api/biz/basic/index.ts` - 业务 API 导出
- [x] `apps/web-antd/src/api/biz/index.ts` - 业务 API 汇总导出

### 1.2 修改文件

- [x] `apps/web-antd/src/api/index.ts` - 添加 biz 目录导出
- [x] `apps/web-antd/src/store/auth.ts` - 适配 v2 登录逻辑

## 2. 依赖版本修改

| 依赖 | v2 版本 | v5 版本 | 说明               |
| ---- | ------- | ------- | ------------------ |
| -    | -       | -       | 本次迁移无新增依赖 |

## 3. 路径别名修改

| v2 路径                   | v5 路径                  | 说明         |
| ------------------------- | ------------------------ | ------------ |
| `/@/utils/http/axios`     | `#/api/request`          | API 请求模块 |
| `/@/api/basic/user`       | `#/api/biz/basic/user`   | 用户 API     |
| `/@/store/modules/user`   | `@vben/stores`           | 状态管理     |
| `/@/hooks/web/useMessage` | `ant-design-vue` message | 消息提示     |
| `/@/utils/cipher`         | `@vben/utils`            | 加密工具     |

## 4. 核心功能模块修改

### 4.1 API 接口迁移

| v2 API | v5 API | 说明 |
| --- | --- | --- |
| `defHttp.post({ url: Api.Login })` | `requestClient.post({ url: Api.Login, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })` | 登录接口 |
| `defHttp.get({ url: Api.GetUserInfo })` | `requestClient.get({ url: Api.GetUserInfo })` | 获取用户信息 |
| `defHttp.get({ url: Api.Logout })` | `requestClient.get({ url: Api.Logout })` | 退出登录 |

### 4.2 登录逻辑适配

| 功能 | v2 实现 | v5 适配 |
| --- | --- | --- |
| 密码加密 | MD5 + AES 双重加密 | 使用 @vben/utils 中的 encryptByMd5 和 AesEncryption |
| 登录参数 | account, password, code, origin, timestamp, tsa_ticket | 适配相同参数 |
| 响应处理 | res.data.token | res.data 提取 token |
| 上次登录通知 | notification.open 显示上次登录信息 | 适配 notification.open |

### 4.3 状态管理适配

| v2 Store                | v5 Store                     | 说明         |
| ----------------------- | ---------------------------- | ------------ |
| useUserStore            | useUserStore (@vben/stores)  | 用户状态管理 |
| userStore.login()       | authStore.authLogin()        | 登录方法     |
| userStore.getUserInfo   | fetchUserInfo()              | 获取用户信息 |
| userStore.updateToken() | accessStore.setAccessToken() | 设置 Token   |

## 5. 构建配置修改

本次迁移无构建配置修改。

## 6. 代码修改详情

### 6.1 user.ts API 文件

```typescript
// v2 写法
import { defHttp } from '/@/utils/http/axios';
export function loginApi(params: LoginParams) {
  return defHttp.post({
    url: Api.Login,
    params,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  });
}

// v5 写法
import { requestClient } from '#/api/request';
export function loginApi(params: LoginParams) {
  return requestClient.post({
    url: Api.Login,
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
```

### 6.2 userModel.ts 类型定义

```typescript
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
```

### 6.3 auth.ts 登录逻辑

```typescript
// 密码加密适配
const password = encryptByMd5(params.password);
const encryptPassword = aesEncryption.encryptByAES(password);

// 登录参数构建
const loginParams: LoginParams = {
  account: params.username,
  password: encryptPassword,
  code: params.code,
  origin: 'password',
  timestamp: params.timestamp,
  tsa_ticket: params.tsa_ticket,
  goHome: true,
};

// API 调用
const res = await loginApi(loginParams);
const { token } = res.data;
accessStore.setAccessToken(token);
```

## 7. 测试验证

- [x] TypeScript 类型检查通过
- [x] API 接口导入正确
- [x] 登录逻辑适配完成
- [x] 密码加密逻辑实现
- [x] 依赖引入正确

## 8. 沉淀可复用通用修改指令

### 8.1 路径别名替换规则

```
s|/@/|#/|g                    # 路径别名替换
s|/@/api/basic|#/api/biz/basic|g   # API 路径替换
s|/@/store/modules|#/store|g       # Store 路径替换
```

### 8.2 API 调用替换规则

```
s|defHttp\.post|requestClient.post|g
s|defHttp\.get|requestClient.get|g
s|defHttp\.put|requestClient.put|g
s|defHttp\.delete|requestClient.delete|g
```

### 8.3 Content-Type 替换规则

```
s|ContentTypeEnum\.FORM_URLENCODED|'application/x-www-form-urlencoded'|g
```

### 8.4 登录相关适配规则

```
# 密码加密
const password = encryptByMd5(params.password);
const encryptPassword = aesEncryption.encryptByAES(password);

# 登录参数映射
account: params.username  # v5 的 username 映射为 v2 的 account

# 响应数据处理
const { token } = res.data;  # v2 响应格式
accessStore.setAccessToken(token);
```

### 8.5 状态管理替换规则

```
# v2 状态管理
useUserStore → @vben/stores 的 useUserStore
userStore.login() → authStore.authLogin()
userStore.getUserInfo() → fetchUserInfo()
userStore.updateToken(token) → accessStore.setAccessToken(token)

# v2 消息提示
useMessage() → ant-design-vue 的 message/notification
```

## 9. 下次迁移注意事项

1. **路径别名**：始终使用 `#/` 别名，禁止使用 `/@/`
2. **API 调用**：使用 `requestClient` 代替 `defHttp`
3. **类型定义**：在 `api/biz/` 目录下创建对应的类型文件
4. **登录逻辑**：需要适配密码加密和登录参数
5. **响应处理**：v2 使用 `res.data` 提取数据
6. **状态管理**：使用 `@vben/stores` 包
7. **组件引入**：使用 `@vben/common-ui` 组件
8. **样式处理**：使用 `@vben/styles` 和 Tailwind CSS

## 10. 后续迁移计划

- [ ] 迁移首页 (home) 页面
- [ ] 迁移个人中心 (profile) 页面
- [ ] 迁移消息记录 (messageRecord) 页面
- [ ] 迁移系统管理相关页面
- [ ] 迁移业务流程相关页面
- [ ] 迁移扩展功能相关页面
- [ ] 迁移权限管理相关页面
- [ ] 迁移低代码开发相关页面
