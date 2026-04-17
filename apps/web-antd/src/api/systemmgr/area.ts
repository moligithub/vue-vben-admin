import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/Area',
}

// 获取行政区划列表
export function getAreaList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.nodeId}`, { params: data });
}
// 获取行政区划下拉框列表
export function getAreaSelector(id: string, currId: string = '0') {
  return requestClient.get(`${Api.Prefix}/${id}/Selector/${currId}`);
}
// 获取行政区划数据详情
export function getAreaByIds(idsList: string[]) {
  return requestClient.post(`${Api.Prefix}/GetAreaByIds`, { idsList });
}
// 新建行政区划
export function createArea(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改行政区划
export function updateArea(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取行政区划
export function getAreaInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Info`);
}
// 删除行政区划
export function delArea(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
