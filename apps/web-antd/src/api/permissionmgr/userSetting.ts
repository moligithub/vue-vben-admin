import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/Users/Current',
}

// 更新当前用户头像
export function updateAvatar(name: string) {
  return requestClient.put(`${Api.Prefix}/Avatar/${name}`);
}
// 获取当前用户个人资料
export function getUserSettingInfo() {
  return requestClient.get(`${Api.Prefix}/BaseInfo`);
}
// 更新当前用户个人资料
export function updateUserInfo(data: any) {
  return requestClient.put(`${Api.Prefix}/BaseInfo`, data);
}
// 修改当前用户密码
export function updatePassword(data: any) {
  return requestClient.post(`${Api.Prefix}/Actions/ModifyPassword`, data);
}
// 更新当前用户系统主题
export function updateTheme(data: any) {
  return requestClient.put(`${Api.Prefix}/SystemTheme`, data);
}
// 更新当前用户系统语言
export function updateLanguage(data: any) {
  return requestClient.put(`${Api.Prefix}/SystemLanguage`, data);
}
// 获取我的下属
export function getSubordinate(id: string = '0') {
  return requestClient.get(`${Api.Prefix}/Subordinate/${id}`);
}
// 获取当前用户系统权限
export function getAuthorizeList() {
  return requestClient.get(`${Api.Prefix}/Authorize`);
}
// 获取系统日志
export function getLogList(data: any) {
  return requestClient.get(`${Api.Prefix}/SystemLog`, { params: data });
}
// 获取当前用户所有组织
export function getUserOrganizes() {
  return requestClient.get(`${Api.Prefix}/getUserOrganizes`);
}
// 获取当前用户所有岗位
export function getUserPositions() {
  return requestClient.get(`${Api.Prefix}/getUserPositions`);
}
// 获取当前用户所有角色
export function getUserRoles(data: any) {
  return requestClient.get(`${Api.Prefix}/getUserRoles`, { params: data });
}
// 设置主要组织、主要岗位、切换系统
export function setMajor(data: any) {
  return requestClient.put(`${Api.Prefix}/major`, data);
}
// 获取系统日志
export function getSignList() {
  return requestClient.get(`${Api.Prefix}/SignImg`);
}
// 新建个性签名
export function createSign(data: any) {
  return requestClient.post(`${Api.Prefix}/SignImg`, data);
}
// 删除个性签名
export function deleteSign(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}/SignImg`);
}
// 设置默认签名
export function updateDefaultSign(id: string) {
  return requestClient.put(`${Api.Prefix}/${id}/SignImg`);
}
