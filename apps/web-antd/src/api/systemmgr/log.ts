import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/Log',
}

// 获取系统日志信息
export function getLogList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 删除或批量删除日志
export function delLog(data: any) {
  return requestClient.delete(Api.Prefix, { data });
}
// 一键清空
export function batchDelLog(type: string) {
  return requestClient.delete(`${Api.Prefix}/${type}`);
}
// 获取详情
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 个人信息日志一键清空
export function batchDelLoginLog() {
  return requestClient.delete(`${Api.Prefix}/deleteLoginLog`);
}
