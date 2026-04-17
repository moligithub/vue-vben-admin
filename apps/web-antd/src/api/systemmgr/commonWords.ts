import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/CommonWords',
}

// 获取审批常用语列表(带分页)
export function getCommonWordsList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取审批常用语下拉框列表
export function getCommonWordsSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 新建审批常用语
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改审批常用语
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取审批常用语
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除审批常用语
export function delCommonWords(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
