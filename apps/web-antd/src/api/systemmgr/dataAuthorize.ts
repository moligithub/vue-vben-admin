import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/ModuleDataAuthorizeScheme',
  FieldPrefix = '/bot/systemmgr/ModuleDataAuthorize',
}

// 获取方案管理列表
export function getDataAuthorizeSchemeList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.moduleId}/List`);
}
// 新建方案
export function createScheme(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 更新方案
export function updateScheme(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取方案
export function getSchemeInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除方案
export function delScheme(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取字段列表
export function getDataAuthorizeList(data: any) {
  return requestClient.get(`${Api.FieldPrefix}/${data.moduleId}/List`);
}
// 新建字段
export function createField(data: any) {
  return requestClient.post(Api.FieldPrefix, data);
}
// 更新字段
export function updateField(data: any) {
  return requestClient.put(`${Api.FieldPrefix}/${data.id}`, data);
}
// 获取字段
export function getFieldInfo(id: string) {
  return requestClient.get(`${Api.FieldPrefix}/${id}`);
}
// 删除字段
export function delField(id: string) {
  return requestClient.delete(`${Api.FieldPrefix}/${id}`);
}
