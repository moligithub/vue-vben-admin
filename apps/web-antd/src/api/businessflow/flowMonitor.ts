import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/businessflow/Engine/FlowMonitor',
}

// 获取列表
export function getFlowMonitorList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 批量删除流程监控
export function delMonitorList(data: any) {
  return requestClient.delete(Api.Prefix, { data });
}
//事件日志
export function getLogList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.id}/EventLog`);
}
