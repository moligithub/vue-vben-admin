import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/Employee',
}

// 获取职员列表
export function getEmployeeList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 删除职员
export function delEmployee(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 导出Excel
export function exportExcel(data: any) {
  return requestClient.get(`${Api.Prefix}/ExportData`, { params: data });
}
// 导入模板下载
export function templateDownload() {
  return requestClient.get(`${Api.Prefix}/TemplateDownload`);
}
// 导入
export function importData(data: any) {
  return requestClient.post(`${Api.Prefix}/ImportData`, data);
}
// 导入预览
export function importPreview(data: any) {
  return requestClient.get(`${Api.Prefix}/ImportPreview`, { params: data });
}
