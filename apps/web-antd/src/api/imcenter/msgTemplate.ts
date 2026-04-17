import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/imcenter/MessageTemplateConfig',
}

// 获取消息模板列表
export function getMsgTemplateList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建消息模板
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改消息模板
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取消息模板
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除消息模板
export function delMsgTemplate(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 复制消息模板
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 测试发送配置
export function testMsgTemplate(data: any) {
  return requestClient.post(`${Api.Prefix}/testSendMail`, data);
}
