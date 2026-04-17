import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/Signature',
}

// 获取签章列表(带分页)
export function getSignatureList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取签章下拉框列表
export function getSignatureSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 新建签章
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改签章
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取签章
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除签章
export function delSignature(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 通过id获取签章下拉框列表
export function getListByIds(ids: string[]) {
  return requestClient.post(`${Api.Prefix}/ListByIds`, { ids });
}
