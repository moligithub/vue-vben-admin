import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

enum Api {
  GetUserInfo = '/bot/authsession/CurrentUser',
  Login = '/bot/authsession/Login',
  Logout = '/bot/authsession/Logout',
  Prefix = '/bot/authsession',
  Unlock = '/bot/authsession/LockScreen',
}

export function loginApi(params: Recordable<any>) {
  return requestClient.post(
    Api.Login,
    { ...params },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );
}

export function getUserInfoApi() {
  return requestClient.get(Api.GetUserInfo);
}

export function logoutApi() {
  return requestClient.get(Api.Logout);
}

export function unlockApi(data: Recordable<any>) {
  return requestClient.post(Api.Unlock, data);
}

export function getConfigApi(account: string) {
  return requestClient.get(`${Api.Prefix}/getConfig/${account}`);
}

export function getLoginConfigApi() {
  return requestClient.get(`${Api.Prefix}/getLoginConfig`);
}

export function getTicketApi() {
  return requestClient.get(`${Api.Prefix}/getTicket`);
}

export function getTicketStatusApi(ticket: string) {
  return requestClient.get(`${Api.Prefix}/getTicketStatus/${ticket}`);
}

export function socialsLoginApi(params: Recordable<any>) {
  return requestClient.post(
    `${Api.Prefix}/Login/socials`,
    { ...params },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );
}

export function getCodeCertificateApi() {
  return requestClient.get(`${Api.Prefix}/codeCertificate`);
}

export function getCodeCertificateStatusApi(ticket: string) {
  return requestClient.get(`${Api.Prefix}/codeCertificateStatus/${ticket}`);
}

export function setCodeCertificateStatusApi(ticket: string, status: string) {
  return requestClient.get(
    `${Api.Prefix}/setCodeCertificateStatus/${ticket}/${status}`,
  );
}

export function getAccessCodesApi() {
  return requestClient.get(`${Api.Prefix}/getAccessCodes`);
}

export function getImageCodeApi(length: number, timestamp: number) {
  return `${Api.Prefix}/ImageCode/${length}/${timestamp}`;
}
