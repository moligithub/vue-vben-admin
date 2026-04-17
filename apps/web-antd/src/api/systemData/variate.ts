import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/DataInterfaceVariate',
}
// 获取变量列表
export function getList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.id}`, { params: data });
}
// 新增变量
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改变量
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取变量
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Info`);
}
// 删除变量
export function del(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 复制变量
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 导出变量
export function exportData(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Export`);
}
// 获取变量
export function getVariateSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
