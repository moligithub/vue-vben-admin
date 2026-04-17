import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/imcenter/AccountConfig',
}

// 获取配置列表
export function getConfigList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建配置
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改配置
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取配置
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除配置
export function delConfig(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 复制配置
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 测试配置
export function testConfig(data: any) {
  return requestClient.post(`${Api.Prefix}/${data.testType}`, data);
}
