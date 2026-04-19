import { requestClient } from '#/api/request';
import type { LoginParams } from './model/userModel';

enum Api {
  Prefix = '/bot/authsession',
  Login = '/bot/authsession/Login',
  Logout = '/bot/authsession/Logout',
  GetUserInfo = '/bot/authsession/CurrentUser',
  Unlock = '/bot/authsession/LockScreen',
}

// 用户登录
export function loginApi(params: LoginParams) {
  return requestClient.post({
    url: Api.Login,
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
// 获取当前用户信息
export function getUserInfo() {
  return requestClient.get({ url: Api.GetUserInfo });
}
// 退出登陆
export function doLogout() {
  return requestClient.get({ url: Api.Logout });
}
// 锁屏解锁登录
export function unlock(data: LoginParams) {
  return requestClient.post({ url: Api.Unlock, data });
}
// 获取系统默认配置
export function getConfig(account) {
  return requestClient.get({ url: `${Api.Prefix}/getConfig/${account}` });
}
// 修改密码信息发送
export function updatePasswordMessage() {
  return requestClient.post({ url: `${Api.Prefix}/updatePasswordMessage` });
}
// 获取登录配置
export function getLoginConfig() {
  return requestClient.get({ url: `${Api.Prefix}/getLoginConfig` });
}
// 获取登录票据
export function getTicket() {
  return requestClient.get({ url: `${Api.Prefix}/getTicket` });
}
// 根据票据获取登录状态
export function getTicketStatus(ticket) {
  return requestClient.get({ url: `${Api.Prefix}/getTicketStatus/${ticket}` });
}
// 第三方登录回调列表后点击登录
export function socialsLogin(params) {
  return requestClient.post({
    url: `${Api.Prefix}/Login/socials`,
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
// 扫码登陆获取凭证
export function getCodeCertificate() {
  return requestClient.get({ url: `${Api.Prefix}/codeCertificate` });
}
// 扫码登陆获取凭证状态
export function getCodeCertificateStatus(ticket) {
  return requestClient.get({
    url: `${Api.Prefix}/codeCertificateStatus/${ticket}`,
  });
}
// 扫码登陆设置凭证状态
export function setCodeCertificateStatus(ticket, status) {
  return requestClient.get({
    url: `${Api.Prefix}/setCodeCertificateStatus/${ticket}/${status}`,
  });
}
