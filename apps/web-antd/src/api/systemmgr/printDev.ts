import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/printDev',
  PrefixLog = '/bot/systemmgr/printLog',
}

// 获取打印模板列表(分页)
export function getPrintDevList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取打印模板列表下拉框
export function getPrintDevSelector(type: string) {
  return requestClient.get(`${Api.Prefix}/Selector`, { params: { type } });
}
// 获取打印模板列表下拉框
export function getPrintDevByIds(data: any) {
  return requestClient.post(`${Api.Prefix}/getListOptions`, data);
}
// 新建打印模板
export function createPrintDev(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改打印模板
export function updatePrintDev(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取打印模板
export function getPrintDevInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除打印模板
export function delPrintDev(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 复制打印模板
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 导出数据打印模板数据
export function exportData(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Export`);
}
// 获取打印模板表单字段
export function getFields(data: any) {
  return requestClient.post(`${Api.Prefix}/Fields`, data);
}
// 获取数据和打印模板
export function getData(data: any) {
  return requestClient.get(`${Api.Prefix}/Data`, { params: data });
}
// 批量打印获取数据和打印模板
export function getBatchData(data: any) {
  return requestClient.get(`${Api.Prefix}/BatchData`, { params: data });
}
// 获取打印日志列表
export function getPrintLogList(data: any) {
  return requestClient.get(`${Api.PrefixLog}/${data.id}`, { params: data });
}
// 插入打印日志
export function createPrintLog(data: any) {
  return requestClient.post(`${Api.PrefixLog}/save`, data);
}
