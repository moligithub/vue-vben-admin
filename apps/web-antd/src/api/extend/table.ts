import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/TableExample',
}

// 获取城市信息列表
export function getCityList(id: string) {
  return requestClient.get(`${Api.Prefix}/CityList/${id}`);
}
// 新建项目
export function createTable(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 删除项目
export function delTable(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取延伸扩展列表
export function getIndustryList(data: any) {
  return requestClient.get(`${Api.Prefix}/IndustryList`, { params: data });
}
// 获取普通表格示例信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 获取表格数据列表
export function getTableList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取表格分组列表
export function getTableListAll(data: any) {
  return requestClient.get(`${Api.Prefix}/All`, { params: data });
}
// 行编辑
export function updateTableRow(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}/Actions/RowsEdit`, data);
}
// 获取批注
export function getPostilList(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Postil`);
}
// 发送批注
export function sendPostil(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/${id}/Postil`, data);
}
// 删除批注
export function delPostil(id: string, index: string) {
  return requestClient.delete(`${Api.Prefix}/${id}/Postil/${index}`);
}
// 更新项目
export function updateTable(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 更新标记
export function updateSign(id: string, data: any) {
  return requestClient.put(`${Api.Prefix}/UpdateSign/${id}`, data);
}
// 列表（树形表格）
export function getTableListByType(data: any) {
  return requestClient.get(`${Api.Prefix}/ControlSample/${data.typeId}`, {
    params: data,
  });
}
