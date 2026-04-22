<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import { computed, onMounted, ref, watch } from 'vue';

import {
  getCodeCertificateApi,
  getCodeCertificateStatusApi,
  getConfigApi,
  getImageCodeApi,
  getLoginConfigApi,
  loginApi,
} from '#/api/biz/basic';
import { encryptByMd5, AesEncryption } from '#/utils/cipher';

interface LoginConfig {
  // 是否开启单点登录
  enableSSO: boolean;
  // 是否开启三方登录
  enableSocialLogin: boolean;
  // 三方登录列表
  socialsList: Array<{ icon: string; name: string; url: string }>;
}

interface AccountConfig {
  // 是否需要验证码
  requireImageCode: boolean;
  // 账号配置
  systemCode: string;
}

const loading = ref(false);
const account = ref('');
const password = ref('');
const imageCode = ref('');
const imageCodeLength = ref(4);
const timestamp = ref(Date.now());
const imageCodeUrl = ref('');

// 登录配置
const loginConfig = ref<LoginConfig>({
  enableSSO: false,
  enableSocialLogin: false,
  socialsList: [],
});

// 账号配置
const accountConfig = ref<AccountConfig>({
  requireImageCode: false,
  systemCode: 'BotPlatfrom',
});

// 是否显示验证码
const showImageCode = computed(() => accountConfig.value.requireImageCode);

// 登录方式
const loginType = ref<'password' | 'social' | 'sso'>('password');

// 获取登录配置
async function fetchLoginConfig() {
  try {
    const result = await getLoginConfigApi();
    loginConfig.value = {
      enableSSO: result.enableSSO === 'true',
      enableSocialLogin: result.enableSocialLogin === 'true',
      socialsList: result.socialsList || [],
    };
  } catch {
    loginConfig.value = {
      enableSSO: false,
      enableSocialLogin: false,
      socialsList: [],
    };
  }
}

// 账号输入失焦时获取配置
async function handleAccountBlur() {
  if (!account.value) return;
  try {
    const result = await getConfigApi(account.value);
    accountConfig.value = {
      requireImageCode: result.requireImageCode === 'true',
      systemCode: result.systemCode || 'BotPlatfrom',
    };
    if (accountConfig.value.requireImageCode) {
      refreshImageCode();
    }
  } catch {
    accountConfig.value = {
      requireImageCode: false,
      systemCode: 'BotPlatfrom',
    };
  }
}

// 刷新验证码
function refreshImageCode() {
  timestamp.value = Date.now();
  imageCodeUrl.value = getImageCodeApi(imageCodeLength.value, timestamp.value);
}

// 密码加密
function encryptPassword(pwd: string): string {
  const aesEncryption = new AesEncryption({ useHex: true });
  const md5Password = encryptByMd5(pwd);
  return aesEncryption.encryptByAES(md5Password);
}

// 登录
async function handleLogin() {
  try {
    loading.value = true;

    const loginParams: Recordable<any> = {
      account: account.value,
      origin: 'password',
      timestamp: Date.now(),
    };

    // 如果需要验证码
    if (showImageCode.value) {
      loginParams.code = imageCode.value;
    }

    // 密码加密
    loginParams.password = encryptPassword(password.value);

    const result = await loginApi(loginParams);

    if (result.accessToken) {
      // 登录成功，触发 v5 的登录流程
      window.dispatchEvent(
        new CustomEvent('vben-login-success', {
          detail: { accessToken: result.accessToken },
        }),
      );
    }
  } finally {
    loading.value = false;
  }
}

// 扫码登录
const scanCodeLoading = ref(false);
const ticket = ref('');

