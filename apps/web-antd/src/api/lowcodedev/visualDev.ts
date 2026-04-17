import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/lowcodedev/Base',
  GenPrefix = '/bot/lowcodedev/Generater',
  OnlinePrefix = '/bot/lowcodedev/OnlineDev',
}

// 获取功能列表
export function getVisualDevList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取功能列表（集成助手用）
export function getVisualDevFormList(data: any) {
  return requestClient.get(`${Api.Prefix}/list`, { params: data });
}
// 新建功能
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改功能
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取功能
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除功能
export function delVisualDev(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 复制功能
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 发布菜单
export function release(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Release`, data);
}
// 获取表单主表属性列表
export function getFormDataFields(id: string, filterType: number = 0) {
  return requestClient.get(
    `${Api.Prefix}/${id}/FormDataFields?filterType=${filterType}`,
  );
}
// 获取表单主表数据下拉框
export function getFieldDataSelect(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.modelId}/FieldDataSelect`, {
    params: data,
  });
}
// 获取功能下拉框列表
export function getVisualDevSelector(data: any) {
  return requestClient.get(`${Api.Prefix}/Selector`, { params: data });
}
// 回滚模板
export function rollbackTemplate(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/RollbackTemplate`);
}

// 代码下载
export function downloadCode(id: string, data: any) {
  return requestClient.post(
    `${Api.GenPrefix}/${id}/Actions/DownloadCode`,
    data,
  );
}
// 代码预览
export function codePreview(id: string, data: any) {
  return requestClient.post(`${Api.GenPrefix}/${id}/Actions/CodePreview`, data);
}

// 获取列表表单配置JSON
export function getConfigData(modelId: string, data: any = {}) {
  return requestClient.get(`${Api.OnlinePrefix}/${modelId}/Config`, {
    params: data,
  });
}
// 获取列表配置JSON
export function getColumnData(modelId: string) {
  return requestClient.get(`${Api.OnlinePrefix}/${modelId}/ColumnData`);
}
// 获取表单配置JSON
export function getFormData(modelId: string) {
  return requestClient.get(`${Api.OnlinePrefix}/${modelId}/FormData`);
}
// 获取数据列表
export function getModelList(data: any) {
  return requestClient.post(`${Api.OnlinePrefix}/${data.modelId}/List`, data);
}
// 新建数据
export function createModel(modelId: string, data: any) {
  return requestClient.post(`${Api.OnlinePrefix}/${modelId}`, data);
}
// 修改数据
export function updateModel(modelId: string, data: any) {
  return requestClient.put(`${Api.OnlinePrefix}/${modelId}/${data.id}`, data);
}
// 获取数据信息
export function getModelInfo(modelId: string, id: string) {
  return requestClient.get(`${Api.OnlinePrefix}/${modelId}/${id}`);
}
// 删除数据
export function delModel(modelId: string, id: string) {
  return requestClient.delete(`${Api.OnlinePrefix}/${modelId}/${id}`);
}
// 批量删除数据
export function batchDelete(modelId: string, ids: string[]) {
  return requestClient.post(`${Api.OnlinePrefix}/batchDelete/${modelId}`, {
    ids,
  });
}
// 获取数据详情
export function getDataChange(modelId: string, id: string) {
  return requestClient.get(`${Api.OnlinePrefix}/${modelId}/${id}/DataChange`);
}
// 导出数据
export function exportModel(modelId: string, data: any) {
  return requestClient.post(
    `${Api.OnlinePrefix}/${modelId}/Actions/ExportData`,
    data,
  );
}
// 下载模板
export function getTemplate(modelId: string) {
  return requestClient.get(`${Api.OnlinePrefix}/${modelId}/Template`);
}
// 导出模板
export function exportData(modelId: string) {
  return requestClient.post(`${Api.OnlinePrefix}/${modelId}/Actions/Export`);
}
