import type { Recordable, UserInfo } from '@vben/types';

import type { LoginParams } from '#/api/biz/basic/model/userModel';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';
import { AesEncryption, encryptByMd5 } from '@vben/utils';

import { message, notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { doLogout, getUserInfo, loginApi } from '#/api';
import { $t } from '#/locales';

const aesEncryption = new AesEncryption({ useHex: true });

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: null | UserInfo = null;
    try {
      loginLoading.value = true;

      // 适配 v2 登录逻辑：密码加密
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

      // 如果成功获取到 token
      if (token) {
        accessStore.setAccessToken(token);

        // 获取用户信息
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

        // 处理上次登录信息
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

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await doLogout();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    const res = await getUserInfo();
    const userInfo = res.data;
    userStore.setUserInfo(userInfo);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
