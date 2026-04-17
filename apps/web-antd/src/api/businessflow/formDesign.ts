import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/businessform/Form',
}

// 获取表单列表(分页)
export function getFormList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建表单
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改表单
export function update(data: any) {
  return requestClient.put(Api.Prefix, data);
}
// 获取表单
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除表单
export function delForm(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 发布/回滚
export function release(id: string, isRelease: number = 1) {
  return requestClient.post(
    `${Api.Prefix}/Release/${id}?isRelease=${isRelease}`,
  );
}
// 复制表单
export function copy(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 导出
export function exportData(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Export`);
}
// 根据表单id获取表单字段
export function getFormField(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/getField`);
}
// 表单下拉列表
export function getFormSelect(data: any) {
  return requestClient.get(`${Api.Prefix}/select`, { params: data });
}
// 通过表单id获取流程id
export function getFlowByFormId(id: string) {
  return requestClient.get(`${Api.Prefix}/getFormById/${id}`);
}
