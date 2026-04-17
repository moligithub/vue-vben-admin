import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/Dictionary',
}

// 获取字典列表
export function getDictionaryList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取字典下拉框列表
export function getDictionarySelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 新建字典
export function createDictionary(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改字典
export function updateDictionary(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取字典
export function getDictionaryInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除字典
export function delDictionary(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
