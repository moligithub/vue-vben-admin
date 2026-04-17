import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/businessflow/Engine/FlowDelegate',
}

// 获取流程委托列表
export function getFlowDelegateList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建流程委托
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改流程委托
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取流程委托信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除流程委托
export function delFlowDelegate(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取我的委托发起流程
export function getDelegateFlow(data: any) {
  return requestClient.get(`${Api.Prefix}/getflow`, { params: data });
}
// 获取一个流程的所有委托人
export function getDelegateUserByFlowId(data: any) {
  return requestClient.get(`${Api.Prefix}/userList`, { params: data });
}
// 结束流程委托
export function stop(id: string) {
  return requestClient.put(`${Api.Prefix}/Stop/${id}`);
}
