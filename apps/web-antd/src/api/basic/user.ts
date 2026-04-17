import type { LoginParams } from './model/userModel';

import { requestClient } from '#/api/request';

enum Api {
  GetUserInfo = '/bot/authsession/CurrentUser',
  Login = '/bot/authsession/Login',
  Logout = '/bot/authsession/Logout',
  Prefix = '/bot/authsession',
  Unlock = '/bot/authsession/LockScreen',
}

// 用户登录
export function loginApi(params: LoginParams) {
  return requestClient.post(Api.Login, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
// 获取当前用户信息
export function getUserInfo() {
  const systemCode = getTsaAppId() ? getTsaAppId().replace('TSA_APP_', '') : '';
  return requestClient.get(Api.GetUserInfo, { params: { systemCode } });
}
// 退出登陆
export function doLogout() {
  return requestClient.get(Api.Logout);
}

// 导出API别名
export const logoutApi = doLogout;
export const getUserInfoApi = getUserInfo;
// 锁屏解锁登录
export function unlock(data: LoginParams) {
  return requestClient.post(Api.Unlock, data);
}
// 获取系统默认配置
export function getConfig(account: string) {
  return requestClient.get(`${Api.Prefix}/getConfig/${account}`);
}
// 修改密码信息发送
export function updatePasswordMessage() {
  return requestClient.post(`${Api.Prefix}/updatePasswordMessage`);
}
// 获取登录配置
export function getLoginConfig() {
  return requestClient.get(`${Api.Prefix}/getLoginConfig`);
}
// 获取登录票据
export function getTicket() {
  return requestClient.get(`${Api.Prefix}/getTicket`);
}
// 根据票据获取登录状态
export function getTicketStatus(ticket: string) {
  return requestClient.get(`${Api.Prefix}/getTicketStatus/${ticket}`);
}
// 第三方登录回调列表后点击登录
export function socialsLogin(params: any) {
  return requestClient.post(`${Api.Prefix}/Login/socials`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
// 扫码登陆获取凭证
export function getCodeCertificate() {
  return requestClient.get(`${Api.Prefix}/codeCertificate`);
}
// 扫码登陆获取凭证状态
export function getCodeCertificateStatus(ticket: string) {
  return requestClient.get(`${Api.Prefix}/codeCertificateStatus/${ticket}`);
}
// 扫码登陆设置凭证状态
export function setCodeCertificateStatus(ticket: string, status: string) {
  return requestClient.get(
    `${Api.Prefix}/setCodeCertificateStatus/${ticket}/${status}`,
  );
}

// 实现getTsaAppId函数
function getTsaAppId() {
  return import.meta.env.VITE_TSA_APP_ID;
}
