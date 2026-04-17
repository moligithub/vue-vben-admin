import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/imcenter/MessageMonitor',
}

// 获取消息监控列表
export function getMsgMonitorList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取详情
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/detail/${id}`);
}
// 批量删除
export function delMsgMonitor(data: any) {
  return requestClient.delete(`${Api.Prefix}/batchRemove`, { data });
}
// 一键清空
export function emptyMsgMonitor() {
  return requestClient.delete(`${Api.Prefix}/empty`);
}
