import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/businessflow/Engine/FlowLaunch',
}

// 获取流程发起列表
export function getFlowLaunchList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 删除流程发起
export function delFlowLaunch(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 撤回流程发起
export function revoke(id: string, data: any) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/Withdraw`, data);
}
// 撤回流程发起
export function press(id: string) {
  return requestClient.post(`${Api.Prefix}/Press/${id}`);
}
