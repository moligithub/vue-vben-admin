import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/DataSource',
  SyncPrefix = '/bot/systemmgr/DataSync',
}

// 获取数据连接列表
export function getDataSourceList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取数据连接下拉框列表
export function getDataSourceSelector(type: string = '') {
  const data = type ? { type } : {};
  return requestClient.get(`${Api.Prefix}/Selector`, { params: data });
}
// 新建数据连接
export function createDataSource(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改数据连接
export function updateDataSource(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取数据连接
export function getDataSourceInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除数据连接
export function delDataSource(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 测试数据连接
export function testDbConnection(data: any) {
  return requestClient.post(`${Api.Prefix}/Actions/Test`, data);
}
// 同步校验
export function dataSync(data: any) {
  return requestClient.post(Api.SyncPrefix, data);
}
// 同步数据
export function execute(data: any) {
  return requestClient.post(`${Api.SyncPrefix}/Actions/Execute`, data);
}
// 批量同步数据
export function batchExecute(data: any) {
  return requestClient.post(`${Api.SyncPrefix}/Actions/batchExecute`, data);
}
// 校验数据库连接
export function checkDbLink(data: any) {
  return requestClient.post(`${Api.SyncPrefix}/Actions/checkDbLink`, data);
}
