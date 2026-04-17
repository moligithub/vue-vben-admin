import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/lowcodedev/Integrate',
  TaskPrefix = '/bot/lowcodedev/IntegrateTask',
  WebhookPrefix = '/bot/lowcodedev/Hooks',
}

// 获取集成助手列表
export function getIntegrateList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取集成助手信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除集成助手
export function delIntegrate(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 修改集成助手
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 新建集成助手
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 复制集成助手
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 导出集成助手
export function exportData(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Export`);
}
// 更新用户状态
export function updateState(id: string) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/State`);
}
// 获取执行列表
export function getQueueList(data: any) {
  return requestClient.get(`${Api.TaskPrefix}/queueList`, { params: data });
}
// 获取日志列表
export function getTaskList(data: any) {
  return requestClient.get(Api.TaskPrefix, { params: data });
}
// 删除日志
export function delTask(id: string) {
  return requestClient.delete(`${Api.TaskPrefix}/${id}`);
}
// 重试日志
export function retryTask(id: string) {
  return requestClient.put(`${Api.TaskPrefix}/${id}/retry`);
}
// 日志详情
export function getTaskInfo(id: string) {
  return requestClient.get(`${Api.TaskPrefix}/${id}`);
}
// 节点重试
export function nodeRetryTask(data: any) {
  return requestClient.get(`${Api.TaskPrefix}/${data.id}/nodeRetry`, {
    params: data,
  });
}
// 获取webhookUrl
export function getWebhookUrl(id: string) {
  return requestClient.get(`${Api.WebhookPrefix}/getUrl`, { params: { id } });
}
// 获取webhook字段
export function getWebhookParams(randomStr: string) {
  return requestClient.get(`${Api.WebhookPrefix}/getParams/${randomStr}`);
}
// webhook开启接收请求
export function webhookStart(id: string, randomStr: string) {
  return requestClient.get(`${Api.WebhookPrefix}/${id}/start/${randomStr}`);
}
