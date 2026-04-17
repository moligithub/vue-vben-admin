import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/Authority',
}

// 获取岗位/角色/用户权限树形结构及数据
export function getAuthorizeValues(objectId: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Data/${objectId}/Values`, data);
}
// 更新岗位/角色/用户权限
export function updateAuthorizeList(objectId: string, data: any) {
  return requestClient.put(`${Api.Prefix}/Data/${objectId}`, data);
}
// 批量设置权限
export function updateBatchAuthorize(data: any) {
  return requestClient.post(`${Api.Prefix}/Data/Batch`, data);
}
// 获取功能权限数据
export function getModelData(id: string, ObjectType: string) {
  return requestClient.get(`${Api.Prefix}/Model/${id}/${ObjectType}`);
}
// 设置/更新功能权限
export function setModelData(id: string, data: any) {
  return requestClient.put(`${Api.Prefix}/Model/${id}`, data);
}
// 获取门户权限树形结构及数据
export function getPortalAuthorizeValues(objectId: string) {
  return requestClient.get(`${Api.Prefix}/Portal/${objectId}`);
}
// 更新门户权限
export function updatePortalAuthorizeList(objectId: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Portal/${objectId}`, data);
}
