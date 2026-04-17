import { requestClient } from '#/api/request';

function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

enum Api {
  Prefix = '/bot/systemmgr/DataModel',
}

// 获取数据库表列表
export function getDataModelList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.linkId}/Tables`, {
    params: omit(data, ['linkId']),
  });
}
// 获取数据库表列表+视图
export function getDataModelListAll(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.linkId}/TableAll`, {
    params: omit(data, ['linkId']),
  });
}
// 预览数据库表
export function previewDataModel(data: any) {
  return requestClient.get(
    `${Api.Prefix}/${data.linkId}/Table/${data.table}/Preview`,
    { params: omit(data, ['linkId', 'table']) },
  );
}
// 新建数据库表
export function createDataModel(linkId: string, data: any) {
  return requestClient.post(`${Api.Prefix}/${linkId}/Table`, data);
}
// 修改数据库表
export function updateDataModel(linkId: string, data: any) {
  return requestClient.put(`${Api.Prefix}/${linkId}/Table`, data);
}
// 获取数据库表
export function getDataModelInfo(linkId: string, table: string) {
  return requestClient.get(`${Api.Prefix}/${linkId}/Table/${table}`);
}
// 删除数据库表
export function delDataModel(linkId: string, table: string) {
  return requestClient.delete(`${Api.Prefix}/${linkId}/Table/${table}`);
}
// 获取数据库表
export function getDataModelFieldList(
  linkId: string,
  table: string,
  type: string = '0',
) {
  return requestClient.get(
    `${Api.Prefix}/${linkId}/Tables/${table}/Fields?type=${type}`,
  );
}
//  新增字段
export function addTableFields(linkId: string, data: any) {
  return requestClient.put(`${Api.Prefix}/${linkId}/addFields`, data);
}
//  导出数据库表
export function exportTable(linkId: string, table: string) {
  return requestClient.get(
    `${Api.Prefix}/${linkId}/Table/${table}/Actions/Export`,
  );
}
