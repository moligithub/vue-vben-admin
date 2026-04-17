import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/DataInterface',
}

// 获取接口列表(分页)
export function getDataInterfaceList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取接口列表下拉框
export function getDataInterfaceSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 新建接口
export function createDataInterface(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改接口
export function updateDataInterface(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取接口
export function getDataInterfaceInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除接口
export function delDataInterface(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取接口数据
export function getDataInterfaceRes(id: string, data: any = {}) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Preview`, data);
}
// 获取数据接口参数
export function getDataInterfaceParam(id: string) {
  return requestClient.get(`${Api.Prefix}/GetParam/${id}`);
}
// 导出数据接口数据
export function exportData(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Export`);
}
// 获取数据接口调用日志列表
export function getDataInterfaceLog(id: string, data: any) {
  return requestClient.get(`${Api.Prefix}/Log/${id}`, { params: data });
}
// 获取接口列表数据
export function getDataInterfaceDataSelect(data: any) {
  return requestClient.post(
    `${Api.Prefix}/${data.interfaceId}/Actions/List`,
    data,
  );
}
// 获取多条接口详情数据
export function getDataInterfaceDataInfoByIds(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/InfoByIds`, data);
}
// 获取接口列表(工作流选择时调用，带分页)
export function getDataInterfaceSelectorList(data: any) {
  return requestClient.get(`${Api.Prefix}/getList`, { params: data });
}
// 获取接口字段
export function getDataInterfaceFields(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/GetFields`, data);
}
// 复制接口数据
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
