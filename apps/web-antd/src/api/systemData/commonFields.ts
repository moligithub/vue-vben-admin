import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/CommonFields',
}

// 获取字段列表
export function getCommonFieldsList(data: any = {}) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建字段
export function createCommonFields(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改字段
export function updateCommonFields(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取字段
export function getCommonFieldsInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除字段
export function delCommonFields(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
