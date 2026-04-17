import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/socials',
}

// 获取用户授权列表
export function getSocialsLoginList(data: any) {
  return requestClient.get(`${Api.Prefix}/login`, { params: data });
}
// 获取用户授权列表
export function getSocialsUserList() {
  return requestClient.get(Api.Prefix);
}
// 获取用户授权列表(用户管理)
export function getSocialsUserListByUser(userId: string) {
  return requestClient.get(`${Api.Prefix}?userId=${userId}`);
}
// 第三方绑定
export function socialsBind(name: string) {
  return requestClient.get(`${Api.Prefix}/render/${name}`);
}
// 解绑
export function deleteSocials(userId: string, id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}?userId=${userId}`);
}