async function handleScanCodeLogin() {
  try {
    scanCodeLoading.value = true;

    // 获取二维码凭证
    const certResult = await getCodeCertificateApi();
    ticket.value = certResult.ticket;

    // 轮询检查扫码状态
    const checkStatus = async () => {
      const statusResult = await getCodeCertificateStatusApi(ticket.value);
      if (statusResult.status === 'authorized') {
        // 授权成功，获取 token
        const loginResult = await loginApi({
          tsa_ticket: ticket.value,
          origin: 'scan',
        });

        if (loginResult.accessToken) {
          window.dispatchEvent(
            new CustomEvent('vben-login-success', {
              detail: { accessToken: loginResult.accessToken },
            }),
          );
        }
      } else if (statusResult.status === 'expired') {
        // 二维码过期，重新获取
        handleScanCodeLogin();
      } else {
        // 继续轮询
        setTimeout(checkStatus, 2000);
      }
    };

    checkStatus();
  } finally {
    scanCodeLoading.value = false;
  }
}

// 三方登录
function handleSocialLogin(social: { name: string; url: string }) {
  window.location.href = social.url;
}

// SSO 登录
function handleSSOLogin() {
  // SSO 登录逻辑，根据实际情况实现
  window.location.href = '/sso/login';
}

onMounted(() => {
  fetchLoginConfig();
});

watch(account, () => {
  if (account.value) {
    handleAccountBlur();
  }
});

// 暴露方法给父组件
defineExpose({
  handleLogin,
  loading,
  account,
  password,
  imageCode,
  showImageCode,
  loginType,
  loginConfig,
  handleSocialLogin,
  handleSSOLogin,
  handleScanCodeLogin,
  scanCodeLoading,
});
</script>

<template>
  <div class="login-form">
    <!-- 密码登录 -->
    <template v-if="loginType === 'password'">
      <a-form layout="vertical" @finish="handleLogin">
        <a-form-item
          name="account"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input
            v-model:value="account"
            size="large"
            placeholder="请输入账号"
            autocomplete="username"
          />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password
            v-model:value="password"
            size="large"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </a-form-item>

        <a-form-item v-if="showImageCode" name="imageCode">
          <a-input
            v-model:value="imageCode"
            size="large"
            placeholder="请输入验证码"
            style="width: 60%"
          />
          <img
            :src="imageCodeUrl"
            class="image-code"
            alt="验证码"
            @click="refreshImageCode"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <!-- 其他登录方式 -->
      <div class="other-login">
        <a-button
          v-if="loginConfig.enableSSO"
          type="link"
          @click="loginType = 'sso'"
        >
          SSO登录
        </a-button>
        <a-button
          v-if="loginConfig.enableSocialLogin"
          type="link"
          @click="loginType = 'social'"
        >
          第三方登录
        </a-button>
      </div>
    </template>

    <!-- SSO 登录 -->
    <template v-else-if="loginType === 'sso'">
      <div class="sso-login">
        <a-result title="SSO 单点登录">
          <template #extra>
            <a-button type="primary" size="large" @click="handleSSOLogin">
              跳转到 SSO 登录
            </a-button>
            <a-button @click="loginType = 'password'">返回密码登录</a-button>
          </template>
        </a-result>
      </div>
    </template>

    <!-- 第三方登录 -->
    <template v-else-if="loginType === 'social'">
      <div class="social-login">
        <a-result title="第三方登录">
          <template #extra>
            <a-space direction="vertical" style="width: 100%">
              <a
                v-for="social in loginConfig.socialsList"
                :key="social.name"
                :href="social.url"
                class="social-link"
              >
                <img
                  v-if="social.icon"
                  :src="social.icon"
                  :alt="social.name"
                  class="social-icon"
                />
                <span>{{ social.name }}</span>
              </a>
            </a-space>
            <a-button @click="loginType = 'password'">返回密码登录</a-button>
          </template>
        </a-result>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.login-form {
  width: 100%;

  .image-code {
    width: 35%;
    height: 40px;
    margin-left: 10px;
    cursor: pointer;
    vertical-align: middle;
  }

  .other-login {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  .social-login,
  .sso-login {
    padding: 20px 0;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    text-decoration: none;
    color: inherit;

    &:hover {
      border-color: var(--primary-color);
    }

    .social-icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
