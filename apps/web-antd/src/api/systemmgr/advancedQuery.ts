import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/AdvancedQuery',
}

// 获取方案列表
export function getAdvancedQueryList(moduleId: string) {
  return requestClient.get(`${Api.Prefix}/${moduleId}/List`);
}
// 新建方案
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改方案
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取方案
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除方案
export function delAdvancedQuery(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
