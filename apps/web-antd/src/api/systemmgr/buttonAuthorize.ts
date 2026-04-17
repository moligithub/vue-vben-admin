import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/ModuleButton',
}

// 获取按钮权限列表
export function getButtonAuthorizeList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.id}/List`, { params: data });
}
// 获取按钮权限下拉列表
export function getButtonAuthorizeSelector(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Selector`);
}
// 添加按钮
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 更新按钮
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取按钮信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除按钮
export function del(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
