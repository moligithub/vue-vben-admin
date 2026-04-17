import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/Data',
}

const reportServer = import.meta.env.VITE_REPORT_SERVER || '';

// 获取报表列表
export function getDataReportList(data: any) {
  return requestClient.get(`${reportServer}${Api.Prefix}`, { params: data });
}
// 获取报表下拉列表
export function getDataReportSelector() {
  return requestClient.get(`${reportServer}${Api.Prefix}/Selector`);
}
// 删除报表
export function delDataReport(id: string) {
  return requestClient.delete(`${reportServer}${Api.Prefix}/${id}`);
}
// 复制报表
export function copy(id: string) {
  return requestClient.post(`${reportServer}${Api.Prefix}/${id}/Actions/Copy`);
}
// 启用禁用报表
export function release(id: string) {
  return requestClient.put(`${reportServer}${Api.Prefix}/${id}/Actions/State`);
}
// 获取信息
export function getDataReportInfo(id: string) {
  return requestClient.get(`${reportServer}${Api.Prefix}/${id}`);
}
