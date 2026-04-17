import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/imcenter/SendMessageConfig',
}

// 获取发送配置列表(分页)
export function getSendConfigList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建发送配置
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改发送配置
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取发送配置
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除发送配置
export function delSendConfig(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 复制发送配置
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 测试发送配置获取配置信息
export function getTestSendConfig(id: string) {
  return requestClient.post(`${Api.Prefix}/getTestConfig/${id}`);
}
// 测试发送配置
export function testSendConfig(data: any) {
  return requestClient.post(`${Api.Prefix}/testSendConfig`, data);
}
// 发送配置下拉列表
export function getSendConfigSelect(data: any) {
  return requestClient.get(`${Api.Prefix}/getSendConfigList`, { params: data });
}
