import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/ModuleColumn',
}

// 获取列表权限列表
export function getColumnAuthorizeList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.id}/Fields`, { params: data });
}
// 添加字段
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 批量添加字段
export function batchCreate(data: any) {
  return requestClient.post(`${Api.Prefix}/Actions/Batch`, data);
}
// 更新字段
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取字段信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除字段
export function del(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
