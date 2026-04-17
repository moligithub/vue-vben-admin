import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/System',
}

// 获取应用列表
export function getSystemList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建应用
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
export const createSystem = create;
// 修改应用
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
export const updateSystem = update;
// 获取应用
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除应用
export function delSystem(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
